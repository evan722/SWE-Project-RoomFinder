from flask import Flask, jsonify, render_template
from robert.classroom_dict import classroom_dict

app = Flask(__name__)

'''
NEXT STEPS:
- add other calendars
- add descriptions (end of column)
'''

# update room availability
@app.route('/update_av/<room>')
def update_av(room: str):
    global classroom_dict
    update = classroom_dict[room].get_av()
    return jsonify({
        'room_name': classroom_dict[room].room_name,
        'message': update[1],
        'activity': update[3],
        'activity2': update[4]        
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

