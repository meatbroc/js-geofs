const aircraftCodes = require("./data/aircraftCodes.cjs.js");
class Player {
    constructor(userobj) {
        this.airspeed = userobj["st"]["as"];
        this.userInfo = { id: userobj["acid"], callsign: userobj["cs"] };
        this.coordinates = (userobj["co"][0], userobj["co"][1]);
        this.altitude = Math.round(userobj["co"][2] * 3.28084, 2); // meters to feet
        this.verticalSpeed = Math.round(userobj["co"][3] * 3.28084, 2); // meters to feet
        const id = userobj["ac"];
        try {
            this.aircraft = {
                type: aircraftCodes[id],
                id,
            };
        } catch (_) {
            this.aircraft = {
                type: "Unknown",
                id,
            };
        }
    }
}

class MapAPI {
    constructor() {
        this._responseList = [];
        this._utilizeResponseList = !0;
        this.error = !1;
    }
    async getUsers(foos) {
        try {
            const response = await (await fetch("https://mps.geo-fs.com/map", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: "", gid: null, }),
            })).json()
            , userList = [];

            if (foos == !1) {
                for (const u of response.users) {
                    if (u.cs == "Foo" || u.cs == "") continue;
                    userList.push(new Player(u));
                }
            } else if (foos == !0) {
                for (const u of response.users) {
                    if (u.cs != "Foo") continue;
                    userList.push(new Player(u));
                }
            } else if (foos == null) {
                for (const u of response.users) userList.push(new Player(u));
            } else {
                throw new TypeError('"foos" attribute must be boolean or null');
            }
            if (this._utilizeResponseList === true) this._responseList.push(userList);

            return userList;
        } catch (e) {
            this.error = !0;
            console.error("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.error("Error Code 1: ", e);
            return null;
        }
    }
    ;
    returnResponseList (reset) {
        if (typeof reset != 'boolean') throw new TypeError('"reset" parameter must be a boolean');
        let before;
        return reset ? (before = this._responseList, this._responseList = [], before) : this._responseList;
    }
    ;
    disableResponseList () { this._utilizeResponseList = !1 };
    enableResponseList () { this._utilizeResponseList = !0 };
    toggleResponseList () { this._utilizeResponseList = !this._utilizeResponseList };
}

module.exports = { MapAPI };

/*
st gr -- grounded
st as -- airspeed
ac -- aircraft number [refr aircraftcodes.json]
acid -- user id
cs -- callsign
co 0 latitude
co 1 longitude
co 2 altitude in meters
co 3 vertical speed in meters
*/