import { aircraftCodes } from "./data/aircraftCodes.mjs";
class Player {
    constructor(userobj) {
        this.airspeed = userobj["st"]["as"];
        this.userInfo = { id: userobj["acid"], callsign: userobj["cs"] };
        this.coordinates = (userobj["co"][0], userobj["co"][1]);
        this.altitude = Math.round(userobj["co"][2] * 3.28084, 2); // meters to feet
        this.verticalSpeed = Math.round(userobj["co"][3] * 3.28084, 2); // meters to feet
        const id = userobj["ac"];
        this.aircraft = {
            type: aircraftCodes[id] ?? "Unknown",
            id,
        };
    }
}

export class MapAPI {
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
            , userList = []
            , type = typeof foos;
            if (type != 'boolean' && type != 'undefined') throw new TypeError('"foos" attribute must be boolean or undefined');
            if (foos === !1) {
                for (const u of response.users) {
                    if (!u) continue;
                    if (u.cs == "Foo" || u.cs == "") continue;
                    userList.push(new Player(u));
                }
            } else if (foos === !0) {
                for (const u of response.users) {
                    if (!u) continue;
                    if (u.cs != "Foo") continue;
                    userList.push(new Player(u));
                }
            } else if (foos === undefined) {
                for (const u of response.users) u != null && userList.push(new Player(u));
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
    responseList = {
        getList: () => { return this._responseList },
        reset: () => { this._responseList = [] },
        disable: () => { this._utilizeResponseList = !1 },
        enable: () => { this._utilizeResponseList = !0 },
        toggle: () => { this._utilizeResponseList = !this._utilizeResponseList },
    };
}

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