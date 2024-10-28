import pandas as pd
from robert.helpers import convert_to_military, map_block_to_days, dotw_dict, block_to_times
from robert.config import CLUBS_CSV, FALL_CLASSES_CSV

'''
CLEAN CLUB DATA

original rows:
Club    Description     Leaders     Advisor     Day     Time        Room        Group Type

final:
Day     Room      start_time      end_time     Description
'''

def clean_clubs(club_data: pd.DataFrame):
    # Clean the data
    club_data['Time'] = club_data['Time'].str.strip().replace("Lunch", "11:45-12:30")
    club_data = club_data[~club_data['Time'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])] # remove stupid answers
    club_data['Time'] = club_data['Time'].str.replace(r'[–—−]', '-', regex=True)
    club_data['Time'] = club_data['Time'].str.replace(r'\s*-\s*', '-', regex=True)
    club_data[['start_time', 'end_time']] = club_data['Time'].str.split('-', expand=True) # split time into start and end
    club_data = club_data[~club_data['Room'].str.lower().isin(['', 'flexible', 'tbd', 'n/a'])] # remove stupid answers
    club_data = club_data[club_data['Day'].str.lower().isin(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])] # remove indecisive bumheads
    club_data = club_data.drop(columns=['Description', 'Leaders', 'Advisor', 'Time', 'Group Type'])
    club_data['Description'] = club_data['Club']
    club_data = club_data.drop(columns=['Club'])

    return club_data

club_data = pd.read_csv(CLUBS_CSV)

club_data = clean_clubs(club_data)

'''
CLEAN CLASSES DATA

original rows:
Class       Teacher     Start term      Room        Block

final:
Day     Room       start_time      end_time        Description
'''

def clean_classes(initial_class_data: pd.DataFrame):
    initial_class_data['times'] = initial_class_data['Block'].map(block_to_times)
    initial_class_data[['start_time', 'end_time']] = pd.DataFrame(initial_class_data['times'].tolist(), index=initial_class_data.index)

    initial_class_data['Day'] = initial_class_data['Block'].apply(map_block_to_days)
    class_data = initial_class_data.explode('Day')
    class_data['Description'] = class_data['Class'].astype(str) + ' - ' + class_data['Teacher'].astype(str)
    class_data = class_data.drop(columns=['Block', 'times', 'Class', 'Teacher', 'Start term'])
    class_data = class_data[['Day'] + [col for col in class_data.columns if col != 'Day']]

    return class_data

class_data = pd.read_csv(FALL_CLASSES_CSV)

class_data=clean_classes(class_data)

'''
FINAL DATA
'''
data = pd.concat([club_data, class_data], ignore_index=True)

data['Day'] = data['Day'].map(dotw_dict) # map monday -> 0, sunday -> 6

data['start_time'] = data['start_time'].apply(convert_to_military)
data['end_time'] = data['end_time'].apply(convert_to_military)

data = data.sort_values(by=['Day', 'start_time'])
