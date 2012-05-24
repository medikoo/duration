'use strict';

var d           = require('es5-ext/lib/Object/descriptor')
  , pad         = require('es5-ext/lib/Number/prototype/pad')
  , isDate      = require('es5-ext/lib/Date/is-date')
  , daysInMonth = require('es5-ext/lib/Date/prototype/days-in-month')
  , copy        = require('es5-ext/lib/Date/prototype/copy')
  , dfloor      = require('es5-ext/lib/Date/prototype/floor-day')
  , mfloor      = require('es5-ext/lib/Date/prototype/floor-month')
  , yfloor      = require('es5-ext/lib/Date/prototype/floor-year')
  , format      = require('es5-ext/lib/String/prototype/format')

  , map, valueOf, getYear, Duration;

map = {
	y: function () {
		return String(this.year);
	},
	m: function () {
		return pad.call(this.month, 2);
	},
	d: function () {
		return pad.call(this.day, 2);
	},
	H: function () {
		return pad.call(this.hour, 2);
	},
	M: function () {
		return pad.call(this.minute, 2);
	},
	S: function () {
		return pad.call(this.second, 2);
	},
	L: function () {
		return pad.call(this.millisecond, 3);
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
};

Duration = module.exports = function (from, to) {
	// Make it both constructor and factory
	if (!(this instanceof Duration)) {
		return new Duration(from, to);
	}

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
	this.from = from;
	this.to = to;
};

Duration.prototype = Object.create(Object.prototype, {
	valueOf: d(valueOf = function () {
		return this.to - this.from;
	}),

	millisecond: d.gs(function () {
		return this.milliseconds % 1000;
	}),
	second: d.gs(function () {
		return this.seconds % 60;
	}),
	minute: d.gs(function () {
		return this.minutes % 60;
	}),
	hour: d.gs(function () {
		return this.hours % 24;
	}),
	day: d.gs(function () {
		var x = copy.call(this.to);
		x.setMonth(x.getMonth() - 1);
		x = daysInMonth.call(x);
		return (x - this.from.getDate() + this.to.getDate()) % x
			- ((this.from - dfloor.call(copy.call(this.from)))
				> (this.to - dfloor.call(copy.call(this.to))));
	}),
	month: d.gs(function () {
		return (12 - this.from.getMonth() + this.to.getMonth()) % 12
			- ((this.from - mfloor.call(copy.call(this.from)))
				> (this.to - mfloor.call(copy.call(this.to))));
	}),
	year: d.gs(getYear = function () {
		return this.to.getFullYear() - this.from.getFullYear()
			- ((this.from - yfloor.call(copy.call(this.from)))
				> (this.to - yfloor.call(copy.call(this.to))));
	}),

	milliseconds: d.gs(valueOf, null),
	seconds: d.gs(function () {
		return Math.floor(this.valueOf() / 1000);
	}),
	minutes: d.gs(function () {
		return Math.floor(this.valueOf() / (1000 * 60));
	}),
	hours: d.gs(function () {
		return Math.floor(this.valueOf() / (1000 * 60 * 60));
	}),
	days: d.gs(function () {
		return Math.floor(this.valueOf() / (1000 * 60 * 60 * 24));
	}),
	months: d.gs(function () {
		return (this.to.getFullYear() - this.from.getFullYear()) * 12
			+ this.to.getMonth() - this.from.getMonth()
			- ((this.from - mfloor.call(copy.call(this.from)))
				> (this.to - mfloor.call(copy.call(this.to))));
	}),
	years: d.gs(getYear),

	toString: d(function (pattern) {
		var s, r;
		if (!pattern) {
			s = "." +  pad.call(this.millisecond, 3);
			if (this.seconds) {
				if (this.minutes) {
					s = pad.call(this.minute, 2) + ":" +
						pad.call(this.second, 2) + s;
					if (this.hours) {
						s = pad.call(this.hour, 2) + ":" + s;
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
			return format.call(pattern, map, this);
		}
		return s;
	})
});
