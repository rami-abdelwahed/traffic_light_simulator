var TrafficLight = require('./traffic_light');
var constants = require('./constants');
var util = require('util');
var moment = require('moment');

const repeatInterval = 5 * 60 * 1000;

//The 4 traffic lights at the intersection
var traffic_light_north, traffic_light_south, traffic_light_east, traffic_light_west;

var printStatus = function () {
    var logMessage = util.format("%s: %s|%s: %s|%s: %s|%s: %s\t\t\t[%s]",
        traffic_light_north.position, traffic_light_north.status,
        traffic_light_south.position, traffic_light_south.status,
        traffic_light_east.position, traffic_light_east.status,
        traffic_light_west.position, traffic_light_west.status,
        moment().format('LTS'));
    console.log(logMessage);
    console.log('................................................................');
}

//The call back function used to keep the 4 traffic lights in sync.
var updateIntersection = (function(trafficLight) {
    
    if (trafficLight.position === constants.position.NORTH) {
        traffic_light_south.status = trafficLight.status;
        if (trafficLight.master) {
            if (trafficLight.status === constants.status.GREEN || trafficLight.status === constants.status.YELLOW) {
                traffic_light_east.status = constants.status.RED;
                traffic_light_west.status = constants.status.RED;

            } else {
                traffic_light_east.status = constants.status.GREEN;
                traffic_light_west.status = constants.status.GREEN;
                trafficLight.master = false;
                traffic_light_east.master = true;
                controller = traffic_light_east;
            }

        }
    } else if (trafficLight.position === constants.position.EAST) {
        traffic_light_west.status = trafficLight.status;
        if (trafficLight.master) {
            if (trafficLight.status === constants.status.GREEN || trafficLight.status === constants.status.YELLOW) {
                traffic_light_north.status = constants.status.RED;
                traffic_light_south.status = constants.status.RED;
            } else {
                traffic_light_north.status = constants.status.GREEN;
                traffic_light_south.status = constants.status.GREEN;
                trafficLight.master = false;
                traffic_light_north.master = true;
                controller = traffic_light_north;
            }
        }        
    }
    printStatus();
});

traffic_light_north = new TrafficLight(constants.position.NORTH, constants.status.GREEN, 30, updateIntersection);
traffic_light_south = new TrafficLight(constants.position.SOUTH, constants.status.GREEN, 30, updateIntersection);
traffic_light_east = new TrafficLight(constants.position.EAST, constants.status.RED, 30, updateIntersection);
traffic_light_west = new TrafficLight(constants.position.WEST, constants.status.RED, 30, updateIntersection);
printStatus();

traffic_light_north.master = true;
var stateCounter = 0;
var controller = traffic_light_north;

setTimeout(function() {
    process.exit();    
}, 30 * 60 * 1000);

setInterval(function () {
    controller.toggle();
}, repeatInterval);

