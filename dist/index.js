var kn = Object.defineProperty;
var Hn = (n, e, t) => e in n ? kn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => Hn(n, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as W, jsx as T, Fragment as Rn } from "react/jsx-runtime";
import { useState as L, useEffect as Zt, useMemo as en, useCallback as F, useRef as Dt } from "react";
import { createPortal as Fn } from "react-dom";
function w(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function V(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function fe(n, e) {
  const t = w(n);
  return isNaN(e) ? V(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function re(n, e) {
  const t = w(n);
  if (isNaN(e)) return V(n, NaN);
  if (!e)
    return t;
  const a = t.getDate(), r = V(n, t.getTime());
  r.setMonth(t.getMonth() + e + 1, 0);
  const s = r.getDate();
  return a >= s ? r : (t.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), t);
}
const tn = 6048e5, vn = 864e5;
let Cn = {};
function Ne() {
  return Cn;
}
function Z(n, e) {
  var o, c, l, u;
  const t = Ne(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? 7 : 0) + s - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function Re(n) {
  return Z(n, { weekStartsOn: 1 });
}
function nn(n) {
  const e = w(n), t = e.getFullYear(), a = V(n, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = Re(a), s = V(n, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Re(s);
  return e.getTime() >= r.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function G(n) {
  const e = w(n);
  return e.setHours(0, 0, 0, 0), e;
}
function Mt(n) {
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
function Yn(n, e) {
  const t = G(n), a = G(e), r = +t - Mt(t), s = +a - Mt(a);
  return Math.round((r - s) / vn);
}
function Wn(n) {
  const e = nn(n), t = V(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Re(t);
}
function Me(n, e) {
  const t = e * 7;
  return fe(n, t);
}
function z(n, e) {
  const t = G(n), a = G(e);
  return +t == +a;
}
function _n(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function $n(n) {
  if (!_n(n) && typeof n != "number")
    return !1;
  const e = w(n);
  return !isNaN(Number(e));
}
function Ee(n) {
  const e = w(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function In(n, e) {
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
function Pe(n) {
  const e = w(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Bn(n) {
  const e = w(n), t = V(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function ft(n, e) {
  var o, c, l, u;
  const t = Ne(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? -7 : 0) + 6 - (s - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
const Un = {
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
}, Ln = (n, e, t) => {
  let a;
  const r = Un[n];
  return typeof r == "string" ? a = r : e === 1 ? a = r.one : a = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + a : a + " ago" : a;
};
function Xe(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const jn = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, zn = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Gn = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Vn = {
  date: Xe({
    formats: jn,
    defaultWidth: "full"
  }),
  time: Xe({
    formats: zn,
    defaultWidth: "full"
  }),
  dateTime: Xe({
    formats: Gn,
    defaultWidth: "full"
  })
}, Kn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, qn = (n, e, t, a) => Kn[n];
function we(n) {
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
const Qn = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Xn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Jn = {
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
}, Zn = {
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
}, ea = {
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
}, ta = {
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
}, na = (n, e) => {
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
}, aa = {
  ordinalNumber: na,
  era: we({
    values: Qn,
    defaultWidth: "wide"
  }),
  quarter: we({
    values: Xn,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: we({
    values: Jn,
    defaultWidth: "wide"
  }),
  day: we({
    values: Zn,
    defaultWidth: "wide"
  }),
  dayPeriod: we({
    values: ea,
    defaultWidth: "wide",
    formattingValues: ta,
    defaultFormattingWidth: "wide"
  })
};
function be(n) {
  return (e, t = {}) => {
    const a = t.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], s = e.match(r);
    if (!s)
      return null;
    const i = s[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? sa(o, (d) => d.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      ra(o, (d) => d.test(i))
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
function ra(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function sa(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function ia(n) {
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
const oa = /^(\d+)(th|st|nd|rd)?/i, ca = /\d+/i, la = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ua = {
  any: [/^b/i, /^(a|c)/i]
}, da = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ma = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, fa = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ha = {
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
}, ga = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ya = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, pa = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ta = {
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
}, wa = {
  ordinalNumber: ia({
    matchPattern: oa,
    parsePattern: ca,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: be({
    matchPatterns: la,
    defaultMatchWidth: "wide",
    parsePatterns: ua,
    defaultParseWidth: "any"
  }),
  quarter: be({
    matchPatterns: da,
    defaultMatchWidth: "wide",
    parsePatterns: ma,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: be({
    matchPatterns: fa,
    defaultMatchWidth: "wide",
    parsePatterns: ha,
    defaultParseWidth: "any"
  }),
  day: be({
    matchPatterns: ga,
    defaultMatchWidth: "wide",
    parsePatterns: ya,
    defaultParseWidth: "any"
  }),
  dayPeriod: be({
    matchPatterns: pa,
    defaultMatchWidth: "any",
    parsePatterns: Ta,
    defaultParseWidth: "any"
  })
}, ba = {
  code: "en-US",
  formatDistance: Ln,
  formatLong: Vn,
  formatRelative: qn,
  localize: aa,
  match: wa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Da(n) {
  const e = w(n);
  return Yn(e, Bn(e)) + 1;
}
function an(n) {
  const e = w(n), t = +Re(e) - +Wn(e);
  return Math.round(t / tn) + 1;
}
function rn(n, e) {
  var u, d, b, M;
  const t = w(n), a = t.getFullYear(), r = Ne(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((d = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((M = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : M.firstWeekContainsDate) ?? 1, i = V(n, 0);
  i.setFullYear(a + 1, 0, s), i.setHours(0, 0, 0, 0);
  const o = Z(i, e), c = V(n, 0);
  c.setFullYear(a, 0, s), c.setHours(0, 0, 0, 0);
  const l = Z(c, e);
  return t.getTime() >= o.getTime() ? a + 1 : t.getTime() >= l.getTime() ? a : a - 1;
}
function Ma(n, e) {
  var o, c, l, u;
  const t = Ne(), a = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, r = rn(n, e), s = V(n, 0);
  return s.setFullYear(r, 0, a), s.setHours(0, 0, 0, 0), Z(s, e);
}
function sn(n, e) {
  const t = w(n), a = +Z(t, e) - +Ma(t, e);
  return Math.round(a / tn) + 1;
}
function E(n, e) {
  const t = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(e, "0");
  return t + a;
}
const X = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), a = t > 0 ? t : 1 - t;
    return E(e === "yy" ? a % 100 : a, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : E(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return E(n.getDate(), e.length);
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
    return E(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return E(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return E(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return E(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, a = n.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, t - 3)
    );
    return E(r, e.length);
  }
}, ce = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Et = {
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
    return X.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, a) {
    const r = rn(n, a), s = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const i = s % 100;
      return E(i, 2);
    }
    return e === "Yo" ? t.ordinalNumber(s, { unit: "year" }) : E(s, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = nn(n);
    return E(t, e.length);
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
    return E(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(a);
      case "QQ":
        return E(a, 2);
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
        return E(a, 2);
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
        return X.M(n, e);
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
        return E(a + 1, 2);
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
    const r = sn(n, a);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : E(r, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const a = an(n);
    return e === "Io" ? t.ordinalNumber(a, { unit: "week" }) : E(a, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : X.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const a = Da(n);
    return e === "Do" ? t.ordinalNumber(a, { unit: "dayOfYear" }) : E(a, e.length);
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
        return E(s, 2);
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
        return E(s, e.length);
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
        return E(r, e.length);
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
    switch (a === 12 ? r = ce.noon : a === 0 ? r = ce.midnight : r = a / 12 >= 1 ? "pm" : "am", e) {
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
    switch (a >= 17 ? r = ce.evening : a >= 12 ? r = ce.afternoon : a >= 4 ? r = ce.morning : r = ce.night, e) {
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
    return X.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : X.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const a = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(a, { unit: "hour" }) : E(a, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let a = n.getHours();
    return a === 0 && (a = 24), e === "ko" ? t.ordinalNumber(a, { unit: "hour" }) : E(a, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : X.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : X.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return X.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (e) {
      case "X":
        return Nt(a);
      case "XXXX":
      case "XX":
        return ae(a);
      case "XXXXX":
      case "XXX":
      default:
        return ae(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "x":
        return Nt(a);
      case "xxxx":
      case "xx":
        return ae(a);
      case "xxxxx":
      case "xxx":
      default:
        return ae(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Pt(a, ":");
      case "OOOO":
      default:
        return "GMT" + ae(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Pt(a, ":");
      case "zzzz":
      default:
        return "GMT" + ae(a, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const a = Math.trunc(n.getTime() / 1e3);
    return E(a, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    const a = n.getTime();
    return E(a, e.length);
  }
};
function Pt(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), s = a % 60;
  return s === 0 ? t + String(r) : t + String(r) + e + E(s, 2);
}
function Nt(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + E(Math.abs(n) / 60, 2) : ae(n, e);
}
function ae(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = E(Math.trunc(a / 60), 2), s = E(a % 60, 2);
  return t + r + e + s;
}
const Ot = (n, e) => {
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
}, on = (n, e) => {
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
}, Ea = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], a = t[1], r = t[2];
  if (!r)
    return Ot(n, e);
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
  return s.replace("{{date}}", Ot(a, e)).replace("{{time}}", on(r, e));
}, Pa = {
  p: on,
  P: Ea
}, Na = /^D+$/, Oa = /^Y+$/, Aa = ["D", "DD", "YY", "YYYY"];
function Sa(n) {
  return Na.test(n);
}
function xa(n) {
  return Oa.test(n);
}
function ka(n, e, t) {
  const a = Ha(n, e, t);
  if (console.warn(a), Aa.includes(n)) throw new RangeError(a);
}
function Ha(n, e, t) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${a} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ra = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Fa = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, va = /^'([^]*?)'?$/, Ca = /''/g, Ya = /[a-zA-Z]/;
function Je(n, e, t) {
  var u, d, b, M;
  const a = Ne(), r = a.locale ?? ba, s = a.firstWeekContainsDate ?? ((d = (u = a.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, i = a.weekStartsOn ?? ((M = (b = a.locale) == null ? void 0 : b.options) == null ? void 0 : M.weekStartsOn) ?? 0, o = w(n);
  if (!$n(o))
    throw new RangeError("Invalid time value");
  let c = e.match(Fa).map((N) => {
    const h = N[0];
    if (h === "p" || h === "P") {
      const S = Pa[h];
      return S(N, r.formatLong);
    }
    return N;
  }).join("").match(Ra).map((N) => {
    if (N === "''")
      return { isToken: !1, value: "'" };
    const h = N[0];
    if (h === "'")
      return { isToken: !1, value: Wa(N) };
    if (Et[h])
      return { isToken: !0, value: N };
    if (h.match(Ya))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + h + "`"
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
    const h = N.value;
    (xa(h) || Sa(h)) && ka(h, e, String(n));
    const S = Et[h[0]];
    return S(o, h, r.localize, l);
  }).join("");
}
function Wa(n) {
  const e = n.match(va);
  return e ? e[1].replace(Ca, "'") : n;
}
function ot(n) {
  return w(n).getDay();
}
function _a(n) {
  return w(n).getMonth();
}
function $a(n) {
  return w(n).getFullYear();
}
function Ia(n, e) {
  const t = w(n), a = w(e);
  return t.getTime() > a.getTime();
}
function De(n, e) {
  const t = w(n), a = w(e);
  return +t < +a;
}
function Ba(n, e, t) {
  const a = t == null ? void 0 : t.weekStartsOn, r = w(n), s = r.getDay(), o = (e % 7 + 7) % 7, c = 7 - a, l = e < 0 || e > 6 ? e - (s + c) % 7 : (o + c) % 7 - (s + c) % 7;
  return fe(r, l);
}
function At(n, e) {
  const t = w(n), a = w(e);
  return t.getFullYear() === a.getFullYear() && t.getMonth() === a.getMonth();
}
function Ua(n, e) {
  const t = +w(n), [a, r] = [
    +w(e.start),
    +w(e.end)
  ].sort((s, i) => s - i);
  return t >= a && t <= r;
}
function ct(n, e) {
  return fe(n, -e);
}
function ht(n, e) {
  return re(n, -e);
}
function cn(n, e) {
  return Me(n, -e);
}
function La(n, e = 0) {
  const t = Pe(n), a = Ee(n), r = Z(t, { weekStartsOn: e }), s = ft(a, { weekStartsOn: e }), i = In({ start: r, end: s }), o = [];
  let c = [];
  return i.forEach((l, u) => {
    c.push({
      date: l,
      isCurrentMonth: l >= t && l <= a
    }), (u + 1) % 7 === 0 && (o.push(c), c = []);
  }), { weeks: o, month: n };
}
function ja(n, e = 0) {
  return e === 1 ? an(n) : sn(n, { weekStartsOn: 0 });
}
function ln(n, e, t, a) {
  const r = G(n);
  return !!(e && De(r, G(e)) || t && Ia(r, G(t)) || a != null && a.some((s) => z(s, r)));
}
function za(n, e) {
  const { today: t, selectionMode: a, selectedDate: r, activeRange: s, highlightWeekends: i } = e, o = a === "single" && r != null && z(n, r), c = a === "range" && s != null && z(n, s[0]), l = a === "range" && s != null && z(n, s[1]), u = a === "range" && s != null && !z(s[0], s[1]) && Ua(G(n), {
    start: G(s[0]),
    end: G(s[1])
  }) && !z(n, s[0]) && !z(n, s[1]), d = z(n, t), b = i && (n.getDay() === 0 || n.getDay() === 6);
  return { isSelected: o, isRangeStart: c, isRangeEnd: l, isInRange: u, isToday: d, isWeekend: b };
}
function Ga({
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
  isWeekend: u,
  holidays: d,
  onClick: b,
  onMouseEnter: M,
  onMouseLeave: N
}) {
  const [h, S] = L(!1), j = n.getDate(), k = ["dp-day"];
  e || k.push("dp-day--other-month"), c && k.push("dp-day--disabled"), l && k.push("dp-day--today"), u && k.push("dp-day--weekend"), (t || a || r) && k.push("dp-day--selected"), s && k.push("dp-day--in-range"), a && k.push("dp-day--range-start"), r && k.push("dp-day--range-end"), s && i && k.push("dp-day--row-start"), s && o && k.push("dp-day--row-end");
  const q = n.toLocaleDateString("en-US", {
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
        className: k.join(" "),
        onClick: () => !c && b(n),
        onMouseEnter: () => !c && M(n),
        onMouseLeave: N,
        disabled: c,
        "aria-label": q,
        "aria-pressed": t || a || r,
        tabIndex: e && !c ? 0 : -1,
        type: "button",
        children: [
          /* @__PURE__ */ T("span", { className: "dp-day-number", children: j }),
          d.length > 0 && /* @__PURE__ */ W(
            "span",
            {
              className: "dp-holiday-dots",
              onMouseEnter: () => S(!0),
              onMouseLeave: () => S(!1),
              children: [
                d.slice(0, 2).map((m, p) => /* @__PURE__ */ T(
                  "span",
                  {
                    className: "dp-holiday-dot",
                    style: { backgroundColor: m.dotColor },
                    "aria-hidden": "true"
                  },
                  p
                )),
                h && /* @__PURE__ */ T("span", { className: "dp-holiday-tooltip", role: "tooltip", children: d.map((m) => m.name).join(", ") })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Va = [
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
], Ka = [
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
function qa({
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
  const l = _a(n), u = $a(n), d = s === "th" ? Ka : Va, b = [];
  for (let h = u - 10; h <= u + 10; h++)
    b.push(h);
  const M = o ? re(n, -1) < new Date(o.getFullYear(), o.getMonth(), 1) : !1, N = c ? re(n, 1) > new Date(c.getFullYear(), c.getMonth(), 1) : !1;
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
          onChange: (h) => a(Number(h.target.value)),
          "aria-label": "Select month",
          children: d.map((h, S) => /* @__PURE__ */ T("option", { value: S, children: h }, S))
        }
      ),
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-year-select",
          value: u,
          onChange: (h) => r(Number(h.target.value)),
          "aria-label": "Select year",
          children: b.map((h) => /* @__PURE__ */ T("option", { value: h, children: i === "buddhist" ? h + 543 : h }, h))
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
function Qa({ weekNumbers: n }) {
  return /* @__PURE__ */ W("div", { className: "dp-week-numbers", "aria-hidden": "true", children: [
    /* @__PURE__ */ T("div", { className: "dp-week-number-header", children: "W" }),
    n.map((e, t) => /* @__PURE__ */ T("div", { className: "dp-week-number", children: e }, t))
  ] });
}
const Xa = {
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
function un() {
  return JSON.parse(JSON.stringify(Xa));
}
const Ze = /* @__PURE__ */ new Map();
function Ja(n) {
  const e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), a = String(n.getDate()).padStart(2, "0");
  return `${e}-${t}-${a}`;
}
function Za(n, e, t) {
  return `${n}-${e}-${t.sort().join(",")}`;
}
const St = "#EF4444";
function er(n, e, t = ["public"], a = !0, r = []) {
  const [s, i] = L([]);
  Zt(() => {
    if (!a) return;
    const c = Za(n, e, t);
    if (Ze.has(c)) {
      i(Ze.get(c));
      return;
    }
    const b = (un()[String(n)] ?? []).filter((M) => t.includes(M.type)).map((M) => ({
      ...M,
      name: e === "th" && M.nameTH ? M.nameTH : M.name
    }));
    Ze.set(c, b), i(b);
  }, [n, e, JSON.stringify(t), a]);
  const o = en(() => {
    const c = /* @__PURE__ */ new Map();
    return s.forEach((l) => {
      const u = l.date.slice(0, 10), d = c.get(u) ?? [];
      d.push({ name: l.name, dotColor: St }), c.set(u, d);
    }), r.forEach((l) => {
      const u = e === "th" ? l.nameTH : l.nameEN;
      c.set(l.date, [{ name: u, dotColor: l.dotColor ?? St }]);
    }), c;
  }, [s, r, e]);
  return {
    getHolidaysForDate(c) {
      return o.get(Ja(c)) ?? [];
    }
  };
}
const tr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], nr = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
function xt({
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
    calendarSystem: d,
    weekStartsOn: b,
    highlightWeekends: M,
    showWeekNumbers: N,
    showHolidays: h,
    holidayTypes: S,
    customHolidays: j,
    minDate: k,
    maxDate: q,
    disabledDates: m
  } = l, { weeks: p } = La(n, b), O = n.getFullYear(), v = er(O, u, S, h, j), x = u === "th" ? nr : tr, I = b === 1 ? [...x.slice(1), x[0]] : x, Se = b === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6], Be = p.map((R) => ja(R[0].date, b)), C = F(() => {
    const R = new Date(n.getFullYear(), n.getMonth() - 1, 1);
    e(R);
    const $ = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c($);
  }, [n, e, u, c]), te = F(() => {
    const R = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    e(R);
    const $ = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c($);
  }, [n, e, u, c]), oe = F(
    (R) => {
      e(new Date(n.getFullYear(), R, 1));
    },
    [n, e]
  ), Ue = F(
    (R) => {
      e(new Date(R, n.getMonth(), 1));
    },
    [n, e]
  ), Le = {
    today: /* @__PURE__ */ new Date(),
    selectionMode: t,
    selectedDate: a,
    activeRange: s ?? r,
    highlightWeekends: M
  };
  return /* @__PURE__ */ W("div", { className: "dp-calendar", children: [
    /* @__PURE__ */ T(
      qa,
      {
        month: n,
        onPrev: C,
        onNext: te,
        onMonthSelect: oe,
        onYearSelect: Ue,
        locale: u,
        calendarSystem: d,
        minDate: k,
        maxDate: q
      }
    ),
    /* @__PURE__ */ W("div", { className: "dp-grid-container", children: [
      N && /* @__PURE__ */ T(Qa, { weekNumbers: Be }),
      /* @__PURE__ */ W("div", { className: "dp-grid", children: [
        /* @__PURE__ */ T("div", { className: "dp-weekday-row", children: I.map((R, $) => /* @__PURE__ */ T(
          "div",
          {
            className: [
              "dp-weekday-label",
              M && (Se[$] === 0 || Se[$] === 6) ? "dp-weekday-label--weekend" : ""
            ].filter(Boolean).join(" "),
            "aria-hidden": "true",
            children: R
          },
          $
        )) }),
        p.map((R, $) => /* @__PURE__ */ T("div", { className: "dp-week-row", children: R.map((Q, pe) => {
          const xe = v.getHolidaysForDate(Q.date), je = ln(Q.date, k, q, m), { isSelected: U, isRangeStart: ze, isRangeEnd: Ge, isInRange: Ve, isToday: Ke, isWeekend: qe } = za(Q.date, Le);
          return /* @__PURE__ */ T(
            Ga,
            {
              date: Q.date,
              isCurrentMonth: Q.isCurrentMonth,
              isSelected: U,
              isRangeStart: ze,
              isRangeEnd: Ge,
              isInRange: Ve,
              isRowStart: pe === 0,
              isRowEnd: pe === 6,
              isDisabled: je,
              isToday: Ke,
              isWeekend: qe,
              holidays: xe,
              onClick: i,
              onMouseEnter: o,
              onMouseLeave: () => o(null)
            },
            pe
          );
        }) }, $))
      ] })
    ] })
  ] });
}
const ar = [
  {
    label: "This week",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [Z(n, { weekStartsOn: 1 }), ft(n, { weekStartsOn: 1 })];
    }
  },
  {
    label: "Last 7 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [ct(n, 6), n];
    }
  },
  {
    label: "Last 30 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [ct(n, 29), n];
    }
  },
  {
    label: "This month",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [Pe(n), Ee(n)];
    }
  },
  {
    label: "Last month",
    resolve: () => {
      const n = ht(/* @__PURE__ */ new Date(), 1);
      return [Pe(n), Ee(n)];
    }
  }
];
function rr({
  presets: n,
  value: e,
  onSelect: t,
  display: a = "chips",
  dropdownPlaceholder: r = "Quick select range",
  dropdownAriaLabel: s = "Quick select presets"
}) {
  const i = n ?? ar, o = (l) => {
    if (!e) return !1;
    const [u, d] = l.resolve();
    return z(u, e[0]) && z(d, e[1]);
  }, c = i.findIndex((l) => o(l));
  return a === "dropdown" ? /* @__PURE__ */ T("div", { className: "dp-preset-dropdown-wrap", children: /* @__PURE__ */ W(
    "select",
    {
      className: "dp-preset-select",
      "aria-label": s,
      value: c >= 0 ? String(c) : "",
      onChange: (l) => {
        const u = l.target.value;
        u !== "" && t(i[Number(u)].resolve());
      },
      children: [
        /* @__PURE__ */ T("option", { value: "", children: r }),
        i.map((l, u) => /* @__PURE__ */ T("option", { value: u, children: l.label }, u))
      ]
    }
  ) }) : /* @__PURE__ */ T("div", { className: "dp-preset-chips", role: "group", "aria-label": "Quick select presets", children: i.map((l, u) => /* @__PURE__ */ T(
    "button",
    {
      className: ["dp-chip", o(l) ? "dp-chip--active" : ""].join(" "),
      onClick: () => t(l.resolve()),
      type: "button",
      children: l.label
    },
    u
  )) });
}
var D;
(function(n) {
  n[n.AM = 0] = "AM", n[n.PM = 1] = "PM";
})(D || (D = {}));
var A;
(function(n) {
  n[n.SUNDAY = 0] = "SUNDAY", n[n.MONDAY = 1] = "MONDAY", n[n.TUESDAY = 2] = "TUESDAY", n[n.WEDNESDAY = 3] = "WEDNESDAY", n[n.THURSDAY = 4] = "THURSDAY", n[n.FRIDAY = 5] = "FRIDAY", n[n.SATURDAY = 6] = "SATURDAY";
})(A || (A = {}));
var B;
(function(n) {
  n[n.JANUARY = 1] = "JANUARY", n[n.FEBRUARY = 2] = "FEBRUARY", n[n.MARCH = 3] = "MARCH", n[n.APRIL = 4] = "APRIL", n[n.MAY = 5] = "MAY", n[n.JUNE = 6] = "JUNE", n[n.JULY = 7] = "JULY", n[n.AUGUST = 8] = "AUGUST", n[n.SEPTEMBER = 9] = "SEPTEMBER", n[n.OCTOBER = 10] = "OCTOBER", n[n.NOVEMBER = 11] = "NOVEMBER", n[n.DECEMBER = 12] = "DECEMBER";
})(B || (B = {}));
function ie(n, e) {
  n.assign("day", e.getDate()), n.assign("month", e.getMonth() + 1), n.assign("year", e.getFullYear());
}
function dn(n, e) {
  n.assign("hour", e.getHours()), n.assign("minute", e.getMinutes()), n.assign("second", e.getSeconds()), n.assign("millisecond", e.getMilliseconds()), n.assign("meridiem", e.getHours() < 12 ? D.AM : D.PM);
}
function ue(n, e) {
  n.imply("day", e.getDate()), n.imply("month", e.getMonth() + 1), n.imply("year", e.getFullYear());
}
function gt(n, e) {
  n.imply("hour", e.getHours()), n.imply("minute", e.getMinutes()), n.imply("second", e.getSeconds()), n.imply("millisecond", e.getMilliseconds()), n.imply("meridiem", e.getHours() < 12 ? D.AM : D.PM);
}
const sr = {
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
    dstStart: (n) => kt(n, B.MARCH, A.SUNDAY, 2),
    dstEnd: (n) => kt(n, B.OCTOBER, A.SUNDAY, 3)
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
    dstStart: (n) => J(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => J(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => J(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => J(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => J(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => J(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => J(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => J(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
function J(n, e, t, a, r = 0) {
  let s = 0, i = 0;
  for (; i < a; )
    s++, new Date(n, e - 1, s).getDay() === t && i++;
  return new Date(n, e - 1, s, r);
}
function kt(n, e, t, a = 0) {
  const r = t === 0 ? 7 : t, s = new Date(n, e - 1 + 1, 1, 12), i = s.getDay() === 0 ? 7 : s.getDay();
  let o;
  return i === r ? o = 7 : i < r ? o = 7 + i - r : o = i - r, s.setDate(s.getDate() - o), new Date(n, e - 1, s.getDate(), a);
}
function mn(n, e, t = {}) {
  if (n == null)
    return null;
  if (typeof n == "number")
    return n;
  const a = t[n] ?? sr[n];
  return a == null ? null : typeof a == "number" ? a : e == null ? null : e > a.dstStart(e.getFullYear()) && !(e > a.dstEnd(e.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
}
const ir = {
  day: 0,
  second: 0,
  millisecond: 0
};
function Y(n, e) {
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
function Ce(n) {
  const e = {};
  for (const t in n)
    e[t] = -n[t];
  return e;
}
class se {
  constructor(e, t) {
    g(this, "instant");
    g(this, "timezoneOffset");
    this.instant = e ?? /* @__PURE__ */ new Date(), this.timezoneOffset = t ?? null;
  }
  static fromDate(e) {
    return new se(e);
  }
  static fromInput(e, t) {
    if (e instanceof Date)
      return se.fromDate(e);
    const a = (e == null ? void 0 : e.instant) ?? /* @__PURE__ */ new Date(), r = mn(e == null ? void 0 : e.timezone, a, t);
    return new se(a, r);
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
    g(this, "knownValues");
    g(this, "impliedValues");
    g(this, "reference");
    g(this, "_tags", /* @__PURE__ */ new Set());
    if (this.reference = e, this.knownValues = {}, this.impliedValues = {}, t)
      for (const r in t)
        this.knownValues[r] = t[r];
    const a = e.getDateWithAdjustedTimezone();
    this.imply("day", a.getDate()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear()), this.imply("hour", 12), this.imply("minute", 0), this.imply("second", 0), this.imply("millisecond", 0);
  }
  static createRelativeFromReference(e, t = ir) {
    let a = Y(e.getDateWithAdjustedTimezone(), t);
    const r = new P(e);
    return r.addTag("result/relativeDate"), "hour" in t || "minute" in t || "second" in t || "millisecond" in t ? (r.addTag("result/relativeDateAndTime"), dn(r, a), ie(r, a), r.assign("timezoneOffset", e.getTimezoneOffset())) : (gt(r, a), r.imply("timezoneOffset", e.getTimezoneOffset()), "day" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.assign("weekday", a.getDay())) : "week" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.imply("weekday", a.getDay())) : (r.imply("day", a.getDate()), "month" in t ? (r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear())) : (r.imply("month", a.getMonth() + 1), "year" in t ? r.assign("year", a.getFullYear()) : r.imply("year", a.getFullYear())))), r;
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
    const t = this.dateWithoutTimezoneAdjustment(), a = Y(t, e);
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
class he {
  constructor(e, t, a, r, s) {
    g(this, "refDate");
    g(this, "index");
    g(this, "text");
    g(this, "reference");
    g(this, "start");
    g(this, "end");
    this.reference = e, this.refDate = e.instant, this.index = t, this.text = a, this.start = r || new P(e), this.end = s;
  }
  clone() {
    const e = new he(this.reference, this.index, this.text);
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
function fn(n, e, t = "\\s{0,5},?\\s{0,5}") {
  const a = e.replace(/\((?!\?)/g, "(?:");
  return `${n}${a}(?:${t}${a}){0,10}`;
}
function or(n) {
  let e;
  return n instanceof Array ? e = [...n] : n instanceof Map ? e = Array.from(n.keys()) : e = Object.keys(n), e;
}
function K(n) {
  return `(?:${or(n).sort((t, a) => a.length - t.length).join("|").replace(/\./g, "\\.")})`;
}
function hn(n) {
  return n < 100 && (n > 50 ? n = n + 1900 : n = n + 2e3), n;
}
function Ye(n, e, t) {
  let a = new Date(n);
  a.setMonth(t - 1), a.setDate(e);
  const r = Y(a, { year: 1 }), s = Y(a, { year: -1 });
  return Math.abs(r.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) ? a = r : Math.abs(s.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) && (a = s), a.getFullYear();
}
const lt = {
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
}, gn = {
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
}, ee = {
  ...gn,
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
}, ut = {
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
}, dt = {
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
}, yn = {
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
}, We = {
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
  ...yn
}, pn = `(?:${K(ut)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function cr(n) {
  const e = n.toLowerCase();
  return ut[e] !== void 0 ? ut[e] : e === "a" || e === "an" || e == "the" ? 1 : e.match(/few/) ? 3 : e.match(/half/) ? 0.5 : e.match(/couple/) ? 2 : e.match(/several/) ? 7 : parseFloat(e);
}
const Fe = `(?:${K(dt)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function ve(n) {
  let e = n.toLowerCase();
  return dt[e] !== void 0 ? dt[e] : (e = e.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(e));
}
const _e = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[5-9][0-9]|2[0-5])";
function $e(n) {
  if (/BE/i.test(n))
    return n = n.replace(/BE/i, ""), parseInt(n) - 543;
  if (/BCE?/i.test(n))
    return n = n.replace(/BCE?/i, ""), -parseInt(n);
  if (/(AD|CE)/i.test(n))
    return n = n.replace(/(AD|CE)/i, ""), parseInt(n);
  const e = parseInt(n);
  return hn(e);
}
const Tn = `(${pn})\\s{0,3}(${K(We)})`, Ht = new RegExp(Tn, "i"), lr = `(${pn})\\s{0,3}(${K(yn)})`, wn = "\\s{0,5},?(?:\\s*and)?\\s{0,5}", Oe = fn("(?:(?:about|around)\\s{0,3})?", Tn, wn), Ie = fn("(?:(?:about|around)\\s{0,3})?", lr, wn);
function ge(n) {
  const e = {};
  let t = n, a = Ht.exec(t);
  for (; a; )
    ur(e, a), t = t.substring(a[0].length).trim(), a = Ht.exec(t);
  return Object.keys(e).length == 0 ? null : e;
}
function ur(n, e) {
  if (e[0].match(/^[a-zA-Z]+$/))
    return;
  const t = cr(e[1]), a = We[e[2].toLowerCase()];
  n[a] = t;
}
class _ {
  constructor() {
    g(this, "cachedInnerPattern", null);
    g(this, "cachedPattern", null);
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
const dr = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Oe})(?=\\W|$)`, "i"), mr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Oe})(?=\\W|$)`, "i"), fr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Ie})(?=\\W|$)`, "i");
class hr extends _ {
  constructor(t) {
    super();
    g(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern(t) {
    return this.strictMode ? fr : t.option.forwardDate ? dr : mr;
  }
  innerExtract(t, a) {
    if (a[0].match(/^for\s*the\s*\w+/))
      return null;
    const r = ge(a[1]);
    return r ? P.createRelativeFromReference(t.reference, r) : null;
  }
}
const gr = new RegExp(`(?:on\\s{0,3})?(${Fe})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${Fe}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${K(ee)})(?:(?:-|/|,?\\s{0,3})(${_e}(?!\\w)))?(?=\\W|$)`, "i"), Rt = 1, Ft = 2, yr = 3, vt = 4;
class pr extends _ {
  innerPattern() {
    return gr;
  }
  innerExtract(e, t) {
    const a = e.createParsingResult(t.index, t[0]), r = ee[t[yr].toLowerCase()], s = ve(t[Rt]);
    if (s > 31)
      return t.index = t.index + t[Rt].length, null;
    if (a.start.assign("month", r), a.start.assign("day", s), t[vt]) {
      const i = $e(t[vt]);
      a.start.assign("year", i);
    } else {
      const i = Ye(e.refDate, s, r);
      a.start.imply("year", i);
    }
    if (t[Ft]) {
      const i = ve(t[Ft]);
      a.end = a.start.clone(), a.end.assign("day", i);
    }
    return a;
  }
}
const Tr = new RegExp(`(${K(ee)})(?:-|/|\\s*,?\\s*)(${Fe})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${Fe})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${_e}))?(?=\\W|$)(?!\\:\\d)`, "i"), wr = 1, Ct = 2, et = 3, tt = 4;
class br extends _ {
  constructor(t) {
    super();
    g(this, "shouldSkipYearLikeDate");
    this.shouldSkipYearLikeDate = t;
  }
  innerPattern() {
    return Tr;
  }
  innerExtract(t, a) {
    const r = ee[a[wr].toLowerCase()], s = ve(a[Ct]);
    if (s > 31 || this.shouldSkipYearLikeDate && !a[et] && !a[tt] && a[Ct].match(/^2[0-5]$/))
      return null;
    const i = t.createParsingComponents({
      day: s,
      month: r
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (a[tt]) {
      const l = $e(a[tt]);
      i.assign("year", l);
    } else {
      const l = Ye(t.refDate, s, r);
      i.imply("year", l);
    }
    if (!a[et])
      return i;
    const o = ve(a[et]), c = t.createParsingResult(a.index, a[0]);
    return c.start = i, c.end = i.clone(), c.end.assign("day", o), c;
  }
}
const Dr = new RegExp(`((?:in)\\s*)?(${K(ee)})\\s*(?:(?:,|-|of)?\\s*(${_e})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), Mr = 1, Er = 2, Yt = 3;
class Pr extends _ {
  innerPattern() {
    return Dr;
  }
  innerExtract(e, t) {
    const a = t[Er].toLowerCase();
    if (t[0].length <= 3 && !gn[a])
      return null;
    const r = e.createParsingResult(t.index + (t[Mr] || "").length, t.index + t[0].length);
    r.start.imply("day", 1), r.start.addTag("parser/ENMonthNameParser");
    const s = ee[a];
    if (r.start.assign("month", s), t[Yt]) {
      const i = $e(t[Yt]);
      r.start.assign("year", i);
    } else {
      const i = Ye(e.refDate, 1, s);
      r.start.imply("year", i);
    }
    return r;
  }
}
const Nr = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${K(ee)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), Or = 1, Ar = 2, Wt = 3, Sr = 4;
class xr extends _ {
  constructor(t) {
    super();
    g(this, "strictMonthDateOrder");
    this.strictMonthDateOrder = t;
  }
  innerPattern() {
    return Nr;
  }
  innerExtract(t, a) {
    const r = parseInt(a[Or]);
    let s = parseInt(a[Sr]), i = a[Wt] ? parseInt(a[Wt]) : ee[a[Ar].toLowerCase()];
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
const kr = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), Hr = 1, Rr = 2;
class Fr extends _ {
  innerPattern() {
    return kr;
  }
  innerExtract(e, t) {
    const a = parseInt(t[Rr]), r = parseInt(t[Hr]);
    return e.createParsingComponents().imply("day", 1).assign("month", r).assign("year", a);
  }
}
function vr(n, e, t, a) {
  return new RegExp(`${n}${e}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`, a);
}
function Cr(n, e) {
  return new RegExp(`^(${n})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${e}`, "i");
}
const nt = 2, ne = 3, ke = 4, He = 5, le = 6;
class Yr {
  constructor(e = !1) {
    g(this, "strictMode");
    g(this, "cachedPrimaryPrefix", null);
    g(this, "cachedPrimarySuffix", null);
    g(this, "cachedPrimaryTimePattern", null);
    g(this, "cachedFollowingPhase", null);
    g(this, "cachedFollowingSuffix", null);
    g(this, "cachedFollowingTimePatten", null);
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
    let s = 0, i = null, o = parseInt(t[nt]);
    if (o > 100) {
      if (t[nt].length == 4 && t[ne] == null && !t[le] || this.strictMode || t[ne] != null)
        return null;
      s = o % 100, o = Math.floor(o / 100);
    }
    if (o > 24)
      return null;
    if (t[ne] != null) {
      if (t[ne].length == 1 && !t[le])
        return null;
      s = parseInt(t[ne]);
    }
    if (s >= 60)
      return null;
    if (o > 12 && (i = D.PM), t[le] != null) {
      if (o > 12)
        return null;
      const c = t[le][0].toLowerCase();
      c == "a" && (i = D.AM, o == 12 && (o = 0)), c == "p" && (i = D.PM, o != 12 && (o += 12));
    }
    if (r.assign("hour", o), r.assign("minute", s), i !== null ? r.assign("meridiem", i) : o < 12 ? r.imply("meridiem", D.AM) : r.imply("meridiem", D.PM), t[He] != null) {
      const c = parseInt(t[He].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[ke] != null) {
      const c = parseInt(t[ke]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    return r;
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = e.createParsingComponents();
    if (t[He] != null) {
      const c = parseInt(t[He].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[ke] != null) {
      const c = parseInt(t[ke]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    let s = parseInt(t[nt]), i = 0, o = -1;
    if (t[ne] != null ? i = parseInt(t[ne]) : s > 100 && (i = s % 100, s = Math.floor(s / 100)), i >= 60 || s > 24)
      return null;
    if (s >= 12 && (o = D.PM), t[le] != null) {
      if (s > 12)
        return null;
      const c = t[le][0].toLowerCase();
      c == "a" && (o = D.AM, s == 12 && (s = 0, r.isCertain("day") || r.imply("day", r.get("day") + 1))), c == "p" && (o = D.PM, s != 12 && (s += 12)), a.start.isCertain("meridiem") || (o == D.AM ? (a.start.imply("meridiem", D.AM), a.start.get("hour") == 12 && a.start.assign("hour", 0)) : (a.start.imply("meridiem", D.PM), a.start.get("hour") != 12 && a.start.assign("hour", a.start.get("hour") + 12)));
    }
    return r.assign("hour", s), r.assign("minute", i), o >= 0 ? r.assign("meridiem", o) : a.start.isCertain("meridiem") && a.start.get("hour") > 12 ? a.start.get("hour") - 12 > s ? r.imply("meridiem", D.AM) : s <= 12 && (r.assign("hour", s + 12), r.assign("meridiem", D.PM)) : s > 12 ? r.imply("meridiem", D.PM) : s <= 12 && r.imply("meridiem", D.AM), r.date().getTime() < a.start.date().getTime() && r.imply("day", r.get("day") + 1), r;
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
    return this.cachedPrimaryPrefix === e && this.cachedPrimarySuffix === t ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = vr(this.primaryPatternLeftBoundary(), e, t, this.patternFlags()), this.cachedPrimaryPrefix = e, this.cachedPrimarySuffix = t, this.cachedPrimaryTimePattern);
  }
  getFollowingTimePatternThroughCache() {
    const e = this.followingPhase(), t = this.followingSuffix();
    return this.cachedFollowingPhase === e && this.cachedFollowingSuffix === t ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = Cr(e, t), this.cachedFollowingPhase = e, this.cachedFollowingSuffix = t, this.cachedFollowingTimePatten);
  }
}
class Wr extends Yr {
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
      r >= 6 && r < 12 ? (a.assign("hour", a.get("hour") + 12), a.assign("meridiem", D.PM)) : r < 6 && a.assign("meridiem", D.AM);
    }
    if (t[0].endsWith("afternoon")) {
      a.assign("meridiem", D.PM);
      const r = a.get("hour");
      r >= 0 && r <= 6 && a.assign("hour", a.get("hour") + 12);
    }
    return t[0].endsWith("morning") && (a.assign("meridiem", D.AM), a.get("hour") < 12 && a.assign("hour", a.get("hour"))), a.addTag("parser/ENTimeExpressionParser");
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = super.extractFollowingTimeComponents(e, t, a);
    return r && r.addTag("parser/ENTimeExpressionParser"), r;
  }
}
const _r = new RegExp(`(${Oe})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), $r = new RegExp(`(${Ie})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
class Ir extends _ {
  constructor(t) {
    super();
    g(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? $r : _r;
  }
  innerExtract(t, a) {
    const r = ge(a[1]);
    return r ? P.createRelativeFromReference(t.reference, Ce(r)) : null;
  }
}
const Br = new RegExp(`(${Oe})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), Ur = new RegExp(`(${Ie})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), Lr = 1;
class jr extends _ {
  constructor(t) {
    super();
    g(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? Ur : Br;
  }
  innerExtract(t, a) {
    const r = ge(a[Lr]);
    return r ? P.createRelativeFromReference(t.reference, r) : null;
  }
}
class bn {
  refine(e, t) {
    return t.filter((a) => this.isValid(e, a));
  }
}
class Ae {
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
class zr extends Ae {
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
      a.start.isOnlyWeekdayComponent() && Y(i, { day: 7 }) > s ? (i = Y(i, { day: 7 }), a.start.imply("day", i.getDate()), a.start.imply("month", i.getMonth() + 1), a.start.imply("year", i.getFullYear())) : t.start.isOnlyWeekdayComponent() && Y(s, { day: -7 }) < i ? (s = Y(s, { day: -7 }), t.start.imply("day", s.getDate()), t.start.imply("month", s.getMonth() + 1), t.start.imply("year", s.getFullYear())) : a.start.isDateWithUnknownYear() && Y(i, { year: 1 }) > s ? (i = Y(i, { year: 1 }), a.start.imply("year", i.getFullYear())) : t.start.isDateWithUnknownYear() && Y(s, { year: -1 }) < i ? (s = Y(s, { year: -1 }), t.start.imply("year", s.getFullYear())) : [a, t] = [t, a];
    }
    const r = t.clone();
    return r.start = t.start, r.end = a.start, r.index = Math.min(t.index, a.index), t.index < a.index ? r.text = t.text + e + a.text : r.text = a.text + e + t.text, r;
  }
}
class Gr extends zr {
  patternBetween() {
    return /^\s*(to|-|–|until|through|till)\s*$/i;
  }
}
function _t(n, e) {
  const t = n.clone(), a = n.start, r = e.start;
  if (t.start = $t(a, r), n.end != null || e.end != null) {
    const s = n.end == null ? n.start : n.end, i = e.end == null ? e.start : e.end, o = $t(s, i);
    if (n.end == null && o.date().getTime() < t.start.date().getTime()) {
      const c = new Date(o.date().getTime());
      c.setDate(c.getDate() + 1), o.isCertain("day") ? ie(o, c) : ue(o, c);
    }
    t.end = o;
  }
  return t;
}
function $t(n, e) {
  const t = n.clone();
  e.isCertain("hour") ? (t.assign("hour", e.get("hour")), t.assign("minute", e.get("minute")), e.isCertain("second") ? (t.assign("second", e.get("second")), e.isCertain("millisecond") ? t.assign("millisecond", e.get("millisecond")) : t.imply("millisecond", e.get("millisecond"))) : (t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond")))) : (t.imply("hour", e.get("hour")), t.imply("minute", e.get("minute")), t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond"))), e.isCertain("timezoneOffset") && t.assign("timezoneOffset", e.get("timezoneOffset"));
  const a = n.get("meridiem") != null && (n.isCertain("meridiem") || Array.from(n.tags()).some((r) => r.startsWith("casualReference/")));
  return e.isCertain("meridiem") ? t.assign("meridiem", e.get("meridiem")) : e.get("meridiem") != null && !a && t.imply("meridiem", e.get("meridiem")), t.get("meridiem") == D.PM && t.get("hour") < 12 && (e.isCertain("hour") ? t.assign("hour", t.get("hour") + 12) : t.imply("hour", t.get("hour") + 12)), t.addTags(n.tags()), t.addTags(e.tags()), t;
}
class Vr extends Ae {
  shouldMergeResults(e, t, a) {
    return (t.start.isOnlyDate() && a.start.isOnlyTime() || a.start.isOnlyDate() && t.start.isOnlyTime()) && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    const r = t.start.isOnlyDate() ? _t(t, a) : _t(a, t);
    return r.index = t.index, r.text = t.text + e + a.text, r;
  }
}
class It extends Vr {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
  }
}
const Kr = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
class qr {
  constructor(e) {
    g(this, "timezoneOverrides");
    this.timezoneOverrides = e;
  }
  refine(e, t) {
    const a = e.option.timezones ?? {};
    return t.forEach((r) => {
      const s = e.text.substring(r.index + r.text.length), i = Kr.exec(s);
      if (!i)
        return;
      const o = i[1].toUpperCase(), c = r.start.date() ?? r.refDate ?? /* @__PURE__ */ new Date(), l = { ...this.timezoneOverrides, ...a }, u = mn(o, c, l);
      if (u == null)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${o}' into: ${u} for: ${r.start}`);
      });
      const d = r.start.get("timezoneOffset");
      d !== null && u != d && (r.start.isCertain("timezoneOffset") || o != i[1]) || r.start.isOnlyDate() && o != i[1] || (r.text += i[0], r.start.isCertain("timezoneOffset") || r.start.assign("timezoneOffset", u), r.end != null && !r.end.isCertain("timezoneOffset") && r.end.assign("timezoneOffset", u));
    }), t;
  }
}
const Qr = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), Xr = 1, Jr = 2, Zr = 3;
class es {
  refine(e, t) {
    return t.forEach(function(a) {
      if (a.start.isCertain("timezoneOffset"))
        return;
      const r = e.text.substring(a.index + a.text.length), s = Qr.exec(r);
      if (!s)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${s[0]}' into : ${a}`);
      });
      const i = parseInt(s[Jr]), o = parseInt(s[Zr] || "0");
      let c = i * 60 + o;
      c > 14 * 60 || (s[Xr] === "-" && (c = -c), a.end != null && a.end.assign("timezoneOffset", c), a.start.assign("timezoneOffset", c), a.text += s[0]);
    }), t;
  }
}
class mt {
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
function ts(n, e, t) {
  const a = n.getDateWithAdjustedTimezone(), r = ns(a, e, t);
  let s = new P(n);
  return s = s.addDurationAsImplied({ day: r }), s.assign("weekday", e), s;
}
function ns(n, e, t) {
  const a = n.getDay();
  switch (t) {
    case "this":
      return de(n, e);
    case "last":
      return Dn(n, e);
    case "next":
      return a == A.SUNDAY ? e == A.SUNDAY ? 7 : e : a == A.SATURDAY ? e == A.SATURDAY ? 7 : e == A.SUNDAY ? 8 : 1 + e : e < a && e != A.SUNDAY ? de(n, e) : de(n, e) + 7;
  }
  return as(n, e);
}
function as(n, e) {
  const t = Dn(n, e), a = de(n, e);
  return a < -t ? a : t;
}
function de(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a < 0 && (a += 7), a;
}
function Dn(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a >= 0 && (a -= 7), a;
}
class rs {
  refine(e, t) {
    return e.option.forwardDate && t.forEach((a) => {
      let r = e.reference.getDateWithAdjustedTimezone();
      if (a.start.isOnlyTime() && e.reference.instant > a.start.date()) {
        const s = e.reference.getDateWithAdjustedTimezone(), i = new Date(s);
        i.setDate(i.getDate() + 1), ue(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} time from the ref date (${s}) to the following day (${i})`);
        }), a.end && a.end.isOnlyTime() && (ue(a.end, i), a.start.date() > a.end.date() && (i.setDate(i.getDate() + 1), ue(a.end, i)));
      }
      if (a.start.isOnlyWeekdayComponent() && r > a.start.date()) {
        let s = de(r, a.start.get("weekday")) || 7;
        const i = Y(r, { day: s });
        if (ue(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} weekday (${a.start})`);
        }), a.end && a.start.date() > a.end.date()) {
          let o = de(r, a.start.get("weekday")) || 7;
          const c = Y(r, { day: o });
          ue(a.end, c), e.debug(() => {
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
class ss extends bn {
  constructor(t) {
    super();
    g(this, "strictMode");
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
const is = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), os = 1, cs = 2, ls = 3, Bt = 4, us = 5, Ut = 6, Lt = 7, ds = 8, jt = 9, zt = 10;
class ms extends _ {
  innerPattern() {
    return is;
  }
  innerExtract(e, t) {
    const a = e.createParsingComponents({
      year: parseInt(t[os]),
      month: parseInt(t[cs]),
      day: parseInt(t[ls])
    });
    if (t[Bt] != null && (a.assign("hour", parseInt(t[Bt])), a.assign("minute", parseInt(t[us])), t[Ut] != null && a.assign("second", parseInt(t[Ut])), t[Lt] != null && a.assign("millisecond", parseInt(t[Lt])), t[ds] != null)) {
      let r = 0;
      if (t[jt]) {
        const s = parseInt(t[jt]);
        let i = 0;
        t[zt] != null && (i = parseInt(t[zt])), r = s * 60, r < 0 ? r -= i : r += i;
      }
      a.assign("timezoneOffset", r);
    }
    return a.addTag("parser/ISOFormatParser");
  }
}
class fs extends Ae {
  mergeResults(e, t, a) {
    const r = a.clone();
    return r.index = t.index, r.text = t.text + e + r.text, r.start.assign("weekday", t.start.get("weekday")), r.end && r.end.assign("weekday", t.start.get("weekday")), r;
  }
  shouldMergeResults(e, t, a) {
    return t.start.isOnlyWeekdayComponent() && !t.start.isCertain("hour") && a.start.isCertain("day") && e.match(/^,?\s*$/) != null;
  }
}
function hs(n, e = !1) {
  return n.parsers.unshift(new ms()), n.refiners.unshift(new fs()), n.refiners.unshift(new es()), n.refiners.unshift(new mt()), n.refiners.push(new qr()), n.refiners.push(new mt()), n.refiners.push(new rs()), n.refiners.push(new ss(e)), n;
}
function gs(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new P(n, {});
  return ie(t, e), dn(t, e), t.assign("timezoneOffset", n.getTimezoneOffset()), t.addTag("casualReference/now"), t;
}
function ys(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new P(n, {});
  return ie(t, e), gt(t, e), t.delete("meridiem"), t.addTag("casualReference/today"), t;
}
function ps(n) {
  return ws(n).addTag("casualReference/yesterday");
}
function Ts(n) {
  return yt(n, 1).addTag("casualReference/tomorrow");
}
function ws(n, e) {
  return yt(n, -1);
}
function yt(n, e) {
  const t = n.getDateWithAdjustedTimezone(), a = new P(n, {}), r = new Date(t.getTime());
  return r.setDate(r.getDate() + e), ie(a, r), gt(a, r), a.delete("meridiem"), a;
}
function bs(n, e = 22) {
  const t = n.getDateWithAdjustedTimezone(), a = new P(n, {});
  return ie(a, t), a.imply("hour", e), a.imply("meridiem", D.PM), a.addTag("casualReference/tonight"), a;
}
function Ds(n, e = 20) {
  const t = new P(n, {});
  return t.imply("meridiem", D.PM), t.imply("hour", e), t.addTag("casualReference/evening"), t;
}
function Ms(n) {
  const e = new P(n, {});
  return n.getDateWithAdjustedTimezone().getHours() > 2 && e.addDurationAsImplied({ day: 1 }), e.assign("hour", 0), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/midnight"), e;
}
function Es(n, e = 6) {
  const t = new P(n, {});
  return t.imply("meridiem", D.AM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/morning"), t;
}
function Ps(n, e = 15) {
  const t = new P(n, {});
  return t.imply("meridiem", D.PM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/afternoon"), t;
}
function Ns(n) {
  const e = new P(n, {});
  return e.imply("meridiem", D.AM), e.assign("hour", 12), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/noon"), e;
}
const Os = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
class As extends _ {
  innerPattern(e) {
    return Os;
  }
  innerExtract(e, t) {
    let a = e.refDate;
    const r = t[0].toLowerCase();
    let s = e.createParsingComponents();
    switch (r) {
      case "now":
        s = gs(e.reference);
        break;
      case "today":
        s = ys(e.reference);
        break;
      case "yesterday":
        s = ps(e.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        s = Ts(e.reference);
        break;
      case "tonight":
        s = bs(e.reference);
        break;
      case "overmorrow":
        s = yt(e.reference, 2);
        break;
      default:
        if (r.match(/last\s*night/)) {
          if (a.getHours() > 6) {
            const i = new Date(a.getTime());
            i.setDate(i.getDate() - 1), a = i;
          }
          ie(s, a), s.imply("hour", 0);
        }
        break;
    }
    return s.addTag("parser/ENCasualDateParser"), s;
  }
}
const Ss = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
class xs extends _ {
  innerPattern() {
    return Ss;
  }
  innerExtract(e, t) {
    let a = null;
    switch (t[1].toLowerCase()) {
      case "afternoon":
        a = Ps(e.reference);
        break;
      case "evening":
      case "night":
        a = Ds(e.reference);
        break;
      case "midnight":
        a = Ms(e.reference);
        break;
      case "morning":
        a = Es(e.reference);
        break;
      case "noon":
      case "midday":
        a = Ns(e.reference);
        break;
    }
    return a && a.addTag("parser/ENCasualTimeParser"), a;
  }
}
const ks = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${K(lt)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), Hs = 1, Rs = 2, Fs = 3;
class vs extends _ {
  innerPattern() {
    return ks;
  }
  innerExtract(e, t) {
    const a = t[Hs], r = t[Fs];
    let s = a || r;
    s = s || "", s = s.toLowerCase();
    let i = null;
    s == "last" || s == "past" ? i = "last" : s == "next" ? i = "next" : s == "this" && (i = "this");
    const o = t[Rs].toLowerCase();
    let c;
    if (lt[o] !== void 0)
      c = lt[o];
    else if (o == "weekend")
      c = i == "last" ? A.SUNDAY : A.SATURDAY;
    else if (o == "weekday") {
      const l = e.reference.getDateWithAdjustedTimezone().getDay();
      l == A.SUNDAY || l == A.SATURDAY ? c = i == "last" ? A.FRIDAY : A.MONDAY : (c = l - 1, c = i == "last" ? c - 1 : c + 1, c = c % 5 + 1);
    } else
      return null;
    return ts(e.reference, c, i);
  }
}
const Cs = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${K(We)})(?=\\s*)(?=\\W|$)`, "i"), Ys = 1, Ws = 2;
class _s extends _ {
  innerPattern() {
    return Cs;
  }
  innerExtract(e, t) {
    const a = t[Ys].toLowerCase(), r = t[Ws].toLowerCase(), s = We[r];
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
const $s = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), Is = 1, Bs = 5, Gt = 2, Vt = 3, at = 4;
class Us {
  constructor(e) {
    g(this, "groupNumberMonth");
    g(this, "groupNumberDay");
    this.groupNumberMonth = e ? Vt : Gt, this.groupNumberDay = e ? Gt : Vt;
  }
  pattern() {
    return $s;
  }
  extract(e, t) {
    const a = t.index + t[Is].length, r = t.index + t[0].length - t[Bs].length;
    if (a > 0 && e.text.substring(0, a).match("\\d/?$") || r < e.text.length && e.text.substring(r).match("^/?\\d"))
      return;
    const s = e.text.substring(a, r);
    if (s.match(/^\d\.\d$/) || s.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/) || !t[at] && s.indexOf("/") < 0)
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
    if (i.start.assign("day", c), i.start.assign("month", o), t[at]) {
      const l = parseInt(t[at]), u = hn(l);
      i.start.assign("year", u);
    } else {
      const l = Ye(e.refDate, c, o);
      i.start.imply("year", l);
    }
    return i.addTag("parser/SlashDateFormatParser");
  }
}
const Ls = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Oe})(?=\\W|$)`, "i"), js = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Ie})(?=\\W|$)`, "i");
class zs extends _ {
  constructor(t = !0) {
    super();
    g(this, "allowAbbreviations");
    this.allowAbbreviations = t;
  }
  innerPattern() {
    return this.allowAbbreviations ? Ls : js;
  }
  innerExtract(t, a) {
    const r = a[1].toLowerCase();
    let s = ge(a[2]);
    if (!s)
      return null;
    switch (r) {
      case "last":
      case "past":
      case "-":
        s = Ce(s);
        break;
    }
    return P.createRelativeFromReference(t.reference, s);
  }
}
function Gs(n) {
  return n.text.match(/^[+-]/i) != null;
}
function Kt(n) {
  return n.text.match(/^-/i) != null;
}
class Vs extends Ae {
  shouldMergeResults(e, t, a) {
    return e.match(/^\s*$/i) ? Gs(a) || Kt(a) : !1;
  }
  mergeResults(e, t, a, r) {
    let s = ge(a.text);
    Kt(a) && (s = Ce(s));
    const i = P.createRelativeFromReference(se.fromDate(t.start.date()), s);
    return new he(t.reference, t.index, `${t.text}${e}${a.text}`, i);
  }
}
function qt(n) {
  return n.text.match(/\s+(before|from)$/i) != null;
}
function Ks(n) {
  return n.text.match(/\s+(after|since)$/i) != null;
}
class qs extends Ae {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(e, t, a) {
    return !e.match(this.patternBetween()) || !qt(t) && !Ks(t) ? !1 : !!a.start.get("day") && !!a.start.get("month") && !!a.start.get("year");
  }
  mergeResults(e, t, a) {
    let r = ge(t.text);
    qt(t) && (r = Ce(r));
    const s = P.createRelativeFromReference(se.fromDate(a.start.date()), r);
    return new he(a.reference, t.index, `${t.text}${e}${a.text}`, s);
  }
}
const Qs = new RegExp(`^\\s*(${_e})`, "i"), Xs = 1;
class Js {
  refine(e, t) {
    return t.forEach(function(a) {
      if (!a.start.isDateWithUnknownYear())
        return;
      const r = e.text.substring(a.index + a.text.length), s = Qs.exec(r);
      if (!s || s[0].trim().length <= 3)
        return;
      e.debug(() => {
        console.log(`Extracting year: '${s[0]}' into : ${a}`);
      });
      const i = $e(s[Xs]);
      a.end != null && a.end.assign("year", i), a.start.assign("year", i), a.text += s[0];
    }), t;
  }
}
class Zs extends bn {
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
class Mn {
  createCasualConfiguration(e = !1) {
    const t = this.createConfiguration(!1, e);
    return t.parsers.push(new As()), t.parsers.push(new xs()), t.parsers.push(new Pr()), t.parsers.push(new _s()), t.parsers.push(new zs()), t.refiners.push(new Zs()), t;
  }
  createConfiguration(e = !0, t = !1) {
    const a = hs({
      parsers: [
        new Us(t),
        new hr(e),
        new pr(),
        new br(t),
        new vs(),
        new Fr(),
        new Wr(e),
        new Ir(e),
        new jr(e)
      ],
      refiners: [new It()]
    }, e);
    return a.parsers.unshift(new xr(e)), a.refiners.unshift(new qs()), a.refiners.unshift(new Vs()), a.refiners.unshift(new mt()), a.refiners.push(new It()), a.refiners.push(new Js()), a.refiners.push(new Gr()), a;
  }
}
class me {
  constructor(e) {
    g(this, "parsers");
    g(this, "refiners");
    g(this, "defaultConfig", new Mn());
    e = e || this.defaultConfig.createCasualConfiguration(), this.parsers = [...e.parsers], this.refiners = [...e.refiners];
  }
  clone() {
    return new me({
      parsers: [...this.parsers],
      refiners: [...this.refiners]
    });
  }
  parseDate(e, t, a) {
    const r = this.parse(e, t, a);
    return r.length > 0 ? r[0].start.date() : null;
  }
  parse(e, t, a) {
    const r = new ei(e, t, a);
    let s = [];
    return this.parsers.forEach((i) => {
      const o = me.executeParser(r, i);
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
      l instanceof he ? u = l : l instanceof P ? (u = e.createParsingResult(o.index, o[0]), u.start = l) : u = e.createParsingResult(o.index, o[0], l);
      const d = u.index, b = u.text;
      e.debug(() => console.log(`${t.constructor.name} extracted (at index=${d}) '${b}'`)), a.push(u), i = s.substring(d + b.length), o = r.exec(i);
    }
    return a;
  }
}
class ei {
  constructor(e, t, a) {
    g(this, "text");
    g(this, "option");
    g(this, "reference");
    g(this, "refDate");
    this.text = e, this.option = a ?? {}, this.reference = se.fromInput(t, this.option.timezones), this.refDate = this.reference.instant;
  }
  createParsingComponents(e) {
    return e instanceof P ? e : new P(this.reference, e);
  }
  createParsingResult(e, t, a, r) {
    const s = typeof t == "string" ? t : this.text.substring(e, t), i = a ? this.createParsingComponents(a) : null, o = r ? this.createParsingComponents(r) : null;
    return new he(this.reference, e, s, i, o);
  }
  debug(e) {
    this.option.debug && (this.option.debug instanceof Function ? this.option.debug(e) : this.option.debug.debug(e));
  }
}
const pt = new Mn(), ti = new me(pt.createCasualConfiguration(!1));
new me(pt.createConfiguration(!0, !1));
new me(pt.createCasualConfiguration(!0));
const ni = ti;
function ai(n, e, t) {
  return ni.parse(n, e, t);
}
const ri = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, si = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i, ii = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, oi = /^(this|last|next)\s+(week|month)$/i, ci = /^(end|beginning)\s+of\s+(this|next)\s+month$/i, li = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i, ui = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i, di = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i, mi = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i, fi = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i, hi = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i, gi = /^(christmas|halloween|valentine|new\s+year|independence\s+day|veterans\s+day|st\.?\s+patrick|cinco\s+de\s+mayo|labour\s+day|songkran|chakri\s+memorial\s+day|coronation\s+day|queen\s+suthida's\s+birthday|king's\s+birthday|the\s+queen\s+mother's\s+birthday|king\s+bhumibol\s+adulyadej\s+memorial\s+day|king\s+chulalongkorn\s+day|king\s+bhumibol\s+adulyadej's\s+birthday|constitution\s+day)\s+(\d{4})$/i, En = {
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
}, rt = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}, yi = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
}, pi = {
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
function Ti(n, e, t) {
  const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = new Date(t.getFullYear(), n - 1, e);
  return r >= a ? r : new Date(t.getFullYear() + 1, n - 1, e);
}
function st(n, e) {
  const t = n.toLowerCase().trim().replace(/^next\s+/, ""), a = En[t];
  return a ? Ti(a[0], a[1], e) : null;
}
function it(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? fe(n, e) : a.startsWith("week") ? Me(n, e) : a.startsWith("month") ? re(n, e) : n;
}
function wi(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? ct(n, e) : a.startsWith("week") ? cn(n, e) : a.startsWith("month") ? ht(n, e) : n;
}
function bi(n, e, t = !1) {
  const a = ot(n);
  let r = e - a;
  return (r < 0 || !t && r === 0) && (r += 7), fe(n, r);
}
function Qt(n, e, t, a) {
  if (a > 0) {
    const r = new Date(n, e, 1), s = ot(r);
    let i = t - s;
    i < 0 && (i += 7);
    const o = new Date(n, e, 1 + i + (a - 1) * 7);
    return o.getMonth() !== e ? null : o;
  } else {
    const r = new Date(n, e + 1, 0);
    let i = ot(r) - t;
    return i < 0 && (i += 7), new Date(n, e, r.getDate() - i);
  }
}
function Di(n) {
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
function Pn(n, e = /* @__PURE__ */ new Date()) {
  var q;
  const t = n.trim();
  if (!t) return null;
  const a = t.toLowerCase(), r = t.match(ri);
  if (r) {
    const m = parseInt(r[1], 10);
    return { range: [e, it(e, m, r[2])], text: n };
  }
  const s = t.match(si);
  if (s) {
    const m = parseInt(s[1], 10);
    return { single: it(e, m, s[2]), text: n };
  }
  const i = t.match(ii);
  if (i) {
    const m = parseInt(i[1], 10);
    return { range: [wi(e, m, i[2]), e], text: n };
  }
  const o = t.match(oi);
  if (o) {
    const m = o[1].toLowerCase(), p = o[2].toLowerCase(), O = { weekStartsOn: 1 };
    if (p === "week") {
      const v = m === "last" ? cn(e, 1) : m === "next" ? Me(e, 1) : e;
      return { range: [Z(v, O), ft(v, O)], text: n };
    }
    if (p === "month") {
      const v = m === "last" ? ht(e, 1) : m === "next" ? re(e, 1) : e;
      return { range: [Pe(v), Ee(v)], text: n };
    }
  }
  const c = a.match(ci);
  if (c) {
    const p = c[2] === "next" ? re(e, 1) : e;
    return { single: c[1] === "end" ? Ee(p) : Pe(p), text: n };
  }
  const l = a.match(gi);
  if (l) {
    const m = l[1], p = parseInt(l[2], 10), O = En[m];
    if (O)
      return { single: new Date(p, O[0] - 1, O[1]), text: n };
  }
  const u = a.match(li);
  if (u) {
    const m = parseInt(u[1], 10), p = u[2] === "next" ? re(e, 1) : e;
    return { single: new Date(p.getFullYear(), p.getMonth(), m), text: n };
  }
  const d = a.match(ui);
  if (d) {
    const m = d[1], p = rt[d[2]], O = Di(d[3]);
    if (O !== null && p !== void 0) {
      const v = m === "last" ? -1 : yi[m] ?? 1, x = e.getFullYear();
      let I = Qt(x, O, p, v);
      if ((!I || I < e) && (I = Qt(x + 1, O, p, v)), I) return { single: I, text: n };
    }
  }
  const b = a.match(di);
  if (b) {
    const m = rt[b[1]];
    return { single: bi(e, m, !1), text: n };
  }
  const M = a.match(mi);
  if (M) {
    const m = M[1].startsWith("after") ? 2 : -2;
    return { single: fe(e, m), text: n };
  }
  const N = a.match(fi);
  if (N) {
    const m = rt[N[1]], p = Me(e, 1), O = Ba(p, m, { weekStartsOn: 1 });
    return { single: Me(O, 1), text: n };
  }
  const h = a.match(hi);
  if (h) {
    const m = h[1], p = pi[m] ?? parseInt(m, 10), O = h[2], v = h[3], x = Pn(v, e), I = (x == null ? void 0 : x.single) ?? ((q = x == null ? void 0 : x.range) == null ? void 0 : q[0]);
    if (I) return { single: it(I, p, O), text: n };
  }
  const S = ai(t, e);
  if (S.length > 0) {
    const m = S.find((p) => p.end != null);
    if (m) return { range: [m.start.date(), m.end.date()], text: n };
    if (S.length >= 2) {
      const p = S[0].start.date(), O = S[1].start.date();
      return { range: [p < O ? p : O, p < O ? O : p], text: n };
    }
    return { single: S[0].start.date(), text: n };
  }
  const j = t.match(/^(.+?)\s+to\s+(.+)$/i);
  if (j) {
    const m = st(j[1], e), p = st(j[2], m ?? e);
    if (m && p) return { range: [m, p], text: n };
  }
  const k = st(t, e);
  return k ? { single: k, text: n } : null;
}
function Mi() {
  const [n, e] = L(null), [t, a] = L(""), r = F((s) => {
    a(s), e(Pn(s));
  }, []);
  return { inputValue: t, preview: n, handleChange: r, setInputValue: a, setPreview: e };
}
function H(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function Ei({
  selectionMode: n,
  locale: e,
  onCommit: t
}) {
  const { inputValue: a, preview: r, handleChange: s, setInputValue: i, setPreview: o } = Mi(), c = () => {
    if (!r) return;
    const u = {
      single: r.single ? H(r.single) : void 0,
      range: r.range ? [H(r.range[0]), H(r.range[1])] : void 0
    };
    t(u), i(""), o(null);
  }, l = (() => {
    if (!r) return null;
    if (r.range) {
      const u = (d) => d.toLocaleDateString(e === "th" ? "th-TH" : "en-US", {
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
function Pi({ isOpen: n, position: e, popoverRef: t, children: a }) {
  return n ? Fn(
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
function Ni({ value: n, onChange: e }) {
  const [t, a] = L(null), [r, s] = L(null), i = F(
    (l) => {
      if (r === null)
        s(l), e(null);
      else {
        const u = De(l, r) ? l : r, d = De(l, r) ? r : l;
        e([u, d]), s(null), a(null);
      }
    },
    [r, e]
  ), o = F(
    (l) => {
      r !== null && a(l);
    },
    [r]
  ), c = (() => {
    if (r) {
      if (t) {
        const l = De(t, r) ? t : r, u = De(t, r) ? r : t;
        return [l, u];
      }
      return [r, r];
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
const Xt = 8, Jt = 4;
function Oi(n) {
  const { triggerRect: e, popoverRect: t, viewportWidth: a, viewportHeight: r, scrollX: s, scrollY: i } = n, o = r - e.bottom, c = e.top, l = o >= t.height || o >= c ? "bottom" : "top";
  let u = e.left + s;
  return u + t.width > a && (u = a - t.width - Xt), u = Math.max(Xt, u), { top: l === "bottom" ? e.bottom + i + Jt : e.top + i - t.height - Jt, left: u, placement: l };
}
function Ai() {
  const [n, e] = L(!1), [t, a] = L({
    top: 0,
    left: 0,
    placement: "bottom"
  }), r = Dt(null), s = Dt(null), i = F(() => e(!0), []), o = F(() => e(!1), []), c = F(() => e((u) => !u), []), l = F(() => {
    !r.current || !s.current || a(
      Oi({
        triggerRect: r.current.getBoundingClientRect(),
        popoverRect: s.current.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      })
    );
  }, []);
  return Zt(() => {
    if (!n) return;
    const u = requestAnimationFrame(l), d = (M) => {
      s.current && !s.current.contains(M.target) && r.current && !r.current.contains(M.target) && o();
    }, b = (M) => {
      M.key === "Escape" && o();
    };
    return document.addEventListener("mousedown", d), document.addEventListener("keydown", b), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      cancelAnimationFrame(u), document.removeEventListener("mousedown", d), document.removeEventListener("keydown", b), window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [n, o, l]), { isOpen: n, open: i, close: o, toggle: c, position: t, triggerRef: r, popoverRef: s };
}
function Si(n) {
  const e = {};
  return n.fontFamily && (e["--dp-font-family"] = n.fontFamily), n.fontSize && (e["--dp-font-size"] = n.fontSize), n.primaryColor && (e["--dp-primary"] = n.primaryColor), n.primaryTextColor && (e["--dp-primary-text"] = n.primaryTextColor), n.rangeColor && (e["--dp-range"] = n.rangeColor), n.weekendHeaderTextColor && (e["--dp-weekend-header-text"] = n.weekendHeaderTextColor), n.weekendTextColor && (e["--dp-weekend-text"] = n.weekendTextColor), n.textColor && (e["--dp-text"] = n.textColor), n.mutedTextColor && (e["--dp-muted"] = n.mutedTextColor), n.backgroundColor && (e["--dp-bg"] = n.backgroundColor), n.surfaceColor && (e["--dp-surface"] = n.surfaceColor), n.borderColor && (e["--dp-border"] = n.borderColor), n.borderRadius && (e["--dp-radius"] = n.borderRadius), n.daySize != null && (e["--dp-day-size"] = `${n.daySize}px`), n.shadow && (e["--dp-shadow"] = n.shadow), e;
}
const xi = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  primaryColor: "#2563EB",
  primaryTextColor: "#FFFFFF",
  rangeColor: "#DBEAFE",
  weekendHeaderTextColor: "#FCA5A5",
  weekendTextColor: "#DC2626",
  textColor: "#111827",
  mutedTextColor: "#9CA3AF",
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F3F4F6",
  borderColor: "#E5E7EB",
  borderRadius: "12px",
  daySize: 36,
  shadow: "0 4px 16px rgba(0,0,0,0.10)"
};
function Yi({
  numberOfMonths: n = 1,
  selectionMode: e = "single",
  value: t = null,
  onChange: a,
  locale: r = "en",
  theme: s,
  presets: i,
  presetDisplay: o = "chips",
  presetDropdownPlaceholder: c = "Quick select range",
  presetDropdownAriaLabel: l = "Quick select presets",
  customHolidays: u = [],
  holidayTypes: d = ["public"],
  showNaturalLanguageInput: b = !1,
  showPresets: M = !1,
  showHolidays: N = !0,
  showWeekNumbers: h = !1,
  minDate: S,
  maxDate: j,
  disabledDates: k,
  weekStartsOn: q = 0,
  highlightWeekends: m = !0,
  showTodayButton: p = !1,
  todayButtonLabel: O = "Today",
  calendarSystem: v = "gregorian",
  mode: x = "inline",
  triggerFormat: I,
  className: Se
}) {
  const Be = en(() => Si({ ...xi, ...s }), [s]), C = Ai(), [te, oe] = L(() => {
    const f = H(/* @__PURE__ */ new Date());
    if (Array.isArray(t) && t[0]) {
      const y = H(t[0]);
      return new Date(y.getFullYear(), y.getMonth(), 1);
    }
    if (t instanceof Date) {
      const y = H(t);
      return new Date(y.getFullYear(), y.getMonth(), 1);
    }
    return new Date(f.getFullYear(), f.getMonth(), 1);
  }), [Ue, ye] = L(() => {
    if (Array.isArray(t) && t[1]) {
      const f = t[0] ? H(t[0]) : null, y = H(t[1]);
      return f && !At(f, y) ? new Date(y.getFullYear(), y.getMonth(), 1) : new Date(te.getFullYear(), te.getMonth() + 1, 1);
    }
    return new Date(te.getFullYear(), te.getMonth() + 1, 1);
  }), [Tt, Le] = L(""), R = e === "single" && t instanceof Date ? t : null, $ = e === "range" && Array.isArray(t) ? t : null, { pendingStart: Q, previewRange: pe, handleDayClick: xe, handleDayHover: je } = Ni({
    value: $,
    onChange: (f) => a == null ? void 0 : a(f)
  }), U = F(
    (f, y) => {
      const Te = H(f);
      if (oe(new Date(Te.getFullYear(), Te.getMonth(), 1)), n === 2) {
        const Qe = H(y ?? f), xn = At(Te, Qe) ? new Date(Te.getFullYear(), Te.getMonth() + 1, 1) : new Date(Qe.getFullYear(), Qe.getMonth(), 1);
        ye(xn);
      }
    },
    [n]
  ), ze = F(
    (f) => {
      const y = H(f);
      a == null || a(y), oe(new Date(y.getFullYear(), y.getMonth(), 1)), n === 2 && ye(new Date(y.getFullYear(), y.getMonth() + 1, 1)), x === "popover" && C.close();
    },
    [n, a, x, C]
  ), Ge = F(() => {
    const f = H(/* @__PURE__ */ new Date());
    e === "range" ? (a == null || a([f, f]), U(f, f)) : (a == null || a(f), oe(new Date(f.getFullYear(), f.getMonth(), 1)), n === 2 && ye(new Date(f.getFullYear(), f.getMonth() + 1, 1))), x === "popover" && C.close();
  }, [e, a, U, n, x, C]), Ve = F(
    (f) => {
      const y = Q !== null;
      xe(f), x === "popover" && y && C.close();
    },
    [Q, xe, x, C]
  ), Ke = F(
    (f) => {
      a == null || a(f), U(f[0], f[1]);
    },
    [a, U]
  ), qe = F(
    (f) => {
      if (e === "single" && f.single) {
        const y = H(f.single);
        a == null || a(y), U(y, new Date(y.getFullYear(), y.getMonth() + 1, 1));
      } else if (e === "range" && f.range) {
        const y = [H(f.range[0]), H(f.range[1])];
        a == null || a(y), U(y[0], y[1]);
      } else if (e === "range" && f.single) {
        const y = H(f.single);
        a == null || a([y, y]), U(y, y);
      } else if (f.single) {
        const y = H(f.single);
        a == null || a(y), U(y, new Date(y.getFullYear(), y.getMonth() + 1, 1));
      }
    },
    [e, a, U]
  ), Nn = e === "range" ? Ve : ze, On = ln(H(/* @__PURE__ */ new Date()), S, j, k), An = "dd MMM yyyy", Sn = (() => {
    const f = I ?? An;
    return Array.isArray(t) && t[0] && t[1] ? `${Je(t[0], f)} - ${Je(t[1], f)}` : t instanceof Date ? Je(t, f) : "Select date";
  })(), wt = {
    selectionMode: e,
    selectedDate: R,
    rangeValue: $,
    previewRange: pe,
    onDayClick: Nn,
    onDayHover: e === "range" ? je : () => {
    },
    onAnnounce: Le,
    config: {
      locale: r,
      calendarSystem: v,
      weekStartsOn: q,
      highlightWeekends: m,
      showWeekNumbers: h,
      showHolidays: N,
      holidayTypes: d,
      customHolidays: u,
      minDate: S,
      maxDate: j,
      disabledDates: k
    }
  }, bt = /* @__PURE__ */ W(
    "div",
    {
      className: ["dp-calendar-panel", Se].filter(Boolean).join(" "),
      "data-datepicker-root": !0,
      style: Be,
      children: [
        b && /* @__PURE__ */ T(
          Ei,
          {
            selectionMode: e,
            locale: r,
            onCommit: qe
          }
        ),
        M && e === "range" && /* @__PURE__ */ T(
          rr,
          {
            presets: i,
            value: $,
            onSelect: Ke,
            display: o,
            dropdownPlaceholder: c,
            dropdownAriaLabel: l
          }
        ),
        /* @__PURE__ */ W("div", { className: `dp-months dp-months--${n}`, children: [
          /* @__PURE__ */ T(
            xt,
            {
              ...wt,
              month: te,
              onMonthChange: oe
            }
          ),
          n === 2 && /* @__PURE__ */ T(
            xt,
            {
              ...wt,
              month: Ue,
              onMonthChange: ye
            }
          )
        ] }),
        p && /* @__PURE__ */ T("div", { className: "dp-footer-actions", children: /* @__PURE__ */ T(
          "button",
          {
            type: "button",
            className: "dp-footer-btn",
            onClick: Ge,
            disabled: On,
            children: O
          }
        ) }),
        /* @__PURE__ */ T(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "dp-sr-only",
            children: Tt
          }
        )
      ]
    }
  );
  return x === "popover" ? /* @__PURE__ */ W(Rn, { children: [
    /* @__PURE__ */ T(
      "button",
      {
        ref: C.triggerRef,
        className: "dp-trigger",
        onClick: C.toggle,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": C.isOpen,
        children: Sn
      }
    ),
    /* @__PURE__ */ T(
      Pi,
      {
        isOpen: C.isOpen,
        position: C.position,
        popoverRef: C.popoverRef,
        children: bt
      }
    )
  ] }) : bt;
}
function ki(n, e = "en", t = ["public"]) {
  return (un()[String(n)] ?? []).filter((s) => t.includes(s.type)).map((s) => ({
    date: s.date,
    name: e === "th" ? s.nameTH : s.name,
    nameTH: s.nameTH,
    type: s.type
  }));
}
function Wi(n, e = "en", t = ["public"]) {
  const a = /* @__PURE__ */ new Map();
  for (const r of ki(n, e, t)) {
    const s = a.get(r.date) ?? [];
    s.push(r), a.set(r.date, s);
  }
  return a;
}
const _i = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",
  primaryColor: "#3B82F6",
  primaryTextColor: "#FFFFFF",
  rangeColor: "#1E3A5F",
  weekendHeaderTextColor: "#FCA5A5",
  weekendTextColor: "#F87171",
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
  Yi as DatePicker,
  ar as builtInPresets,
  _i as darkTheme,
  Wi as getHolidayMapForYear,
  ki as getHolidaysForYear,
  xi as lightTheme
};
