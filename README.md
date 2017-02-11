# Traffic light simulator
A simple simulator for 4 traffic lights at an intersection.

## To intall the required modules
Type ```npm install``` at the root directory where packages.json is located.

## To run the tests
Type ```npm test``` at the root directory.

## To run the application
Type ```node app``` at the root directory.
The application will toggle the traffic lights every 5 minutes and logs the status of each traffic light to the console.

## Idea
Each traffic light is modeled by a **TrafficLight** instance.<br/>
The main app creates 4 **TrafficLight** instances at north, south, east, and west positions.<br/>
The traffic light at the north position is intially designated as the controller that drives the other 3 for a complete round from Green to yellow, and then red.<br/>
After that the east traffic light becomes the controller for another round and so on.<br/>
The application will run the simulation for 30 minutes before exiting.<br/>

The file **30_MIN_OUTPUT.log** contains the output for 30 minutes (```node app > 30_MIN_OUTPUT.log```)<br/>
