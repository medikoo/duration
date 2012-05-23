# duration - Provides detailed info about given time duration and user friendly string output

_Formerly part of [es5-ext](https://github.com/medikoo/es5-ext) project._

## Installation

To use it with node.js:

	$ npm install duration

You can easily create browser bundle with help of [modules-webmake](https://github.com/medikoo/modules-webmake)

## Example usage:

```javascript
var Duration = require('duration')

var duration = new Duration(new Date(2000, 6, 7),
	new Date(2010, 8, 13, 3, 23, 8, 456));

console.log("Years: ", duration.years);
console.log("Months: ", duration.months);
console.log("Days: ", duration.days);
console.log("Hours: ", duration.hours);
console.log("Minutes: ", duration.minutes);
console.log("Seconds: ", duration.seconds);
console.log("Milliseconds: ", duration.milliseconds);

console.log("Trailing months: ", duration.month);
console.log("Trailing days: ", duration.day);
console.log("Trailing hours: ", duration.hour);
console.log("Trailing minutes: ", duration.minute);
console.log("Trailing seconds: ", duration.second);
console.log("Trailing milliseconds: ", duration.millisecond);

console.log("Default string representation: ", duration.toString());
console.log("Alternative string representation: ", duration.toString(1));
console.log("Custom string representation: ",
	duration.toString("H: %Hs m: %M"));
```

Returns:

```
Years:  10
Months:  122
Days:  3720
Hours:  89283
Minutes:  5357003
Seconds:  321420188
Milliseconds:  321420188456
Trailing months:  2
Trailing days:  6
Trailing hours:  3
Trailing minutes:  23
Trailing seconds:  8
Trailing milliseconds:  456
Default string representation:  10y 2m 6d 03:23:08.456
Alternative string representation:  10y 2m 6d 3h 23m 8s 456ms
Custom string representation:  H: 89283 m: 23
```

## Duration(from[, to])

Main module is both constructor and factory method, and can be used either way.
`from` and `to` are expected to be JavaScript Date objects, while `to` is optional.
If `to` is not provided it defaults to current time.

## Duration.prototype properties

### years

Returns full years of the duration

### months

Returns full months of the duration

### days

Returns full days of the duration

### hours

Returns full hours of the duration

### seconds

Returns full seconds of the duration

### minutes

Returns full minutes of the duration

### milliseconds

Returns milliseconds of the duration

### year

Same as `years`. Returns full years of the duration

### month

Returns trailing months of the duration

### day

Returns trailing days of the duration

### hour

Returns trailing hours of the duration

### minute

Returns trailing minutes of the duration

### second

Returns trailing seconds of the duration

### millisecond

Returns trailing seconds of the duration

## valueOf()

Same as `milliseconds`. Returns milliseconds of the duration

## toString([mode|format])

Return readable representation of the duration.  
When invoked without arguments, returns as:

	10y 2m 6d 03:23:08.456

When invoked with mode `1`, returns alternative representation:

	10y 2m 6d 3h 23m 8s 456ms

When invoked with string, formats the duration according to given string format, where:

* `%y` - `duration.year`
* `%m` - `duration.month`
* `%d` - `duration.day`
* `%H` - `duration.hour`
* `%M` - `duration.minute`
* `%S` - `duration.second`
* `%L` - `duration.millisecond`
* `%ms` - `duration.months`
* `%ds` - `duration.days`
* `%Hs` - `duration.hours`
* `%Ms` - `duration.minutes`
* `%Ss` - `duration.seconds`
* `%Ls` - `duration.milliseconds`
