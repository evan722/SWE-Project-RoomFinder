from robert.helpers import room_list
from robert.data_processing import data
from robert.classroom import Classroom

''' 
FORMAT ROOM_AVS:
{room a self.avs:[
 [monday_av[0], monday_av[1], activity],
 [tuesday_intervals],
 ...
 [sunday_intervals]
]
room b self_avs: ...
}

'''

room_avs = {}

for room in room_list:
    room_avs[room] = [[] for _ in range(7)]
    for row in range(len(data)):
        if data.iloc[row, 1] == room:
            weekday = data.iloc[row, 0]
            room_avs[room][weekday].append([data.iloc[row, 2], data.iloc[row, 3], data.iloc[row, 4]])


classroom_dict={}
for room in room_list:
    classroom_dict[room] = Classroom(room_name=room, avs=room_avs[room])