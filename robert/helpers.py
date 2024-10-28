from datetime import datetime
import pytz

def convert_to_military(time_str):
    hour, minute = map(int, time_str.split(':'))
    if 1 <= hour <= 6:
        return f"{hour + 12}:{minute:02d}"  # Add 12 for military time
    else:
        return f"{hour:02d}:{minute:02d}"  # Keep it in the same format, zero-padded


def get_now():
    timezone=pytz.timezone('US/PACIFIC')
    time=str(datetime.now(timezone).strftime("%H:%M"))
    weekday=datetime.now(timezone).weekday() # monday = 0, sunday=6
    return [time, weekday]

def map_block_to_days(block):
    block_number = int(block.split()[1])  # Extract the number from 'Block X'
    if block_number in [1, 2, 3, 4]:
        return ['Monday', 'Thursday']
    elif block_number in [5, 6, 7, 8]:
        return ['Tuesday', 'Friday']

dotw_dict = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
    'Saturday': 6,
    'Sunday': 7
}

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
    "345"]

block_to_times = {
    'Block 1': ['8:55', '10:10'],
    'Block 2': ['10:15', '11:30'],
    'Block 3': ['12:35', '13:50'],
    'Block 4': ['13:55', '15:10'],
    'Block 5': ['8:55', '10:10'],
    'Block 6': ['10:15', '11:30'],
    'Block 7': ['12:35', '13:50'],
    'Block 8': ['13:55', '15:10']
}