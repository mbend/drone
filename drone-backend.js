var Cylon = require('cylon');
var ws = require('nodejs-websocket');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",      // Combine with a second device to have more information
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
       // if (altitude > 1.5) {
       //     bot.drone.land();
       // }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    // Disable emergency setting if there was any
    bot.drone.disableEmergency();
    // Tell the drone it is lying horizontally
    bot.drone.ftrim();

    // Take off
    bot.drone.takeoff();
    after(5*1000, function() {
        bot.drone.front(0.5);
    });

    after(10*1000, function() {
        bot.drone.right(0.5);
        after(12*1000, function() {
            bot.drone.right(0);
        });
    });

    after(14*1000, function() {
        bot.drone.down(0.3);
        after(16*1000, function() {
            bot.drone.down(0);
        });
    });

    after(18*1000, function() {
        bot.drone.front(0.5);
    });

    after(25*1000, function() {
        bot.drone.land();
    });

    after(
        27*1000, function() {
        bot.drone.stop();
    });
}

Cylon.start();