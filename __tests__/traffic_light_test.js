'use strict';


const TrafficLight = require('../traffic_light');
const constants = require('../constants');

jest.useFakeTimers();
test('wait 30 seconds before checking the traffic light color changes from GREEN to RED', () => {
    //var callback = jest.fn();
    var trafficLight = new TrafficLight(constants.position.NORTH, constants.status.GREEN);
    trafficLight.toggle();
    expect(trafficLight.status).toBe(constants.status.YELLOW);
    jest.runAllTimers();
    expect(trafficLight.status).toBe(constants.status.RED);
})

test('wait 30 seconds before checking the traffic light color changes from RED to GREEN', () => {
    //var callback = jest.fn();
    var trafficLight = new TrafficLight(constants.position.SOUTH, constants.status.RED);
    trafficLight.toggle();
    jest.runAllTimers();
    expect(trafficLight.status).toBe(constants.status.GREEN);
})

test('check the traffic light color changes with callback called twice.', () => {
    var callback = jest.fn();
    var trafficLight = new TrafficLight(constants.position.EAST, constants.status.GREEN, 30, callback);
    trafficLight.toggle();
    expect(trafficLight.status).toBe(constants.status.YELLOW);
    expect(callback).toBeCalled();

    jest.runAllTimers();
    expect(trafficLight.status).toBe(constants.status.RED);
    expect(callback).toBeCalled();

})

test('check the traffic light color changes with another associated traffic light in sync.', () => {
    var callback = function (trafficLight) {
        trafficLight2.status = trafficLight.status;
    };
    var trafficLight = new TrafficLight(constants.position.EAST, constants.status.GREEN, 30, callback);
    var trafficLight2 = new TrafficLight(constants.position.WES, constants.status.GREEN, 30);
    trafficLight.toggle();
    expect(trafficLight.status).toBe(constants.status.YELLOW);
    expect(trafficLight2.status).toBe(constants.status.YELLOW);
    jest.runAllTimers();
    expect(trafficLight.status).toBe(constants.status.RED);
    expect(trafficLight2.status).toBe(constants.status.RED);

})

test('check the traffic light color changes with another opposite traffic light in sync.', () => {
    var callback = function (trafficLight) {
        if(trafficLight.status === constants.status.GREEN || trafficLight.status === constants.status.YELLOW) {
            trafficLight2.status = constants.status.RED;
        } else {
            trafficLight2.status = constants.status.GREEN;
        }
        
    };
    var trafficLight = new TrafficLight(constants.position.EAST, constants.status.GREEN, 30, callback);
    var trafficLight2 = new TrafficLight(constants.position.NORTH, constants.status.RED, 30);
    trafficLight.toggle();
    expect(trafficLight.status).toBe(constants.status.YELLOW);
    expect(trafficLight2.status).toBe(constants.status.RED);
    jest.runAllTimers();
    expect(trafficLight.status).toBe(constants.status.RED);
    expect(trafficLight2.status).toBe(constants.status.GREEN);

})