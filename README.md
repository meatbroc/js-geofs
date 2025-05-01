# js-geofs
An abstraction layer for the GeoFS API (credit to iL0g1c)

## Installation

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

## Components

### MapAPI

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

#### References

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

#### Method(s)

getUsers:

Parameters:
- foos (Boolean), optional
  If true, will only return foos. If false, will only return non-foos. If not provided, will return all users.

Returns: List of users as per specifications
