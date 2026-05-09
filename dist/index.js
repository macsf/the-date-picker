var yn = Object.defineProperty;
var pn = (n, e, t) => e in n ? yn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var h = (n, e, t) => pn(n, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as W, jsx as T, Fragment as Tn } from "react/jsx-runtime";
import { useState as j, useEffect as Gt, useMemo as zt, useCallback as v, useRef as ht } from "react";
import { createPortal as wn } from "react-dom";
function w(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function G(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function le(n, e) {
  const t = w(n);
  return isNaN(e) ? G(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function te(n, e) {
  const t = w(n);
  if (isNaN(e)) return G(n, NaN);
  if (!e)
    return t;
  const a = t.getDate(), r = G(n, t.getTime());
  r.setMonth(t.getMonth() + e + 1, 0);
  const s = r.getDate();
  return a >= s ? r : (t.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), t);
}
const Vt = 6048e5, bn = 864e5;
let Dn = {};
function be() {
  return Dn;
}
function Q(n, e) {
  var o, c, l, u;
  const t = be(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? 7 : 0) + s - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function Ae(n) {
  return Q(n, { weekStartsOn: 1 });
}
function Kt(n) {
  const e = w(n), t = e.getFullYear(), a = G(n, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = Ae(a), s = G(n, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Ae(s);
  return e.getTime() >= r.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function L(n) {
  const e = w(n);
  return e.setHours(0, 0, 0, 0), e;
}
function gt(n) {
  const e = w(n), t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), +n - +t;
}
function Mn(n, e) {
  const t = L(n), a = L(e), r = +t - gt(t), s = +a - gt(a);
  return Math.round((r - s) / bn);
}
function En(n) {
  const e = Kt(n), t = G(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Ae(t);
}
function pe(n, e) {
  const t = e * 7;
  return le(n, t);
}
function U(n, e) {
  const t = L(n), a = L(e);
  return +t == +a;
}
function Pn(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Nn(n) {
  if (!Pn(n) && typeof n != "number")
    return !1;
  const e = w(n);
  return !isNaN(Number(e));
}
function Te(n) {
  const e = w(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function On(n, e) {
  const t = w(n.start), a = w(n.end);
  let r = +t > +a;
  const s = r ? +t : +a, i = r ? a : t;
  i.setHours(0, 0, 0, 0);
  let o = 1;
  const c = [];
  for (; +i <= s; )
    c.push(w(i)), i.setDate(i.getDate() + o), i.setHours(0, 0, 0, 0);
  return r ? c.reverse() : c;
}
function we(n) {
  const e = w(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Sn(n) {
  const e = w(n), t = G(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function ot(n, e) {
  var o, c, l, u;
  const t = be(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? -7 : 0) + 6 - (s - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
const An = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, xn = (n, e, t) => {
  let a;
  const r = An[n];
  return typeof r == "string" ? a = r : e === 1 ? a = r.one : a = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + a : a + " ago" : a;
};
function Ge(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const kn = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Hn = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Rn = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, vn = {
  date: Ge({
    formats: kn,
    defaultWidth: "full"
  }),
  time: Ge({
    formats: Hn,
    defaultWidth: "full"
  }),
  dateTime: Ge({
    formats: Rn,
    defaultWidth: "full"
  })
}, Fn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Cn = (n, e, t, a) => Fn[n];
function he(n) {
  return (e, t) => {
    const a = t != null && t.context ? String(t.context) : "standalone";
    let r;
    if (a === "formatting" && n.formattingValues) {
      const i = n.defaultFormattingWidth || n.defaultWidth, o = t != null && t.width ? String(t.width) : i;
      r = n.formattingValues[o] || n.formattingValues[i];
    } else {
      const i = n.defaultWidth, o = t != null && t.width ? String(t.width) : n.defaultWidth;
      r = n.values[o] || n.values[i];
    }
    const s = n.argumentCallback ? n.argumentCallback(e) : e;
    return r[s];
  };
}
const Yn = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Wn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, $n = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, _n = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, In = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Bn = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Un = (n, e) => {
  const t = Number(n), a = t % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, Ln = {
  ordinalNumber: Un,
  era: he({
    values: Yn,
    defaultWidth: "wide"
  }),
  quarter: he({
    values: Wn,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: he({
    values: $n,
    defaultWidth: "wide"
  }),
  day: he({
    values: _n,
    defaultWidth: "wide"
  }),
  dayPeriod: he({
    values: In,
    defaultWidth: "wide",
    formattingValues: Bn,
    defaultFormattingWidth: "wide"
  })
};
function ge(n) {
  return (e, t = {}) => {
    const a = t.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], s = e.match(r);
    if (!s)
      return null;
    const i = s[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? Gn(o, (f) => f.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      jn(o, (f) => f.test(i))
    );
    let l;
    l = n.valueCallback ? n.valueCallback(c) : c, l = t.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      t.valueCallback(l)
    ) : l;
    const u = e.slice(i.length);
    return { value: l, rest: u };
  };
}
function jn(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function Gn(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function zn(n) {
  return (e, t = {}) => {
    const a = e.match(n.matchPattern);
    if (!a) return null;
    const r = a[0], s = e.match(n.parsePattern);
    if (!s) return null;
    let i = n.valueCallback ? n.valueCallback(s[0]) : s[0];
    i = t.valueCallback ? t.valueCallback(i) : i;
    const o = e.slice(r.length);
    return { value: i, rest: o };
  };
}
const Vn = /^(\d+)(th|st|nd|rd)?/i, Kn = /\d+/i, qn = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Qn = {
  any: [/^b/i, /^(a|c)/i]
}, Xn = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Jn = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Zn = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ea = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, ta = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, na = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, aa = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ra = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, sa = {
  ordinalNumber: zn({
    matchPattern: Vn,
    parsePattern: Kn,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: ge({
    matchPatterns: qn,
    defaultMatchWidth: "wide",
    parsePatterns: Qn,
    defaultParseWidth: "any"
  }),
  quarter: ge({
    matchPatterns: Xn,
    defaultMatchWidth: "wide",
    parsePatterns: Jn,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: ge({
    matchPatterns: Zn,
    defaultMatchWidth: "wide",
    parsePatterns: ea,
    defaultParseWidth: "any"
  }),
  day: ge({
    matchPatterns: ta,
    defaultMatchWidth: "wide",
    parsePatterns: na,
    defaultParseWidth: "any"
  }),
  dayPeriod: ge({
    matchPatterns: aa,
    defaultMatchWidth: "any",
    parsePatterns: ra,
    defaultParseWidth: "any"
  })
}, ia = {
  code: "en-US",
  formatDistance: xn,
  formatLong: vn,
  formatRelative: Cn,
  localize: Ln,
  match: sa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function oa(n) {
  const e = w(n);
  return Mn(e, Sn(e)) + 1;
}
function qt(n) {
  const e = w(n), t = +Ae(e) - +En(e);
  return Math.round(t / Vt) + 1;
}
function Qt(n, e) {
  var u, f, D, M;
  const t = w(n), a = t.getFullYear(), r = be(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((f = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((M = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : M.firstWeekContainsDate) ?? 1, i = G(n, 0);
  i.setFullYear(a + 1, 0, s), i.setHours(0, 0, 0, 0);
  const o = Q(i, e), c = G(n, 0);
  c.setFullYear(a, 0, s), c.setHours(0, 0, 0, 0);
  const l = Q(c, e);
  return t.getTime() >= o.getTime() ? a + 1 : t.getTime() >= l.getTime() ? a : a - 1;
}
function ca(n, e) {
  var o, c, l, u;
  const t = be(), a = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, r = Qt(n, e), s = G(n, 0);
  return s.setFullYear(r, 0, a), s.setHours(0, 0, 0, 0), Q(s, e);
}
function Xt(n, e) {
  const t = w(n), a = +Q(t, e) - +ca(t, e);
  return Math.round(a / Vt) + 1;
}
function b(n, e) {
  const t = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(e, "0");
  return t + a;
}
const K = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), a = t > 0 ? t : 1 - t;
    return b(e === "yy" ? a % 100 : a, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : b(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return b(n.getDate(), e.length);
  },
  // AM or PM
  a(n, e) {
    const t = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(n, e) {
    return b(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return b(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return b(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return b(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, a = n.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, t - 3)
    );
    return b(r, e.length);
  }
}, re = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yt = {
  // Era
  G: function(n, e, t) {
    const a = n.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return t.era(a, { width: "abbreviated" });
      case "GGGGG":
        return t.era(a, { width: "narrow" });
      case "GGGG":
      default:
        return t.era(a, { width: "wide" });
    }
  },
  // Year
  y: function(n, e, t) {
    if (e === "yo") {
      const a = n.getFullYear(), r = a > 0 ? a : 1 - a;
      return t.ordinalNumber(r, { unit: "year" });
    }
    return K.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, a) {
    const r = Qt(n, a), s = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const i = s % 100;
      return b(i, 2);
    }
    return e === "Yo" ? t.ordinalNumber(s, { unit: "year" }) : b(s, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = Kt(n);
    return b(t, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(n, e) {
    const t = n.getFullYear();
    return b(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(a);
      case "QQ":
        return b(a, 2);
      case "Qo":
        return t.ordinalNumber(a, { unit: "quarter" });
      case "QQQ":
        return t.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return t.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return t.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(n, e, t) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(a);
      case "qq":
        return b(a, 2);
      case "qo":
        return t.ordinalNumber(a, { unit: "quarter" });
      case "qqq":
        return t.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return t.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return t.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(n, e, t) {
    const a = n.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return K.M(n, e);
      case "Mo":
        return t.ordinalNumber(a + 1, { unit: "month" });
      case "MMM":
        return t.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return t.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return t.month(a, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(n, e, t) {
    const a = n.getMonth();
    switch (e) {
      case "L":
        return String(a + 1);
      case "LL":
        return b(a + 1, 2);
      case "Lo":
        return t.ordinalNumber(a + 1, { unit: "month" });
      case "LLL":
        return t.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return t.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return t.month(a, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(n, e, t, a) {
    const r = Xt(n, a);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : b(r, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const a = qt(n);
    return e === "Io" ? t.ordinalNumber(a, { unit: "week" }) : b(a, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : K.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const a = oa(n);
    return e === "Do" ? t.ordinalNumber(a, { unit: "dayOfYear" }) : b(a, e.length);
  },
  // Day of week
  E: function(n, e, t) {
    const a = n.getDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return t.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return t.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return t.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return t.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(n, e, t, a) {
    const r = n.getDay(), s = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(s);
      case "ee":
        return b(s, 2);
      case "eo":
        return t.ordinalNumber(s, { unit: "day" });
      case "eee":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(n, e, t, a) {
    const r = n.getDay(), s = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(s);
      case "cc":
        return b(s, e.length);
      case "co":
        return t.ordinalNumber(s, { unit: "day" });
      case "ccc":
        return t.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return t.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return t.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return t.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(n, e, t) {
    const a = n.getDay(), r = a === 0 ? 7 : a;
    switch (e) {
      case "i":
        return String(r);
      case "ii":
        return b(r, e.length);
      case "io":
        return t.ordinalNumber(r, { unit: "day" });
      case "iii":
        return t.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return t.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return t.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return t.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(n, e, t) {
    const r = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(n, e, t) {
    const a = n.getHours();
    let r;
    switch (a === 12 ? r = re.noon : a === 0 ? r = re.midnight : r = a / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(n, e, t) {
    const a = n.getHours();
    let r;
    switch (a >= 17 ? r = re.evening : a >= 12 ? r = re.afternoon : a >= 4 ? r = re.morning : r = re.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(n, e, t) {
    if (e === "ho") {
      let a = n.getHours() % 12;
      return a === 0 && (a = 12), t.ordinalNumber(a, { unit: "hour" });
    }
    return K.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : K.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const a = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(a, { unit: "hour" }) : b(a, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let a = n.getHours();
    return a === 0 && (a = 24), e === "ko" ? t.ordinalNumber(a, { unit: "hour" }) : b(a, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : K.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : K.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return K.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (e) {
      case "X":
        return Tt(a);
      case "XXXX":
      case "XX":
        return ee(a);
      case "XXXXX":
      case "XXX":
      default:
        return ee(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "x":
        return Tt(a);
      case "xxxx":
      case "xx":
        return ee(a);
      case "xxxxx":
      case "xxx":
      default:
        return ee(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + pt(a, ":");
      case "OOOO":
      default:
        return "GMT" + ee(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + pt(a, ":");
      case "zzzz":
      default:
        return "GMT" + ee(a, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const a = Math.trunc(n.getTime() / 1e3);
    return b(a, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    const a = n.getTime();
    return b(a, e.length);
  }
};
function pt(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), s = a % 60;
  return s === 0 ? t + String(r) : t + String(r) + e + b(s, 2);
}
function Tt(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + b(Math.abs(n) / 60, 2) : ee(n, e);
}
function ee(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = b(Math.trunc(a / 60), 2), s = b(a % 60, 2);
  return t + r + e + s;
}
const wt = (n, e) => {
  switch (n) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, Jt = (n, e) => {
  switch (n) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, la = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], a = t[1], r = t[2];
  if (!r)
    return wt(n, e);
  let s;
  switch (a) {
    case "P":
      s = e.dateTime({ width: "short" });
      break;
    case "PP":
      s = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      s = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      s = e.dateTime({ width: "full" });
      break;
  }
  return s.replace("{{date}}", wt(a, e)).replace("{{time}}", Jt(r, e));
}, ua = {
  p: Jt,
  P: la
}, da = /^D+$/, ma = /^Y+$/, fa = ["D", "DD", "YY", "YYYY"];
function ha(n) {
  return da.test(n);
}
function ga(n) {
  return ma.test(n);
}
function ya(n, e, t) {
  const a = pa(n, e, t);
  if (console.warn(a), fa.includes(n)) throw new RangeError(a);
}
function pa(n, e, t) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${a} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ta = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, wa = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ba = /^'([^]*?)'?$/, Da = /''/g, Ma = /[a-zA-Z]/;
function ze(n, e, t) {
  var u, f, D, M;
  const a = be(), r = a.locale ?? ia, s = a.firstWeekContainsDate ?? ((f = (u = a.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, i = a.weekStartsOn ?? ((M = (D = a.locale) == null ? void 0 : D.options) == null ? void 0 : M.weekStartsOn) ?? 0, o = w(n);
  if (!Nn(o))
    throw new RangeError("Invalid time value");
  let c = e.match(wa).map((N) => {
    const m = N[0];
    if (m === "p" || m === "P") {
      const A = ua[m];
      return A(N, r.formatLong);
    }
    return N;
  }).join("").match(Ta).map((N) => {
    if (N === "''")
      return { isToken: !1, value: "'" };
    const m = N[0];
    if (m === "'")
      return { isToken: !1, value: Ea(N) };
    if (yt[m])
      return { isToken: !0, value: N };
    if (m.match(Ma))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + m + "`"
      );
    return { isToken: !1, value: N };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: r
  };
  return c.map((N) => {
    if (!N.isToken) return N.value;
    const m = N.value;
    (ga(m) || ha(m)) && ya(m, e, String(n));
    const A = yt[m[0]];
    return A(o, m, r.localize, l);
  }).join("");
}
function Ea(n) {
  const e = n.match(ba);
  return e ? e[1].replace(Da, "'") : n;
}
function tt(n) {
  return w(n).getDay();
}
function Pa(n) {
  return w(n).getMonth();
}
function Na(n) {
  return w(n).getFullYear();
}
function Oa(n, e) {
  const t = w(n), a = w(e);
  return t.getTime() > a.getTime();
}
function ye(n, e) {
  const t = w(n), a = w(e);
  return +t < +a;
}
function Sa(n, e, t) {
  const a = t == null ? void 0 : t.weekStartsOn, r = w(n), s = r.getDay(), o = (e % 7 + 7) % 7, c = 7 - a, l = e < 0 || e > 6 ? e - (s + c) % 7 : (o + c) % 7 - (s + c) % 7;
  return le(r, l);
}
function Aa(n, e) {
  const t = +w(n), [a, r] = [
    +w(e.start),
    +w(e.end)
  ].sort((s, i) => s - i);
  return t >= a && t <= r;
}
function nt(n, e) {
  return le(n, -e);
}
function ct(n, e) {
  return te(n, -e);
}
function Zt(n, e) {
  return pe(n, -e);
}
function xa(n, e = 0) {
  const t = we(n), a = Te(n), r = Q(t, { weekStartsOn: e }), s = ot(a, { weekStartsOn: e }), i = On({ start: r, end: s }), o = [];
  let c = [];
  return i.forEach((l, u) => {
    c.push({
      date: l,
      isCurrentMonth: l >= t && l <= a
    }), (u + 1) % 7 === 0 && (o.push(c), c = []);
  }), { weeks: o, month: n };
}
function ka(n, e = 0) {
  return e === 1 ? qt(n) : Xt(n, { weekStartsOn: 0 });
}
function Ha(n, e, t, a) {
  const r = L(n);
  return !!(e && ye(r, L(e)) || t && Oa(r, L(t)) || a != null && a.some((s) => U(s, r)));
}
function Ra(n, e) {
  const { today: t, selectionMode: a, selectedDate: r, activeRange: s } = e, i = a === "single" && r != null && U(n, r), o = a === "range" && s != null && U(n, s[0]), c = a === "range" && s != null && U(n, s[1]), l = a === "range" && s != null && !U(s[0], s[1]) && Aa(L(n), {
    start: L(s[0]),
    end: L(s[1])
  }) && !U(n, s[0]) && !U(n, s[1]), u = U(n, t);
  return { isSelected: i, isRangeStart: o, isRangeEnd: c, isInRange: l, isToday: u };
}
function va({
  date: n,
  isCurrentMonth: e,
  isSelected: t,
  isRangeStart: a,
  isRangeEnd: r,
  isInRange: s,
  isRowStart: i,
  isRowEnd: o,
  isDisabled: c,
  isToday: l,
  holidays: u,
  onClick: f,
  onMouseEnter: D,
  onMouseLeave: M
}) {
  const [N, m] = j(!1), A = n.getDate(), x = ["dp-day"];
  e || x.push("dp-day--other-month"), c && x.push("dp-day--disabled"), l && x.push("dp-day--today"), (t || a || r) && x.push("dp-day--selected"), s && x.push("dp-day--in-range"), a && x.push("dp-day--range-start"), r && x.push("dp-day--range-end"), s && i && x.push("dp-day--row-start"), s && o && x.push("dp-day--row-end");
  const Y = n.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ W("div", { className: "dp-day-wrapper", children: [
    (s || a || r) && /* @__PURE__ */ T(
      "div",
      {
        className: [
          "dp-range-fill",
          a ? "dp-range-fill--start" : "",
          r ? "dp-range-fill--end" : "",
          i && s ? "dp-range-fill--row-start" : "",
          o && s ? "dp-range-fill--row-end" : ""
        ].filter(Boolean).join(" "),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ W(
      "button",
      {
        className: x.join(" "),
        onClick: () => !c && f(n),
        onMouseEnter: () => !c && D(n),
        onMouseLeave: M,
        disabled: c,
        "aria-label": Y,
        "aria-pressed": t || a || r,
        tabIndex: e && !c ? 0 : -1,
        type: "button",
        children: [
          /* @__PURE__ */ T("span", { className: "dp-day-number", children: A }),
          u.length > 0 && /* @__PURE__ */ W(
            "span",
            {
              className: "dp-holiday-dots",
              onMouseEnter: () => m(!0),
              onMouseLeave: () => m(!1),
              children: [
                u.slice(0, 2).map((B, d) => /* @__PURE__ */ T(
                  "span",
                  {
                    className: "dp-holiday-dot",
                    style: { backgroundColor: B.dotColor },
                    "aria-hidden": "true"
                  },
                  d
                )),
                N && /* @__PURE__ */ T("span", { className: "dp-holiday-tooltip", role: "tooltip", children: u.map((B) => B.name).join(", ") })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Fa = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], Ca = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม"
];
function Ya({
  month: n,
  onPrev: e,
  onNext: t,
  onMonthSelect: a,
  onYearSelect: r,
  locale: s,
  calendarSystem: i,
  minDate: o,
  maxDate: c
}) {
  const l = Pa(n), u = Na(n), f = s === "th" ? Ca : Fa, D = [];
  for (let m = u - 10; m <= u + 10; m++)
    D.push(m);
  const M = o ? te(n, -1) < new Date(o.getFullYear(), o.getMonth(), 1) : !1, N = c ? te(n, 1) > new Date(c.getFullYear(), c.getMonth(), 1) : !1;
  return /* @__PURE__ */ W("div", { className: "dp-month-nav", children: [
    /* @__PURE__ */ T(
      "button",
      {
        className: "dp-nav-btn",
        onClick: e,
        disabled: M,
        "aria-label": "Previous month",
        children: "‹"
      }
    ),
    /* @__PURE__ */ W("div", { className: "dp-month-year-labels", children: [
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-month-select",
          value: l,
          onChange: (m) => a(Number(m.target.value)),
          "aria-label": "Select month",
          children: f.map((m, A) => /* @__PURE__ */ T("option", { value: A, children: m }, A))
        }
      ),
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-year-select",
          value: u,
          onChange: (m) => r(Number(m.target.value)),
          "aria-label": "Select year",
          children: D.map((m) => /* @__PURE__ */ T("option", { value: m, children: i === "buddhist" ? m + 543 : m }, m))
        }
      )
    ] }),
    /* @__PURE__ */ T(
      "button",
      {
        className: "dp-nav-btn",
        onClick: t,
        disabled: N,
        "aria-label": "Next month",
        children: "›"
      }
    )
  ] });
}
function Wa({ weekNumbers: n }) {
  return /* @__PURE__ */ W("div", { className: "dp-week-numbers", "aria-hidden": "true", children: [
    /* @__PURE__ */ T("div", { className: "dp-week-number-header", children: "W" }),
    n.map((e, t) => /* @__PURE__ */ T("div", { className: "dp-week-number", children: e }, t))
  ] });
}
const $a = {
  2026: [
    {
      date: "2026-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2026-03-03",
      name: "Makha Bucha",
      nameTH: "วันมาฆบูชา",
      type: "public"
    },
    {
      date: "2026-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2026-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2026-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2026-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2026-05-01",
      name: "Labour Day",
      nameTH: "วันแรงงาน",
      type: "public"
    },
    {
      date: "2026-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2026-05-31",
      name: "Vesak Day",
      nameTH: "วันวิสาขบูชา",
      type: "public"
    },
    {
      date: "2026-06-01",
      name: "Substitution for Visakha Bucha Day",
      nameTH: "ชดเชยวันวิสาขบูชา",
      type: "public"
    },
    {
      date: "2026-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2026-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2026-07-29",
      name: "Asalha Puja",
      nameTH: "วันอาสาฬหบูชา",
      type: "public"
    },
    {
      date: "2026-07-30",
      name: "Buddhist Lent",
      nameTH: "วันเข้าพรรษา",
      type: "public"
    },
    {
      date: "2026-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2026-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2026-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2026-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2026-12-07",
      name: "Substitution for Father's Day",
      nameTH: "วันหยุดชดเชย วันพ่อแห่งชาติ",
      type: "public"
    },
    {
      date: "2026-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2026-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2027: [
    {
      date: "2027-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2027-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2027-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2027-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2027-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2027-05-01",
      name: "Labour Day",
      nameTH: "วันแรงงาน",
      type: "public"
    },
    {
      date: "2027-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2027-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2027-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2027-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2027-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2027-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2027-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2027-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2027-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2028: [
    {
      date: "2028-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2028-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2028-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2028-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2028-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2028-05-01",
      name: "Labour Day",
      nameTH: "วันแรงงาน",
      type: "public"
    },
    {
      date: "2028-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2028-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2028-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2028-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2028-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2028-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2028-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2028-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2028-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2029: [
    {
      date: "2029-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2029-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2029-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2029-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2029-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2029-05-01",
      name: "Labour Day",
      nameTH: "วันแรงงาน",
      type: "public"
    },
    {
      date: "2029-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2029-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2029-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2029-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2029-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2029-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2029-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2029-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2029-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2030: [
    {
      date: "2030-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2030-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2030-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2030-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2030-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2030-05-01",
      name: "Labour Day",
      nameTH: "วันแรงงาน",
      type: "public"
    },
    {
      date: "2030-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2030-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2030-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2030-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2030-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2030-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2030-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2030-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2030-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2031: [
    {
      date: "2031-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2031-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2031-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2031-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2031-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2031-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2031-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2031-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2031-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2031-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2031-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2031-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2031-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2031-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2032: [
    {
      date: "2032-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2032-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2032-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2032-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2032-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2032-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2032-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2032-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2032-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2032-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2032-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2032-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2032-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2032-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2033: [
    {
      date: "2033-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2033-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2033-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2033-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2033-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2033-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2033-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2033-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2033-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2033-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2033-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2033-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2033-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2033-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2034: [
    {
      date: "2034-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2034-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2034-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2034-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2034-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2034-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2034-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2034-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2034-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2034-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2034-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2034-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2034-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2034-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2035: [
    {
      date: "2035-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2035-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2035-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2035-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2035-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2035-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2035-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2035-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2035-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2035-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2035-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2035-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2035-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2035-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ],
  2036: [
    {
      date: "2036-01-01",
      name: "New Year's Day",
      nameTH: "วันขึ้นปีใหม่",
      type: "public"
    },
    {
      date: "2036-04-06",
      name: "Chakri Memorial Day",
      nameTH: "วันจักรี",
      type: "public"
    },
    {
      date: "2036-04-13",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2036-04-14",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2036-04-15",
      name: "Songkran Festival",
      nameTH: "วันสงกรานต์",
      type: "public"
    },
    {
      date: "2036-05-04",
      name: "Coronation Day",
      nameTH: "วันฉัตรมงคล",
      type: "public"
    },
    {
      date: "2036-06-03",
      name: "Queen Suthida's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี",
      type: "public"
    },
    {
      date: "2036-07-28",
      name: "King's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว",
      type: "public"
    },
    {
      date: "2036-08-12",
      name: "The Queen Mother's Birthday",
      nameTH: "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
      type: "public"
    },
    {
      date: "2036-10-13",
      name: "King Bhumibol Adulyadej Memorial Day",
      nameTH: "วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2036-10-23",
      name: "King Chulalongkorn Day",
      nameTH: "วันปิยมหาราช",
      type: "public"
    },
    {
      date: "2036-12-05",
      name: "King Bhumibol Adulyadej's Birthday",
      nameTH: "วันคล้ายวันพระบรมราชสมภพ พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร",
      type: "public"
    },
    {
      date: "2036-12-10",
      name: "Constitution Day",
      nameTH: "วันรัฐธรรมนูญ",
      type: "public"
    },
    {
      date: "2036-12-31",
      name: "New Year's Eve",
      nameTH: "วันสิ้นปี",
      type: "public"
    }
  ]
};
function en() {
  return JSON.parse(JSON.stringify($a));
}
const Ve = /* @__PURE__ */ new Map();
function _a(n) {
  const e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), a = String(n.getDate()).padStart(2, "0");
  return `${e}-${t}-${a}`;
}
function Ia(n, e, t) {
  return `${n}-${e}-${t.sort().join(",")}`;
}
const bt = "#EF4444";
function Ba(n, e, t = ["public"], a = !0, r = []) {
  const [s, i] = j([]);
  Gt(() => {
    if (!a) return;
    const c = Ia(n, e, t);
    if (Ve.has(c)) {
      i(Ve.get(c));
      return;
    }
    const D = (en()[String(n)] ?? []).filter((M) => t.includes(M.type)).map((M) => ({
      ...M,
      name: e === "th" && M.nameTH ? M.nameTH : M.name
    }));
    Ve.set(c, D), i(D);
  }, [n, e, JSON.stringify(t), a]);
  const o = zt(() => {
    const c = /* @__PURE__ */ new Map();
    return s.forEach((l) => {
      const u = l.date.slice(0, 10), f = c.get(u) ?? [];
      f.push({ name: l.name, dotColor: bt }), c.set(u, f);
    }), r.forEach((l) => {
      const u = e === "th" ? l.nameTH : l.nameEN;
      c.set(l.date, [{ name: u, dotColor: l.dotColor ?? bt }]);
    }), c;
  }, [s, r, e]);
  return {
    getHolidaysForDate(c) {
      return o.get(_a(c)) ?? [];
    }
  };
}
const Ua = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], La = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
function Dt({
  month: n,
  onMonthChange: e,
  selectionMode: t,
  selectedDate: a,
  rangeValue: r,
  previewRange: s,
  onDayClick: i,
  onDayHover: o,
  onAnnounce: c,
  config: l
}) {
  const {
    locale: u,
    calendarSystem: f,
    weekStartsOn: D,
    showWeekNumbers: M,
    showHolidays: N,
    holidayTypes: m,
    customHolidays: A,
    minDate: x,
    maxDate: Y,
    disabledDates: B
  } = l, { weeks: d } = xa(n, D), y = n.getFullYear(), g = Ba(y, u, m, N, A), k = u === "th" ? La : Ua, H = D === 1 ? [...k.slice(1), k[0]] : k, $ = d.map((R) => ka(R[0].date, D)), We = v(() => {
    const R = new Date(n.getFullYear(), n.getMonth() - 1, 1);
    e(R);
    const V = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(V);
  }, [n, e, u, c]), $e = v(() => {
    const R = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    e(R);
    const V = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(V);
  }, [n, e, u, c]), _e = v(
    (R) => {
      e(new Date(n.getFullYear(), R, 1));
    },
    [n, e]
  ), me = v(
    (R) => {
      e(new Date(R, n.getMonth(), 1));
    },
    [n, e]
  ), Ee = {
    today: /* @__PURE__ */ new Date(),
    selectionMode: t,
    selectedDate: a,
    activeRange: s ?? r
  };
  return /* @__PURE__ */ W("div", { className: "dp-calendar", children: [
    /* @__PURE__ */ T(
      Ya,
      {
        month: n,
        onPrev: We,
        onNext: $e,
        onMonthSelect: _e,
        onYearSelect: me,
        locale: u,
        calendarSystem: f,
        minDate: x,
        maxDate: Y
      }
    ),
    /* @__PURE__ */ W("div", { className: "dp-grid-container", children: [
      M && /* @__PURE__ */ T(Wa, { weekNumbers: $ }),
      /* @__PURE__ */ W("div", { className: "dp-grid", children: [
        /* @__PURE__ */ T("div", { className: "dp-weekday-row", children: H.map((R, V) => /* @__PURE__ */ T("div", { className: "dp-weekday-label", "aria-hidden": "true", children: R }, V)) }),
        d.map((R, V) => /* @__PURE__ */ T("div", { className: "dp-week-row", children: R.map((J, fe) => {
          const Be = g.getHolidaysForDate(J.date), Ue = Ha(J.date, x, Y, B), { isSelected: Le, isRangeStart: je, isRangeEnd: ft, isInRange: Pe, isToday: Ne } = Ra(J.date, Ee);
          return /* @__PURE__ */ T(
            va,
            {
              date: J.date,
              isCurrentMonth: J.isCurrentMonth,
              isSelected: Le,
              isRangeStart: je,
              isRangeEnd: ft,
              isInRange: Pe,
              isRowStart: fe === 0,
              isRowEnd: fe === 6,
              isDisabled: Ue,
              isToday: Ne,
              holidays: Be,
              onClick: i,
              onMouseEnter: o,
              onMouseLeave: () => o(null)
            },
            fe
          );
        }) }, V))
      ] })
    ] })
  ] });
}
const ja = [
  {
    label: "This week",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [Q(n, { weekStartsOn: 1 }), ot(n, { weekStartsOn: 1 })];
    }
  },
  {
    label: "Last 7 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [nt(n, 6), n];
    }
  },
  {
    label: "Last 30 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [nt(n, 29), n];
    }
  },
  {
    label: "This month",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [we(n), Te(n)];
    }
  },
  {
    label: "Last month",
    resolve: () => {
      const n = ct(/* @__PURE__ */ new Date(), 1);
      return [we(n), Te(n)];
    }
  }
];
function Ga({ presets: n, value: e, onSelect: t }) {
  const a = n ?? ja, r = (s) => {
    if (!e) return !1;
    const [i, o] = s.resolve();
    return U(i, e[0]) && U(o, e[1]);
  };
  return /* @__PURE__ */ T("div", { className: "dp-preset-chips", role: "group", "aria-label": "Quick select presets", children: a.map((s, i) => /* @__PURE__ */ T(
    "button",
    {
      className: ["dp-chip", r(s) ? "dp-chip--active" : ""].join(" "),
      onClick: () => t(s.resolve()),
      type: "button",
      children: s.label
    },
    i
  )) });
}
var p;
(function(n) {
  n[n.AM = 0] = "AM", n[n.PM = 1] = "PM";
})(p || (p = {}));
var S;
(function(n) {
  n[n.SUNDAY = 0] = "SUNDAY", n[n.MONDAY = 1] = "MONDAY", n[n.TUESDAY = 2] = "TUESDAY", n[n.WEDNESDAY = 3] = "WEDNESDAY", n[n.THURSDAY = 4] = "THURSDAY", n[n.FRIDAY = 5] = "FRIDAY", n[n.SATURDAY = 6] = "SATURDAY";
})(S || (S = {}));
var _;
(function(n) {
  n[n.JANUARY = 1] = "JANUARY", n[n.FEBRUARY = 2] = "FEBRUARY", n[n.MARCH = 3] = "MARCH", n[n.APRIL = 4] = "APRIL", n[n.MAY = 5] = "MAY", n[n.JUNE = 6] = "JUNE", n[n.JULY = 7] = "JULY", n[n.AUGUST = 8] = "AUGUST", n[n.SEPTEMBER = 9] = "SEPTEMBER", n[n.OCTOBER = 10] = "OCTOBER", n[n.NOVEMBER = 11] = "NOVEMBER", n[n.DECEMBER = 12] = "DECEMBER";
})(_ || (_ = {}));
function ae(n, e) {
  n.assign("day", e.getDate()), n.assign("month", e.getMonth() + 1), n.assign("year", e.getFullYear());
}
function tn(n, e) {
  n.assign("hour", e.getHours()), n.assign("minute", e.getMinutes()), n.assign("second", e.getSeconds()), n.assign("millisecond", e.getMilliseconds()), n.assign("meridiem", e.getHours() < 12 ? p.AM : p.PM);
}
function ie(n, e) {
  n.imply("day", e.getDate()), n.imply("month", e.getMonth() + 1), n.imply("year", e.getFullYear());
}
function lt(n, e) {
  n.imply("hour", e.getHours()), n.imply("minute", e.getMinutes()), n.imply("second", e.getSeconds()), n.imply("millisecond", e.getMilliseconds()), n.imply("meridiem", e.getHours() < 12 ? p.AM : p.PM);
}
const za = {
  ACDT: 630,
  ACST: 570,
  ADT: -180,
  AEDT: 660,
  AEST: 600,
  AFT: 270,
  AKDT: -480,
  AKST: -540,
  ALMT: 360,
  AMST: -180,
  AMT: -240,
  ANAST: 720,
  ANAT: 720,
  AQTT: 300,
  ART: -180,
  AST: -240,
  AWDT: 540,
  AWST: 480,
  AZOST: 0,
  AZOT: -60,
  AZST: 300,
  AZT: 240,
  BNT: 480,
  BOT: -240,
  BRST: -120,
  BRT: -180,
  BST: 60,
  BTT: 360,
  CAST: 480,
  CAT: 120,
  CCT: 390,
  CDT: -300,
  CEST: 120,
  CET: {
    timezoneOffsetDuringDst: 2 * 60,
    timezoneOffsetNonDst: 60,
    dstStart: (n) => Mt(n, _.MARCH, S.SUNDAY, 2),
    dstEnd: (n) => Mt(n, _.OCTOBER, S.SUNDAY, 3)
  },
  CHADT: 825,
  CHAST: 765,
  CKT: -600,
  CLST: -180,
  CLT: -240,
  COT: -300,
  CST: -360,
  CT: {
    timezoneOffsetDuringDst: -5 * 60,
    timezoneOffsetNonDst: -6 * 60,
    dstStart: (n) => q(n, _.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => q(n, _.NOVEMBER, S.SUNDAY, 1, 2)
  },
  CVT: -60,
  CXT: 420,
  ChST: 600,
  DAVT: 420,
  EASST: -300,
  EAST: -360,
  EAT: 180,
  ECT: -300,
  EDT: -240,
  EEST: 180,
  EET: 120,
  EGST: 0,
  EGT: -60,
  EST: -300,
  ET: {
    timezoneOffsetDuringDst: -4 * 60,
    timezoneOffsetNonDst: -5 * 60,
    dstStart: (n) => q(n, _.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => q(n, _.NOVEMBER, S.SUNDAY, 1, 2)
  },
  FJST: 780,
  FJT: 720,
  FKST: -180,
  FKT: -240,
  FNT: -120,
  GALT: -360,
  GAMT: -540,
  GET: 240,
  GFT: -180,
  GILT: 720,
  GMT: 0,
  GST: 240,
  GYT: -240,
  HAA: -180,
  HAC: -300,
  HADT: -540,
  HAE: -240,
  HAP: -420,
  HAR: -360,
  HAST: -600,
  HAT: -90,
  HAY: -480,
  HKT: 480,
  HLV: -210,
  HNA: -240,
  HNC: -360,
  HNE: -300,
  HNP: -480,
  HNR: -420,
  HNT: -150,
  HNY: -540,
  HOVT: 420,
  ICT: 420,
  IDT: 180,
  IOT: 360,
  IRDT: 270,
  IRKST: 540,
  IRKT: 540,
  IRST: 210,
  IST: 330,
  JST: 540,
  KGT: 360,
  KRAST: 480,
  KRAT: 480,
  KST: 540,
  KUYT: 240,
  LHDT: 660,
  LHST: 630,
  LINT: 840,
  MAGST: 720,
  MAGT: 720,
  MART: -510,
  MAWT: 300,
  MDT: -360,
  MESZ: 120,
  MEZ: 60,
  MHT: 720,
  MMT: 390,
  MSD: 240,
  MSK: 180,
  MST: -420,
  MT: {
    timezoneOffsetDuringDst: -6 * 60,
    timezoneOffsetNonDst: -7 * 60,
    dstStart: (n) => q(n, _.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => q(n, _.NOVEMBER, S.SUNDAY, 1, 2)
  },
  MUT: 240,
  MVT: 300,
  MYT: 480,
  NCT: 660,
  NDT: -90,
  NFT: 690,
  NOVST: 420,
  NOVT: 360,
  NPT: 345,
  NST: -150,
  NUT: -660,
  NZDT: 780,
  NZST: 720,
  OMSST: 420,
  OMST: 420,
  PDT: -420,
  PET: -300,
  PETST: 720,
  PETT: 720,
  PGT: 600,
  PHOT: 780,
  PHT: 480,
  PKT: 300,
  PMDT: -120,
  PMST: -180,
  PONT: 660,
  PST: -480,
  PT: {
    timezoneOffsetDuringDst: -7 * 60,
    timezoneOffsetNonDst: -8 * 60,
    dstStart: (n) => q(n, _.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => q(n, _.NOVEMBER, S.SUNDAY, 1, 2)
  },
  PWT: 540,
  PYST: -180,
  PYT: -240,
  RET: 240,
  SAMT: 240,
  SAST: 120,
  SBT: 660,
  SCT: 240,
  SGT: 480,
  SRT: -180,
  SST: -660,
  TAHT: -600,
  TFT: 300,
  TJT: 300,
  TKT: 780,
  TLT: 540,
  TMT: 300,
  TVT: 720,
  ULAT: 480,
  UTC: 0,
  UYST: -120,
  UYT: -180,
  UZT: 300,
  VET: -210,
  VLAST: 660,
  VLAT: 660,
  VUT: 660,
  WAST: 120,
  WAT: 60,
  WEST: 60,
  WESZ: 60,
  WET: 0,
  WEZ: 0,
  WFT: 720,
  WGST: -120,
  WGT: -180,
  WIB: 420,
  WIT: 540,
  WITA: 480,
  WST: 780,
  WT: 0,
  YAKST: 600,
  YAKT: 600,
  YAPT: 600,
  YEKST: 360,
  YEKT: 360
};
function q(n, e, t, a, r = 0) {
  let s = 0, i = 0;
  for (; i < a; )
    s++, new Date(n, e - 1, s).getDay() === t && i++;
  return new Date(n, e - 1, s, r);
}
function Mt(n, e, t, a = 0) {
  const r = t === 0 ? 7 : t, s = new Date(n, e - 1 + 1, 1, 12), i = s.getDay() === 0 ? 7 : s.getDay();
  let o;
  return i === r ? o = 7 : i < r ? o = 7 + i - r : o = i - r, s.setDate(s.getDate() - o), new Date(n, e - 1, s.getDate(), a);
}
function nn(n, e, t = {}) {
  if (n == null)
    return null;
  if (typeof n == "number")
    return n;
  const a = t[n] ?? za[n];
  return a == null ? null : typeof a == "number" ? a : e == null ? null : e > a.dstStart(e.getFullYear()) && !(e > a.dstEnd(e.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
}
const Va = {
  day: 0,
  second: 0,
  millisecond: 0
};
function F(n, e) {
  let t = new Date(n);
  if (e.y && (e.year = e.y, delete e.y), e.mo && (e.month = e.mo, delete e.mo), e.M && (e.month = e.M, delete e.M), e.w && (e.week = e.w, delete e.w), e.d && (e.day = e.d, delete e.d), e.h && (e.hour = e.h, delete e.h), e.m && (e.minute = e.m, delete e.m), e.s && (e.second = e.s, delete e.s), e.ms && (e.millisecond = e.ms, delete e.ms), "year" in e) {
    const a = Math.floor(e.year);
    t.setFullYear(t.getFullYear() + a);
    const r = e.year - a;
    r > 0 && (e.month = (e == null ? void 0 : e.month) ?? 0, e.month += r * 12);
  }
  if ("quarter" in e) {
    const a = Math.floor(e.quarter);
    t.setMonth(t.getMonth() + a * 3);
  }
  if ("month" in e) {
    const a = Math.floor(e.month);
    t.setMonth(t.getMonth() + a);
    const r = e.month - a;
    r > 0 && (e.week = (e == null ? void 0 : e.week) ?? 0, e.week += r * 4);
  }
  if ("week" in e) {
    const a = Math.floor(e.week);
    t.setDate(t.getDate() + a * 7);
    const r = e.week - a;
    r > 0 && (e.day = (e == null ? void 0 : e.day) ?? 0, e.day += Math.round(r * 7));
  }
  if ("day" in e) {
    const a = Math.floor(e.day);
    t.setDate(t.getDate() + a);
    const r = e.day - a;
    r > 0 && (e.hour = (e == null ? void 0 : e.hour) ?? 0, e.hour += Math.round(r * 24));
  }
  if ("hour" in e) {
    const a = Math.floor(e.hour);
    t.setHours(t.getHours() + a);
    const r = e.hour - a;
    r > 0 && (e.minute = (e == null ? void 0 : e.minute) ?? 0, e.minute += Math.round(r * 60));
  }
  if ("minute" in e) {
    const a = Math.floor(e.minute);
    t.setMinutes(t.getMinutes() + a);
    const r = e.minute - a;
    r > 0 && (e.second = (e == null ? void 0 : e.second) ?? 0, e.second += Math.round(r * 60));
  }
  if ("second" in e) {
    const a = Math.floor(e.second);
    t.setSeconds(t.getSeconds() + a);
    const r = e.second - a;
    r > 0 && (e.millisecond = (e == null ? void 0 : e.millisecond) ?? 0, e.millisecond += Math.round(r * 1e3));
  }
  if ("millisecond" in e) {
    const a = Math.floor(e.millisecond);
    t.setMilliseconds(t.getMilliseconds() + a);
  }
  return t;
}
function He(n) {
  const e = {};
  for (const t in n)
    e[t] = -n[t];
  return e;
}
class ne {
  constructor(e, t) {
    h(this, "instant");
    h(this, "timezoneOffset");
    this.instant = e ?? /* @__PURE__ */ new Date(), this.timezoneOffset = t ?? null;
  }
  static fromDate(e) {
    return new ne(e);
  }
  static fromInput(e, t) {
    if (e instanceof Date)
      return ne.fromDate(e);
    const a = (e == null ? void 0 : e.instant) ?? /* @__PURE__ */ new Date(), r = nn(e == null ? void 0 : e.timezone, a, t);
    return new ne(a, r);
  }
  getDateWithAdjustedTimezone() {
    const e = new Date(this.instant);
    return this.timezoneOffset !== null && e.setMinutes(e.getMinutes() - this.getSystemTimezoneAdjustmentMinute(this.instant)), e;
  }
  getSystemTimezoneAdjustmentMinute(e, t) {
    e || (e = /* @__PURE__ */ new Date());
    const a = -e.getTimezoneOffset(), r = t ?? this.timezoneOffset ?? a;
    return a - r;
  }
  getTimezoneOffset() {
    return this.timezoneOffset ?? -this.instant.getTimezoneOffset();
  }
}
class P {
  constructor(e, t) {
    h(this, "knownValues");
    h(this, "impliedValues");
    h(this, "reference");
    h(this, "_tags", /* @__PURE__ */ new Set());
    if (this.reference = e, this.knownValues = {}, this.impliedValues = {}, t)
      for (const r in t)
        this.knownValues[r] = t[r];
    const a = e.getDateWithAdjustedTimezone();
    this.imply("day", a.getDate()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear()), this.imply("hour", 12), this.imply("minute", 0), this.imply("second", 0), this.imply("millisecond", 0);
  }
  static createRelativeFromReference(e, t = Va) {
    let a = F(e.getDateWithAdjustedTimezone(), t);
    const r = new P(e);
    return r.addTag("result/relativeDate"), "hour" in t || "minute" in t || "second" in t || "millisecond" in t ? (r.addTag("result/relativeDateAndTime"), tn(r, a), ae(r, a), r.assign("timezoneOffset", e.getTimezoneOffset())) : (lt(r, a), r.imply("timezoneOffset", e.getTimezoneOffset()), "day" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.assign("weekday", a.getDay())) : "week" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.imply("weekday", a.getDay())) : (r.imply("day", a.getDate()), "month" in t ? (r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear())) : (r.imply("month", a.getMonth() + 1), "year" in t ? r.assign("year", a.getFullYear()) : r.imply("year", a.getFullYear())))), r;
  }
  get(e) {
    return e in this.knownValues ? this.knownValues[e] : e in this.impliedValues ? this.impliedValues[e] : null;
  }
  isCertain(e) {
    return e in this.knownValues;
  }
  getCertainComponents() {
    return Object.keys(this.knownValues);
  }
  imply(e, t) {
    return e in this.knownValues ? this : (this.impliedValues[e] = t, this);
  }
  assign(e, t) {
    return this.knownValues[e] = t, delete this.impliedValues[e], this;
  }
  addDurationAsImplied(e) {
    const t = this.dateWithoutTimezoneAdjustment(), a = F(t, e);
    return ("day" in e || "week" in e || "month" in e || "year" in e) && (this.delete(["day", "weekday", "month", "year"]), this.imply("day", a.getDate()), this.imply("weekday", a.getDay()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear())), ("second" in e || "minute" in e || "hour" in e) && (this.delete(["second", "minute", "hour"]), this.imply("second", a.getSeconds()), this.imply("minute", a.getMinutes()), this.imply("hour", a.getHours())), this;
  }
  delete(e) {
    typeof e == "string" && (e = [e]);
    for (const t of e)
      delete this.knownValues[t], delete this.impliedValues[t];
  }
  clone() {
    const e = new P(this.reference);
    e.knownValues = {}, e.impliedValues = {};
    for (const t in this.knownValues)
      e.knownValues[t] = this.knownValues[t];
    for (const t in this.impliedValues)
      e.impliedValues[t] = this.impliedValues[t];
    return e;
  }
  isOnlyDate() {
    return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
  }
  isOnlyTime() {
    return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month") && !this.isCertain("year");
  }
  isOnlyWeekdayComponent() {
    return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
  }
  isDateWithUnknownYear() {
    return this.isCertain("month") && !this.isCertain("year");
  }
  isValidDate() {
    const e = this.dateWithoutTimezoneAdjustment();
    return !(e.getFullYear() !== this.get("year") || e.getMonth() !== this.get("month") - 1 || e.getDate() !== this.get("day") || this.get("hour") != null && e.getHours() != this.get("hour") || this.get("minute") != null && e.getMinutes() != this.get("minute"));
  }
  toString() {
    return `[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`;
  }
  date() {
    const e = this.dateWithoutTimezoneAdjustment(), t = this.reference.getSystemTimezoneAdjustmentMinute(e, this.get("timezoneOffset"));
    return new Date(e.getTime() + t * 6e4);
  }
  addTag(e) {
    return this._tags.add(e), this;
  }
  addTags(e) {
    for (const t of e)
      this._tags.add(t);
    return this;
  }
  tags() {
    return new Set(this._tags);
  }
  dateWithoutTimezoneAdjustment() {
    const e = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
    return e.setFullYear(this.get("year")), e;
  }
}
class ue {
  constructor(e, t, a, r, s) {
    h(this, "refDate");
    h(this, "index");
    h(this, "text");
    h(this, "reference");
    h(this, "start");
    h(this, "end");
    this.reference = e, this.refDate = e.instant, this.index = t, this.text = a, this.start = r || new P(e), this.end = s;
  }
  clone() {
    const e = new ue(this.reference, this.index, this.text);
    return e.start = this.start ? this.start.clone() : null, e.end = this.end ? this.end.clone() : null, e;
  }
  date() {
    return this.start.date();
  }
  addTag(e) {
    return this.start.addTag(e), this.end && this.end.addTag(e), this;
  }
  addTags(e) {
    return this.start.addTags(e), this.end && this.end.addTags(e), this;
  }
  tags() {
    const e = new Set(this.start.tags());
    if (this.end)
      for (const t of this.end.tags())
        e.add(t);
    return e;
  }
  toString() {
    const e = Array.from(this.tags()).sort();
    return `[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(e)} ...}]`;
  }
}
function an(n, e, t = "\\s{0,5},?\\s{0,5}") {
  const a = e.replace(/\((?!\?)/g, "(?:");
  return `${n}${a}(?:${t}${a}){0,10}`;
}
function Ka(n) {
  let e;
  return n instanceof Array ? e = [...n] : n instanceof Map ? e = Array.from(n.keys()) : e = Object.keys(n), e;
}
function z(n) {
  return `(?:${Ka(n).sort((t, a) => a.length - t.length).join("|").replace(/\./g, "\\.")})`;
}
function rn(n) {
  return n < 100 && (n > 50 ? n = n + 1900 : n = n + 2e3), n;
}
function Re(n, e, t) {
  let a = new Date(n);
  a.setMonth(t - 1), a.setDate(e);
  const r = F(a, { year: 1 }), s = F(a, { year: -1 });
  return Math.abs(r.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) ? a = r : Math.abs(s.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) && (a = s), a.getFullYear();
}
const at = {
  sunday: 0,
  sun: 0,
  "sun.": 0,
  monday: 1,
  mon: 1,
  "mon.": 1,
  tuesday: 2,
  tue: 2,
  "tue.": 2,
  wednesday: 3,
  wed: 3,
  "wed.": 3,
  thursday: 4,
  thurs: 4,
  "thurs.": 4,
  thur: 4,
  "thur.": 4,
  thu: 4,
  "thu.": 4,
  friday: 5,
  fri: 5,
  "fri.": 5,
  saturday: 6,
  sat: 6,
  "sat.": 6
}, sn = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
}, X = {
  ...sn,
  jan: 1,
  "jan.": 1,
  feb: 2,
  "feb.": 2,
  mar: 3,
  "mar.": 3,
  apr: 4,
  "apr.": 4,
  jun: 6,
  "jun.": 6,
  jul: 7,
  "jul.": 7,
  aug: 8,
  "aug.": 8,
  sep: 9,
  "sep.": 9,
  sept: 9,
  "sept.": 9,
  oct: 10,
  "oct.": 10,
  nov: 11,
  "nov.": 11,
  dec: 12,
  "dec.": 12
}, rt = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12
}, st = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
  eighth: 8,
  ninth: 9,
  tenth: 10,
  eleventh: 11,
  twelfth: 12,
  thirteenth: 13,
  fourteenth: 14,
  fifteenth: 15,
  sixteenth: 16,
  seventeenth: 17,
  eighteenth: 18,
  nineteenth: 19,
  twentieth: 20,
  "twenty first": 21,
  "twenty-first": 21,
  "twenty second": 22,
  "twenty-second": 22,
  "twenty third": 23,
  "twenty-third": 23,
  "twenty fourth": 24,
  "twenty-fourth": 24,
  "twenty fifth": 25,
  "twenty-fifth": 25,
  "twenty sixth": 26,
  "twenty-sixth": 26,
  "twenty seventh": 27,
  "twenty-seventh": 27,
  "twenty eighth": 28,
  "twenty-eighth": 28,
  "twenty ninth": 29,
  "twenty-ninth": 29,
  thirtieth: 30,
  "thirty first": 31,
  "thirty-first": 31
}, on = {
  second: "second",
  seconds: "second",
  minute: "minute",
  minutes: "minute",
  hour: "hour",
  hours: "hour",
  day: "day",
  days: "day",
  week: "week",
  weeks: "week",
  month: "month",
  months: "month",
  quarter: "quarter",
  quarters: "quarter",
  year: "year",
  years: "year"
}, ve = {
  s: "second",
  sec: "second",
  second: "second",
  seconds: "second",
  m: "minute",
  min: "minute",
  mins: "minute",
  minute: "minute",
  minutes: "minute",
  h: "hour",
  hr: "hour",
  hrs: "hour",
  hour: "hour",
  hours: "hour",
  d: "day",
  day: "day",
  days: "day",
  w: "week",
  week: "week",
  weeks: "week",
  mo: "month",
  mon: "month",
  mos: "month",
  month: "month",
  months: "month",
  qtr: "quarter",
  quarter: "quarter",
  quarters: "quarter",
  y: "year",
  yr: "year",
  year: "year",
  years: "year",
  ...on
}, cn = `(?:${z(rt)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function qa(n) {
  const e = n.toLowerCase();
  return rt[e] !== void 0 ? rt[e] : e === "a" || e === "an" || e == "the" ? 1 : e.match(/few/) ? 3 : e.match(/half/) ? 0.5 : e.match(/couple/) ? 2 : e.match(/several/) ? 7 : parseFloat(e);
}
const xe = `(?:${z(st)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function ke(n) {
  let e = n.toLowerCase();
  return st[e] !== void 0 ? st[e] : (e = e.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(e));
}
const Fe = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[5-9][0-9]|2[0-5])";
function Ce(n) {
  if (/BE/i.test(n))
    return n = n.replace(/BE/i, ""), parseInt(n) - 543;
  if (/BCE?/i.test(n))
    return n = n.replace(/BCE?/i, ""), -parseInt(n);
  if (/(AD|CE)/i.test(n))
    return n = n.replace(/(AD|CE)/i, ""), parseInt(n);
  const e = parseInt(n);
  return rn(e);
}
const ln = `(${cn})\\s{0,3}(${z(ve)})`, Et = new RegExp(ln, "i"), Qa = `(${cn})\\s{0,3}(${z(on)})`, un = "\\s{0,5},?(?:\\s*and)?\\s{0,5}", De = an("(?:(?:about|around)\\s{0,3})?", ln, un), Ye = an("(?:(?:about|around)\\s{0,3})?", Qa, un);
function de(n) {
  const e = {};
  let t = n, a = Et.exec(t);
  for (; a; )
    Xa(e, a), t = t.substring(a[0].length).trim(), a = Et.exec(t);
  return Object.keys(e).length == 0 ? null : e;
}
function Xa(n, e) {
  if (e[0].match(/^[a-zA-Z]+$/))
    return;
  const t = qa(e[1]), a = ve[e[2].toLowerCase()];
  n[a] = t;
}
class C {
  constructor() {
    h(this, "cachedInnerPattern", null);
    h(this, "cachedPattern", null);
  }
  innerPatternHasChange(e, t) {
    return this.innerPattern(e) !== t;
  }
  patternLeftBoundary() {
    return "(\\W|^)";
  }
  pattern(e) {
    return this.cachedInnerPattern && !this.innerPatternHasChange(e, this.cachedInnerPattern) ? this.cachedPattern : (this.cachedInnerPattern = this.innerPattern(e), this.cachedPattern = new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`, this.cachedInnerPattern.flags), this.cachedPattern);
  }
  extract(e, t) {
    const a = t[1] ?? "";
    t.index = t.index + a.length, t[0] = t[0].substring(a.length);
    for (let r = 2; r < t.length; r++)
      t[r - 1] = t[r];
    return this.innerExtract(e, t);
  }
}
const Ja = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${De})(?=\\W|$)`, "i"), Za = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${De})(?=\\W|$)`, "i"), er = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Ye})(?=\\W|$)`, "i");
class tr extends C {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern(t) {
    return this.strictMode ? er : t.option.forwardDate ? Ja : Za;
  }
  innerExtract(t, a) {
    if (a[0].match(/^for\s*the\s*\w+/))
      return null;
    const r = de(a[1]);
    return r ? P.createRelativeFromReference(t.reference, r) : null;
  }
}
const nr = new RegExp(`(?:on\\s{0,3})?(${xe})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${xe}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${z(X)})(?:(?:-|/|,?\\s{0,3})(${Fe}(?!\\w)))?(?=\\W|$)`, "i"), Pt = 1, Nt = 2, ar = 3, Ot = 4;
class rr extends C {
  innerPattern() {
    return nr;
  }
  innerExtract(e, t) {
    const a = e.createParsingResult(t.index, t[0]), r = X[t[ar].toLowerCase()], s = ke(t[Pt]);
    if (s > 31)
      return t.index = t.index + t[Pt].length, null;
    if (a.start.assign("month", r), a.start.assign("day", s), t[Ot]) {
      const i = Ce(t[Ot]);
      a.start.assign("year", i);
    } else {
      const i = Re(e.refDate, s, r);
      a.start.imply("year", i);
    }
    if (t[Nt]) {
      const i = ke(t[Nt]);
      a.end = a.start.clone(), a.end.assign("day", i);
    }
    return a;
  }
}
const sr = new RegExp(`(${z(X)})(?:-|/|\\s*,?\\s*)(${xe})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${xe})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${Fe}))?(?=\\W|$)(?!\\:\\d)`, "i"), ir = 1, St = 2, Ke = 3, qe = 4;
class or extends C {
  constructor(t) {
    super();
    h(this, "shouldSkipYearLikeDate");
    this.shouldSkipYearLikeDate = t;
  }
  innerPattern() {
    return sr;
  }
  innerExtract(t, a) {
    const r = X[a[ir].toLowerCase()], s = ke(a[St]);
    if (s > 31 || this.shouldSkipYearLikeDate && !a[Ke] && !a[qe] && a[St].match(/^2[0-5]$/))
      return null;
    const i = t.createParsingComponents({
      day: s,
      month: r
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (a[qe]) {
      const l = Ce(a[qe]);
      i.assign("year", l);
    } else {
      const l = Re(t.refDate, s, r);
      i.imply("year", l);
    }
    if (!a[Ke])
      return i;
    const o = ke(a[Ke]), c = t.createParsingResult(a.index, a[0]);
    return c.start = i, c.end = i.clone(), c.end.assign("day", o), c;
  }
}
const cr = new RegExp(`((?:in)\\s*)?(${z(X)})\\s*(?:(?:,|-|of)?\\s*(${Fe})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), lr = 1, ur = 2, At = 3;
class dr extends C {
  innerPattern() {
    return cr;
  }
  innerExtract(e, t) {
    const a = t[ur].toLowerCase();
    if (t[0].length <= 3 && !sn[a])
      return null;
    const r = e.createParsingResult(t.index + (t[lr] || "").length, t.index + t[0].length);
    r.start.imply("day", 1), r.start.addTag("parser/ENMonthNameParser");
    const s = X[a];
    if (r.start.assign("month", s), t[At]) {
      const i = Ce(t[At]);
      r.start.assign("year", i);
    } else {
      const i = Re(e.refDate, 1, s);
      r.start.imply("year", i);
    }
    return r;
  }
}
const mr = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${z(X)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), fr = 1, hr = 2, xt = 3, gr = 4;
class yr extends C {
  constructor(t) {
    super();
    h(this, "strictMonthDateOrder");
    this.strictMonthDateOrder = t;
  }
  innerPattern() {
    return mr;
  }
  innerExtract(t, a) {
    const r = parseInt(a[fr]);
    let s = parseInt(a[gr]), i = a[xt] ? parseInt(a[xt]) : X[a[hr].toLowerCase()];
    if (i < 1 || i > 12) {
      if (this.strictMonthDateOrder)
        return null;
      s >= 1 && s <= 12 && ([i, s] = [s, i]);
    }
    return s < 1 || s > 31 ? null : {
      day: s,
      month: i,
      year: r
    };
  }
}
const pr = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), Tr = 1, wr = 2;
class br extends C {
  innerPattern() {
    return pr;
  }
  innerExtract(e, t) {
    const a = parseInt(t[wr]), r = parseInt(t[Tr]);
    return e.createParsingComponents().imply("day", 1).assign("month", r).assign("year", a);
  }
}
function Dr(n, e, t, a) {
  return new RegExp(`${n}${e}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`, a);
}
function Mr(n, e) {
  return new RegExp(`^(${n})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${e}`, "i");
}
const Qe = 2, Z = 3, Oe = 4, Se = 5, se = 6;
class Er {
  constructor(e = !1) {
    h(this, "strictMode");
    h(this, "cachedPrimaryPrefix", null);
    h(this, "cachedPrimarySuffix", null);
    h(this, "cachedPrimaryTimePattern", null);
    h(this, "cachedFollowingPhase", null);
    h(this, "cachedFollowingSuffix", null);
    h(this, "cachedFollowingTimePatten", null);
    this.strictMode = e;
  }
  patternFlags() {
    return "i";
  }
  primaryPatternLeftBoundary() {
    return "(^|\\s|T|\\b)";
  }
  primarySuffix() {
    return "(?!/)(?=\\W|$)";
  }
  followingSuffix() {
    return "(?!/)(?=\\W|$)";
  }
  pattern(e) {
    return this.getPrimaryTimePatternThroughCache();
  }
  extract(e, t) {
    const a = this.extractPrimaryTimeComponents(e, t);
    if (!a)
      return t[0].match(/^\d{4}/) ? (t.index += 4, null) : (t.index += t[0].length, null);
    const r = t.index + t[1].length, s = t[0].substring(t[1].length), i = e.createParsingResult(r, s, a);
    t.index += t[0].length;
    const o = e.text.substring(t.index), l = this.getFollowingTimePatternThroughCache().exec(o);
    return s.match(/^\d{3,4}/) && l && (l[0].match(/^\s*([+-])\s*\d{2,4}$/) || l[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/)) ? null : !l || l[0].match(/^\s*([+-])\s*\d{3,4}$/) ? this.checkAndReturnWithoutFollowingPattern(i) : (i.end = this.extractFollowingTimeComponents(e, l, i), i.end && (i.text += l[0]), this.checkAndReturnWithFollowingPattern(i));
  }
  extractPrimaryTimeComponents(e, t, a = !1) {
    const r = e.createParsingComponents();
    let s = 0, i = null, o = parseInt(t[Qe]);
    if (o > 100) {
      if (t[Qe].length == 4 && t[Z] == null && !t[se] || this.strictMode || t[Z] != null)
        return null;
      s = o % 100, o = Math.floor(o / 100);
    }
    if (o > 24)
      return null;
    if (t[Z] != null) {
      if (t[Z].length == 1 && !t[se])
        return null;
      s = parseInt(t[Z]);
    }
    if (s >= 60)
      return null;
    if (o > 12 && (i = p.PM), t[se] != null) {
      if (o > 12)
        return null;
      const c = t[se][0].toLowerCase();
      c == "a" && (i = p.AM, o == 12 && (o = 0)), c == "p" && (i = p.PM, o != 12 && (o += 12));
    }
    if (r.assign("hour", o), r.assign("minute", s), i !== null ? r.assign("meridiem", i) : o < 12 ? r.imply("meridiem", p.AM) : r.imply("meridiem", p.PM), t[Se] != null) {
      const c = parseInt(t[Se].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Oe] != null) {
      const c = parseInt(t[Oe]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    return r;
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = e.createParsingComponents();
    if (t[Se] != null) {
      const c = parseInt(t[Se].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Oe] != null) {
      const c = parseInt(t[Oe]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    let s = parseInt(t[Qe]), i = 0, o = -1;
    if (t[Z] != null ? i = parseInt(t[Z]) : s > 100 && (i = s % 100, s = Math.floor(s / 100)), i >= 60 || s > 24)
      return null;
    if (s >= 12 && (o = p.PM), t[se] != null) {
      if (s > 12)
        return null;
      const c = t[se][0].toLowerCase();
      c == "a" && (o = p.AM, s == 12 && (s = 0, r.isCertain("day") || r.imply("day", r.get("day") + 1))), c == "p" && (o = p.PM, s != 12 && (s += 12)), a.start.isCertain("meridiem") || (o == p.AM ? (a.start.imply("meridiem", p.AM), a.start.get("hour") == 12 && a.start.assign("hour", 0)) : (a.start.imply("meridiem", p.PM), a.start.get("hour") != 12 && a.start.assign("hour", a.start.get("hour") + 12)));
    }
    return r.assign("hour", s), r.assign("minute", i), o >= 0 ? r.assign("meridiem", o) : a.start.isCertain("meridiem") && a.start.get("hour") > 12 ? a.start.get("hour") - 12 > s ? r.imply("meridiem", p.AM) : s <= 12 && (r.assign("hour", s + 12), r.assign("meridiem", p.PM)) : s > 12 ? r.imply("meridiem", p.PM) : s <= 12 && r.imply("meridiem", p.AM), r.date().getTime() < a.start.date().getTime() && r.imply("day", r.get("day") + 1), r;
  }
  checkAndReturnWithoutFollowingPattern(e) {
    if (e.text.match(/^\d$/) || e.text.match(/^\d\d\d+$/) || e.text.match(/\d[apAP]$/))
      return null;
    const t = e.text.match(/[^\d:.](\d[\d.]+)$/);
    if (t) {
      const a = t[1];
      if (this.strictMode || a.includes(".") && !a.match(/\d(\.\d{2})+$/) || parseInt(a) > 24)
        return null;
    }
    return e;
  }
  checkAndReturnWithFollowingPattern(e) {
    if (e.text.match(/^\d+-\d+$/))
      return null;
    const t = e.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
    if (t) {
      if (this.strictMode)
        return null;
      const a = t[1], r = t[2];
      if (r.includes(".") && !r.match(/\d(\.\d{2})+$/))
        return null;
      const s = parseInt(r), i = parseInt(a);
      if (s > 24 || i > 24)
        return null;
    }
    return e;
  }
  getPrimaryTimePatternThroughCache() {
    const e = this.primaryPrefix(), t = this.primarySuffix();
    return this.cachedPrimaryPrefix === e && this.cachedPrimarySuffix === t ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = Dr(this.primaryPatternLeftBoundary(), e, t, this.patternFlags()), this.cachedPrimaryPrefix = e, this.cachedPrimarySuffix = t, this.cachedPrimaryTimePattern);
  }
  getFollowingTimePatternThroughCache() {
    const e = this.followingPhase(), t = this.followingSuffix();
    return this.cachedFollowingPhase === e && this.cachedFollowingSuffix === t ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = Mr(e, t), this.cachedFollowingPhase = e, this.cachedFollowingSuffix = t, this.cachedFollowingTimePatten);
  }
}
class Pr extends Er {
  constructor(e) {
    super(e);
  }
  followingPhase() {
    return "\\s*(?:\\-|\\–|\\~|\\〜|to|until|through|till|\\?)\\s*";
  }
  primaryPrefix() {
    return "(?:(?:at|from)\\s*)??";
  }
  primarySuffix() {
    return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
  }
  extractPrimaryTimeComponents(e, t) {
    const a = super.extractPrimaryTimeComponents(e, t);
    if (!a)
      return a;
    if (t[0].endsWith("night")) {
      const r = a.get("hour");
      r >= 6 && r < 12 ? (a.assign("hour", a.get("hour") + 12), a.assign("meridiem", p.PM)) : r < 6 && a.assign("meridiem", p.AM);
    }
    if (t[0].endsWith("afternoon")) {
      a.assign("meridiem", p.PM);
      const r = a.get("hour");
      r >= 0 && r <= 6 && a.assign("hour", a.get("hour") + 12);
    }
    return t[0].endsWith("morning") && (a.assign("meridiem", p.AM), a.get("hour") < 12 && a.assign("hour", a.get("hour"))), a.addTag("parser/ENTimeExpressionParser");
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = super.extractFollowingTimeComponents(e, t, a);
    return r && r.addTag("parser/ENTimeExpressionParser"), r;
  }
}
const Nr = new RegExp(`(${De})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), Or = new RegExp(`(${Ye})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
class Sr extends C {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? Or : Nr;
  }
  innerExtract(t, a) {
    const r = de(a[1]);
    return r ? P.createRelativeFromReference(t.reference, He(r)) : null;
  }
}
const Ar = new RegExp(`(${De})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), xr = new RegExp(`(${Ye})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), kr = 1;
class Hr extends C {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? xr : Ar;
  }
  innerExtract(t, a) {
    const r = de(a[kr]);
    return r ? P.createRelativeFromReference(t.reference, r) : null;
  }
}
class dn {
  refine(e, t) {
    return t.filter((a) => this.isValid(e, a));
  }
}
class Me {
  refine(e, t) {
    if (t.length < 2)
      return t;
    const a = [];
    let r = t[0], s = null;
    for (let i = 1; i < t.length; i++) {
      s = t[i];
      const o = e.text.substring(r.index + r.text.length, s.index);
      if (!this.shouldMergeResults(o, r, s, e))
        a.push(r), r = s;
      else {
        const c = r, l = s, u = this.mergeResults(o, c, l, e);
        e.debug(() => {
          console.log(`${this.constructor.name} merged ${c} and ${l} into ${u}`);
        }), r = u;
      }
    }
    return r != null && a.push(r), a;
  }
}
class Rr extends Me {
  shouldMergeResults(e, t, a) {
    return !t.end && !a.end && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    if (!t.start.isOnlyWeekdayComponent() && !a.start.isOnlyWeekdayComponent() && (a.start.getCertainComponents().forEach((s) => {
      t.start.isCertain(s) || t.start.imply(s, a.start.get(s));
    }), t.start.getCertainComponents().forEach((s) => {
      a.start.isCertain(s) || a.start.imply(s, t.start.get(s));
    })), t.start.date() > a.start.date()) {
      let s = t.start.date(), i = a.start.date();
      a.start.isOnlyWeekdayComponent() && F(i, { day: 7 }) > s ? (i = F(i, { day: 7 }), a.start.imply("day", i.getDate()), a.start.imply("month", i.getMonth() + 1), a.start.imply("year", i.getFullYear())) : t.start.isOnlyWeekdayComponent() && F(s, { day: -7 }) < i ? (s = F(s, { day: -7 }), t.start.imply("day", s.getDate()), t.start.imply("month", s.getMonth() + 1), t.start.imply("year", s.getFullYear())) : a.start.isDateWithUnknownYear() && F(i, { year: 1 }) > s ? (i = F(i, { year: 1 }), a.start.imply("year", i.getFullYear())) : t.start.isDateWithUnknownYear() && F(s, { year: -1 }) < i ? (s = F(s, { year: -1 }), t.start.imply("year", s.getFullYear())) : [a, t] = [t, a];
    }
    const r = t.clone();
    return r.start = t.start, r.end = a.start, r.index = Math.min(t.index, a.index), t.index < a.index ? r.text = t.text + e + a.text : r.text = a.text + e + t.text, r;
  }
}
class vr extends Rr {
  patternBetween() {
    return /^\s*(to|-|–|until|through|till)\s*$/i;
  }
}
function kt(n, e) {
  const t = n.clone(), a = n.start, r = e.start;
  if (t.start = Ht(a, r), n.end != null || e.end != null) {
    const s = n.end == null ? n.start : n.end, i = e.end == null ? e.start : e.end, o = Ht(s, i);
    if (n.end == null && o.date().getTime() < t.start.date().getTime()) {
      const c = new Date(o.date().getTime());
      c.setDate(c.getDate() + 1), o.isCertain("day") ? ae(o, c) : ie(o, c);
    }
    t.end = o;
  }
  return t;
}
function Ht(n, e) {
  const t = n.clone();
  e.isCertain("hour") ? (t.assign("hour", e.get("hour")), t.assign("minute", e.get("minute")), e.isCertain("second") ? (t.assign("second", e.get("second")), e.isCertain("millisecond") ? t.assign("millisecond", e.get("millisecond")) : t.imply("millisecond", e.get("millisecond"))) : (t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond")))) : (t.imply("hour", e.get("hour")), t.imply("minute", e.get("minute")), t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond"))), e.isCertain("timezoneOffset") && t.assign("timezoneOffset", e.get("timezoneOffset"));
  const a = n.get("meridiem") != null && (n.isCertain("meridiem") || Array.from(n.tags()).some((r) => r.startsWith("casualReference/")));
  return e.isCertain("meridiem") ? t.assign("meridiem", e.get("meridiem")) : e.get("meridiem") != null && !a && t.imply("meridiem", e.get("meridiem")), t.get("meridiem") == p.PM && t.get("hour") < 12 && (e.isCertain("hour") ? t.assign("hour", t.get("hour") + 12) : t.imply("hour", t.get("hour") + 12)), t.addTags(n.tags()), t.addTags(e.tags()), t;
}
class Fr extends Me {
  shouldMergeResults(e, t, a) {
    return (t.start.isOnlyDate() && a.start.isOnlyTime() || a.start.isOnlyDate() && t.start.isOnlyTime()) && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    const r = t.start.isOnlyDate() ? kt(t, a) : kt(a, t);
    return r.index = t.index, r.text = t.text + e + a.text, r;
  }
}
class Rt extends Fr {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
  }
}
const Cr = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
class Yr {
  constructor(e) {
    h(this, "timezoneOverrides");
    this.timezoneOverrides = e;
  }
  refine(e, t) {
    const a = e.option.timezones ?? {};
    return t.forEach((r) => {
      const s = e.text.substring(r.index + r.text.length), i = Cr.exec(s);
      if (!i)
        return;
      const o = i[1].toUpperCase(), c = r.start.date() ?? r.refDate ?? /* @__PURE__ */ new Date(), l = { ...this.timezoneOverrides, ...a }, u = nn(o, c, l);
      if (u == null)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${o}' into: ${u} for: ${r.start}`);
      });
      const f = r.start.get("timezoneOffset");
      f !== null && u != f && (r.start.isCertain("timezoneOffset") || o != i[1]) || r.start.isOnlyDate() && o != i[1] || (r.text += i[0], r.start.isCertain("timezoneOffset") || r.start.assign("timezoneOffset", u), r.end != null && !r.end.isCertain("timezoneOffset") && r.end.assign("timezoneOffset", u));
    }), t;
  }
}
const Wr = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), $r = 1, _r = 2, Ir = 3;
class Br {
  refine(e, t) {
    return t.forEach(function(a) {
      if (a.start.isCertain("timezoneOffset"))
        return;
      const r = e.text.substring(a.index + a.text.length), s = Wr.exec(r);
      if (!s)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${s[0]}' into : ${a}`);
      });
      const i = parseInt(s[_r]), o = parseInt(s[Ir] || "0");
      let c = i * 60 + o;
      c > 14 * 60 || (s[$r] === "-" && (c = -c), a.end != null && a.end.assign("timezoneOffset", c), a.start.assign("timezoneOffset", c), a.text += s[0]);
    }), t;
  }
}
class it {
  refine(e, t) {
    if (t.length < 2)
      return t;
    const a = [];
    let r = t[0];
    for (let s = 1; s < t.length; s++) {
      const i = t[s];
      if (i.index >= r.index + r.text.length) {
        a.push(r), r = i;
        continue;
      }
      let o = null, c = null;
      i.text.length > r.text.length ? (o = i, c = r) : (o = r, c = i), e.debug(() => {
        console.log(`${this.constructor.name} remove ${c} by ${o}`);
      }), r = o;
    }
    return r != null && a.push(r), a;
  }
}
function Ur(n, e, t) {
  const a = n.getDateWithAdjustedTimezone(), r = Lr(a, e, t);
  let s = new P(n);
  return s = s.addDurationAsImplied({ day: r }), s.assign("weekday", e), s;
}
function Lr(n, e, t) {
  const a = n.getDay();
  switch (t) {
    case "this":
      return oe(n, e);
    case "last":
      return mn(n, e);
    case "next":
      return a == S.SUNDAY ? e == S.SUNDAY ? 7 : e : a == S.SATURDAY ? e == S.SATURDAY ? 7 : e == S.SUNDAY ? 8 : 1 + e : e < a && e != S.SUNDAY ? oe(n, e) : oe(n, e) + 7;
  }
  return jr(n, e);
}
function jr(n, e) {
  const t = mn(n, e), a = oe(n, e);
  return a < -t ? a : t;
}
function oe(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a < 0 && (a += 7), a;
}
function mn(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a >= 0 && (a -= 7), a;
}
class Gr {
  refine(e, t) {
    return e.option.forwardDate && t.forEach((a) => {
      let r = e.reference.getDateWithAdjustedTimezone();
      if (a.start.isOnlyTime() && e.reference.instant > a.start.date()) {
        const s = e.reference.getDateWithAdjustedTimezone(), i = new Date(s);
        i.setDate(i.getDate() + 1), ie(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} time from the ref date (${s}) to the following day (${i})`);
        }), a.end && a.end.isOnlyTime() && (ie(a.end, i), a.start.date() > a.end.date() && (i.setDate(i.getDate() + 1), ie(a.end, i)));
      }
      if (a.start.isOnlyWeekdayComponent() && r > a.start.date()) {
        let s = oe(r, a.start.get("weekday")) || 7;
        const i = F(r, { day: s });
        if (ie(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} weekday (${a.start})`);
        }), a.end && a.start.date() > a.end.date()) {
          let o = oe(r, a.start.get("weekday")) || 7;
          const c = F(r, { day: o });
          ie(a.end, c), e.debug(() => {
            console.log(`${this.constructor.name} adjusted ${a} weekday (${a.end})`);
          });
        }
      }
      if (a.start.isDateWithUnknownYear() && r > a.start.date())
        for (let s = 0; s < 3 && r > a.start.date(); s++)
          a.start.imply("year", a.start.get("year") + 1), e.debug(() => {
            console.log(`${this.constructor.name} adjusted ${a} year (${a.start})`);
          }), a.end && !a.end.isCertain("year") && (a.end.imply("year", a.end.get("year") + 1), e.debug(() => {
            console.log(`${this.constructor.name} adjusted ${a} month (${a.start})`);
          }));
    }), t;
  }
}
class zr extends dn {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  isValid(t, a) {
    return a.text.replace(" ", "").match(/^\d*(\.\d*)?$/) ? (t.debug(() => {
      console.log(`Removing unlikely result '${a.text}'`);
    }), !1) : a.start.isValidDate() ? a.end && !a.end.isValidDate() ? (t.debug(() => {
      console.log(`Removing invalid result: ${a} (${a.end})`);
    }), !1) : this.strictMode ? this.isStrictModeValid(t, a) : !0 : (t.debug(() => {
      console.log(`Removing invalid result: ${a} (${a.start})`);
    }), !1);
  }
  isStrictModeValid(t, a) {
    return a.start.isOnlyWeekdayComponent() ? (t.debug(() => {
      console.log(`(Strict) Removing weekday only component: ${a} (${a.end})`);
    }), !1) : !0;
  }
}
const Vr = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), Kr = 1, qr = 2, Qr = 3, vt = 4, Xr = 5, Ft = 6, Ct = 7, Jr = 8, Yt = 9, Wt = 10;
class Zr extends C {
  innerPattern() {
    return Vr;
  }
  innerExtract(e, t) {
    const a = e.createParsingComponents({
      year: parseInt(t[Kr]),
      month: parseInt(t[qr]),
      day: parseInt(t[Qr])
    });
    if (t[vt] != null && (a.assign("hour", parseInt(t[vt])), a.assign("minute", parseInt(t[Xr])), t[Ft] != null && a.assign("second", parseInt(t[Ft])), t[Ct] != null && a.assign("millisecond", parseInt(t[Ct])), t[Jr] != null)) {
      let r = 0;
      if (t[Yt]) {
        const s = parseInt(t[Yt]);
        let i = 0;
        t[Wt] != null && (i = parseInt(t[Wt])), r = s * 60, r < 0 ? r -= i : r += i;
      }
      a.assign("timezoneOffset", r);
    }
    return a.addTag("parser/ISOFormatParser");
  }
}
class es extends Me {
  mergeResults(e, t, a) {
    const r = a.clone();
    return r.index = t.index, r.text = t.text + e + r.text, r.start.assign("weekday", t.start.get("weekday")), r.end && r.end.assign("weekday", t.start.get("weekday")), r;
  }
  shouldMergeResults(e, t, a) {
    return t.start.isOnlyWeekdayComponent() && !t.start.isCertain("hour") && a.start.isCertain("day") && e.match(/^,?\s*$/) != null;
  }
}
function ts(n, e = !1) {
  return n.parsers.unshift(new Zr()), n.refiners.unshift(new es()), n.refiners.unshift(new Br()), n.refiners.unshift(new it()), n.refiners.push(new Yr()), n.refiners.push(new it()), n.refiners.push(new Gr()), n.refiners.push(new zr(e)), n;
}
function ns(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new P(n, {});
  return ae(t, e), tn(t, e), t.assign("timezoneOffset", n.getTimezoneOffset()), t.addTag("casualReference/now"), t;
}
function as(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new P(n, {});
  return ae(t, e), lt(t, e), t.delete("meridiem"), t.addTag("casualReference/today"), t;
}
function rs(n) {
  return is(n).addTag("casualReference/yesterday");
}
function ss(n) {
  return ut(n, 1).addTag("casualReference/tomorrow");
}
function is(n, e) {
  return ut(n, -1);
}
function ut(n, e) {
  const t = n.getDateWithAdjustedTimezone(), a = new P(n, {}), r = new Date(t.getTime());
  return r.setDate(r.getDate() + e), ae(a, r), lt(a, r), a.delete("meridiem"), a;
}
function os(n, e = 22) {
  const t = n.getDateWithAdjustedTimezone(), a = new P(n, {});
  return ae(a, t), a.imply("hour", e), a.imply("meridiem", p.PM), a.addTag("casualReference/tonight"), a;
}
function cs(n, e = 20) {
  const t = new P(n, {});
  return t.imply("meridiem", p.PM), t.imply("hour", e), t.addTag("casualReference/evening"), t;
}
function ls(n) {
  const e = new P(n, {});
  return n.getDateWithAdjustedTimezone().getHours() > 2 && e.addDurationAsImplied({ day: 1 }), e.assign("hour", 0), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/midnight"), e;
}
function us(n, e = 6) {
  const t = new P(n, {});
  return t.imply("meridiem", p.AM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/morning"), t;
}
function ds(n, e = 15) {
  const t = new P(n, {});
  return t.imply("meridiem", p.PM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/afternoon"), t;
}
function ms(n) {
  const e = new P(n, {});
  return e.imply("meridiem", p.AM), e.assign("hour", 12), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/noon"), e;
}
const fs = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
class hs extends C {
  innerPattern(e) {
    return fs;
  }
  innerExtract(e, t) {
    let a = e.refDate;
    const r = t[0].toLowerCase();
    let s = e.createParsingComponents();
    switch (r) {
      case "now":
        s = ns(e.reference);
        break;
      case "today":
        s = as(e.reference);
        break;
      case "yesterday":
        s = rs(e.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        s = ss(e.reference);
        break;
      case "tonight":
        s = os(e.reference);
        break;
      case "overmorrow":
        s = ut(e.reference, 2);
        break;
      default:
        if (r.match(/last\s*night/)) {
          if (a.getHours() > 6) {
            const i = new Date(a.getTime());
            i.setDate(i.getDate() - 1), a = i;
          }
          ae(s, a), s.imply("hour", 0);
        }
        break;
    }
    return s.addTag("parser/ENCasualDateParser"), s;
  }
}
const gs = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
class ys extends C {
  innerPattern() {
    return gs;
  }
  innerExtract(e, t) {
    let a = null;
    switch (t[1].toLowerCase()) {
      case "afternoon":
        a = ds(e.reference);
        break;
      case "evening":
      case "night":
        a = cs(e.reference);
        break;
      case "midnight":
        a = ls(e.reference);
        break;
      case "morning":
        a = us(e.reference);
        break;
      case "noon":
      case "midday":
        a = ms(e.reference);
        break;
    }
    return a && a.addTag("parser/ENCasualTimeParser"), a;
  }
}
const ps = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${z(at)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), Ts = 1, ws = 2, bs = 3;
class Ds extends C {
  innerPattern() {
    return ps;
  }
  innerExtract(e, t) {
    const a = t[Ts], r = t[bs];
    let s = a || r;
    s = s || "", s = s.toLowerCase();
    let i = null;
    s == "last" || s == "past" ? i = "last" : s == "next" ? i = "next" : s == "this" && (i = "this");
    const o = t[ws].toLowerCase();
    let c;
    if (at[o] !== void 0)
      c = at[o];
    else if (o == "weekend")
      c = i == "last" ? S.SUNDAY : S.SATURDAY;
    else if (o == "weekday") {
      const l = e.reference.getDateWithAdjustedTimezone().getDay();
      l == S.SUNDAY || l == S.SATURDAY ? c = i == "last" ? S.FRIDAY : S.MONDAY : (c = l - 1, c = i == "last" ? c - 1 : c + 1, c = c % 5 + 1);
    } else
      return null;
    return Ur(e.reference, c, i);
  }
}
const Ms = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${z(ve)})(?=\\s*)(?=\\W|$)`, "i"), Es = 1, Ps = 2;
class Ns extends C {
  innerPattern() {
    return Ms;
  }
  innerExtract(e, t) {
    const a = t[Es].toLowerCase(), r = t[Ps].toLowerCase(), s = ve[r];
    if (a == "next" || a.startsWith("after")) {
      const c = {};
      return c[s] = 1, P.createRelativeFromReference(e.reference, c);
    }
    if (a == "last" || a == "past") {
      const c = {};
      return c[s] = -1, P.createRelativeFromReference(e.reference, c);
    }
    const i = e.createParsingComponents();
    let o = new Date(e.reference.instant.getTime());
    return r.match(/week/i) ? (o.setDate(o.getDate() - o.getDay()), i.imply("day", o.getDate()), i.imply("month", o.getMonth() + 1), i.imply("year", o.getFullYear())) : r.match(/month/i) ? (o.setDate(1), i.imply("day", o.getDate()), i.assign("year", o.getFullYear()), i.assign("month", o.getMonth() + 1)) : r.match(/year/i) && (o.setDate(1), o.setMonth(0), i.imply("day", o.getDate()), i.imply("month", o.getMonth() + 1), i.assign("year", o.getFullYear())), i;
  }
}
const Os = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), Ss = 1, As = 5, $t = 2, _t = 3, Xe = 4;
class xs {
  constructor(e) {
    h(this, "groupNumberMonth");
    h(this, "groupNumberDay");
    this.groupNumberMonth = e ? _t : $t, this.groupNumberDay = e ? $t : _t;
  }
  pattern() {
    return Os;
  }
  extract(e, t) {
    const a = t.index + t[Ss].length, r = t.index + t[0].length - t[As].length;
    if (a > 0 && e.text.substring(0, a).match("\\d/?$") || r < e.text.length && e.text.substring(r).match("^/?\\d"))
      return;
    const s = e.text.substring(a, r);
    if (s.match(/^\d\.\d$/) || s.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/) || !t[Xe] && s.indexOf("/") < 0)
      return;
    const i = e.createParsingResult(a, s);
    let o = parseInt(t[this.groupNumberMonth]), c = parseInt(t[this.groupNumberDay]);
    if ((o < 1 || o > 12) && o > 12)
      if (c >= 1 && c <= 12 && o <= 31)
        [c, o] = [o, c];
      else
        return null;
    if (c < 1 || c > 31)
      return null;
    if (i.start.assign("day", c), i.start.assign("month", o), t[Xe]) {
      const l = parseInt(t[Xe]), u = rn(l);
      i.start.assign("year", u);
    } else {
      const l = Re(e.refDate, c, o);
      i.start.imply("year", l);
    }
    return i.addTag("parser/SlashDateFormatParser");
  }
}
const ks = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${De})(?=\\W|$)`, "i"), Hs = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Ye})(?=\\W|$)`, "i");
class Rs extends C {
  constructor(t = !0) {
    super();
    h(this, "allowAbbreviations");
    this.allowAbbreviations = t;
  }
  innerPattern() {
    return this.allowAbbreviations ? ks : Hs;
  }
  innerExtract(t, a) {
    const r = a[1].toLowerCase();
    let s = de(a[2]);
    if (!s)
      return null;
    switch (r) {
      case "last":
      case "past":
      case "-":
        s = He(s);
        break;
    }
    return P.createRelativeFromReference(t.reference, s);
  }
}
function vs(n) {
  return n.text.match(/^[+-]/i) != null;
}
function It(n) {
  return n.text.match(/^-/i) != null;
}
class Fs extends Me {
  shouldMergeResults(e, t, a) {
    return e.match(/^\s*$/i) ? vs(a) || It(a) : !1;
  }
  mergeResults(e, t, a, r) {
    let s = de(a.text);
    It(a) && (s = He(s));
    const i = P.createRelativeFromReference(ne.fromDate(t.start.date()), s);
    return new ue(t.reference, t.index, `${t.text}${e}${a.text}`, i);
  }
}
function Bt(n) {
  return n.text.match(/\s+(before|from)$/i) != null;
}
function Cs(n) {
  return n.text.match(/\s+(after|since)$/i) != null;
}
class Ys extends Me {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(e, t, a) {
    return !e.match(this.patternBetween()) || !Bt(t) && !Cs(t) ? !1 : !!a.start.get("day") && !!a.start.get("month") && !!a.start.get("year");
  }
  mergeResults(e, t, a) {
    let r = de(t.text);
    Bt(t) && (r = He(r));
    const s = P.createRelativeFromReference(ne.fromDate(a.start.date()), r);
    return new ue(a.reference, t.index, `${t.text}${e}${a.text}`, s);
  }
}
const Ws = new RegExp(`^\\s*(${Fe})`, "i"), $s = 1;
class _s {
  refine(e, t) {
    return t.forEach(function(a) {
      if (!a.start.isDateWithUnknownYear())
        return;
      const r = e.text.substring(a.index + a.text.length), s = Ws.exec(r);
      if (!s || s[0].trim().length <= 3)
        return;
      e.debug(() => {
        console.log(`Extracting year: '${s[0]}' into : ${a}`);
      });
      const i = Ce(s[$s]);
      a.end != null && a.end.assign("year", i), a.start.assign("year", i), a.text += s[0];
    }), t;
  }
}
class Is extends dn {
  constructor() {
    super();
  }
  isValid(e, t) {
    const a = t.text.trim();
    return a === e.text.trim() ? !0 : a.toLowerCase() === "may" && !e.text.substring(0, t.index).trim().match(/\b(in)$/i) ? (e.debug(() => {
      console.log(`Removing unlikely result: ${t}`);
    }), !1) : a.toLowerCase().endsWith("the second") ? (e.text.substring(t.index + t.text.length).trim().length > 0 && e.debug(() => {
      console.log(`Removing unlikely result: ${t}`);
    }), !1) : !0;
  }
}
class fn {
  createCasualConfiguration(e = !1) {
    const t = this.createConfiguration(!1, e);
    return t.parsers.push(new hs()), t.parsers.push(new ys()), t.parsers.push(new dr()), t.parsers.push(new Ns()), t.parsers.push(new Rs()), t.refiners.push(new Is()), t;
  }
  createConfiguration(e = !0, t = !1) {
    const a = ts({
      parsers: [
        new xs(t),
        new tr(e),
        new rr(),
        new or(t),
        new Ds(),
        new br(),
        new Pr(e),
        new Sr(e),
        new Hr(e)
      ],
      refiners: [new Rt()]
    }, e);
    return a.parsers.unshift(new yr(e)), a.refiners.unshift(new Ys()), a.refiners.unshift(new Fs()), a.refiners.unshift(new it()), a.refiners.push(new Rt()), a.refiners.push(new _s()), a.refiners.push(new vr()), a;
  }
}
class ce {
  constructor(e) {
    h(this, "parsers");
    h(this, "refiners");
    h(this, "defaultConfig", new fn());
    e = e || this.defaultConfig.createCasualConfiguration(), this.parsers = [...e.parsers], this.refiners = [...e.refiners];
  }
  clone() {
    return new ce({
      parsers: [...this.parsers],
      refiners: [...this.refiners]
    });
  }
  parseDate(e, t, a) {
    const r = this.parse(e, t, a);
    return r.length > 0 ? r[0].start.date() : null;
  }
  parse(e, t, a) {
    const r = new Bs(e, t, a);
    let s = [];
    return this.parsers.forEach((i) => {
      const o = ce.executeParser(r, i);
      s = s.concat(o);
    }), s.sort((i, o) => i.index - o.index), this.refiners.forEach(function(i) {
      s = i.refine(r, s);
    }), s;
  }
  static executeParser(e, t) {
    const a = [], r = t.pattern(e), s = e.text;
    let i = e.text, o = r.exec(i);
    for (; o; ) {
      const c = o.index + s.length - i.length;
      o.index = c;
      const l = t.extract(e, o);
      if (!l) {
        i = s.substring(o.index + 1), o = r.exec(i);
        continue;
      }
      let u = null;
      l instanceof ue ? u = l : l instanceof P ? (u = e.createParsingResult(o.index, o[0]), u.start = l) : u = e.createParsingResult(o.index, o[0], l);
      const f = u.index, D = u.text;
      e.debug(() => console.log(`${t.constructor.name} extracted (at index=${f}) '${D}'`)), a.push(u), i = s.substring(f + D.length), o = r.exec(i);
    }
    return a;
  }
}
class Bs {
  constructor(e, t, a) {
    h(this, "text");
    h(this, "option");
    h(this, "reference");
    h(this, "refDate");
    this.text = e, this.option = a ?? {}, this.reference = ne.fromInput(t, this.option.timezones), this.refDate = this.reference.instant;
  }
  createParsingComponents(e) {
    return e instanceof P ? e : new P(this.reference, e);
  }
  createParsingResult(e, t, a, r) {
    const s = typeof t == "string" ? t : this.text.substring(e, t), i = a ? this.createParsingComponents(a) : null, o = r ? this.createParsingComponents(r) : null;
    return new ue(this.reference, e, s, i, o);
  }
  debug(e) {
    this.option.debug && (this.option.debug instanceof Function ? this.option.debug(e) : this.option.debug.debug(e));
  }
}
const dt = new fn(), Us = new ce(dt.createCasualConfiguration(!1));
new ce(dt.createConfiguration(!0, !1));
new ce(dt.createCasualConfiguration(!0));
const Ls = Us;
function js(n, e, t) {
  return Ls.parse(n, e, t);
}
const Gs = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, zs = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i, Vs = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, Ks = /^(this|last|next)\s+(week|month)$/i, qs = /^(end|beginning)\s+of\s+(this|next)\s+month$/i, Qs = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i, Xs = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i, Js = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i, Zs = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i, ei = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i, ti = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i, ni = /^(christmas|halloween|valentine|new\s+year|independence\s+day|veterans\s+day|st\.?\s+patrick|cinco\s+de\s+mayo|labour\s+day|songkran|chakri\s+memorial\s+day|coronation\s+day|queen\s+suthida's\s+birthday|king's\s+birthday|the\s+queen\s+mother's\s+birthday|king\s+bhumibol\s+adulyadej\s+memorial\s+day|king\s+chulalongkorn\s+day|king\s+bhumibol\s+adulyadej's\s+birthday|constitution\s+day)\s+(\d{4})$/i, hn = {
  christmas: [12, 25],
  "christmas day": [12, 25],
  "new year": [1, 1],
  "new years": [1, 1],
  "new year's": [1, 1],
  "new year's day": [1, 1],
  "new year's eve": [12, 31],
  "new years eve": [12, 31],
  halloween: [10, 31],
  "halloween day": [10, 31],
  valentine: [2, 14],
  "valentine's day": [2, 14],
  "valentines day": [2, 14],
  "independence day": [7, 4],
  "july 4th": [7, 4],
  "july fourth": [7, 4],
  "st. patrick's day": [3, 17],
  "st patricks day": [3, 17],
  "cinco de mayo": [5, 5],
  "veterans day": [11, 11],
  // Thai fixed holidays (from th-holidays.json source)
  "chakri memorial day": [4, 6],
  "songkran festival": [4, 13],
  "coronation day": [5, 4],
  "queen suthida's birthday": [6, 3],
  "king's birthday": [7, 28],
  "the queen mother's birthday": [8, 12],
  "king bhumibol adulyadej memorial day": [10, 13],
  "king chulalongkorn day": [10, 23],
  "king bhumibol adulyadej's birthday": [12, 5],
  "constitution day": [12, 10],
  // Custom holidays (from custom-holidays.json)
  "labour day": [5, 1]
}, Je = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}, ai = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
}, ri = {
  a: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};
function si(n, e, t) {
  const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = new Date(t.getFullYear(), n - 1, e);
  return r >= a ? r : new Date(t.getFullYear() + 1, n - 1, e);
}
function Ze(n, e) {
  const t = n.toLowerCase().trim().replace(/^next\s+/, ""), a = hn[t];
  return a ? si(a[0], a[1], e) : null;
}
function et(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? le(n, e) : a.startsWith("week") ? pe(n, e) : a.startsWith("month") ? te(n, e) : n;
}
function ii(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? nt(n, e) : a.startsWith("week") ? Zt(n, e) : a.startsWith("month") ? ct(n, e) : n;
}
function oi(n, e, t = !1) {
  const a = tt(n);
  let r = e - a;
  return (r < 0 || !t && r === 0) && (r += 7), le(n, r);
}
function Ut(n, e, t, a) {
  if (a > 0) {
    const r = new Date(n, e, 1), s = tt(r);
    let i = t - s;
    i < 0 && (i += 7);
    const o = new Date(n, e, 1 + i + (a - 1) * 7);
    return o.getMonth() !== e ? null : o;
  } else {
    const r = new Date(n, e + 1, 0);
    let i = tt(r) - t;
    return i < 0 && (i += 7), new Date(n, e, r.getDate() - i);
  }
}
function ci(n) {
  const t = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ].indexOf(n.toLowerCase());
  return t === -1 ? null : t;
}
function gn(n, e = /* @__PURE__ */ new Date()) {
  var B;
  const t = n.trim();
  if (!t) return null;
  const a = t.toLowerCase(), r = t.match(Gs);
  if (r) {
    const d = parseInt(r[1], 10);
    return { range: [e, et(e, d, r[2])], text: n };
  }
  const s = t.match(zs);
  if (s) {
    const d = parseInt(s[1], 10);
    return { single: et(e, d, s[2]), text: n };
  }
  const i = t.match(Vs);
  if (i) {
    const d = parseInt(i[1], 10);
    return { range: [ii(e, d, i[2]), e], text: n };
  }
  const o = t.match(Ks);
  if (o) {
    const d = o[1].toLowerCase(), y = o[2].toLowerCase(), g = { weekStartsOn: 1 };
    if (y === "week") {
      const k = d === "last" ? Zt(e, 1) : d === "next" ? pe(e, 1) : e;
      return { range: [Q(k, g), ot(k, g)], text: n };
    }
    if (y === "month") {
      const k = d === "last" ? ct(e, 1) : d === "next" ? te(e, 1) : e;
      return { range: [we(k), Te(k)], text: n };
    }
  }
  const c = a.match(qs);
  if (c) {
    const y = c[2] === "next" ? te(e, 1) : e;
    return { single: c[1] === "end" ? Te(y) : we(y), text: n };
  }
  const l = a.match(ni);
  if (l) {
    const d = l[1], y = parseInt(l[2], 10), g = hn[d];
    if (g)
      return { single: new Date(y, g[0] - 1, g[1]), text: n };
  }
  const u = a.match(Qs);
  if (u) {
    const d = parseInt(u[1], 10), y = u[2] === "next" ? te(e, 1) : e;
    return { single: new Date(y.getFullYear(), y.getMonth(), d), text: n };
  }
  const f = a.match(Xs);
  if (f) {
    const d = f[1], y = Je[f[2]], g = ci(f[3]);
    if (g !== null && y !== void 0) {
      const k = d === "last" ? -1 : ai[d] ?? 1, H = e.getFullYear();
      let $ = Ut(H, g, y, k);
      if ((!$ || $ < e) && ($ = Ut(H + 1, g, y, k)), $) return { single: $, text: n };
    }
  }
  const D = a.match(Js);
  if (D) {
    const d = Je[D[1]];
    return { single: oi(e, d, !1), text: n };
  }
  const M = a.match(Zs);
  if (M) {
    const d = M[1].startsWith("after") ? 2 : -2;
    return { single: le(e, d), text: n };
  }
  const N = a.match(ei);
  if (N) {
    const d = Je[N[1]], y = pe(e, 1), g = Sa(y, d, { weekStartsOn: 1 });
    return { single: pe(g, 1), text: n };
  }
  const m = a.match(ti);
  if (m) {
    const d = m[1], y = ri[d] ?? parseInt(d, 10), g = m[2], k = m[3], H = gn(k, e), $ = (H == null ? void 0 : H.single) ?? ((B = H == null ? void 0 : H.range) == null ? void 0 : B[0]);
    if ($) return { single: et($, y, g), text: n };
  }
  const A = js(t, e);
  if (A.length > 0) {
    const d = A.find((y) => y.end != null);
    if (d) return { range: [d.start.date(), d.end.date()], text: n };
    if (A.length >= 2) {
      const y = A[0].start.date(), g = A[1].start.date();
      return { range: [y < g ? y : g, y < g ? g : y], text: n };
    }
    return { single: A[0].start.date(), text: n };
  }
  const x = t.match(/^(.+?)\s+to\s+(.+)$/i);
  if (x) {
    const d = Ze(x[1], e), y = Ze(x[2], d ?? e);
    if (d && y) return { range: [d, y], text: n };
  }
  const Y = Ze(t, e);
  return Y ? { single: Y, text: n } : null;
}
function li() {
  const [n, e] = j(null), [t, a] = j(""), r = v((s) => {
    a(s), e(gn(s));
  }, []);
  return { inputValue: t, preview: n, handleChange: r, setInputValue: a, setPreview: e };
}
function I(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function ui({
  selectionMode: n,
  locale: e,
  onCommit: t
}) {
  const { inputValue: a, preview: r, handleChange: s, setInputValue: i, setPreview: o } = li(), c = () => {
    if (!r) return;
    const u = {
      single: r.single ? I(r.single) : void 0,
      range: r.range ? [I(r.range[0]), I(r.range[1])] : void 0
    };
    t(u), i(""), o(null);
  }, l = (() => {
    if (!r) return null;
    if (r.range) {
      const u = (f) => f.toLocaleDateString(e === "th" ? "th-TH" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
      return `${u(r.range[0])} – ${u(r.range[1])}`;
    }
    return r.single ? r.single.toLocaleDateString(e === "th" ? "th-TH" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }) : null;
  })();
  return /* @__PURE__ */ W("div", { className: "dp-nl-input", children: [
    /* @__PURE__ */ T(
      "input",
      {
        className: "dp-nl-field",
        type: "text",
        value: a,
        onChange: (u) => s(u.target.value),
        onKeyDown: (u) => {
          u.key === "Enter" && c();
        },
        onBlur: c,
        placeholder: n === "range" ? "e.g. Jan 1 - Jan 15 2024" : "e.g. next Friday",
        "aria-label": "Natural language date input (English only)"
      }
    ),
    l && /* @__PURE__ */ T("div", { className: "dp-nl-preview", "aria-live": "polite", children: l })
  ] });
}
function di({ isOpen: n, position: e, popoverRef: t, children: a }) {
  return n ? wn(
    /* @__PURE__ */ T(
      "div",
      {
        ref: t,
        className: "dp-popover",
        style: {
          position: "absolute",
          top: e.top,
          left: e.left,
          zIndex: 9999
        },
        role: "dialog",
        "aria-modal": "true",
        children: a
      }
    ),
    document.body
  ) : null;
}
function mi({ value: n, onChange: e }) {
  const [t, a] = j(null), [r, s] = j(null), i = v(
    (l) => {
      if (r === null)
        s(l), e(null);
      else {
        const u = ye(l, r) ? l : r, f = ye(l, r) ? r : l;
        e([u, f]), s(null), a(null);
      }
    },
    [r, e]
  ), o = v(
    (l) => {
      r !== null && a(l);
    },
    [r]
  ), c = (() => {
    if (r && t) {
      const l = ye(t, r) ? t : r, u = ye(t, r) ? r : t;
      return [l, u];
    }
    return n;
  })();
  return {
    pendingStart: r,
    hoverDate: t,
    previewRange: c,
    handleDayClick: i,
    handleDayHover: o
  };
}
const Lt = 8, jt = 4;
function fi(n) {
  const { triggerRect: e, popoverRect: t, viewportWidth: a, viewportHeight: r, scrollX: s, scrollY: i } = n, o = r - e.bottom, c = e.top, l = o >= t.height || o >= c ? "bottom" : "top";
  let u = e.left + s;
  return u + t.width > a && (u = a - t.width - Lt), u = Math.max(Lt, u), { top: l === "bottom" ? e.bottom + i + jt : e.top + i - t.height - jt, left: u, placement: l };
}
function hi() {
  const [n, e] = j(!1), [t, a] = j({
    top: 0,
    left: 0,
    placement: "bottom"
  }), r = ht(null), s = ht(null), i = v(() => e(!0), []), o = v(() => e(!1), []), c = v(() => e((u) => !u), []), l = v(() => {
    !r.current || !s.current || a(
      fi({
        triggerRect: r.current.getBoundingClientRect(),
        popoverRect: s.current.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      })
    );
  }, []);
  return Gt(() => {
    if (!n) return;
    const u = requestAnimationFrame(l), f = (M) => {
      s.current && !s.current.contains(M.target) && r.current && !r.current.contains(M.target) && o();
    }, D = (M) => {
      M.key === "Escape" && o();
    };
    return document.addEventListener("mousedown", f), document.addEventListener("keydown", D), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      cancelAnimationFrame(u), document.removeEventListener("mousedown", f), document.removeEventListener("keydown", D), window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [n, o, l]), { isOpen: n, open: i, close: o, toggle: c, position: t, triggerRef: r, popoverRef: s };
}
function gi(n) {
  const e = {};
  return n.fontFamily && (e["--dp-font-family"] = n.fontFamily), n.fontSize && (e["--dp-font-size"] = n.fontSize), n.primaryColor && (e["--dp-primary"] = n.primaryColor), n.primaryTextColor && (e["--dp-primary-text"] = n.primaryTextColor), n.rangeColor && (e["--dp-range"] = n.rangeColor), n.textColor && (e["--dp-text"] = n.textColor), n.mutedTextColor && (e["--dp-muted"] = n.mutedTextColor), n.backgroundColor && (e["--dp-bg"] = n.backgroundColor), n.surfaceColor && (e["--dp-surface"] = n.surfaceColor), n.borderColor && (e["--dp-border"] = n.borderColor), n.borderRadius && (e["--dp-radius"] = n.borderRadius), n.daySize != null && (e["--dp-day-size"] = `${n.daySize}px`), n.shadow && (e["--dp-shadow"] = n.shadow), e;
}
const yi = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  primaryColor: "#2563EB",
  primaryTextColor: "#FFFFFF",
  rangeColor: "#DBEAFE",
  textColor: "#111827",
  mutedTextColor: "#9CA3AF",
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F3F4F6",
  borderColor: "#E5E7EB",
  borderRadius: "12px",
  daySize: 36,
  shadow: "0 4px 16px rgba(0,0,0,0.10)"
};
function Mi({
  numberOfMonths: n = 1,
  selectionMode: e = "single",
  value: t = null,
  onChange: a,
  locale: r = "en",
  theme: s,
  presets: i,
  customHolidays: o = [],
  holidayTypes: c = ["public"],
  showNaturalLanguageInput: l = !1,
  showPresets: u = !1,
  showHolidays: f = !0,
  showWeekNumbers: D = !1,
  minDate: M,
  maxDate: N,
  disabledDates: m,
  weekStartsOn: A = 0,
  calendarSystem: x = "gregorian",
  mode: Y = "inline",
  triggerFormat: B,
  className: d
}) {
  const y = zt(() => gi({ ...yi, ...s }), [s]), g = hi(), [k, H] = j(() => {
    const E = I(/* @__PURE__ */ new Date());
    if (Array.isArray(t) && t[0]) {
      const O = I(t[0]);
      return new Date(O.getFullYear(), O.getMonth(), 1);
    }
    if (t instanceof Date) {
      const O = I(t);
      return new Date(O.getFullYear(), O.getMonth(), 1);
    }
    return new Date(E.getFullYear(), E.getMonth(), 1);
  }), $ = new Date(k.getFullYear(), k.getMonth() + 1, 1), [We, $e] = j(""), _e = e === "single" && t instanceof Date ? t : null, me = e === "range" && Array.isArray(t) ? t : null, { pendingStart: Ie, previewRange: mt, handleDayClick: Ee, handleDayHover: R } = mi({
    value: me,
    onChange: (E) => a == null ? void 0 : a(E)
  }), V = v(
    (E) => {
      a == null || a(I(E)), Y === "popover" && g.close();
    },
    [a, Y, g]
  ), J = v(
    (E) => {
      const O = Ie !== null;
      Ee(E), Y === "popover" && O && g.close();
    },
    [Ie, Ee, Y, g]
  ), fe = v(
    (E) => {
      a == null || a(E);
    },
    [a]
  ), Be = v(
    (E) => {
      if (e === "single" && E.single) {
        const O = I(E.single);
        a == null || a(O), H(new Date(O.getFullYear(), O.getMonth(), 1));
      } else if (e === "range" && E.range) {
        const O = [I(E.range[0]), I(E.range[1])];
        a == null || a(O), H(new Date(O[0].getFullYear(), O[0].getMonth(), 1));
      } else if (e === "range" && E.single) {
        const O = I(E.single);
        a == null || a([O, O]), H(new Date(O.getFullYear(), O.getMonth(), 1));
      } else if (E.single) {
        const O = I(E.single);
        a == null || a(O), H(new Date(O.getFullYear(), O.getMonth(), 1));
      }
    },
    [e, a]
  ), Ue = e === "range" ? J : V, Le = "dd MMM yyyy", je = (() => {
    const E = B ?? Le;
    return Array.isArray(t) && t[0] && t[1] ? `${ze(t[0], E)} - ${ze(t[1], E)}` : t instanceof Date ? ze(t, E) : "Select date";
  })(), Pe = {
    selectionMode: e,
    selectedDate: _e,
    rangeValue: me,
    previewRange: mt,
    onDayClick: Ue,
    onDayHover: e === "range" ? R : () => {
    },
    onAnnounce: $e,
    config: {
      locale: r,
      calendarSystem: x,
      weekStartsOn: A,
      showWeekNumbers: D,
      showHolidays: f,
      holidayTypes: c,
      customHolidays: o,
      minDate: M,
      maxDate: N,
      disabledDates: m
    }
  }, Ne = /* @__PURE__ */ W(
    "div",
    {
      className: ["dp-calendar-panel", d].filter(Boolean).join(" "),
      "data-datepicker-root": !0,
      style: y,
      children: [
        l && /* @__PURE__ */ T(
          ui,
          {
            selectionMode: e,
            locale: r,
            onCommit: Be
          }
        ),
        u && e === "range" && /* @__PURE__ */ T(
          Ga,
          {
            presets: i,
            value: me,
            onSelect: fe
          }
        ),
        /* @__PURE__ */ W("div", { className: `dp-months dp-months--${n}`, children: [
          /* @__PURE__ */ T(
            Dt,
            {
              ...Pe,
              month: k,
              onMonthChange: H
            }
          ),
          n === 2 && /* @__PURE__ */ T(
            Dt,
            {
              ...Pe,
              month: $,
              onMonthChange: (E) => H(new Date(E.getFullYear(), E.getMonth() - 1, 1))
            }
          )
        ] }),
        /* @__PURE__ */ T(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "dp-sr-only",
            children: We
          }
        )
      ]
    }
  );
  return Y === "popover" ? /* @__PURE__ */ W(Tn, { children: [
    /* @__PURE__ */ T(
      "button",
      {
        ref: g.triggerRef,
        className: "dp-trigger",
        onClick: g.toggle,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": g.isOpen,
        children: je
      }
    ),
    /* @__PURE__ */ T(
      di,
      {
        isOpen: g.isOpen,
        position: g.position,
        popoverRef: g.popoverRef,
        children: Ne
      }
    )
  ] }) : Ne;
}
function pi(n, e = "en", t = ["public"]) {
  return (en()[String(n)] ?? []).filter((s) => t.includes(s.type)).map((s) => ({
    date: s.date,
    name: e === "th" ? s.nameTH : s.name,
    nameTH: s.nameTH,
    type: s.type
  }));
}
function Ei(n, e = "en", t = ["public"]) {
  const a = /* @__PURE__ */ new Map();
  for (const r of pi(n, e, t)) {
    const s = a.get(r.date) ?? [];
    s.push(r), a.set(r.date, s);
  }
  return a;
}
const Pi = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  primaryColor: "#3B82F6",
  primaryTextColor: "#FFFFFF",
  rangeColor: "#1E3A5F",
  textColor: "#F9FAFB",
  mutedTextColor: "#6B7280",
  backgroundColor: "#1F2937",
  surfaceColor: "#374151",
  borderColor: "#374151",
  borderRadius: "12px",
  daySize: 36,
  shadow: "0 4px 16px rgba(0,0,0,0.40)"
};
export {
  Mi as DatePicker,
  ja as builtInPresets,
  Pi as darkTheme,
  Ei as getHolidayMapForYear,
  pi as getHolidaysForYear,
  yi as lightTheme
};
