# Tweety

- Language Used: *Javascript*
- Application Type: *Node.js*
- Node version: *8.11.1 or higher*

## Installing Tweety :hatching_chick:

1. clone repo 
2. extract files to desired location
3. navigate to file location and run **npm install**. *Note: All modules used have 0 vulnerabilities* :innocent:

## Running Tweety :hatched_chick:

- To run tweety execute *node index --users [file location] --tweets [file location]*
- To view all options execute *node index --help*

## Running Tweety Tests 

- execute *npm test*
- if this does not work (mainly on windows) do a *"npm install -g mocha"* and then execute *"mocha test"* at tweety's root folder.

## Assumptions

**Note:** a user being followed is refered to as "follow(s)".

### Inputs

1. The program requires 2 inputs: a users text file and a tweets text file.
2. The program requires the location to these files and will then read the files contents.
3. Both locations must be valid. 
4. If the program is unable to locate both files, it will terminate.

## User File

1. When reading each line of the file, all characters before the word "follows" will be considered as a username.
2. The username will be validated using the same validation as tweeter:
    - Username must be <= 15 characters.
    - Username must have no special characters (underscore being the exception) and no space.
    - Username must be alphanumeric (A-Z, 0-9).
3. If the username is not valid the line will be skipped.
4. If the line does not contain the word "follows" the line will be skipped.
5. If no valid username is found in all the lines, the program will terminate since there are no users to be processed.
6. All characters after the word "follows" are considered to be the list of follows.
7. A comma at the end of the word is considered to be a follow separator.
8. If there is no word after the word "follows" the user will have no follows assigned.
9. A follow is also validated the same as the username.

## Tweets File

1. Any characters before "> " are considered to be a username.
2. The username will be validated.
3. All characters after "> " are considered to be the tweet.
4. The tweet is validated: must have <= 140 characters.
5. If no space is found after the character ">" or the character is not in the line, the line is skipped.

## Other

1. All follows are users and must be registered as such.
2. Each user is unique (does not duplicate).
3. Each follow belonging to a user is unique.
4. A user can only see tweets beloning to the user and the user's follows.
5. A user can appear more than once in the users file.
6. Each user must be displayed (even if the user has no tweets).
