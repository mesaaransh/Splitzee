import "./chunk-4MBMRILA.js";

// node_modules/dateformat/lib/dateformat.js
var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
var timezone = /\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;
var timezoneClip = /[^-+\dA-Z]/g;
function dateFormat(date, mask, utc, gmt) {
  if (arguments.length === 1 && typeof date === "string" && !/\d/.test(date)) {
    mask = date;
    date = void 0;
  }
  date = date || date === 0 ? date : /* @__PURE__ */ new Date();
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (isNaN(date)) {
    throw TypeError("Invalid date");
  }
  mask = String(masks[mask] || mask || masks["default"]);
  var maskSlice = mask.slice(0, 4);
  if (maskSlice === "UTC:" || maskSlice === "GMT:") {
    mask = mask.slice(4);
    utc = true;
    if (maskSlice === "GMT:") {
      gmt = true;
    }
  }
  var _ = function _2() {
    return utc ? "getUTC" : "get";
  };
  var _d = function d() {
    return date[_() + "Date"]();
  };
  var D = function D2() {
    return date[_() + "Day"]();
  };
  var _m = function m() {
    return date[_() + "Month"]();
  };
  var y = function y2() {
    return date[_() + "FullYear"]();
  };
  var _H = function H() {
    return date[_() + "Hours"]();
  };
  var _M = function M() {
    return date[_() + "Minutes"]();
  };
  var _s = function s() {
    return date[_() + "Seconds"]();
  };
  var _L = function L() {
    return date[_() + "Milliseconds"]();
  };
  var _o = function o() {
    return utc ? 0 : date.getTimezoneOffset();
  };
  var _W = function W() {
    return getWeek(date);
  };
  var _N = function N() {
    return getDayOfWeek(date);
  };
  var flags = { d: function d() {
    return _d();
  }, dd: function dd() {
    return pad(_d());
  }, ddd: function ddd() {
    return i18n.dayNames[D()];
  }, DDD: function DDD() {
    return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: i18n.dayNames[D()], short: true });
  }, dddd: function dddd() {
    return i18n.dayNames[D() + 7];
  }, DDDD: function DDDD() {
    return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: i18n.dayNames[D() + 7] });
  }, m: function m() {
    return _m() + 1;
  }, mm: function mm() {
    return pad(_m() + 1);
  }, mmm: function mmm() {
    return i18n.monthNames[_m()];
  }, mmmm: function mmmm() {
    return i18n.monthNames[_m() + 12];
  }, yy: function yy() {
    return String(y()).slice(2);
  }, yyyy: function yyyy() {
    return pad(y(), 4);
  }, h: function h() {
    return _H() % 12 || 12;
  }, hh: function hh() {
    return pad(_H() % 12 || 12);
  }, H: function H() {
    return _H();
  }, HH: function HH() {
    return pad(_H());
  }, M: function M() {
    return _M();
  }, MM: function MM() {
    return pad(_M());
  }, s: function s() {
    return _s();
  }, ss: function ss() {
    return pad(_s());
  }, l: function l() {
    return pad(_L(), 3);
  }, L: function L() {
    return pad(Math.floor(_L() / 10));
  }, t: function t() {
    return _H() < 12 ? i18n.timeNames[0] : i18n.timeNames[1];
  }, tt: function tt() {
    return _H() < 12 ? i18n.timeNames[2] : i18n.timeNames[3];
  }, T: function T() {
    return _H() < 12 ? i18n.timeNames[4] : i18n.timeNames[5];
  }, TT: function TT() {
    return _H() < 12 ? i18n.timeNames[6] : i18n.timeNames[7];
  }, Z: function Z() {
    return gmt ? "GMT" : utc ? "UTC" : formatTimezone(date);
  }, o: function o() {
    return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
  }, p: function p() {
    return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
  }, S: function S() {
    return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
  }, W: function W() {
    return _W();
  }, WW: function WW() {
    return pad(_W());
  }, N: function N() {
    return _N();
  } };
  return mask.replace(token, function(match) {
    if (match in flags) {
      return flags[match]();
    }
    return match.slice(1, match.length - 1);
  });
}
var masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", paddedShortDate: "mm/dd/yyyy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" };
var i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] };
var pad = function pad2(val) {
  var len = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
  return String(val).padStart(len, "0");
};
var getDayName = function getDayName2(_ref) {
  var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
  var today = /* @__PURE__ */ new Date();
  var yesterday = /* @__PURE__ */ new Date();
  yesterday.setDate(yesterday[_ + "Date"]() - 1);
  var tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
  var today_d = function today_d2() {
    return today[_ + "Date"]();
  };
  var today_m = function today_m2() {
    return today[_ + "Month"]();
  };
  var today_y = function today_y2() {
    return today[_ + "FullYear"]();
  };
  var yesterday_d = function yesterday_d2() {
    return yesterday[_ + "Date"]();
  };
  var yesterday_m = function yesterday_m2() {
    return yesterday[_ + "Month"]();
  };
  var yesterday_y = function yesterday_y2() {
    return yesterday[_ + "FullYear"]();
  };
  var tomorrow_d = function tomorrow_d2() {
    return tomorrow[_ + "Date"]();
  };
  var tomorrow_m = function tomorrow_m2() {
    return tomorrow[_ + "Month"]();
  };
  var tomorrow_y = function tomorrow_y2() {
    return tomorrow[_ + "FullYear"]();
  };
  if (today_y() === y && today_m() === m && today_d() === d) {
    return _short ? "Tdy" : "Today";
  } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
    return _short ? "Ysd" : "Yesterday";
  } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
    return _short ? "Tmw" : "Tomorrow";
  }
  return dayName;
};
var getWeek = function getWeek2(date) {
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);
  var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
  return 1 + Math.floor(weekDiff);
};
var getDayOfWeek = function getDayOfWeek2(date) {
  var dow = date.getDay();
  if (dow === 0) {
    dow = 7;
  }
  return dow;
};
var formatTimezone = function formatTimezone2(date) {
  return (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
};
export {
  dateFormat as default,
  formatTimezone,
  i18n,
  masks
};
//# sourceMappingURL=dateformat.js.map
