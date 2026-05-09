var An = Object.defineProperty;
var Sn = (n, e, t) => e in n ? An(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var y = (n, e, t) => Sn(n, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as $, jsx as T, Fragment as xn } from "react/jsx-runtime";
import { useState as U, useEffect as Zt, useMemo as en, useCallback as F, useRef as Dt } from "react";
import { createPortal as kn } from "react-dom";
function w(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function z(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function fe(n, e) {
  const t = w(n);
  return isNaN(e) ? z(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function ae(n, e) {
  const t = w(n);
  if (isNaN(e)) return z(n, NaN);
  if (!e)
    return t;
  const a = t.getDate(), r = z(n, t.getTime());
  r.setMonth(t.getMonth() + e + 1, 0);
  const s = r.getDate();
  return a >= s ? r : (t.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), t);
}
const tn = 6048e5, Hn = 864e5;
let Rn = {};
function Ee() {
  return Rn;
}
function J(n, e) {
  var o, c, l, u;
  const t = Ee(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? 7 : 0) + s - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function ke(n) {
  return J(n, { weekStartsOn: 1 });
}
function nn(n) {
  const e = w(n), t = e.getFullYear(), a = z(n, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = ke(a), s = z(n, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const i = ke(s);
  return e.getTime() >= r.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function j(n) {
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
function Fn(n, e) {
  const t = j(n), a = j(e), r = +t - Mt(t), s = +a - Mt(a);
  return Math.round((r - s) / Hn);
}
function Cn(n) {
  const e = nn(n), t = z(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), ke(t);
}
function be(n, e) {
  const t = e * 7;
  return fe(n, t);
}
function L(n, e) {
  const t = j(n), a = j(e);
  return +t == +a;
}
function vn(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Yn(n) {
  if (!vn(n) && typeof n != "number")
    return !1;
  const e = w(n);
  return !isNaN(Number(e));
}
function De(n) {
  const e = w(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Wn(n, e) {
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
function Me(n) {
  const e = w(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function _n(n) {
  const e = w(n), t = z(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function ft(n, e) {
  var o, c, l, u;
  const t = Ee(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? -7 : 0) + 6 - (s - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
const $n = {
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
}, In = (n, e, t) => {
  let a;
  const r = $n[n];
  return typeof r == "string" ? a = r : e === 1 ? a = r.one : a = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + a : a + " ago" : a;
};
function Xe(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const Bn = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Un = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Ln = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, jn = {
  date: Xe({
    formats: Bn,
    defaultWidth: "full"
  }),
  time: Xe({
    formats: Un,
    defaultWidth: "full"
  }),
  dateTime: Xe({
    formats: Ln,
    defaultWidth: "full"
  })
}, zn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Gn = (n, e, t, a) => zn[n];
function pe(n) {
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
const Vn = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Kn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, qn = {
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
}, Qn = {
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
}, Xn = {
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
}, Jn = {
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
}, Zn = (n, e) => {
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
}, ea = {
  ordinalNumber: Zn,
  era: pe({
    values: Vn,
    defaultWidth: "wide"
  }),
  quarter: pe({
    values: Kn,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: pe({
    values: qn,
    defaultWidth: "wide"
  }),
  day: pe({
    values: Qn,
    defaultWidth: "wide"
  }),
  dayPeriod: pe({
    values: Xn,
    defaultWidth: "wide",
    formattingValues: Jn,
    defaultFormattingWidth: "wide"
  })
};
function Te(n) {
  return (e, t = {}) => {
    const a = t.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], s = e.match(r);
    if (!s)
      return null;
    const i = s[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? na(o, (d) => d.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      ta(o, (d) => d.test(i))
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
function ta(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function na(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function aa(n) {
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
const ra = /^(\d+)(th|st|nd|rd)?/i, sa = /\d+/i, ia = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, oa = {
  any: [/^b/i, /^(a|c)/i]
}, ca = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, la = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ua = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, da = {
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
}, ma = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, fa = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ha = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ga = {
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
}, ya = {
  ordinalNumber: aa({
    matchPattern: ra,
    parsePattern: sa,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: Te({
    matchPatterns: ia,
    defaultMatchWidth: "wide",
    parsePatterns: oa,
    defaultParseWidth: "any"
  }),
  quarter: Te({
    matchPatterns: ca,
    defaultMatchWidth: "wide",
    parsePatterns: la,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Te({
    matchPatterns: ua,
    defaultMatchWidth: "wide",
    parsePatterns: da,
    defaultParseWidth: "any"
  }),
  day: Te({
    matchPatterns: ma,
    defaultMatchWidth: "wide",
    parsePatterns: fa,
    defaultParseWidth: "any"
  }),
  dayPeriod: Te({
    matchPatterns: ha,
    defaultMatchWidth: "any",
    parsePatterns: ga,
    defaultParseWidth: "any"
  })
}, pa = {
  code: "en-US",
  formatDistance: In,
  formatLong: jn,
  formatRelative: Gn,
  localize: ea,
  match: ya,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ta(n) {
  const e = w(n);
  return Fn(e, _n(e)) + 1;
}
function an(n) {
  const e = w(n), t = +ke(e) - +Cn(e);
  return Math.round(t / tn) + 1;
}
function rn(n, e) {
  var u, d, b, M;
  const t = w(n), a = t.getFullYear(), r = Ee(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((d = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((M = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : M.firstWeekContainsDate) ?? 1, i = z(n, 0);
  i.setFullYear(a + 1, 0, s), i.setHours(0, 0, 0, 0);
  const o = J(i, e), c = z(n, 0);
  c.setFullYear(a, 0, s), c.setHours(0, 0, 0, 0);
  const l = J(c, e);
  return t.getTime() >= o.getTime() ? a + 1 : t.getTime() >= l.getTime() ? a : a - 1;
}
function wa(n, e) {
  var o, c, l, u;
  const t = Ee(), a = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, r = rn(n, e), s = z(n, 0);
  return s.setFullYear(r, 0, a), s.setHours(0, 0, 0, 0), J(s, e);
}
function sn(n, e) {
  const t = w(n), a = +J(t, e) - +wa(t, e);
  return Math.round(a / tn) + 1;
}
function E(n, e) {
  const t = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(e, "0");
  return t + a;
}
const Q = {
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
    return Q.y(n, e);
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
        return Q.M(n, e);
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
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : Q.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const a = Ta(n);
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
    return Q.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : Q.H(n, e);
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
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : Q.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : Q.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return Q.S(n, e);
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
        return ne(a);
      case "XXXXX":
      case "XXX":
      default:
        return ne(a, ":");
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
        return ne(a);
      case "xxxxx":
      case "xxx":
      default:
        return ne(a, ":");
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
        return "GMT" + ne(a, ":");
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
        return "GMT" + ne(a, ":");
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
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + E(Math.abs(n) / 60, 2) : ne(n, e);
}
function ne(n, e = "") {
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
}, ba = (n, e) => {
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
}, Da = {
  p: on,
  P: ba
}, Ma = /^D+$/, Ea = /^Y+$/, Pa = ["D", "DD", "YY", "YYYY"];
function Na(n) {
  return Ma.test(n);
}
function Oa(n) {
  return Ea.test(n);
}
function Aa(n, e, t) {
  const a = Sa(n, e, t);
  if (console.warn(a), Pa.includes(n)) throw new RangeError(a);
}
function Sa(n, e, t) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${a} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const xa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ka = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ha = /^'([^]*?)'?$/, Ra = /''/g, Fa = /[a-zA-Z]/;
function Je(n, e, t) {
  var u, d, b, M;
  const a = Ee(), r = a.locale ?? pa, s = a.firstWeekContainsDate ?? ((d = (u = a.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, i = a.weekStartsOn ?? ((M = (b = a.locale) == null ? void 0 : b.options) == null ? void 0 : M.weekStartsOn) ?? 0, o = w(n);
  if (!Yn(o))
    throw new RangeError("Invalid time value");
  let c = e.match(ka).map((P) => {
    const h = P[0];
    if (h === "p" || h === "P") {
      const x = Da[h];
      return x(P, r.formatLong);
    }
    return P;
  }).join("").match(xa).map((P) => {
    if (P === "''")
      return { isToken: !1, value: "'" };
    const h = P[0];
    if (h === "'")
      return { isToken: !1, value: Ca(P) };
    if (Et[h])
      return { isToken: !0, value: P };
    if (h.match(Fa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + h + "`"
      );
    return { isToken: !1, value: P };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: r
  };
  return c.map((P) => {
    if (!P.isToken) return P.value;
    const h = P.value;
    (Oa(h) || Na(h)) && Aa(h, e, String(n));
    const x = Et[h[0]];
    return x(o, h, r.localize, l);
  }).join("");
}
function Ca(n) {
  const e = n.match(Ha);
  return e ? e[1].replace(Ra, "'") : n;
}
function ot(n) {
  return w(n).getDay();
}
function va(n) {
  return w(n).getMonth();
}
function Ya(n) {
  return w(n).getFullYear();
}
function Wa(n, e) {
  const t = w(n), a = w(e);
  return t.getTime() > a.getTime();
}
function we(n, e) {
  const t = w(n), a = w(e);
  return +t < +a;
}
function _a(n, e, t) {
  const a = t == null ? void 0 : t.weekStartsOn, r = w(n), s = r.getDay(), o = (e % 7 + 7) % 7, c = 7 - a, l = e < 0 || e > 6 ? e - (s + c) % 7 : (o + c) % 7 - (s + c) % 7;
  return fe(r, l);
}
function At(n, e) {
  const t = w(n), a = w(e);
  return t.getFullYear() === a.getFullYear() && t.getMonth() === a.getMonth();
}
function $a(n, e) {
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
  return ae(n, -e);
}
function cn(n, e) {
  return be(n, -e);
}
function Ia(n, e = 0) {
  const t = Me(n), a = De(n), r = J(t, { weekStartsOn: e }), s = ft(a, { weekStartsOn: e }), i = Wn({ start: r, end: s }), o = [];
  let c = [];
  return i.forEach((l, u) => {
    c.push({
      date: l,
      isCurrentMonth: l >= t && l <= a
    }), (u + 1) % 7 === 0 && (o.push(c), c = []);
  }), { weeks: o, month: n };
}
function Ba(n, e = 0) {
  return e === 1 ? an(n) : sn(n, { weekStartsOn: 0 });
}
function ln(n, e, t, a) {
  const r = j(n);
  return !!(e && we(r, j(e)) || t && Wa(r, j(t)) || a != null && a.some((s) => L(s, r)));
}
function Ua(n, e) {
  const { today: t, selectionMode: a, selectedDate: r, activeRange: s, highlightWeekends: i } = e, o = a === "single" && r != null && L(n, r), c = a === "range" && s != null && L(n, s[0]), l = a === "range" && s != null && L(n, s[1]), u = a === "range" && s != null && !L(s[0], s[1]) && $a(j(n), {
    start: j(s[0]),
    end: j(s[1])
  }) && !L(n, s[0]) && !L(n, s[1]), d = L(n, t), b = i && (n.getDay() === 0 || n.getDay() === 6);
  return { isSelected: o, isRangeStart: c, isRangeEnd: l, isInRange: u, isToday: d, isWeekend: b };
}
function La({
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
  onMouseLeave: P
}) {
  const [h, x] = U(!1), V = n.getDate(), k = ["dp-day"];
  e || k.push("dp-day--other-month"), c && k.push("dp-day--disabled"), l && k.push("dp-day--today"), u && k.push("dp-day--weekend"), (t || a || r) && k.push("dp-day--selected"), s && k.push("dp-day--in-range"), a && k.push("dp-day--range-start"), r && k.push("dp-day--range-end"), s && i && k.push("dp-day--row-start"), s && o && k.push("dp-day--row-end");
  const K = n.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ $("div", { className: "dp-day-wrapper", children: [
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
    /* @__PURE__ */ $(
      "button",
      {
        className: k.join(" "),
        onClick: () => !c && b(n),
        onMouseEnter: () => !c && M(n),
        onMouseLeave: P,
        disabled: c,
        "aria-label": K,
        "aria-pressed": t || a || r,
        tabIndex: e && !c ? 0 : -1,
        type: "button",
        children: [
          /* @__PURE__ */ T("span", { className: "dp-day-number", children: V }),
          d.length > 0 && /* @__PURE__ */ $(
            "span",
            {
              className: "dp-holiday-dots",
              onMouseEnter: () => x(!0),
              onMouseLeave: () => x(!1),
              children: [
                d.slice(0, 2).map((m, g) => /* @__PURE__ */ T(
                  "span",
                  {
                    className: "dp-holiday-dot",
                    style: { backgroundColor: m.dotColor },
                    "aria-hidden": "true"
                  },
                  g
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
const ja = [
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
], za = [
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
function Ga({
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
  const l = va(n), u = Ya(n), d = s === "th" ? za : ja, b = [];
  for (let h = u - 10; h <= u + 10; h++)
    b.push(h);
  const M = o ? ae(n, -1) < new Date(o.getFullYear(), o.getMonth(), 1) : !1, P = c ? ae(n, 1) > new Date(c.getFullYear(), c.getMonth(), 1) : !1;
  return /* @__PURE__ */ $("div", { className: "dp-month-nav", children: [
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
    /* @__PURE__ */ $("div", { className: "dp-month-year-labels", children: [
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-month-select",
          value: l,
          onChange: (h) => a(Number(h.target.value)),
          "aria-label": "Select month",
          children: d.map((h, x) => /* @__PURE__ */ T("option", { value: x, children: h }, x))
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
        disabled: P,
        "aria-label": "Next month",
        children: "›"
      }
    )
  ] });
}
function Va({ weekNumbers: n }) {
  return /* @__PURE__ */ $("div", { className: "dp-week-numbers", "aria-hidden": "true", children: [
    /* @__PURE__ */ T("div", { className: "dp-week-number-header", children: "W" }),
    n.map((e, t) => /* @__PURE__ */ T("div", { className: "dp-week-number", children: e }, t))
  ] });
}
const Ka = {
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
  return JSON.parse(JSON.stringify(Ka));
}
const Ze = /* @__PURE__ */ new Map();
function qa(n) {
  const e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), a = String(n.getDate()).padStart(2, "0");
  return `${e}-${t}-${a}`;
}
function Qa(n, e, t) {
  return `${n}-${e}-${t.sort().join(",")}`;
}
const St = "#EF4444";
function Xa(n, e, t = ["public"], a = !0, r = []) {
  const [s, i] = U([]);
  Zt(() => {
    if (!a) return;
    const c = Qa(n, e, t);
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
      return o.get(qa(c)) ?? [];
    }
  };
}
const Ja = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Za = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
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
    showWeekNumbers: P,
    showHolidays: h,
    holidayTypes: x,
    customHolidays: V,
    minDate: k,
    maxDate: K,
    disabledDates: m
  } = l, { weeks: g } = Ia(n, b), O = n.getFullYear(), v = Xa(O, u, x, h, V), C = u === "th" ? Za : Ja, S = b === 1 ? [...C.slice(1), C[0]] : C, q = b === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6], ie = g.map((R) => Ba(R[0].date, b)), $e = F(() => {
    const R = new Date(n.getFullYear(), n.getMonth() - 1, 1);
    e(R);
    const I = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(I);
  }, [n, e, u, c]), oe = F(() => {
    const R = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    e(R);
    const I = R.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(I);
  }, [n, e, u, c]), Ie = F(
    (R) => {
      e(new Date(n.getFullYear(), R, 1));
    },
    [n, e]
  ), Be = F(
    (R) => {
      e(new Date(R, n.getMonth(), 1));
    },
    [n, e]
  ), Ae = {
    today: /* @__PURE__ */ new Date(),
    selectionMode: t,
    selectedDate: a,
    activeRange: s ?? r,
    highlightWeekends: M
  };
  return /* @__PURE__ */ $("div", { className: "dp-calendar", children: [
    /* @__PURE__ */ T(
      Ga,
      {
        month: n,
        onPrev: $e,
        onNext: oe,
        onMonthSelect: Ie,
        onYearSelect: Be,
        locale: u,
        calendarSystem: d,
        minDate: k,
        maxDate: K
      }
    ),
    /* @__PURE__ */ $("div", { className: "dp-grid-container", children: [
      P && /* @__PURE__ */ T(Va, { weekNumbers: ie }),
      /* @__PURE__ */ $("div", { className: "dp-grid", children: [
        /* @__PURE__ */ T("div", { className: "dp-weekday-row", children: S.map((R, I) => /* @__PURE__ */ T(
          "div",
          {
            className: [
              "dp-weekday-label",
              M && (q[I] === 0 || q[I] === 6) ? "dp-weekday-label--weekend" : ""
            ].filter(Boolean).join(" "),
            "aria-hidden": "true",
            children: R
          },
          I
        )) }),
        g.map((R, I) => /* @__PURE__ */ T("div", { className: "dp-week-row", children: R.map((ee, _) => {
          const Ue = v.getHolidaysForDate(ee.date), Le = ln(ee.date, k, K, m), { isSelected: je, isRangeStart: ze, isRangeEnd: Ge, isInRange: Ve, isToday: Ke, isWeekend: qe } = Ua(ee.date, Ae);
          return /* @__PURE__ */ T(
            La,
            {
              date: ee.date,
              isCurrentMonth: ee.isCurrentMonth,
              isSelected: je,
              isRangeStart: ze,
              isRangeEnd: Ge,
              isInRange: Ve,
              isRowStart: _ === 0,
              isRowEnd: _ === 6,
              isDisabled: Le,
              isToday: Ke,
              isWeekend: qe,
              holidays: Ue,
              onClick: i,
              onMouseEnter: o,
              onMouseLeave: () => o(null)
            },
            _
          );
        }) }, I))
      ] })
    ] })
  ] });
}
const er = [
  {
    label: "This week",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [J(n, { weekStartsOn: 1 }), ft(n, { weekStartsOn: 1 })];
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
      return [Me(n), De(n)];
    }
  },
  {
    label: "Last month",
    resolve: () => {
      const n = ht(/* @__PURE__ */ new Date(), 1);
      return [Me(n), De(n)];
    }
  }
];
function tr({ presets: n, value: e, onSelect: t }) {
  const a = n ?? er, r = (s) => {
    if (!e) return !1;
    const [i, o] = s.resolve();
    return L(i, e[0]) && L(o, e[1]);
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
function se(n, e) {
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
const nr = {
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
    dstStart: (n) => X(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => X(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => X(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => X(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => X(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => X(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
    dstStart: (n) => X(n, B.MARCH, A.SUNDAY, 2, 2),
    dstEnd: (n) => X(n, B.NOVEMBER, A.SUNDAY, 1, 2)
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
function X(n, e, t, a, r = 0) {
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
  const a = t[n] ?? nr[n];
  return a == null ? null : typeof a == "number" ? a : e == null ? null : e > a.dstStart(e.getFullYear()) && !(e > a.dstEnd(e.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
}
const ar = {
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
function Fe(n) {
  const e = {};
  for (const t in n)
    e[t] = -n[t];
  return e;
}
class re {
  constructor(e, t) {
    y(this, "instant");
    y(this, "timezoneOffset");
    this.instant = e ?? /* @__PURE__ */ new Date(), this.timezoneOffset = t ?? null;
  }
  static fromDate(e) {
    return new re(e);
  }
  static fromInput(e, t) {
    if (e instanceof Date)
      return re.fromDate(e);
    const a = (e == null ? void 0 : e.instant) ?? /* @__PURE__ */ new Date(), r = mn(e == null ? void 0 : e.timezone, a, t);
    return new re(a, r);
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
class N {
  constructor(e, t) {
    y(this, "knownValues");
    y(this, "impliedValues");
    y(this, "reference");
    y(this, "_tags", /* @__PURE__ */ new Set());
    if (this.reference = e, this.knownValues = {}, this.impliedValues = {}, t)
      for (const r in t)
        this.knownValues[r] = t[r];
    const a = e.getDateWithAdjustedTimezone();
    this.imply("day", a.getDate()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear()), this.imply("hour", 12), this.imply("minute", 0), this.imply("second", 0), this.imply("millisecond", 0);
  }
  static createRelativeFromReference(e, t = ar) {
    let a = Y(e.getDateWithAdjustedTimezone(), t);
    const r = new N(e);
    return r.addTag("result/relativeDate"), "hour" in t || "minute" in t || "second" in t || "millisecond" in t ? (r.addTag("result/relativeDateAndTime"), dn(r, a), se(r, a), r.assign("timezoneOffset", e.getTimezoneOffset())) : (gt(r, a), r.imply("timezoneOffset", e.getTimezoneOffset()), "day" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.assign("weekday", a.getDay())) : "week" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.imply("weekday", a.getDay())) : (r.imply("day", a.getDate()), "month" in t ? (r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear())) : (r.imply("month", a.getMonth() + 1), "year" in t ? r.assign("year", a.getFullYear()) : r.imply("year", a.getFullYear())))), r;
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
    const e = new N(this.reference);
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
    y(this, "refDate");
    y(this, "index");
    y(this, "text");
    y(this, "reference");
    y(this, "start");
    y(this, "end");
    this.reference = e, this.refDate = e.instant, this.index = t, this.text = a, this.start = r || new N(e), this.end = s;
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
function rr(n) {
  let e;
  return n instanceof Array ? e = [...n] : n instanceof Map ? e = Array.from(n.keys()) : e = Object.keys(n), e;
}
function G(n) {
  return `(?:${rr(n).sort((t, a) => a.length - t.length).join("|").replace(/\./g, "\\.")})`;
}
function hn(n) {
  return n < 100 && (n > 50 ? n = n + 1900 : n = n + 2e3), n;
}
function Ce(n, e, t) {
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
}, Z = {
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
  ...yn
}, pn = `(?:${G(ut)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function sr(n) {
  const e = n.toLowerCase();
  return ut[e] !== void 0 ? ut[e] : e === "a" || e === "an" || e == "the" ? 1 : e.match(/few/) ? 3 : e.match(/half/) ? 0.5 : e.match(/couple/) ? 2 : e.match(/several/) ? 7 : parseFloat(e);
}
const He = `(?:${G(dt)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function Re(n) {
  let e = n.toLowerCase();
  return dt[e] !== void 0 ? dt[e] : (e = e.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(e));
}
const Ye = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[5-9][0-9]|2[0-5])";
function We(n) {
  if (/BE/i.test(n))
    return n = n.replace(/BE/i, ""), parseInt(n) - 543;
  if (/BCE?/i.test(n))
    return n = n.replace(/BCE?/i, ""), -parseInt(n);
  if (/(AD|CE)/i.test(n))
    return n = n.replace(/(AD|CE)/i, ""), parseInt(n);
  const e = parseInt(n);
  return hn(e);
}
const Tn = `(${pn})\\s{0,3}(${G(ve)})`, Ht = new RegExp(Tn, "i"), ir = `(${pn})\\s{0,3}(${G(yn)})`, wn = "\\s{0,5},?(?:\\s*and)?\\s{0,5}", Pe = fn("(?:(?:about|around)\\s{0,3})?", Tn, wn), _e = fn("(?:(?:about|around)\\s{0,3})?", ir, wn);
function ge(n) {
  const e = {};
  let t = n, a = Ht.exec(t);
  for (; a; )
    or(e, a), t = t.substring(a[0].length).trim(), a = Ht.exec(t);
  return Object.keys(e).length == 0 ? null : e;
}
function or(n, e) {
  if (e[0].match(/^[a-zA-Z]+$/))
    return;
  const t = sr(e[1]), a = ve[e[2].toLowerCase()];
  n[a] = t;
}
class W {
  constructor() {
    y(this, "cachedInnerPattern", null);
    y(this, "cachedPattern", null);
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
const cr = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Pe})(?=\\W|$)`, "i"), lr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Pe})(?=\\W|$)`, "i"), ur = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${_e})(?=\\W|$)`, "i");
class dr extends W {
  constructor(t) {
    super();
    y(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern(t) {
    return this.strictMode ? ur : t.option.forwardDate ? cr : lr;
  }
  innerExtract(t, a) {
    if (a[0].match(/^for\s*the\s*\w+/))
      return null;
    const r = ge(a[1]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
const mr = new RegExp(`(?:on\\s{0,3})?(${He})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${He}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${G(Z)})(?:(?:-|/|,?\\s{0,3})(${Ye}(?!\\w)))?(?=\\W|$)`, "i"), Rt = 1, Ft = 2, fr = 3, Ct = 4;
class hr extends W {
  innerPattern() {
    return mr;
  }
  innerExtract(e, t) {
    const a = e.createParsingResult(t.index, t[0]), r = Z[t[fr].toLowerCase()], s = Re(t[Rt]);
    if (s > 31)
      return t.index = t.index + t[Rt].length, null;
    if (a.start.assign("month", r), a.start.assign("day", s), t[Ct]) {
      const i = We(t[Ct]);
      a.start.assign("year", i);
    } else {
      const i = Ce(e.refDate, s, r);
      a.start.imply("year", i);
    }
    if (t[Ft]) {
      const i = Re(t[Ft]);
      a.end = a.start.clone(), a.end.assign("day", i);
    }
    return a;
  }
}
const gr = new RegExp(`(${G(Z)})(?:-|/|\\s*,?\\s*)(${He})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${He})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${Ye}))?(?=\\W|$)(?!\\:\\d)`, "i"), yr = 1, vt = 2, et = 3, tt = 4;
class pr extends W {
  constructor(t) {
    super();
    y(this, "shouldSkipYearLikeDate");
    this.shouldSkipYearLikeDate = t;
  }
  innerPattern() {
    return gr;
  }
  innerExtract(t, a) {
    const r = Z[a[yr].toLowerCase()], s = Re(a[vt]);
    if (s > 31 || this.shouldSkipYearLikeDate && !a[et] && !a[tt] && a[vt].match(/^2[0-5]$/))
      return null;
    const i = t.createParsingComponents({
      day: s,
      month: r
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (a[tt]) {
      const l = We(a[tt]);
      i.assign("year", l);
    } else {
      const l = Ce(t.refDate, s, r);
      i.imply("year", l);
    }
    if (!a[et])
      return i;
    const o = Re(a[et]), c = t.createParsingResult(a.index, a[0]);
    return c.start = i, c.end = i.clone(), c.end.assign("day", o), c;
  }
}
const Tr = new RegExp(`((?:in)\\s*)?(${G(Z)})\\s*(?:(?:,|-|of)?\\s*(${Ye})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), wr = 1, br = 2, Yt = 3;
class Dr extends W {
  innerPattern() {
    return Tr;
  }
  innerExtract(e, t) {
    const a = t[br].toLowerCase();
    if (t[0].length <= 3 && !gn[a])
      return null;
    const r = e.createParsingResult(t.index + (t[wr] || "").length, t.index + t[0].length);
    r.start.imply("day", 1), r.start.addTag("parser/ENMonthNameParser");
    const s = Z[a];
    if (r.start.assign("month", s), t[Yt]) {
      const i = We(t[Yt]);
      r.start.assign("year", i);
    } else {
      const i = Ce(e.refDate, 1, s);
      r.start.imply("year", i);
    }
    return r;
  }
}
const Mr = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${G(Z)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), Er = 1, Pr = 2, Wt = 3, Nr = 4;
class Or extends W {
  constructor(t) {
    super();
    y(this, "strictMonthDateOrder");
    this.strictMonthDateOrder = t;
  }
  innerPattern() {
    return Mr;
  }
  innerExtract(t, a) {
    const r = parseInt(a[Er]);
    let s = parseInt(a[Nr]), i = a[Wt] ? parseInt(a[Wt]) : Z[a[Pr].toLowerCase()];
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
const Ar = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), Sr = 1, xr = 2;
class kr extends W {
  innerPattern() {
    return Ar;
  }
  innerExtract(e, t) {
    const a = parseInt(t[xr]), r = parseInt(t[Sr]);
    return e.createParsingComponents().imply("day", 1).assign("month", r).assign("year", a);
  }
}
function Hr(n, e, t, a) {
  return new RegExp(`${n}${e}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`, a);
}
function Rr(n, e) {
  return new RegExp(`^(${n})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${e}`, "i");
}
const nt = 2, te = 3, Se = 4, xe = 5, le = 6;
class Fr {
  constructor(e = !1) {
    y(this, "strictMode");
    y(this, "cachedPrimaryPrefix", null);
    y(this, "cachedPrimarySuffix", null);
    y(this, "cachedPrimaryTimePattern", null);
    y(this, "cachedFollowingPhase", null);
    y(this, "cachedFollowingSuffix", null);
    y(this, "cachedFollowingTimePatten", null);
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
      if (t[nt].length == 4 && t[te] == null && !t[le] || this.strictMode || t[te] != null)
        return null;
      s = o % 100, o = Math.floor(o / 100);
    }
    if (o > 24)
      return null;
    if (t[te] != null) {
      if (t[te].length == 1 && !t[le])
        return null;
      s = parseInt(t[te]);
    }
    if (s >= 60)
      return null;
    if (o > 12 && (i = D.PM), t[le] != null) {
      if (o > 12)
        return null;
      const c = t[le][0].toLowerCase();
      c == "a" && (i = D.AM, o == 12 && (o = 0)), c == "p" && (i = D.PM, o != 12 && (o += 12));
    }
    if (r.assign("hour", o), r.assign("minute", s), i !== null ? r.assign("meridiem", i) : o < 12 ? r.imply("meridiem", D.AM) : r.imply("meridiem", D.PM), t[xe] != null) {
      const c = parseInt(t[xe].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Se] != null) {
      const c = parseInt(t[Se]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    return r;
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = e.createParsingComponents();
    if (t[xe] != null) {
      const c = parseInt(t[xe].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Se] != null) {
      const c = parseInt(t[Se]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    let s = parseInt(t[nt]), i = 0, o = -1;
    if (t[te] != null ? i = parseInt(t[te]) : s > 100 && (i = s % 100, s = Math.floor(s / 100)), i >= 60 || s > 24)
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
    return this.cachedPrimaryPrefix === e && this.cachedPrimarySuffix === t ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = Hr(this.primaryPatternLeftBoundary(), e, t, this.patternFlags()), this.cachedPrimaryPrefix = e, this.cachedPrimarySuffix = t, this.cachedPrimaryTimePattern);
  }
  getFollowingTimePatternThroughCache() {
    const e = this.followingPhase(), t = this.followingSuffix();
    return this.cachedFollowingPhase === e && this.cachedFollowingSuffix === t ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = Rr(e, t), this.cachedFollowingPhase = e, this.cachedFollowingSuffix = t, this.cachedFollowingTimePatten);
  }
}
class Cr extends Fr {
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
const vr = new RegExp(`(${Pe})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), Yr = new RegExp(`(${_e})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
class Wr extends W {
  constructor(t) {
    super();
    y(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? Yr : vr;
  }
  innerExtract(t, a) {
    const r = ge(a[1]);
    return r ? N.createRelativeFromReference(t.reference, Fe(r)) : null;
  }
}
const _r = new RegExp(`(${Pe})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), $r = new RegExp(`(${_e})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), Ir = 1;
class Br extends W {
  constructor(t) {
    super();
    y(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? $r : _r;
  }
  innerExtract(t, a) {
    const r = ge(a[Ir]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
class bn {
  refine(e, t) {
    return t.filter((a) => this.isValid(e, a));
  }
}
class Ne {
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
class Ur extends Ne {
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
class Lr extends Ur {
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
      c.setDate(c.getDate() + 1), o.isCertain("day") ? se(o, c) : ue(o, c);
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
class jr extends Ne {
  shouldMergeResults(e, t, a) {
    return (t.start.isOnlyDate() && a.start.isOnlyTime() || a.start.isOnlyDate() && t.start.isOnlyTime()) && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    const r = t.start.isOnlyDate() ? _t(t, a) : _t(a, t);
    return r.index = t.index, r.text = t.text + e + a.text, r;
  }
}
class It extends jr {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
  }
}
const zr = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
class Gr {
  constructor(e) {
    y(this, "timezoneOverrides");
    this.timezoneOverrides = e;
  }
  refine(e, t) {
    const a = e.option.timezones ?? {};
    return t.forEach((r) => {
      const s = e.text.substring(r.index + r.text.length), i = zr.exec(s);
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
const Vr = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), Kr = 1, qr = 2, Qr = 3;
class Xr {
  refine(e, t) {
    return t.forEach(function(a) {
      if (a.start.isCertain("timezoneOffset"))
        return;
      const r = e.text.substring(a.index + a.text.length), s = Vr.exec(r);
      if (!s)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${s[0]}' into : ${a}`);
      });
      const i = parseInt(s[qr]), o = parseInt(s[Qr] || "0");
      let c = i * 60 + o;
      c > 14 * 60 || (s[Kr] === "-" && (c = -c), a.end != null && a.end.assign("timezoneOffset", c), a.start.assign("timezoneOffset", c), a.text += s[0]);
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
function Jr(n, e, t) {
  const a = n.getDateWithAdjustedTimezone(), r = Zr(a, e, t);
  let s = new N(n);
  return s = s.addDurationAsImplied({ day: r }), s.assign("weekday", e), s;
}
function Zr(n, e, t) {
  const a = n.getDay();
  switch (t) {
    case "this":
      return de(n, e);
    case "last":
      return Dn(n, e);
    case "next":
      return a == A.SUNDAY ? e == A.SUNDAY ? 7 : e : a == A.SATURDAY ? e == A.SATURDAY ? 7 : e == A.SUNDAY ? 8 : 1 + e : e < a && e != A.SUNDAY ? de(n, e) : de(n, e) + 7;
  }
  return es(n, e);
}
function es(n, e) {
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
class ts {
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
class ns extends bn {
  constructor(t) {
    super();
    y(this, "strictMode");
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
const as = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), rs = 1, ss = 2, is = 3, Bt = 4, os = 5, Ut = 6, Lt = 7, cs = 8, jt = 9, zt = 10;
class ls extends W {
  innerPattern() {
    return as;
  }
  innerExtract(e, t) {
    const a = e.createParsingComponents({
      year: parseInt(t[rs]),
      month: parseInt(t[ss]),
      day: parseInt(t[is])
    });
    if (t[Bt] != null && (a.assign("hour", parseInt(t[Bt])), a.assign("minute", parseInt(t[os])), t[Ut] != null && a.assign("second", parseInt(t[Ut])), t[Lt] != null && a.assign("millisecond", parseInt(t[Lt])), t[cs] != null)) {
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
class us extends Ne {
  mergeResults(e, t, a) {
    const r = a.clone();
    return r.index = t.index, r.text = t.text + e + r.text, r.start.assign("weekday", t.start.get("weekday")), r.end && r.end.assign("weekday", t.start.get("weekday")), r;
  }
  shouldMergeResults(e, t, a) {
    return t.start.isOnlyWeekdayComponent() && !t.start.isCertain("hour") && a.start.isCertain("day") && e.match(/^,?\s*$/) != null;
  }
}
function ds(n, e = !1) {
  return n.parsers.unshift(new ls()), n.refiners.unshift(new us()), n.refiners.unshift(new Xr()), n.refiners.unshift(new mt()), n.refiners.push(new Gr()), n.refiners.push(new mt()), n.refiners.push(new ts()), n.refiners.push(new ns(e)), n;
}
function ms(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return se(t, e), dn(t, e), t.assign("timezoneOffset", n.getTimezoneOffset()), t.addTag("casualReference/now"), t;
}
function fs(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return se(t, e), gt(t, e), t.delete("meridiem"), t.addTag("casualReference/today"), t;
}
function hs(n) {
  return ys(n).addTag("casualReference/yesterday");
}
function gs(n) {
  return yt(n, 1).addTag("casualReference/tomorrow");
}
function ys(n, e) {
  return yt(n, -1);
}
function yt(n, e) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {}), r = new Date(t.getTime());
  return r.setDate(r.getDate() + e), se(a, r), gt(a, r), a.delete("meridiem"), a;
}
function ps(n, e = 22) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {});
  return se(a, t), a.imply("hour", e), a.imply("meridiem", D.PM), a.addTag("casualReference/tonight"), a;
}
function Ts(n, e = 20) {
  const t = new N(n, {});
  return t.imply("meridiem", D.PM), t.imply("hour", e), t.addTag("casualReference/evening"), t;
}
function ws(n) {
  const e = new N(n, {});
  return n.getDateWithAdjustedTimezone().getHours() > 2 && e.addDurationAsImplied({ day: 1 }), e.assign("hour", 0), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/midnight"), e;
}
function bs(n, e = 6) {
  const t = new N(n, {});
  return t.imply("meridiem", D.AM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/morning"), t;
}
function Ds(n, e = 15) {
  const t = new N(n, {});
  return t.imply("meridiem", D.PM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/afternoon"), t;
}
function Ms(n) {
  const e = new N(n, {});
  return e.imply("meridiem", D.AM), e.assign("hour", 12), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/noon"), e;
}
const Es = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
class Ps extends W {
  innerPattern(e) {
    return Es;
  }
  innerExtract(e, t) {
    let a = e.refDate;
    const r = t[0].toLowerCase();
    let s = e.createParsingComponents();
    switch (r) {
      case "now":
        s = ms(e.reference);
        break;
      case "today":
        s = fs(e.reference);
        break;
      case "yesterday":
        s = hs(e.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        s = gs(e.reference);
        break;
      case "tonight":
        s = ps(e.reference);
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
          se(s, a), s.imply("hour", 0);
        }
        break;
    }
    return s.addTag("parser/ENCasualDateParser"), s;
  }
}
const Ns = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
class Os extends W {
  innerPattern() {
    return Ns;
  }
  innerExtract(e, t) {
    let a = null;
    switch (t[1].toLowerCase()) {
      case "afternoon":
        a = Ds(e.reference);
        break;
      case "evening":
      case "night":
        a = Ts(e.reference);
        break;
      case "midnight":
        a = ws(e.reference);
        break;
      case "morning":
        a = bs(e.reference);
        break;
      case "noon":
      case "midday":
        a = Ms(e.reference);
        break;
    }
    return a && a.addTag("parser/ENCasualTimeParser"), a;
  }
}
const As = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${G(lt)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), Ss = 1, xs = 2, ks = 3;
class Hs extends W {
  innerPattern() {
    return As;
  }
  innerExtract(e, t) {
    const a = t[Ss], r = t[ks];
    let s = a || r;
    s = s || "", s = s.toLowerCase();
    let i = null;
    s == "last" || s == "past" ? i = "last" : s == "next" ? i = "next" : s == "this" && (i = "this");
    const o = t[xs].toLowerCase();
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
    return Jr(e.reference, c, i);
  }
}
const Rs = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${G(ve)})(?=\\s*)(?=\\W|$)`, "i"), Fs = 1, Cs = 2;
class vs extends W {
  innerPattern() {
    return Rs;
  }
  innerExtract(e, t) {
    const a = t[Fs].toLowerCase(), r = t[Cs].toLowerCase(), s = ve[r];
    if (a == "next" || a.startsWith("after")) {
      const c = {};
      return c[s] = 1, N.createRelativeFromReference(e.reference, c);
    }
    if (a == "last" || a == "past") {
      const c = {};
      return c[s] = -1, N.createRelativeFromReference(e.reference, c);
    }
    const i = e.createParsingComponents();
    let o = new Date(e.reference.instant.getTime());
    return r.match(/week/i) ? (o.setDate(o.getDate() - o.getDay()), i.imply("day", o.getDate()), i.imply("month", o.getMonth() + 1), i.imply("year", o.getFullYear())) : r.match(/month/i) ? (o.setDate(1), i.imply("day", o.getDate()), i.assign("year", o.getFullYear()), i.assign("month", o.getMonth() + 1)) : r.match(/year/i) && (o.setDate(1), o.setMonth(0), i.imply("day", o.getDate()), i.imply("month", o.getMonth() + 1), i.assign("year", o.getFullYear())), i;
  }
}
const Ys = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), Ws = 1, _s = 5, Gt = 2, Vt = 3, at = 4;
class $s {
  constructor(e) {
    y(this, "groupNumberMonth");
    y(this, "groupNumberDay");
    this.groupNumberMonth = e ? Vt : Gt, this.groupNumberDay = e ? Gt : Vt;
  }
  pattern() {
    return Ys;
  }
  extract(e, t) {
    const a = t.index + t[Ws].length, r = t.index + t[0].length - t[_s].length;
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
      const l = Ce(e.refDate, c, o);
      i.start.imply("year", l);
    }
    return i.addTag("parser/SlashDateFormatParser");
  }
}
const Is = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Pe})(?=\\W|$)`, "i"), Bs = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${_e})(?=\\W|$)`, "i");
class Us extends W {
  constructor(t = !0) {
    super();
    y(this, "allowAbbreviations");
    this.allowAbbreviations = t;
  }
  innerPattern() {
    return this.allowAbbreviations ? Is : Bs;
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
        s = Fe(s);
        break;
    }
    return N.createRelativeFromReference(t.reference, s);
  }
}
function Ls(n) {
  return n.text.match(/^[+-]/i) != null;
}
function Kt(n) {
  return n.text.match(/^-/i) != null;
}
class js extends Ne {
  shouldMergeResults(e, t, a) {
    return e.match(/^\s*$/i) ? Ls(a) || Kt(a) : !1;
  }
  mergeResults(e, t, a, r) {
    let s = ge(a.text);
    Kt(a) && (s = Fe(s));
    const i = N.createRelativeFromReference(re.fromDate(t.start.date()), s);
    return new he(t.reference, t.index, `${t.text}${e}${a.text}`, i);
  }
}
function qt(n) {
  return n.text.match(/\s+(before|from)$/i) != null;
}
function zs(n) {
  return n.text.match(/\s+(after|since)$/i) != null;
}
class Gs extends Ne {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(e, t, a) {
    return !e.match(this.patternBetween()) || !qt(t) && !zs(t) ? !1 : !!a.start.get("day") && !!a.start.get("month") && !!a.start.get("year");
  }
  mergeResults(e, t, a) {
    let r = ge(t.text);
    qt(t) && (r = Fe(r));
    const s = N.createRelativeFromReference(re.fromDate(a.start.date()), r);
    return new he(a.reference, t.index, `${t.text}${e}${a.text}`, s);
  }
}
const Vs = new RegExp(`^\\s*(${Ye})`, "i"), Ks = 1;
class qs {
  refine(e, t) {
    return t.forEach(function(a) {
      if (!a.start.isDateWithUnknownYear())
        return;
      const r = e.text.substring(a.index + a.text.length), s = Vs.exec(r);
      if (!s || s[0].trim().length <= 3)
        return;
      e.debug(() => {
        console.log(`Extracting year: '${s[0]}' into : ${a}`);
      });
      const i = We(s[Ks]);
      a.end != null && a.end.assign("year", i), a.start.assign("year", i), a.text += s[0];
    }), t;
  }
}
class Qs extends bn {
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
    return t.parsers.push(new Ps()), t.parsers.push(new Os()), t.parsers.push(new Dr()), t.parsers.push(new vs()), t.parsers.push(new Us()), t.refiners.push(new Qs()), t;
  }
  createConfiguration(e = !0, t = !1) {
    const a = ds({
      parsers: [
        new $s(t),
        new dr(e),
        new hr(),
        new pr(t),
        new Hs(),
        new kr(),
        new Cr(e),
        new Wr(e),
        new Br(e)
      ],
      refiners: [new It()]
    }, e);
    return a.parsers.unshift(new Or(e)), a.refiners.unshift(new Gs()), a.refiners.unshift(new js()), a.refiners.unshift(new mt()), a.refiners.push(new It()), a.refiners.push(new qs()), a.refiners.push(new Lr()), a;
  }
}
class me {
  constructor(e) {
    y(this, "parsers");
    y(this, "refiners");
    y(this, "defaultConfig", new Mn());
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
    const r = new Xs(e, t, a);
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
      l instanceof he ? u = l : l instanceof N ? (u = e.createParsingResult(o.index, o[0]), u.start = l) : u = e.createParsingResult(o.index, o[0], l);
      const d = u.index, b = u.text;
      e.debug(() => console.log(`${t.constructor.name} extracted (at index=${d}) '${b}'`)), a.push(u), i = s.substring(d + b.length), o = r.exec(i);
    }
    return a;
  }
}
class Xs {
  constructor(e, t, a) {
    y(this, "text");
    y(this, "option");
    y(this, "reference");
    y(this, "refDate");
    this.text = e, this.option = a ?? {}, this.reference = re.fromInput(t, this.option.timezones), this.refDate = this.reference.instant;
  }
  createParsingComponents(e) {
    return e instanceof N ? e : new N(this.reference, e);
  }
  createParsingResult(e, t, a, r) {
    const s = typeof t == "string" ? t : this.text.substring(e, t), i = a ? this.createParsingComponents(a) : null, o = r ? this.createParsingComponents(r) : null;
    return new he(this.reference, e, s, i, o);
  }
  debug(e) {
    this.option.debug && (this.option.debug instanceof Function ? this.option.debug(e) : this.option.debug.debug(e));
  }
}
const pt = new Mn(), Js = new me(pt.createCasualConfiguration(!1));
new me(pt.createConfiguration(!0, !1));
new me(pt.createCasualConfiguration(!0));
const Zs = Js;
function ei(n, e, t) {
  return Zs.parse(n, e, t);
}
const ti = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, ni = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i, ai = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, ri = /^(this|last|next)\s+(week|month)$/i, si = /^(end|beginning)\s+of\s+(this|next)\s+month$/i, ii = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i, oi = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i, ci = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i, li = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i, ui = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i, di = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i, mi = /^(christmas|halloween|valentine|new\s+year|independence\s+day|veterans\s+day|st\.?\s+patrick|cinco\s+de\s+mayo|labour\s+day|songkran|chakri\s+memorial\s+day|coronation\s+day|queen\s+suthida's\s+birthday|king's\s+birthday|the\s+queen\s+mother's\s+birthday|king\s+bhumibol\s+adulyadej\s+memorial\s+day|king\s+chulalongkorn\s+day|king\s+bhumibol\s+adulyadej's\s+birthday|constitution\s+day)\s+(\d{4})$/i, En = {
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
}, fi = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
}, hi = {
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
function gi(n, e, t) {
  const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = new Date(t.getFullYear(), n - 1, e);
  return r >= a ? r : new Date(t.getFullYear() + 1, n - 1, e);
}
function st(n, e) {
  const t = n.toLowerCase().trim().replace(/^next\s+/, ""), a = En[t];
  return a ? gi(a[0], a[1], e) : null;
}
function it(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? fe(n, e) : a.startsWith("week") ? be(n, e) : a.startsWith("month") ? ae(n, e) : n;
}
function yi(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? ct(n, e) : a.startsWith("week") ? cn(n, e) : a.startsWith("month") ? ht(n, e) : n;
}
function pi(n, e, t = !1) {
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
function Ti(n) {
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
  var K;
  const t = n.trim();
  if (!t) return null;
  const a = t.toLowerCase(), r = t.match(ti);
  if (r) {
    const m = parseInt(r[1], 10);
    return { range: [e, it(e, m, r[2])], text: n };
  }
  const s = t.match(ni);
  if (s) {
    const m = parseInt(s[1], 10);
    return { single: it(e, m, s[2]), text: n };
  }
  const i = t.match(ai);
  if (i) {
    const m = parseInt(i[1], 10);
    return { range: [yi(e, m, i[2]), e], text: n };
  }
  const o = t.match(ri);
  if (o) {
    const m = o[1].toLowerCase(), g = o[2].toLowerCase(), O = { weekStartsOn: 1 };
    if (g === "week") {
      const v = m === "last" ? cn(e, 1) : m === "next" ? be(e, 1) : e;
      return { range: [J(v, O), ft(v, O)], text: n };
    }
    if (g === "month") {
      const v = m === "last" ? ht(e, 1) : m === "next" ? ae(e, 1) : e;
      return { range: [Me(v), De(v)], text: n };
    }
  }
  const c = a.match(si);
  if (c) {
    const g = c[2] === "next" ? ae(e, 1) : e;
    return { single: c[1] === "end" ? De(g) : Me(g), text: n };
  }
  const l = a.match(mi);
  if (l) {
    const m = l[1], g = parseInt(l[2], 10), O = En[m];
    if (O)
      return { single: new Date(g, O[0] - 1, O[1]), text: n };
  }
  const u = a.match(ii);
  if (u) {
    const m = parseInt(u[1], 10), g = u[2] === "next" ? ae(e, 1) : e;
    return { single: new Date(g.getFullYear(), g.getMonth(), m), text: n };
  }
  const d = a.match(oi);
  if (d) {
    const m = d[1], g = rt[d[2]], O = Ti(d[3]);
    if (O !== null && g !== void 0) {
      const v = m === "last" ? -1 : fi[m] ?? 1, C = e.getFullYear();
      let S = Qt(C, O, g, v);
      if ((!S || S < e) && (S = Qt(C + 1, O, g, v)), S) return { single: S, text: n };
    }
  }
  const b = a.match(ci);
  if (b) {
    const m = rt[b[1]];
    return { single: pi(e, m, !1), text: n };
  }
  const M = a.match(li);
  if (M) {
    const m = M[1].startsWith("after") ? 2 : -2;
    return { single: fe(e, m), text: n };
  }
  const P = a.match(ui);
  if (P) {
    const m = rt[P[1]], g = be(e, 1), O = _a(g, m, { weekStartsOn: 1 });
    return { single: be(O, 1), text: n };
  }
  const h = a.match(di);
  if (h) {
    const m = h[1], g = hi[m] ?? parseInt(m, 10), O = h[2], v = h[3], C = Pn(v, e), S = (C == null ? void 0 : C.single) ?? ((K = C == null ? void 0 : C.range) == null ? void 0 : K[0]);
    if (S) return { single: it(S, g, O), text: n };
  }
  const x = ei(t, e);
  if (x.length > 0) {
    const m = x.find((g) => g.end != null);
    if (m) return { range: [m.start.date(), m.end.date()], text: n };
    if (x.length >= 2) {
      const g = x[0].start.date(), O = x[1].start.date();
      return { range: [g < O ? g : O, g < O ? O : g], text: n };
    }
    return { single: x[0].start.date(), text: n };
  }
  const V = t.match(/^(.+?)\s+to\s+(.+)$/i);
  if (V) {
    const m = st(V[1], e), g = st(V[2], m ?? e);
    if (m && g) return { range: [m, g], text: n };
  }
  const k = st(t, e);
  return k ? { single: k, text: n } : null;
}
function wi() {
  const [n, e] = U(null), [t, a] = U(""), r = F((s) => {
    a(s), e(Pn(s));
  }, []);
  return { inputValue: t, preview: n, handleChange: r, setInputValue: a, setPreview: e };
}
function H(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function bi({
  selectionMode: n,
  locale: e,
  onCommit: t
}) {
  const { inputValue: a, preview: r, handleChange: s, setInputValue: i, setPreview: o } = wi(), c = () => {
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
  return /* @__PURE__ */ $("div", { className: "dp-nl-input", children: [
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
function Di({ isOpen: n, position: e, popoverRef: t, children: a }) {
  return n ? kn(
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
function Mi({ value: n, onChange: e }) {
  const [t, a] = U(null), [r, s] = U(null), i = F(
    (l) => {
      if (r === null)
        s(l), e(null);
      else {
        const u = we(l, r) ? l : r, d = we(l, r) ? r : l;
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
        const l = we(t, r) ? t : r, u = we(t, r) ? r : t;
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
function Ei(n) {
  const { triggerRect: e, popoverRect: t, viewportWidth: a, viewportHeight: r, scrollX: s, scrollY: i } = n, o = r - e.bottom, c = e.top, l = o >= t.height || o >= c ? "bottom" : "top";
  let u = e.left + s;
  return u + t.width > a && (u = a - t.width - Xt), u = Math.max(Xt, u), { top: l === "bottom" ? e.bottom + i + Jt : e.top + i - t.height - Jt, left: u, placement: l };
}
function Pi() {
  const [n, e] = U(!1), [t, a] = U({
    top: 0,
    left: 0,
    placement: "bottom"
  }), r = Dt(null), s = Dt(null), i = F(() => e(!0), []), o = F(() => e(!1), []), c = F(() => e((u) => !u), []), l = F(() => {
    !r.current || !s.current || a(
      Ei({
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
function Ni(n) {
  const e = {};
  return n.fontFamily && (e["--dp-font-family"] = n.fontFamily), n.fontSize && (e["--dp-font-size"] = n.fontSize), n.primaryColor && (e["--dp-primary"] = n.primaryColor), n.primaryTextColor && (e["--dp-primary-text"] = n.primaryTextColor), n.rangeColor && (e["--dp-range"] = n.rangeColor), n.weekendHeaderTextColor && (e["--dp-weekend-header-text"] = n.weekendHeaderTextColor), n.weekendTextColor && (e["--dp-weekend-text"] = n.weekendTextColor), n.textColor && (e["--dp-text"] = n.textColor), n.mutedTextColor && (e["--dp-muted"] = n.mutedTextColor), n.backgroundColor && (e["--dp-bg"] = n.backgroundColor), n.surfaceColor && (e["--dp-surface"] = n.surfaceColor), n.borderColor && (e["--dp-border"] = n.borderColor), n.borderRadius && (e["--dp-radius"] = n.borderRadius), n.daySize != null && (e["--dp-day-size"] = `${n.daySize}px`), n.shadow && (e["--dp-shadow"] = n.shadow), e;
}
const Oi = {
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
function Fi({
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
  showHolidays: d = !0,
  showWeekNumbers: b = !1,
  minDate: M,
  maxDate: P,
  disabledDates: h,
  weekStartsOn: x = 0,
  highlightWeekends: V = !0,
  showTodayButton: k = !1,
  todayButtonLabel: K = "Today",
  calendarSystem: m = "gregorian",
  mode: g = "inline",
  triggerFormat: O,
  className: v
}) {
  const C = en(() => Ni({ ...Oi, ...s }), [s]), S = Pi(), [q, ie] = U(() => {
    const f = H(/* @__PURE__ */ new Date());
    if (Array.isArray(t) && t[0]) {
      const p = H(t[0]);
      return new Date(p.getFullYear(), p.getMonth(), 1);
    }
    if (t instanceof Date) {
      const p = H(t);
      return new Date(p.getFullYear(), p.getMonth(), 1);
    }
    return new Date(f.getFullYear(), f.getMonth(), 1);
  }), [$e, oe] = U(() => {
    if (Array.isArray(t) && t[1]) {
      const f = t[0] ? H(t[0]) : null, p = H(t[1]);
      return f && !At(f, p) ? new Date(p.getFullYear(), p.getMonth(), 1) : new Date(q.getFullYear(), q.getMonth() + 1, 1);
    }
    return new Date(q.getFullYear(), q.getMonth() + 1, 1);
  }), [Ie, Be] = U(""), Tt = e === "single" && t instanceof Date ? t : null, Oe = e === "range" && Array.isArray(t) ? t : null, { pendingStart: Ae, previewRange: R, handleDayClick: I, handleDayHover: ee } = Mi({
    value: Oe,
    onChange: (f) => a == null ? void 0 : a(f)
  }), _ = F(
    (f, p) => {
      const ye = H(f);
      if (ie(new Date(ye.getFullYear(), ye.getMonth(), 1)), n === 2) {
        const Qe = H(p ?? f), On = At(ye, Qe) ? new Date(ye.getFullYear(), ye.getMonth() + 1, 1) : new Date(Qe.getFullYear(), Qe.getMonth(), 1);
        oe(On);
      }
    },
    [n]
  ), Ue = F(
    (f) => {
      const p = H(f);
      a == null || a(p), ie(new Date(p.getFullYear(), p.getMonth(), 1)), n === 2 && oe(new Date(p.getFullYear(), p.getMonth() + 1, 1)), g === "popover" && S.close();
    },
    [n, a, g, S]
  ), Le = F(() => {
    const f = H(/* @__PURE__ */ new Date());
    e === "range" ? (a == null || a([f, f]), _(f, f)) : (a == null || a(f), ie(new Date(f.getFullYear(), f.getMonth(), 1)), n === 2 && oe(new Date(f.getFullYear(), f.getMonth() + 1, 1))), g === "popover" && S.close();
  }, [e, a, _, n, g, S]), je = F(
    (f) => {
      const p = Ae !== null;
      I(f), g === "popover" && p && S.close();
    },
    [Ae, I, g, S]
  ), ze = F(
    (f) => {
      a == null || a(f), _(f[0], f[1]);
    },
    [a, _]
  ), Ge = F(
    (f) => {
      if (e === "single" && f.single) {
        const p = H(f.single);
        a == null || a(p), _(p, new Date(p.getFullYear(), p.getMonth() + 1, 1));
      } else if (e === "range" && f.range) {
        const p = [H(f.range[0]), H(f.range[1])];
        a == null || a(p), _(p[0], p[1]);
      } else if (e === "range" && f.single) {
        const p = H(f.single);
        a == null || a([p, p]), _(p, p);
      } else if (f.single) {
        const p = H(f.single);
        a == null || a(p), _(p, new Date(p.getFullYear(), p.getMonth() + 1, 1));
      }
    },
    [e, a, _]
  ), Ve = e === "range" ? je : Ue, Ke = ln(H(/* @__PURE__ */ new Date()), M, P, h), qe = "dd MMM yyyy", Nn = (() => {
    const f = O ?? qe;
    return Array.isArray(t) && t[0] && t[1] ? `${Je(t[0], f)} - ${Je(t[1], f)}` : t instanceof Date ? Je(t, f) : "Select date";
  })(), wt = {
    selectionMode: e,
    selectedDate: Tt,
    rangeValue: Oe,
    previewRange: R,
    onDayClick: Ve,
    onDayHover: e === "range" ? ee : () => {
    },
    onAnnounce: Be,
    config: {
      locale: r,
      calendarSystem: m,
      weekStartsOn: x,
      highlightWeekends: V,
      showWeekNumbers: b,
      showHolidays: d,
      holidayTypes: c,
      customHolidays: o,
      minDate: M,
      maxDate: P,
      disabledDates: h
    }
  }, bt = /* @__PURE__ */ $(
    "div",
    {
      className: ["dp-calendar-panel", v].filter(Boolean).join(" "),
      "data-datepicker-root": !0,
      style: C,
      children: [
        l && /* @__PURE__ */ T(
          bi,
          {
            selectionMode: e,
            locale: r,
            onCommit: Ge
          }
        ),
        u && e === "range" && /* @__PURE__ */ T(
          tr,
          {
            presets: i,
            value: Oe,
            onSelect: ze
          }
        ),
        /* @__PURE__ */ $("div", { className: `dp-months dp-months--${n}`, children: [
          /* @__PURE__ */ T(
            xt,
            {
              ...wt,
              month: q,
              onMonthChange: ie
            }
          ),
          n === 2 && /* @__PURE__ */ T(
            xt,
            {
              ...wt,
              month: $e,
              onMonthChange: oe
            }
          )
        ] }),
        k && /* @__PURE__ */ T("div", { className: "dp-footer-actions", children: /* @__PURE__ */ T(
          "button",
          {
            type: "button",
            className: "dp-footer-btn",
            onClick: Le,
            disabled: Ke,
            children: K
          }
        ) }),
        /* @__PURE__ */ T(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "dp-sr-only",
            children: Ie
          }
        )
      ]
    }
  );
  return g === "popover" ? /* @__PURE__ */ $(xn, { children: [
    /* @__PURE__ */ T(
      "button",
      {
        ref: S.triggerRef,
        className: "dp-trigger",
        onClick: S.toggle,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": S.isOpen,
        children: Nn
      }
    ),
    /* @__PURE__ */ T(
      Di,
      {
        isOpen: S.isOpen,
        position: S.position,
        popoverRef: S.popoverRef,
        children: bt
      }
    )
  ] }) : bt;
}
function Ai(n, e = "en", t = ["public"]) {
  return (un()[String(n)] ?? []).filter((s) => t.includes(s.type)).map((s) => ({
    date: s.date,
    name: e === "th" ? s.nameTH : s.name,
    nameTH: s.nameTH,
    type: s.type
  }));
}
function Ci(n, e = "en", t = ["public"]) {
  const a = /* @__PURE__ */ new Map();
  for (const r of Ai(n, e, t)) {
    const s = a.get(r.date) ?? [];
    s.push(r), a.set(r.date, s);
  }
  return a;
}
const vi = {
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
  Fi as DatePicker,
  er as builtInPresets,
  vi as darkTheme,
  Ci as getHolidayMapForYear,
  Ai as getHolidaysForYear,
  Oi as lightTheme
};
