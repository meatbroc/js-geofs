# js-geofs

[![npm version](https://img.shields.io/npm/v/js-geofs.svg)](https://www.npmjs.com/package/js-geofs)
[![License](https://img.shields.io/github/license/meatbroc/js-geofs)](https://github.com/meatbroc/js-geofs/blob/main/LICENSE)

An abstraction layer for the GeoFS API (credit to [iL0g1c](https://pypi.org/project/python-geofs/) for MapAPI & MultiplayerAPI).

---

## Table of Contents
1. [Installation](#installation)
2. [Components](#components)
   - [MapAPI](#mapapi)
   - [MultiplayerAPI](#multiplayerapi)
   - [GeoAPI](#geoapi)
   - [WeatherAPI](#weatherapi)
4. [Contributing](#contributing)
5. [License](#license)

---

## Installation

1. Create your project directory and select it:
   ```bash
   mkdir example-dir
   cd /path/to/example-dir
   ```

2. Install the package:
   ```bash
   npm install js-geofs
   ```

3. You're all set! Read the [Components](#components) section to find out more.

---

## Components

### MapAPI

The MapAPI provides access to GeoFS's map data, which includes the user's:

- ID
- Account ID
- Aircraft ID
- Callsign
- Grounded status and airspeed
- Coordinates
- Vectors
- Time

#### References

**ECMAScript:**
```js
import { MapAPI } from "js-geofs";
const myAPI = new MapAPI();
```

**CommonJS:**
```js
const geofs = require("js-geofs");
const myAPI = new geofs.MapAPI();
```

#### Methods

- **getUsers:**
  - **Parameters:** 
    - `foos` (Boolean), optional: 
      - If true, returns only foos.
      - If false, returns only non-foos.
      - If not provided, returns all users.
  - **Returns:** List of users as per specifications.

- **responseList.get:**
  - **Gets:** Response history.
  - **Parameters:** N/A.
  - **Returns:** Array of all previous results of `getUsers` calls.

- **responseList.reset:**
  - Clears `responseList`.
  - **Parameters:** N/A.
  - **Returns:** undefined.

- **responseList.enable, responseList.disable, responseList.toggle:**
  - Enables, disables, or toggles usage of the `responseList`.
  - **Parameters:** N/A.
  - **Returns:** undefined.

---

### MultiplayerAPI

The MultiplayerAPI provides access to GeoFS's multiplayer data, including:
- Chat data
- More detailed positioning information

#### References

**ECMAScript:**
```js
import { MultiplayerAPI } from "js-geofs";
const myAPI = new multiplayerAPI(sessionID, accountID);
```

**CommonJS:**
```js
const geofs = require("js-geofs");
const myAPI = new multiplayerAPI(sessionID, accountID);
```

- The `accountID` value can be found [here](https://www.geo-fs.com/pages/account.php?action=edit).
- The `sessionID` value can be found in the console (see below).

#### Retrieving `sessionID`
Sign in to your account [here](https://www.geo-fs.com/){:target="_blank"} and open the console with `ctrl+shift+j`. Then, paste this code:
```js
const cookies = document.cookie.split(';');
const sessionIdCookie = cookies.find(cookie => cookie.trim().startsWith('PHPSESSID='));
const sessionId = sessionIdCookie ? sessionIdCookie.split('=')[1] : null;
console.log(sessionId);
```

This will output a session ID, which is a random string.

*Note: session IDs can be exploited to gain access to your GeoFS account. This package needs it in order to access chat messages through MultiplayerAPI. Do not share your session ID with anyone unless you know what you're doing.*

To make a handshake with the server:
```js
myAPI.handshake();
```

#### Methods

- **sendMsg:**
  - Sends a specified message to GeoFS chat.
  - **Parameters:**
    - `msg` (String), required: The message to send in GeoFS chat.
  - **Returns:** undefined.

- **getMessages:**
  - Pulls the most recent messages from the server.
  - **Parameters:** N/A.
  - **Returns:** Array of chat messages or null if the connection was unsuccessful.

- **coords:**
  - Either returns current coordinates or changes them.
  - **Parameters:**
    - `coords` (Array of 6 numbers), optional:
      - `co[0]` latitude
      - `co[1]` longitude
      - `co[2]` altitude in meters
      - `co[3]` vertical speed in meters
      - Last two can be 0.
  - **Returns:** undefined if parameter is passed or an array of current coords if not.

---

### GeoAPI

The GeoAPI allows you to geocode a specified query.

#### References

**ECMAScript:**
```js
import { GeoAPI } from "js-geofs";
const myAPI = new GeoAPI();
```

**CommonJS:**
```js
const geofs = require("js-geofs");
const myAPI = new geofs.GeoAPI();
```

#### Methods

- **query:**
  - Sends a request to GeoFS's geocoding backend and returns the response if found.
  - **Parameters:**
    - `toQuery` (String), required: String to query/encode in the URL.
  - **Returns:** Response object or undefined if it couldn't be geocoded.

---

### WeatherAPI

#### References

**ECMAScript:**
```js
import { WeatherAPI } from "js-geofs";
const myAPI = new WeatherAPI();
```

**CommonJS:**
```js
const geofs = require("js-geofs");
const myAPI = new geofs.WeatherAPI();
```

#### Methods

- **query:**
  - Queries GeoFS's weather backend with the specified ICAO(s) and returns the airport's METAR if found.
  - **Parameters:**
    - `toQuery` (String), required: String to query/encode in the URL.
  - **Returns:** Response object or undefined if no matching METAR was found.

---

## Contributing

Contributions are welcome! If you don't know how to contribute, follow the steps below.

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit and push your code.
4. Open a pull request describing your changes in detail.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
