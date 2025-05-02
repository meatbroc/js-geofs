export class MultiplayerAPI {
    constructor(sid, acid) {
        this.sessionID = sid;
        this.accountID = acid;
        this.myID = null;
        this.lastMsgID = 0;
        this.error = !1;
        this.coords = new Array(6).fill(0);
    }
    #body (overrides = {}) {
        return {
            origin: "https://www.geo-fs.com",
            acid: this.accountID,
            sid: this.sessionID,
            id: "",
            ac: "1",
            co: this._coords,
            ve: [2.7011560632672626e-10, 7.436167948071671e-11, 0.000004503549489433212, 0, 0, 0],
            st: { gr: !0, as: 0 },
            ti: 1678751444055,
            m: "",
            ci: 0,
            ...overrides
        }
    }
    ;
    async #post (body) {
        const response = await fetch('https://mps.geo-fs.com/update', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Cookie": `PHPSESSID=${this.sessionID}`
            },
            body: JSON.stringify(body),
            credentials: "include",
        });
        return response.json();
    }
    ;
    /**
     * @description - Initializes connection and gains mandatory variables from server.
     */
    async handshake() {
        this.error = !1;
        const body = this.#body();
        try {
            const response = await this.#post(body);
            console.log("Successfully connect to server.");
            this.myID = response.myId;

            const msgBody = this.#body({ ci: this.lastMsgID, id: this.myID });
            const msgResponse = await this.#post(msgBody);
            this.myID = msgResponse.myId;
            this.lastMsgID = msgResponse.lastMsgId;
        } catch (e) {
            this.error = !0;
            console.log("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.log("Error code 4: " + e);
            return;
        }
    }
    ;
    async sendMsg (msg) {
        this.error = !1;
        const body = this.#body({m: msg, id: this.myID});
        try {
            const response = await this.#post(body);
            this.myID = response.myId;
            this.lastMsgID = response.lastMsgId;
            return;
        } catch (e) {
            this.error = !0;
            console.log("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.log("Error code 3: " + e);
        }
    }
    ;
    async getMessages() {
        const body = this.#body({id: this.myID, ci: this.lastMsgID});
        try {
            const response = await this.#post(body);
            this.myID = response.myId;
            this.lastMsgID = response.lastMsgId;
            return response.chatMessages;
        } catch (e) {
            this.error = !0;
            console.log("Unable to connect to GeoFS. Check your connection and restart the application.");
            console.log("Error code 2: " + e);
            return null;
        }
    }
    ;
    /**
     * @param {number[]|undefined} coords
     */
    coords(coords) {
        if (coords === undefined) return this._coords;
        if (!coords || !Array.isArray(coords)) throw new TypeError('"coords" parameter must be an Array');
        if (coords.length != 6) throw new TypeError('"coords" must be an array with 6 elements');
        this._coords = coords;
    }
}