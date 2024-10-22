from flask import Flask, jsonify, render_template
import pandas as pd
from datetime import datetime, timedelta
import pytz
import unittest
#from flask_restful import Api, Resource # resolving 404 fetch error

app = Flask(__name__)
#api = Api(app, prefix='/api/v1') # 

csv_file = 'static/Copy of Clubs + Affinity Groups Catalog 2024-2025 - Clubs.csv'
print("test")
data = pd.read_csv(csv_file)

# Clean the data
data['Time'] = data['Time'].str.strip().replace("Lunch", "11:45-12:30")
data = data[~data['Time'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])]
data['Time'] = data['Time'].str.replace(r'[–—−]', '-', regex=True)
data['Time'] = data['Time'].str.replace(r'\s*-\s*', '-', regex=True)
data[['start_time', 'end_time']] = data['Time'].str.split('-', expand=True)

data = data[~data['Room'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])]

# Dictionary setup
time_dict = {}
start_minutes = 0
end_minutes = 24 * 60
for i in range(start_minutes, end_minutes + 1, 15):
    hours = i // 60
    minutes = i % 60
    formatted_time = f"{hours:02d}:{minutes:02d}"
    time_dict[formatted_time] = False

room = {}
for room_name in data['Room']:
    if room_name not in room:
        room["RM " + str(room_name)] = time_dict
print(data)
print("Times dictionary: ", time_dict)
print(room.get("RM 101"))
print("start times", data["start_time"])
print("end times", data["end_time"])
# Time fetcher
def round_to_next_15_minute_interval(timezone='America/Los_Angeles'):
    tz = pytz.timezone(timezone)
    now = datetime.now(tz)
    minutes = now.minute
    minutes_to_add = 15 - (minutes % 15)
    if minutes_to_add == 0:
        minutes_to_add = 15
    new_time = now + timedelta(minutes=minutes_to_add)
    print("Current time: ", new_time.strftime("%H:%M"))
    return str(new_time.strftime("%H:%M"))

@app.route('/')
def index():

    return render_template('index.html')

# Flask route to check room status
@app.route('/check_room/<room_id>')
def check_room(room_id):
    current_time = round_to_next_15_minute_interval()
    current_time_interval = (datetime.now() + timedelta(minutes=30)).strftime("%H:%M")
    room_status = roomchecker(room_id, current_time)
    return jsonify({
        'room': room_id,
        'status': room_status,
        'time': f'{current_time} to {current_time_interval}'
    })

# New route to get room statuses for all rooms
@app.route('/get_room_status')
def get_room_status():
    statuses = {}
    current_time = round_to_next_15_minute_interval()
    for room_name in room.keys():
        status = roomchecker(room_name, current_time)
        statuses[room_name] = status
    return jsonify(statuses)

# Room status checker (0 = empty, 1 = occupied)
def roomchecker(room_index_holder, current_rounded_time):
    holder = room.get(room_index_holder)
    print(holder)
    if holder and holder.get(current_rounded_time) == False:
        print(room_index_holder, "is currently empty")
        return 0
    else:
        print(room_index_holder, "is currently occupied")
        return 1

current_time = round_to_next_15_minute_interval()
current_time_in_minutes = int(current_time.split(':')[0]) * 60 + int(current_time.split(':')[1]) # in minutes
current_time__interval_in_minutes = current_time_in_minutes + 15
print(current_time_in_minutes)
print(current_time__interval_in_minutes)

if __name__ == '__main__':
    app.run(debug=True)

