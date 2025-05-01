# js-geofs

An abstraction layer for the GeoFS API (credit to iL0g1c)

# Installation

1. Create your project directory and select it
   ```bash
   mkdir example-dir
   cd /path/to/example-dir
   ```
2. Install the package
   ```bash
   npm install js-geofs
   ```
3. You're all set! Read the MapAPI and MultiplayerAPI sections to find out more.

# Components

## MapAPI

The MapAPI is a way to access GeoFS's map data, which includes:
- Users
- User IDs
- User account IDs
- User aircraft IDs
- User callsigns
- User grounded status and airspeed
- User coordinates
- User vectors
- User time

### References

ECMAScript:
```js
import { MapAPI } from "js-geofs";
const myAPI = new MapAPI();
```
CommonJS:
```js
const geofs = require("js-geofs");
const myAPI = new geofs.MapAPI();
```

### Methods

#### getUsers:

Parameters:
- foos (Boolean), optional
  If true, will only return foos. If false, will only return non-foos. If not provided, will return all users.

Returns: List of users as per specifications

#### responseList.get:

Gets response history.

Parameters: N/A

Returns: Array of all previous results of getUsers calls

#### responseList.reset:

Clears responseList.

Parameters: N/A

Returns: undefined

#### responseList.enable, responseList.disable, responseList.toggle:

Enables, disables, or toggles the usage of the responseList.

Parameters: N/A

Returns: undefined

## MultiplayerAPI

The MultiplayerAPI is a way to access GeoFS's multiplayer data, which includes:
- Chat data
- More detailed positioning information

### References

ECMAScript:
```js
import { MultiplayerAPI } from "js-geofs";
const myAPI = new multiplayerAPI(sessionID, accountID);
```
CommonJS:
```js
const geofs = require("js-geofs");
const myAPI = new multiplayerAPI(sessionID, accountID);
```
The accountID value can be found [here](https://www.geo-fs.com/pages/account.php?action=edit) and is refered to as your "user ID" on the website.

The sessionID value can be found in the console. Sign into your account [here](https://www.geo-fs.com/geofs.php) and then open the console with ctrl+shift+j.

Then, paste this code in.
```js
const cookies = document.cookie.split(';');
const sessionIdCookie = cookies.find(cookie => cookie.trim().startsWith('PHPSESSID='));
const sessionId = sessionIdCookie ? sessionIdCookie.split('=')[1] : null;
console.log(sessionId);
```
This should output a session ID that is basically a random string.
Next, you need to make a handshake with the server.
```js
myAPI.handshake();
```
Now you are setup and can use the API freely.

### Methods

#### sendMsg:

Sends a specified message to GeoFS chat.

Parameters:

- msg (String), required
  The message to send in GeoFS chat.

Returns: undefined.

#### getMessages: 

Allows you to pull the most recent messages from the server.

It will only pull messages that occured, since the last time you used this command.

Parameters: N/A

Returns: Array of chat messages or null if connection was unsuccessful.

#### coords:

Either returns current coords or changes them.

Parameters:
- coords (Array of 6 numbers), optional
  co 0 latitude
  co 1 longitude
  co 2 altitude in meters
  co 3 vertical speed in meters
  last two can be 0

Returns: undefined if parameter is passed or an array of current coords if it isn't passed.
