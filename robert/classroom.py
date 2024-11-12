from datetime import datetime
from robert.helpers import get_now

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
        list_estimate=0
        activity = ''
        activity2 = ''

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
                    estimate=int(difference.total_seconds() / 60)
                    activity = f'Ongoing: {interval[2]}'
                    activity2 = interval[2]
                    list_estimate=-1
                    message = f"Available in {estimate} minutes (at {interval[1].hour}:{interval[1].minute:02d})."
                elif self.currently_av==1: # available for limited time
                    if x < interval[0]: 
                        difference=interval[0] - x
                        estimate=int(difference.total_seconds() / 60)
                        list_estimate=estimate
                        activity = f'In {estimate} minutes: {interval[2]}'
                        activity2 = interval[2]
                        message = f"Available until {interval[0].hour}:{interval[0].minute:02d}."
            if message == "":
                message = "Available for the rest of the day."
                activity = ""
                activity2 = ""
                list_estimate=10000
        
        return [self.currently_av, message, list_estimate, activity, activity2]
    
    def make_res(self, name, end):
        time_format="%H:%M"
        x=datetime.strptime(get_now()[0], time_format)
        weekday_avs = self.avs[get_now()[1]]
        for interval in range(weekday_avs):
            if interval[1] >= end:
                weekday_avs.insert(weekday_avs.index(interval)+1, [x, end, name])



