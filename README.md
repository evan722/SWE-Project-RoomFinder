# SWE-Project-RoomFinder

## Download VSCode

## Clone Git Repository
```bash
git clone https://github.com/evan722/SWE-Project-RoomFinder.git
```

## Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Download Flask and Python in the terminal
```bash
brew install python
pip install Flask
```

## Set up virtual environment
```bash
python -m venv .venv
source .venv/bin/activate
```

## Install necessary libraries
```bash
pip3 install pandas
pip3 install pytz
pip3 install datetime
```

## To run the app
```bash
python app.py
```



## Current list of errors
```
1. integration - script.js is not communicating with app.py for some reason
    fixed
2. error where script.js expects different outputs then app.py (maybe)
    fixed
3. somehow app.py isnt running at all (none of the print statements are printing)
    fixed
4. points are named incorrectly and therefore correspond to the wrong variable names
    fixed (mostly, new problem below)
5. points stopped working, could be problem with data but when dummy data was inputted, points didnt change color

6. points also arent reverting back to grey when corrsponding variable is deleted (not a rate limiting problem currently, but could lead to future errors)

7. point hitboxes are still not centered on the page, although everything stays in place most of the time, when the page is shrunk to the point that the map has to shrink, points do not move along with the map

8. dot colors are strange, when checked at 10:00 pm last night everything was green as it should have been, however, today at 2:00 pm, when everything should have still been green they were all red

9. could have some problems with time calculation as datetime counts military time whereas csv file is only in standard

10. some scripts may be running before others and therefore preventing them from outputing anything
    resolved
11. 
```