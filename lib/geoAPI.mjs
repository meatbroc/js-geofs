export class GeoAPI {
    constructor() {
        this.URL = "https://www.geo-fs.com/backend/geocode/geocode.php?query=";
        this.error = !1;
    }
    async query (toQuery, func) {
        if (toQuery === undefined) throw new TypeError("'toQuery' parameter is required.");
        try {
            const response = await (await fetch(this.URL + toQuery)).text();
            if (response == '') return;
            response = JSON.parse(response);
            if (func) return func(response);
            return response;
        } catch (e) {
            this.error = !0;
            console.log("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.log("Error code 5: " + e);
        }
    }
    ;
}