var moment = require('moment');

// Jan 1st, 1970 00:00:00 am
// var date = moment();
// console.log(date.format('MMM Do, YYYY hh:mm:ss a'));

// var date = moment();
// console.log(date.format('MMM Do, YYYY'));
// date.add(100, 'years').subtract(10, 'months');
// console.log(date.format('MMM Do, YYYY'));

var date = moment();
console.log(date.format('h:mm a'));


// new Date().getTime() === moment().valueOf()

var someTimestamp = moment().valueOf();
console.log(someTimestamp);