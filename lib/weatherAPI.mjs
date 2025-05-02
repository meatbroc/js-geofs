export class WeatherAPI {
    constructor () {
        this.URL = "https://weather.geo-fs.com/metar.php?icao=";
        this.error = !1;
    }
    async query (toQuery) {
        if (Array.isArray(toQuery)) toQuery = toQuery.join(",");
        if (toQuery == '' || toQuery === undefined) throw new TypeError("'toQuery' is a required parameter and cannot be an empty string.");
        toQuery = toQuery.replace(/\s/g, '').toUpperCase();
        try {
            const response = await (await fetch(this.URL + toQuery)).text();
            if (response == '') return;
            return JSON.parse(response);
        } catch (e) {
            this.error = !0;
            console.log("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.log("Error code 6: " + e);
        }
    }
    ;
}