
var constants = require('./constants');
var util = require('util');

function TrafficLight(position, status, delaySeconds, callback) {
    this.position = position;
    this.status = status;
    this.delaySeconds = delaySeconds || 30;
    this.callback = callback || function () {
        console.log(util.format("%s, %s", this.position, this.status));
    };
    this.toggle = function () {
        if (this.status === constants.status.GREEN) {
            this.status = constants.status.YELLOW;
            this.callback(this);
            var change = (function () {
                this.status = constants.status.RED;
                this.callback(this);
            }).bind(this);
            setTimeout(change, this.delaySeconds * 1000);
        } else if (this.status === constants.status.RED) {
            this.status = constants.status.GREEN;
            this.callback(this);
        }
    };
}


module.exports = TrafficLight;