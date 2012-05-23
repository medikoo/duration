'use strict';

var d           = require('es5-ext/lib/Object/descriptor')
  , merge       = require('es5-ext/lib/Object/merge')
  , bindMethods = require('es5-ext/lib/Object/bind-methods')
  , getPad      = require('es5-ext/lib/Number/get-pad')
  , isDate      = require('es5-ext/lib/Date/is-date')
  , daysInMonth = require('es5-ext/lib/Date/prototype/days-in-month')
  , copy        = require('es5-ext/lib/Date/prototype/copy')
  , dfloor      = require('es5-ext/lib/Date/prototype/floor-day')
  , mfloor      = require('es5-ext/lib/Date/prototype/floor-month')
  , yfloor      = require('es5-ext/lib/Date/prototype/floor-year')

  , methods, timeMethods, pad2, pad3, format, valueOf, getYear;

pad2 = getPad(2);
pad3 = getPad(3);

format = require('es5-ext/lib/String/get-format')({
	y: function () {
		return String(this.year);
	},
	m: function () {
		return pad2.call(this.month);
	},
	d: function () {
		return pad2.call(this.day);
	},
	H: function () {
		return pad2.call(this.hour);
	},
	M: function () {
		return pad2.call(this.minute);
	},
	S: function () {
		return pad2.call(this.second);
	},
	L: function () {
		return pad3.call(this.millisecond);
	},

	ms: function () {
		return String(this.months);
	},
	ds: function () {
		return String(this.days);
	},
	Hs: function () {
		return String(this.hours);
	},
	Ms: function () {
		return String(this.minutes);
	},
	Ss: function () {
		return String(this.seconds);
	},
	Ls: function () {
		return String(this.milliseconds);
	}
});

var Duration = function (from, to) {
	this.from = from;
	this.to = to;
};

Duration.prototype = Object.create(Object.prototype, {
	valueOf: d(valueOf = function () {
		return this.to - this.from;
	}),

	millisecond: d.getSet(function () {
		return this.milliseconds % 1000;
	}),
	second: d.getSet(function () {
		return this.seconds % 60;
	}),
	minute: d.getSet(function () {
		return this.minutes % 60;
	}),
	hour: d.getSet(function () {
		return this.hours % 24;
	}),
	day: d.getSet(function () {
		var x = copy.call(this.to);
		x.setMonth(x.getMonth() - 1);
		x = daysInMonth.call(x);
		return (x - this.from.getDate() + this.to.getDate()) % x
			- ((this.from - dfloor.call(copy.call(this.from)))
				> (this.to - dfloor.call(copy.call(this.to))));
	}),
	month: d.getSet(function () {
		return (12 - this.from.getMonth() + this.to.getMonth()) % 12
			- ((this.from - mfloor.call(copy.call(this.from)))
				> (this.to - mfloor.call(copy.call(this.to))));
	}),
	year: d.getSet(getYear = function () {
		return this.to.getFullYear() - this.from.getFullYear()
			- ((this.from - yfloor.call(copy.call(this.from)))
				> (this.to - yfloor.call(copy.call(this.to))));
	}),

	milliseconds: d.getSet(valueOf, null),
	seconds: d.getSet(function () {
		return Math.floor(this.valueOf() / 1000);
	}),
	minutes: d.getSet(function () {
		return Math.floor(this.valueOf() / (1000 * 60));
	}),
	hours: d.getSet(function () {
		return Math.floor(this.valueOf() / (1000 * 60 * 60));
	}),
	days: d.getSet(function () {
		return Math.floor(this.valueOf() / (1000 * 60 * 60 * 24));
	}),
	months: d.getSet(function () {
		return (this.to.getFullYear() - this.from.getFullYear()) * 12
			+ this.to.getMonth() - this.from.getMonth()
			- ((this.from - mfloor.call(copy.call(this.from)))
				> (this.to - mfloor.call(copy.call(this.to))));
	}),
	years: d.getSet(getYear),

	toString: d(function (pattern) {
		var s, r;
		if (!pattern) {
			s = "." +  pad3.call(this.millisecond);
			if (this.seconds) {
				if (this.minutes) {
					s = pad2.call(this.minute) + ":" +
						pad2.call(this.second) + s;
					if (this.hours) {
						s = pad2.call(this.hour) + ":" + s;
						if (this.days) {
							s = this.day + "d " + s;
							if (this.months) {
								s = this.month + "m " + s;
								if (this.years) {
									s = this.year + "y " + s;
								}
							}
						}
					}
				} else {
					s = this.second + s;
				}
			}
		} else if (pattern === 1) {
			s = this.millisecond + "ms";
			if (this.seconds) {
				s = this.second + "s " + s;
				if (this.minutes) {
					s = this.minute + "m " + s;
					if (this.hours) {
						s = this.hour + "h " + s;
						if (this.days) {
							s = this.day + "d " + s;
							if (this.months) {
								s = this.month + "m " + s;
								if (this.years) {
									s = this.year + "y " + s;
								}
							}
						}
					}
				}
			}
		} else {
			return format.call(pattern, this);
		}
		return s;
	})
});

module.exports = function (from, to) {
	var duration;
	if (!isDate(from)) {
		throw new TypeError("this is not a Date object");
	}
	if (to != null) {
		if (!isDate(to)) {
			throw new TypeError("to is not a Date object");
		}
	} else {
		to = new Date();
	}
	return new Duration(from, to)
};
