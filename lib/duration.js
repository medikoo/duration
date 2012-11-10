'use strict';

var d           = require('es5-ext/lib/Object/descriptor')
  , pad         = require('es5-ext/lib/Number/prototype/pad')
  , date        = require('es5-ext/lib/Date/valid-date')
  , daysInMonth = require('es5-ext/lib/Date/prototype/days-in-month')
  , copy        = require('es5-ext/lib/Date/prototype/copy')
  , dfloor      = require('es5-ext/lib/Date/prototype/floor-day')
  , mfloor      = require('es5-ext/lib/Date/prototype/floor-month')
  , yfloor      = require('es5-ext/lib/Date/prototype/floor-year')
  , toInt       = require('es5-ext/lib/Number/to-int')
  , format      = require('es5-ext/lib/String/prototype/format')

  , abs = Math.abs

  , map, valueOf, getYear, Duration, getCalcData;

map = {
	y: function () { return String(abs(this.year)); },
	m: function () { return pad.call(abs(this.month), 2); },
	d: function () { return pad.call(abs(this.day), 2); },
	H: function () { return pad.call(abs(this.hour), 2); },
	M: function () { return pad.call(abs(this.minute), 2); },
	S: function () { return pad.call(abs(this.second), 2); },
	L: function () { return pad.call(abs(this.millisecond), 3); },

	ms: function () { return String(abs(this.months)); },
	ds: function () { return String(abs(this.days)); },
	Hs: function () { return String(abs(this.hours)); },
	Ms: function () { return String(abs(this.minutes)); },
	Ss: function () { return String(abs(this.seconds)); },
	Ls: function () { return String(abs(this.milliseconds)); },

	sign: function () { return (this.to < this.from) ? '-' : ''; }
};

getCalcData = function (duration) {
	return (duration.to < duration.from) ?
			{ to: duration.from, from: duration.to, sign: -1 } :
			{ to: duration.to, from: duration.from, sign: 1 };
};

Duration = module.exports = function (from, to) {
	// Make it both constructor and factory
	if (!(this instanceof Duration)) return new Duration(from, to);

	this.from = date(from);
	this.to = (to == null) ? new Date() : date(to);
};

Duration.prototype = Object.create(Object.prototype, {
	valueOf: d(valueOf = function () { return this.to - this.from; }),
	millisecond: d.gs(function () { return this.milliseconds % 1000; }),
	second: d.gs(function () { return this.seconds % 60; }),
	minute: d.gs(function () { return this.minutes % 60; }),
	hour: d.gs(function () { return this.hours % 24; }),
	day: d.gs(function () {
		var data = getCalcData(this)
		  , x = copy.call(data.to);
		x.setMonth(x.getMonth() - 1);
		x = daysInMonth.call(x);
		return data.sign * ((x - data.from.getDate() + data.to.getDate()) % x -
			((data.from - dfloor.call(copy.call(data.from))) >
				(data.to - dfloor.call(copy.call(data.to)))));
	}),
	month: d.gs(function () {
		var data = getCalcData(this);
		return data.sign * ((12 - data.from.getMonth() + data.to.getMonth()) % 12 -
			((data.from - mfloor.call(copy.call(data.from))) >
				(data.to - mfloor.call(copy.call(data.to)))));
	}),
	year: d.gs(getYear = function () {
		var data = getCalcData(this);
		return data.sign * (data.to.getFullYear() - data.from.getFullYear() -
			((data.from - yfloor.call(copy.call(data.from))) >
				(data.to - yfloor.call(copy.call(data.to)))));
	}),

	milliseconds: d.gs(valueOf, null),
	seconds: d.gs(function () { return toInt(this.valueOf() / 1000); }),
	minutes: d.gs(function () { return toInt(this.valueOf() / (1000 * 60)); }),
	hours: d.gs(function () { return toInt(this.valueOf() / (1000 * 60 * 60)); }),
	days: d.gs(function () {
		return toInt(this.valueOf() / (1000 * 60 * 60 * 24));
	}),
	months: d.gs(function () {
		var data = getCalcData(this);
		return data.sign * ((data.to.getFullYear() - data.from.getFullYear()) * 12 +
			data.to.getMonth() - data.from.getMonth() -
			((data.from - mfloor.call(copy.call(data.from))) >
				(data.to - mfloor.call(copy.call(data.to)))));
	}),
	years: d.gs(getYear),

	toString: d(function (pattern) {
		var s;
		if (!pattern) {
			s = "." +  pad.call(abs(this.millisecond), 3);
			if (this.seconds) {
				if (this.minutes) {
					s = pad.call(abs(this.minute), 2) + ":" +
						pad.call(abs(this.second), 2) + s;
					if (this.hours) {
						s = pad.call(abs(this.hour), 2) + ":" + s;
						if (this.days) {
							s = abs(this.day) + "d " + s;
							if (this.months) {
								s = abs(this.month) + "m " + s;
								if (this.years) {
									s = abs(this.year) + "y " + s;
								}
							}
						}
					}
				} else {
					s = abs(this.second) + s;
				}
			}
			if (this.to < this.from) (s = '-' + s);
		} else if (pattern === 1) {
			s = abs(this.millisecond) + "ms";
			if (this.seconds) {
				s = abs(this.second) + "s " + s;
				if (this.minutes) {
					s = abs(this.minute) + "m " + s;
					if (this.hours) {
						s = abs(this.hour) + "h " + s;
						if (this.days) {
							s = abs(this.day) + "d " + s;
							if (this.months) {
								s = abs(this.month) + "m " + s;
								if (this.years) {
									s = abs(this.year) + "y " + s;
								}
							}
						}
					}
				}
			}
			if (this.to < this.from) (s = '-' + s);
		} else {
			return format.call(pattern, map, this);
		}
		return s;
	})
});
