# SWE-Project-RoomFinder

## Setup
Download VSCode: https://code.visualstudio.com/download

Clone Git Repository
```bash
git clone https://github.com/evan722/SWE-Project-RoomFinder.git
```

Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Download Flask and Python in Terminal
```bash
brew install python
pip install Flask
```

Set up virtual environment
```bash
python -m venv .venv
source .venv/bin/activate
```

Install necessary libraries
```bash
cd SWE-Project-RoomFinder
pip3 install -r requirements.txt
```

Run the app (paste in terminal)
```bash
python app.py
```
Go to: http://127.0.0.1:5000

## Meeting with Morgan on 11/12:
- [x] Search bar to search rooms/clubs/classes
- [ ] Mobile usability (since people looking for rooms will
- [ ] Larger clickable buttons - dots are kinda small
- [ ] Mini-map to make sure people know what floor they're on

## New features
- [x] More info on room status
    - [x] Available: for how long, until what time
    - [x] Unavailable: for how long, until what time
- [x] Priority list: Order rooms by availability at the current timestep
- [ ] Be able to reserve a room for a period of time
- [ ] (Nice to have) Default location/just location: Allow user to set default location and order priority list by proximity


## Current list of errors

1. For class schedule, Block 7 and Block 8 are in the wrong order on Thursday and Friday
2. FIXED ~~integration - script.js is not communicating with app.py for some reason~~
3. FIXED ~~error where script.js expects different outputs then app.py (maybe)~~
4. FIXED ~~somehow app.py isnt running at all (none of the print statements are printing)~~
5. FIXED (mostly) ~~points are named incorrectly and therefore correspond to the wrong variable names~~
6. FIXED ~~points stopped working, could be problem with data but when dummy data was inputted, points didnt change color~~

7. points also arent reverting back to grey when corrsponding variable is deleted (not a rate limiting problem currently, but could lead to future errors)

8. (MINOR) point hitboxes are still not centered on the page, although everything stays in place most of the time, when the page is shrunk to the point that the map has to shrink, points do not move along with the map

9. FIXED (temp) ~~dot colors are strange, when checked at 10:00 pm last night everything was green as it should have been, however, today at 2:00 pm, when everything should have still been green they were all red~~

10. FIXED: added conversion function for 1:00-6:00 -> 13:00-18:00. handwavy but no bums should be going to school 1am-6am anyway so i think it's fine ~~could have some problems with time calculation as datetime counts military time whereas csv file is only in standard~~

11. FIXED ~~some scripts may be running before others and therefore preventing them from outputing anything~~
