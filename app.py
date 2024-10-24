from flask import Flask, jsonify, render_template
import pandas as pd
from datetime import datetime, timedelta
import pytz
import unittest
#from flask_restful import Api, Resource # resolving 404 fetch error

app = Flask(__name__)
#api = Api(app, prefix='/api/v1') # 

'''
CLEAN CLUB DATA
Rows:
Day     Classroom      start_time      end_time
'''

csv_file = 'static/Copy of Clubs + Affinity Groups Catalog 2024-2025 - Clubs.csv'
data = pd.read_csv(csv_file)

# Clean the data
data['Time'] = data['Time'].str.strip().replace("Lunch", "11:45-12:30")
data = data[~data['Time'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])] # remove stupid answers
data['Time'] = data['Time'].str.replace(r'[–—−]', '-', regex=True)
data['Time'] = data['Time'].str.replace(r'\s*-\s*', '-', regex=True)
data[['start_time', 'end_time']] = data['Time'].str.split('-', expand=True) # split time into start and end
data = data[~data['Room'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])] # remove stupid answers
data = data[data['Day'].str.lower().isin(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])] # remove indecisive bumheads

data = data.drop(columns=['Club', 'Description', 'Leaders', 'Advisor', 'Time', 'Group Type'])

def convert_to_military(time_str):
    hour, minute = map(int, time_str.split(':'))
    if 1 <= hour <= 6:
        return f"{hour + 12}:{minute:02d}"  # Add 12 for military time
    else:
        return f"{hour:02d}:{minute:02d}"  # Keep it in the same format, zero-padded

dotw_dict = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
    'Saturday': 6,
    'Sunday': 7
}


data['Day'] = data['Day'].map(dotw_dict)

data['start_time'] = data['start_time'].apply(convert_to_military)
data['end_time'] = data['end_time'].apply(convert_to_military)

data = data.sort_values(by=['Day', 'start_time'])

'''
NEXT STEPS:
- add other calendars
'''

''' 
CREATING AVAILABILITY LISTS

format room_avs: 
{room a self_avs:[
 [monday_av[0], monday_av[1]],
 [tuesday_intervals],
 ...
 [sunday_intervals]
]
room b self_avs: ...
}

'''

room_list = [
    "101",
    "103",
    "106",
    "117",
    "1103",
    "1106",
    "1108",
    "1109",
    "1105",
    "1102",
    "115",
    "114",
    "113",
    "112",
    "Cafe",
    "175C",
    "175B",
    "175A",
    "203",
    "205",
    "208",
    "217",
    "218",
    "219",
    "215",
    "220",
    "1202",
    "1204",
    "1206",
    "240",
    "247",
    "245",
    "302",
    "304",
    "319",
    "318",
    "317",
    "316",
    "309",
    "307",
    "305",
    "340",
    "346",
    "345"] # truncated for now

room_avs = {}

for room in room_list:
    room_avs[room] = [[] for _ in range(7)]
    for row in range(len(data)):
        if data.iloc[row, 1] == room:
            weekday = data.iloc[row, 0]
            room_avs[room][weekday].append([data.iloc[row, 2], data.iloc[row, 3]])

'''
GET TIME & CLASSROOM
'''

def get_now():
    timezone=pytz.timezone('US/PACIFIC')
    time=str(datetime.now(timezone).strftime("%H:%M"))
    weekday=datetime.now(timezone).weekday() # monday = 0, sunday=6
    return [time, weekday]

# define classroom
class Classroom:

    def __init__(self, room_name: str, avs: list, currently_av = 1): # av = availability,
        self.room_name=room_name
        self.currently_av=currently_av
        self.avs=avs

    def get_av(self):
        weekday_av=self.avs[get_now()[1]]
        time_format="%H:%M"
        message = ""
        self.currently_av=1
        x=datetime.strptime(get_now()[0], time_format)
        list_message = ""
        list_estimate=0

        if weekday_av==[]: # available the entire day
            message = "Available for the rest of the day."
            list_estimate=10000
        else:
            for interval in weekday_av:
                if type(interval[0]) != datetime:
                    interval[0] = datetime.strptime(interval[0], time_format)
                    interval[1] = datetime.strptime(interval[1], time_format)
                if interval[0] <= x <= interval[1]: # unavailable
                    self.currently_av=0
                    difference=interval[1] - x
                    estimate=difference.total_seconds() / 60
                    list_message = "Unavailable"
                    list_estimate=-1
                    message = "Available in {estimate} minutes ({end_time})".format(estimate=estimate, end_time=str(interval[1]))
                elif self.currently_av==1: 
                    if x < interval[0]: 
                        difference=x - interval[0]
                        estimate=difference.total_seconds() / 60
                        list_estimate=estimate
                        message = "Available for {estimate} minutes (until {end_time})".format(estimate=estimate, end_time=str(interval[0]))
                        break
            if message == "":
                message = "Available for the rest of the day."
                list_estimate=10000
        
        return [self.currently_av, message, list_estimate]

'''
NEXT STEPS:
- update message and availability to app
'''

classroom_dict={}
for room in room_list:
    classroom_dict[room] = Classroom(room_name=room, avs=room_avs[room])

# update room availability
@app.route('/update_av/<room>')
def update_av(room: str):
    global classroom_dict
    update = classroom_dict[room].get_av()
    return jsonify({
        'room_name': classroom_dict[room].room_name,
        'message': update[1]        
    })

# get all availabilities
@app.route('/get_all_av/')
def get_all_av():
    global classroom_dict
    all_av = {}
    for name, classroom in classroom_dict.items():
        classroom.get_av()
        all_av[name] = classroom.currently_av
    return jsonify(all_av)

@app.route('/get_all_list_message/')
def get_all_list_message():
    global classroom_dict
    all_list_estimate ={}
    for name, classroom in classroom_dict.items():
        all_list_estimate[name] = classroom.get_av()[2]
    return jsonify(all_list_estimate)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

