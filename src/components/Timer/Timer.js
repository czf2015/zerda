export default class Timer {
    constructor({ time = 0, status = 'stoped' } = {}) {
        this.time = time;
        this.status = status;
        this.tid = -1;
        // stoped 0 continue 1  paused 2
        // stoped <=> continue
        //      /\      //
        //        paused
    }
    start() {
        // console.log(this.status)
        // console.log(this.time)
        // console.log('start')
        if (this.status === "stoped") {
            this.time = 0;
            this.tid = setInterval(() => {
                this.time += 1;
            }, 10);
            this.status = "continue";
        }
        // console.log('continue')
        return this
    }
    pause() {
        // console.log(this.time)
        // console.log('pause')
        if (this.status == "continue") {
            clearInterval(this.tid);
            this.status = "paused";
            // console.log('paused')
        }
        return this
    }
    continue() {
        if (this.status == "paused") {
            this.tid = setInterval(() => {
                this.time += 1;
            }, 10);
            this.status = "continue";
            // console.log('paused')
        }
        return this
    }
    stop() {
        // console.log('stop')
        if (this.status != "stoped") {
            // console.log(this.status)
            if (this.status == "continue") {
                clearInterval(this.tid);
            }
            this.status = "stoped";
            // console.log('stoped')
        }
        return this
    }
}