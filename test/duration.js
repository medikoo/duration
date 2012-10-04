'use strict';

var copy = require('es5-ext/lib/Date/prototype/copy');

module.exports = function (t) {
	var d1 = new Date(Date.UTC(2001, 1, 2, 1, 1, 1, 1)), d, d2;

	return {
		"Second date is optional": function (a) {
			var d3, m;
			d2 = new Date();
			d = t(d1);
			d3 = new Date();
			a.ok(((m = d.milliseconds) >= t(d1, d2).milliseconds) &&
				(m <= t(d1, d3).milliseconds));
		},
		"Milliseconds": function (a) {
			// 11 milliseconds
			d2 = copy.call(d1);
			d2.setMilliseconds(d2.getMilliseconds() + 11);
			d = t(d1, d2);

			a(d.milliseconds, 11, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, 0, "Seconds");
			a(d.minutes, 0, "Minutes");
			a(d.hours, 0, "Hours");
			a(d.days, 0, "Days");
			a(d.months, 0, "Months");
			a(d.years, 0, "Years");

			a(d.millisecond, 11, "Trailing milliseconds");
			a(d.second, 0, "Trailing seconds");
			a(d.minute, 0, "Trailing minutes");
			a(d.hour, 0, "Trailing hours");
			a(d.day, 0, "Trailing days");
			a(d.month, 0, "Trailing months");
			a(d.year, 0, "Trailing years");

			a(d.toString(), '.011', 'String presentation');
			a(d.toString(1), '11ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 011.11.00.0.00.0.00.0.00.0.00.0.0 ', 'String presentation (custom)');
		},
		"Seconds": function (a) {
			// 7 seconds 123 milliseconds
			d2 = copy.call(d1);
			d2.setMilliseconds(d2.getMilliseconds() + 123);
			d2.setSeconds(d2.getSeconds() + 7);
			d = t(d1, d2);

			a(d.milliseconds, 7 * 1000 + 123, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, 7, "Seconds");
			a(d.minutes, 0, "Minutes");
			a(d.hours, 0, "Hours");
			a(d.days, 0, "Days");
			a(d.months, 0, "Months");
			a(d.years, 0, "Years");

			a(d.millisecond, 123, "Trailing milliseconds");
			a(d.second, 7, "Trailing seconds");
			a(d.minute, 0, "Trailing minutes");
			a(d.hour, 0, "Trailing hours");
			a(d.day, 0, "Trailing days");
			a(d.month, 0, "Trailing months");
			a(d.year, 0, "Trailing years");

			a(d.toString(), '7.123', 'String presentation');
			a(d.toString(1), '7s 123ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 123.' + (7 * 1000 + 123) + '.07.7.00.0.00.0.00.0.00.0.0 ',
				'String presentation (custom)');
		},
		"Minutes": function (a) {
			// 7 minutes 12 seconds 123 milliseconds
			d2 = copy.call(d1);
			d2.setMilliseconds(d2.getMilliseconds() + 123);
			d2.setSeconds(d2.getSeconds() + 12);
			d2.setMinutes(d2.getMinutes() + 7);
			d = t(d1, d2);

			a(d.milliseconds, 7 * 60 * 1000 + 12 * 1000 + 123, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, 7 * 60 + 12, "Seconds");
			a(d.minutes, 7, "Minutes");
			a(d.hours, 0, "Hours");
			a(d.days, 0, "Days");
			a(d.months, 0, "Months");
			a(d.years, 0, "Years");

			a(d.millisecond, 123, "Trailing milliseconds");
			a(d.second, 12, "Trailing seconds");
			a(d.minute, 7, "Trailing minutes");
			a(d.hour, 0, "Trailing hours");
			a(d.day, 0, "Trailing days");
			a(d.month, 0, "Trailing months");
			a(d.year, 0, "Trailing years");

			a(d.toString(), '07:12.123', 'String presentation');
			a(d.toString(1), '7m 12s 123ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 123.' + (7 * 60 * 1000 + 12 * 1000 + 123) + '.12.' + (7 * 60 + 12) +
				'.07.7.00.0.00.0.00.0.0 ', 'String presentation (custom)');
		},
		"Hours": function (a) {
			// 4 hours 7 minutes 12 seconds 123 milliseconds
			d2 = copy.call(d1);
			d2.setMilliseconds(d2.getMilliseconds() + 123);
			d2.setSeconds(d2.getSeconds() + 12);
			d2.setMinutes(d2.getMinutes() + 7);
			d2.setHours(d2.getHours() + 4);
			d = t(d1, d2);

			a(d.milliseconds,
				4 * 60 * 60 * 1000 + 7 * 60 * 1000 + 12 * 1000 + 123, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, 4 * 60 * 60 + 7 * 60 + 12, "Seconds");
			a(d.minutes, 4 * 60 + 7, "Minutes");
			a(d.hours, 4, "Hours");
			a(d.days, 0, "Days");
			a(d.months, 0, "Months");
			a(d.years, 0, "Years");

			a(d.millisecond, 123, "Trailing milliseconds");
			a(d.second, 12, "Trailing seconds");
			a(d.minute, 7, "Trailing minutes");
			a(d.hour, 4, "Trailing hours");
			a(d.day, 0, "Trailing days");
			a(d.month, 0, "Trailing months");
			a(d.year, 0, "Trailing years");

			a(d.toString(), '04:07:12.123', 'String presentation');
			a(d.toString(1), '4h 7m 12s 123ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 123.' + (4 * 60 * 60 * 1000 + 7 * 60 * 1000 + 12 * 1000 + 123) +
				'.12.' + (4 * 60 * 60 + 7 * 60 + 12) + '.07.' + (4 * 60 + 7) +
				'.04.4.00.0.00.0.0 ', 'String presentation (custom)');
		},
		"Days": function (a) {
			// 2 days 14 hours 7 minutes 12 seconds 123 milliseconds
			d2 = copy.call(d1);
			d2.setMilliseconds(d2.getMilliseconds() + 123);
			d2.setSeconds(d2.getSeconds() + 12);
			d2.setMinutes(d2.getMinutes() + 7);
			d2.setHours(d2.getHours() + 14);
			d2.setDate(d2.getDate() + 2);
			d = t(d1, d2);

			a(d.milliseconds, 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 +
				7 * 60 * 1000 + 12 * 1000 + 123, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, 2 * 24 * 60 * 60 + 14 * 60 * 60 + 7 * 60 + 12,
				"Seconds");
			a(d.minutes, 2 * 24 * 60 + 14 * 60 + 7, "Minutes");
			a(d.hours, 2 * 24 + 14, "Hours");
			a(d.days, 2, "Days");
			a(d.months, 0, "Months");
			a(d.years, 0, "Years");

			a(d.millisecond, 123, "Trailing milliseconds");
			a(d.second, 12, "Trailing seconds");
			a(d.minute, 7, "Trailing minutes");
			a(d.hour, 14, "Trailing hours");
			a(d.day, 2, "Trailing days");
			a(d.month, 0, "Trailing months");
			a(d.year, 0, "Trailing years");

			a(d.toString(), '2d 14:07:12.123', 'String presentation');
			a(d.toString(1), '2d 14h 7m 12s 123ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 123.' + (2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 +
					7 * 60 * 1000 + 12 * 1000 + 123) + '.12.' +
				(2 * 24 * 60 * 60 + 14 * 60 * 60 + 7 * 60 + 12) + '.07.' +
				(2 * 24 * 60 + 14 * 60 + 7) + '.14.' + (2 * 24 + 14) +
				'.02.2.00.0.0 ', 'String presentation (custom)');
		},
		"Large duration": function (a) {
			// Few years, few months
			var days = 365 * 2 + 28 + 31;
			d2 = new Date(Date.UTC(2003, 3, 2, 1, 1, 1, 1));
			d = t(d1, d2);

			a(d.milliseconds, days * 24 * 60 * 60 * 1000, "Milliseconds");
			a(d.valueOf(), d.milliseconds, "Value");
			a(d.seconds, days * 24 * 60 * 60, "Seconds");
			a(d.minutes, days * 24 * 60, "Minutes");
			a(d.hours, days * 24, "Hours");
			a(d.days, days, "Days");
			a(d.months, 26, "Months");
			a(d.years, 2, "Years");

			a(d.millisecond, 0, "Trailing milliseconds");
			a(d.second, 0, "Trailing seconds");
			a(d.minute, 0, "Trailing minutes");
			a(d.hour, 0, "Trailing hours");
			a(d.day, 0, "Trailing days");
			a(d.month, 2, "Trailing months");
			a(d.year, 2, "Trailing years");

			a(d.toString(), '2y 2m 0d 00:00:00.000', 'String presentation');
			a(d.toString(1), '2y 2m 0d 0h 0m 0s 0ms', 'String presentation #2');
			a(d.toString(' %L.%Ls.%S.%Ss.%M.%Ms.%H.%Hs.%d.%ds.%m.%ms.%y '),
				' 000.' + (days * 24 * 60 * 60 * 1000) + '.00.' +
				(days * 24 * 60 * 60) + '.00.' + (days * 24 * 60) + '.00.' +
				(days * 24) + '.00.' + days + '.02.' + 26 + '.2 ',
				'String presentation (custom)');
		}
	};
};
