var zn = Object.defineProperty;
var Gn = (n, e, t) => e in n ? zn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => Gn(n, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as B, jsx as T, Fragment as Vn } from "react/jsx-runtime";
import { useState as V, useEffect as un, useMemo as dn, useCallback as k, useRef as St } from "react";
import { createPortal as Kn } from "react-dom";
function D(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function Q(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function de(n, e) {
  const t = D(n);
  return isNaN(e) ? Q(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function ee(n, e) {
  const t = D(n);
  if (isNaN(e)) return Q(n, NaN);
  if (!e)
    return t;
  const a = t.getDate(), r = Q(n, t.getTime());
  r.setMonth(t.getMonth() + e + 1, 0);
  const s = r.getDate();
  return a >= s ? r : (t.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), t);
}
const mn = 6048e5, qn = 864e5;
let Qn = {};
function Fe() {
  return Qn;
}
function re(n, e) {
  var o, c, l, u;
  const t = Fe(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = D(n), s = r.getDay(), i = (s < a ? 7 : 0) + s - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function Be(n) {
  return re(n, { weekStartsOn: 1 });
}
function fn(n) {
  const e = D(n), t = e.getFullYear(), a = Q(n, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = Be(a), s = Q(n, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Be(s);
  return e.getTime() >= r.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function R(n) {
  const e = D(n);
  return e.setHours(0, 0, 0, 0), e;
}
function kt(n) {
  const e = D(n), t = new Date(
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
function Xn(n, e) {
  const t = R(n), a = R(e), r = +t - kt(t), s = +a - kt(a);
  return Math.round((r - s) / qn);
}
function Jn(n) {
  const e = fn(n), t = Q(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Be(t);
}
function pe(n, e) {
  const t = e * 7;
  return de(n, t);
}
function hn(n, e) {
  return ee(n, e * 12);
}
function q(n, e) {
  const t = R(n), a = R(e);
  return +t == +a;
}
function Zn(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function ea(n) {
  if (!Zn(n) && typeof n != "number")
    return !1;
  const e = D(n);
  return !isNaN(Number(e));
}
function Oe(n) {
  const e = D(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function ta(n, e) {
  const t = D(n.start), a = D(n.end);
  let r = +t > +a;
  const s = r ? +t : +a, i = r ? a : t;
  i.setHours(0, 0, 0, 0);
  let o = 1;
  const c = [];
  for (; +i <= s; )
    c.push(D(i)), i.setDate(i.getDate() + o), i.setHours(0, 0, 0, 0);
  return r ? c.reverse() : c;
}
function Se(n) {
  const e = D(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function na(n) {
  const e = D(n), t = Q(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function Dt(n, e) {
  var o, c, l, u;
  const t = Fe(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = D(n), s = r.getDay(), i = (s < a ? -7 : 0) + 6 - (s - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
const aa = {
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
}, ra = (n, e, t) => {
  let a;
  const r = aa[n];
  return typeof r == "string" ? a = r : e === 1 ? a = r.one : a = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + a : a + " ago" : a;
};
function it(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const sa = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ia = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, oa = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ca = {
  date: it({
    formats: sa,
    defaultWidth: "full"
  }),
  time: it({
    formats: ia,
    defaultWidth: "full"
  }),
  dateTime: it({
    formats: oa,
    defaultWidth: "full"
  })
}, la = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ua = (n, e, t, a) => la[n];
function Pe(n) {
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
const da = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ma = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, fa = {
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
}, ha = {
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
}, ga = {
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
}, ya = {
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
}, pa = (n, e) => {
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
}, Ta = {
  ordinalNumber: pa,
  era: Pe({
    values: da,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: ma,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Pe({
    values: fa,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: ha,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: ga,
    defaultWidth: "wide",
    formattingValues: ya,
    defaultFormattingWidth: "wide"
  })
};
function Ne(n) {
  return (e, t = {}) => {
    const a = t.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], s = e.match(r);
    if (!s)
      return null;
    const i = s[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? ba(o, (f) => f.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      wa(o, (f) => f.test(i))
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
function wa(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function ba(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function Da(n) {
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
const Ma = /^(\d+)(th|st|nd|rd)?/i, Ea = /\d+/i, Pa = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Na = {
  any: [/^b/i, /^(a|c)/i]
}, Aa = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Oa = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Sa = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ka = {
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
}, xa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Fa = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ra = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ha = {
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
}, va = {
  ordinalNumber: Da({
    matchPattern: Ma,
    parsePattern: Ea,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: Ne({
    matchPatterns: Pa,
    defaultMatchWidth: "wide",
    parsePatterns: Na,
    defaultParseWidth: "any"
  }),
  quarter: Ne({
    matchPatterns: Aa,
    defaultMatchWidth: "wide",
    parsePatterns: Oa,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Ne({
    matchPatterns: Sa,
    defaultMatchWidth: "wide",
    parsePatterns: ka,
    defaultParseWidth: "any"
  }),
  day: Ne({
    matchPatterns: xa,
    defaultMatchWidth: "wide",
    parsePatterns: Fa,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ne({
    matchPatterns: Ra,
    defaultMatchWidth: "any",
    parsePatterns: Ha,
    defaultParseWidth: "any"
  })
}, Ca = {
  code: "en-US",
  formatDistance: ra,
  formatLong: ca,
  formatRelative: ua,
  localize: Ta,
  match: va,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ya(n) {
  const e = D(n);
  return Xn(e, na(e)) + 1;
}
function gn(n) {
  const e = D(n), t = +Be(e) - +Jn(e);
  return Math.round(t / mn) + 1;
}
function yn(n, e) {
  var u, f, M, y;
  const t = D(n), a = t.getFullYear(), r = Fe(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((f = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((y = (M = r.locale) == null ? void 0 : M.options) == null ? void 0 : y.firstWeekContainsDate) ?? 1, i = Q(n, 0);
  i.setFullYear(a + 1, 0, s), i.setHours(0, 0, 0, 0);
  const o = re(i, e), c = Q(n, 0);
  c.setFullYear(a, 0, s), c.setHours(0, 0, 0, 0);
  const l = re(c, e);
  return t.getTime() >= o.getTime() ? a + 1 : t.getTime() >= l.getTime() ? a : a - 1;
}
function Wa(n, e) {
  var o, c, l, u;
  const t = Fe(), a = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, r = yn(n, e), s = Q(n, 0);
  return s.setFullYear(r, 0, a), s.setHours(0, 0, 0, 0), re(s, e);
}
function pn(n, e) {
  const t = D(n), a = +re(t, e) - +Wa(t, e);
  return Math.round(a / mn) + 1;
}
function P(n, e) {
  const t = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(e, "0");
  return t + a;
}
const ne = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), a = t > 0 ? t : 1 - t;
    return P(e === "yy" ? a % 100 : a, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : P(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return P(n.getDate(), e.length);
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
    return P(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return P(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return P(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return P(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, a = n.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, t - 3)
    );
    return P(r, e.length);
  }
}, fe = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, xt = {
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
    return ne.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, a) {
    const r = yn(n, a), s = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const i = s % 100;
      return P(i, 2);
    }
    return e === "Yo" ? t.ordinalNumber(s, { unit: "year" }) : P(s, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = fn(n);
    return P(t, e.length);
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
    return P(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(a);
      case "QQ":
        return P(a, 2);
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
        return P(a, 2);
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
        return ne.M(n, e);
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
        return P(a + 1, 2);
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
    const r = pn(n, a);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : P(r, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const a = gn(n);
    return e === "Io" ? t.ordinalNumber(a, { unit: "week" }) : P(a, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : ne.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const a = Ya(n);
    return e === "Do" ? t.ordinalNumber(a, { unit: "dayOfYear" }) : P(a, e.length);
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
        return P(s, 2);
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
        return P(s, e.length);
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
        return P(r, e.length);
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
    switch (a === 12 ? r = fe.noon : a === 0 ? r = fe.midnight : r = a / 12 >= 1 ? "pm" : "am", e) {
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
    switch (a >= 17 ? r = fe.evening : a >= 12 ? r = fe.afternoon : a >= 4 ? r = fe.morning : r = fe.night, e) {
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
    return ne.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : ne.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const a = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(a, { unit: "hour" }) : P(a, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let a = n.getHours();
    return a === 0 && (a = 24), e === "ko" ? t.ordinalNumber(a, { unit: "hour" }) : P(a, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : ne.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : ne.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return ne.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (e) {
      case "X":
        return Rt(a);
      case "XXXX":
      case "XX":
        return le(a);
      case "XXXXX":
      case "XXX":
      default:
        return le(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "x":
        return Rt(a);
      case "xxxx":
      case "xx":
        return le(a);
      case "xxxxx":
      case "xxx":
      default:
        return le(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Ft(a, ":");
      case "OOOO":
      default:
        return "GMT" + le(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, e, t) {
    const a = n.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Ft(a, ":");
      case "zzzz":
      default:
        return "GMT" + le(a, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const a = Math.trunc(n.getTime() / 1e3);
    return P(a, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    const a = n.getTime();
    return P(a, e.length);
  }
};
function Ft(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), s = a % 60;
  return s === 0 ? t + String(r) : t + String(r) + e + P(s, 2);
}
function Rt(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + P(Math.abs(n) / 60, 2) : le(n, e);
}
function le(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = P(Math.trunc(a / 60), 2), s = P(a % 60, 2);
  return t + r + e + s;
}
const Ht = (n, e) => {
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
}, Tn = (n, e) => {
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
}, _a = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], a = t[1], r = t[2];
  if (!r)
    return Ht(n, e);
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
  return s.replace("{{date}}", Ht(a, e)).replace("{{time}}", Tn(r, e));
}, $a = {
  p: Tn,
  P: _a
}, Ia = /^D+$/, Ba = /^Y+$/, Ua = ["D", "DD", "YY", "YYYY"];
function La(n) {
  return Ia.test(n);
}
function ja(n) {
  return Ba.test(n);
}
function za(n, e, t) {
  const a = Ga(n, e, t);
  if (console.warn(a), Ua.includes(n)) throw new RangeError(a);
}
function Ga(n, e, t) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${a} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Va = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ka = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, qa = /^'([^]*?)'?$/, Qa = /''/g, Xa = /[a-zA-Z]/;
function ot(n, e, t) {
  var u, f, M, y;
  const a = Fe(), r = a.locale ?? Ca, s = a.firstWeekContainsDate ?? ((f = (u = a.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, i = a.weekStartsOn ?? ((y = (M = a.locale) == null ? void 0 : M.options) == null ? void 0 : y.weekStartsOn) ?? 0, o = D(n);
  if (!ea(o))
    throw new RangeError("Invalid time value");
  let c = e.match(Ka).map((g) => {
    const b = g[0];
    if (b === "p" || b === "P") {
      const C = $a[b];
      return C(g, r.formatLong);
    }
    return g;
  }).join("").match(Va).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const b = g[0];
    if (b === "'")
      return { isToken: !1, value: Ja(g) };
    if (xt[b])
      return { isToken: !0, value: g };
    if (b.match(Xa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + b + "`"
      );
    return { isToken: !1, value: g };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: r
  };
  return c.map((g) => {
    if (!g.isToken) return g.value;
    const b = g.value;
    (ja(b) || La(b)) && za(b, e, String(n));
    const C = xt[b[0]];
    return C(o, b, r.localize, l);
  }).join("");
}
function Ja(n) {
  const e = n.match(qa);
  return e ? e[1].replace(Qa, "'") : n;
}
function yt(n) {
  return D(n).getDay();
}
function Za(n) {
  return D(n).getMonth();
}
function er(n) {
  return D(n).getFullYear();
}
function tr(n, e) {
  const t = D(n), a = D(e);
  return t.getTime() > a.getTime();
}
function Ae(n, e) {
  const t = D(n), a = D(e);
  return +t < +a;
}
function nr(n, e, t) {
  const a = t == null ? void 0 : t.weekStartsOn, r = D(n), s = r.getDay(), o = (e % 7 + 7) % 7, c = 7 - a, l = e < 0 || e > 6 ? e - (s + c) % 7 : (o + c) % 7 - (s + c) % 7;
  return de(r, l);
}
function vt(n, e) {
  const t = D(n), a = D(e);
  return t.getFullYear() === a.getFullYear() && t.getMonth() === a.getMonth();
}
function ar(n, e) {
  const t = +D(n), [a, r] = [
    +D(e.start),
    +D(e.end)
  ].sort((s, i) => s - i);
  return t >= a && t <= r;
}
function ke(n, e) {
  return de(n, -e);
}
function je(n, e) {
  return ee(n, -e);
}
function Mt(n, e) {
  return pe(n, -e);
}
function rr(n, e) {
  return hn(n, -e);
}
function sr(n, e = 0) {
  const t = Se(n), a = Oe(n), r = re(t, { weekStartsOn: e }), s = Dt(a, { weekStartsOn: e }), i = ta({ start: r, end: s }), o = [];
  let c = [];
  return i.forEach((l, u) => {
    c.push({
      date: l,
      isCurrentMonth: l >= t && l <= a
    }), (u + 1) % 7 === 0 && (o.push(c), c = []);
  }), { weeks: o, month: n };
}
function ir(n, e = 0) {
  return e === 1 ? gn(n) : pn(n, { weekStartsOn: 0 });
}
function xe(n, e, t, a) {
  const r = R(n);
  return !!(e && Ae(r, R(e)) || t && tr(r, R(t)) || a != null && a.some((s) => q(s, r)));
}
function or(n, e) {
  const { today: t, selectionMode: a, selectedDate: r, activeRange: s, highlightWeekends: i } = e, o = a === "single" && r != null && q(n, r), c = a === "range" && s != null && q(n, s[0]), l = a === "range" && s != null && q(n, s[1]), u = a === "range" && s != null && !q(s[0], s[1]) && ar(R(n), {
    start: R(s[0]),
    end: R(s[1])
  }) && !q(n, s[0]) && !q(n, s[1]), f = q(n, t), M = i && (n.getDay() === 0 || n.getDay() === 6);
  return { isSelected: o, isRangeStart: c, isRangeEnd: l, isInRange: u, isToday: f, isWeekend: M };
}
function cr({
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
  holidays: f,
  onClick: M,
  onMouseEnter: y,
  onMouseLeave: g
}) {
  const [b, C] = V(!1), K = n.getDate(), x = ["dp-day"];
  e || x.push("dp-day--other-month"), c && x.push("dp-day--disabled"), l && x.push("dp-day--today"), u && x.push("dp-day--weekend"), (t || a || r) && x.push("dp-day--selected"), s && x.push("dp-day--in-range"), a && x.push("dp-day--range-start"), r && x.push("dp-day--range-end"), s && i && x.push("dp-day--row-start"), s && o && x.push("dp-day--row-end");
  const te = n.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ B("div", { className: "dp-day-wrapper", children: [
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
    /* @__PURE__ */ B(
      "button",
      {
        className: x.join(" "),
        onClick: () => !c && M(n),
        onMouseEnter: () => !c && y(n),
        onMouseLeave: g,
        disabled: c,
        "aria-label": te,
        "aria-pressed": t || a || r,
        tabIndex: e && !c ? 0 : -1,
        type: "button",
        children: [
          /* @__PURE__ */ T("span", { className: "dp-day-number", children: K }),
          f.length > 0 && /* @__PURE__ */ B(
            "span",
            {
              className: "dp-holiday-dots",
              onMouseEnter: () => C(!0),
              onMouseLeave: () => C(!1),
              children: [
                f.slice(0, 2).map((h, w) => /* @__PURE__ */ T(
                  "span",
                  {
                    className: "dp-holiday-dot",
                    style: { backgroundColor: h.dotColor },
                    "aria-hidden": "true"
                  },
                  w
                )),
                b && /* @__PURE__ */ T("span", { className: "dp-holiday-tooltip", role: "tooltip", children: f.map((h) => h.name).join(", ") })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const lr = 120, ur = 10, Ct = 10;
function Ie(n, e) {
  return new Date(n, e, 1);
}
function he(n, e, t) {
  let a = Ie(n.getFullYear(), n.getMonth());
  if (e) {
    const r = Ie(e.getFullYear(), e.getMonth());
    a.getTime() < r.getTime() && (a = r);
  }
  if (t) {
    const r = Ie(t.getFullYear(), t.getMonth());
    a.getTime() > r.getTime() && (a = r);
  }
  return a;
}
function dr(n, e, t) {
  let a, r;
  e && t ? (a = e.getFullYear(), r = t.getFullYear()) : t ? (r = t.getFullYear(), a = r - lr) : e ? (a = e.getFullYear(), r = Math.max(n, a) + ur) : (a = n - Ct, r = n + Ct), r < a && (r = a);
  const s = [];
  for (let i = a; i <= r; i += 1) s.push(i);
  return s;
}
const Yt = {
  yearsAgo: rr,
  yearsFromNow: hn,
  monthsAgo: je,
  monthsFromNow: ee,
  weeksAgo: Mt,
  weeksFromNow: pe,
  daysAgo: ke,
  daysFromNow: de
};
function mr(n) {
  if (!(typeof n != "number" || !Number.isFinite(n) || n < 0))
    return n;
}
function Wt(n, e) {
  if (!n) return;
  if (n === "today") return R(e);
  if (n === "yesterday") return R(ke(e, 1));
  if (typeof n != "object") return;
  const t = n, a = Object.keys(Yt).flatMap((i) => {
    if (!(i in n)) return [];
    const o = mr(t[i]);
    return o == null ? [] : [[i, o]];
  });
  if (a.length !== 1) return;
  const [r, s] = a[0];
  return R(Yt[r](e, s));
}
function fr(n) {
  const e = n.today ?? /* @__PURE__ */ new Date();
  let t = n.minDate, a = n.maxDate;
  const r = Wt(n.from, e);
  r && (!t || r.getTime() > R(t).getTime()) && (t = r);
  const s = Wt(n.until, e);
  return s && (!a || s.getTime() < R(a).getTime()) && (a = s), { minDate: t, maxDate: a };
}
function hr(n, e, t, a) {
  const r = Ie(n, e), s = new Date(n, e + 1, 0);
  return !!(t && R(s).getTime() < R(t).getTime() || a && R(r).getTime() > R(a).getTime());
}
const gr = [
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
], yr = [
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
function pr({
  month: n,
  onPrev: e,
  onNext: t,
  onMonthSelect: a,
  onYearSelect: r,
  locale: s,
  minDate: i,
  maxDate: o
}) {
  const c = Za(n), l = er(n), u = s === "th" ? yr : gr, f = dr(l, i, o), M = i ? ee(n, -1) < new Date(i.getFullYear(), i.getMonth(), 1) : !1, y = o ? ee(n, 1) > new Date(o.getFullYear(), o.getMonth(), 1) : !1;
  return /* @__PURE__ */ B("div", { className: "dp-month-nav", children: [
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
    /* @__PURE__ */ B("div", { className: "dp-month-year-labels", children: [
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-month-select",
          value: c,
          onChange: (g) => a(Number(g.target.value)),
          "aria-label": "Select month",
          children: u.map((g, b) => /* @__PURE__ */ T("option", { value: b, disabled: hr(l, b, i, o), children: g }, b))
        }
      ),
      /* @__PURE__ */ T(
        "select",
        {
          className: "dp-year-select",
          value: l,
          onChange: (g) => r(Number(g.target.value)),
          "aria-label": "Select year",
          children: f.map((g) => /* @__PURE__ */ T("option", { value: g, children: s === "th" ? g + 543 : g }, g))
        }
      )
    ] }),
    /* @__PURE__ */ T(
      "button",
      {
        className: "dp-nav-btn",
        onClick: t,
        disabled: y,
        "aria-label": "Next month",
        children: "›"
      }
    )
  ] });
}
function Tr({ weekNumbers: n }) {
  return /* @__PURE__ */ B("div", { className: "dp-week-numbers", "aria-hidden": "true", children: [
    /* @__PURE__ */ T("div", { className: "dp-week-number-header", children: "W" }),
    n.map((e, t) => /* @__PURE__ */ T("div", { className: "dp-week-number", children: e }, t))
  ] });
}
const wr = {
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
function wn() {
  return JSON.parse(JSON.stringify(wr));
}
const ct = /* @__PURE__ */ new Map();
function br(n) {
  const e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), a = String(n.getDate()).padStart(2, "0");
  return `${e}-${t}-${a}`;
}
function Dr(n, e, t) {
  return `${n}-${e}-${t.sort().join(",")}`;
}
const _t = "#EF4444";
function Mr(n, e, t = ["public"], a = !0, r = []) {
  const [s, i] = V([]);
  un(() => {
    if (!a) return;
    const c = Dr(n, e, t);
    if (ct.has(c)) {
      i(ct.get(c));
      return;
    }
    const M = (wn()[String(n)] ?? []).filter((y) => t.includes(y.type)).map((y) => ({
      ...y,
      name: e === "th" && y.nameTH ? y.nameTH : y.name
    }));
    ct.set(c, M), i(M);
  }, [n, e, JSON.stringify(t), a]);
  const o = dn(() => {
    const c = /* @__PURE__ */ new Map();
    return s.forEach((l) => {
      const u = l.date.slice(0, 10), f = c.get(u) ?? [];
      f.push({ name: l.name, dotColor: _t }), c.set(u, f);
    }), r.forEach((l) => {
      const u = e === "th" ? l.nameTH : l.nameEN;
      c.set(l.date, [{ name: u, dotColor: l.dotColor ?? _t }]);
    }), c;
  }, [s, r, e]);
  return {
    getHolidaysForDate(c) {
      return o.get(br(c)) ?? [];
    }
  };
}
const Er = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Pr = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
function $t({
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
    weekStartsOn: f,
    highlightWeekends: M,
    showWeekNumbers: y,
    showHolidays: g,
    holidayTypes: b,
    customHolidays: C,
    minDate: K,
    maxDate: x,
    disabledDates: te
  } = l, { weeks: h } = sr(n, f), w = n.getFullYear(), A = Mr(w, u, b, g, C), W = u === "th" ? Pr : Er, L = f === 1 ? [...W.slice(1), W[0]] : W, F = f === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6], Xe = h.map((Y) => ir(Y[0].date, f)), Je = k(() => {
    const Y = new Date(n.getFullYear(), n.getMonth() - 1, 1);
    e(Y);
    const z = Y.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(z);
  }, [n, e, u, c]), H = k(() => {
    const Y = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    e(Y);
    const z = Y.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(z);
  }, [n, e, u, c]), v = k(
    (Y) => {
      e(new Date(n.getFullYear(), Y, 1));
    },
    [n, e]
  ), Ze = k(
    (Y) => {
      e(new Date(Y, n.getMonth(), 1));
    },
    [n, e]
  ), Ce = {
    today: /* @__PURE__ */ new Date(),
    selectionMode: t,
    selectedDate: a,
    activeRange: s ?? r,
    highlightWeekends: M
  };
  return /* @__PURE__ */ B("div", { className: "dp-calendar", children: [
    /* @__PURE__ */ T(
      pr,
      {
        month: n,
        onPrev: Je,
        onNext: H,
        onMonthSelect: v,
        onYearSelect: Ze,
        locale: u,
        minDate: K,
        maxDate: x
      }
    ),
    /* @__PURE__ */ B("div", { className: "dp-grid-container", children: [
      y && /* @__PURE__ */ T(Tr, { weekNumbers: Xe }),
      /* @__PURE__ */ B("div", { className: "dp-grid", children: [
        /* @__PURE__ */ T("div", { className: "dp-weekday-row", children: L.map((Y, z) => /* @__PURE__ */ T(
          "div",
          {
            className: [
              "dp-weekday-label",
              M && (F[z] === 0 || F[z] === 6) ? "dp-weekday-label--weekend" : ""
            ].filter(Boolean).join(" "),
            "aria-hidden": "true",
            children: Y
          },
          z
        )) }),
        h.map((Y, z) => /* @__PURE__ */ T("div", { className: "dp-week-row", children: Y.map((J, Me) => {
          const et = g ? A.getHolidaysForDate(J.date) : [], tt = xe(J.date, K, x, te), { isSelected: nt, isRangeStart: at, isRangeEnd: Ee, isInRange: Ye, isToday: rt, isWeekend: We } = or(J.date, Ce);
          return /* @__PURE__ */ T(
            cr,
            {
              date: J.date,
              isCurrentMonth: J.isCurrentMonth,
              isSelected: nt,
              isRangeStart: at,
              isRangeEnd: Ee,
              isInRange: Ye,
              isRowStart: Me === 0,
              isRowEnd: Me === 6,
              isDisabled: tt,
              isToday: rt,
              isWeekend: We,
              holidays: et,
              onClick: i,
              onMouseEnter: o,
              onMouseLeave: () => o(null)
            },
            Me
          );
        }) }, z))
      ] })
    ] })
  ] });
}
const Nr = [
  {
    label: "This week",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [re(n, { weekStartsOn: 1 }), Dt(n, { weekStartsOn: 1 })];
    }
  },
  {
    label: "Last 7 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [ke(n, 6), n];
    }
  },
  {
    label: "Last 30 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [ke(n, 29), n];
    }
  },
  {
    label: "This month",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [Se(n), Oe(n)];
    }
  },
  {
    label: "Last month",
    resolve: () => {
      const n = je(/* @__PURE__ */ new Date(), 1);
      return [Se(n), Oe(n)];
    }
  }
];
function Ar({
  presets: n,
  value: e,
  minDate: t,
  maxDate: a,
  disabledDates: r,
  onSelect: s,
  display: i = "chips",
  dropdownPlaceholder: o = "Quick select range",
  dropdownAriaLabel: c = "Quick select presets"
}) {
  const l = n ?? Nr, u = (y) => {
    const [g, b] = y.resolve();
    return xe(g, t, a, r) || xe(b, t, a, r);
  }, f = (y) => {
    if (!e) return !1;
    const [g, b] = y.resolve();
    return q(g, e[0]) && q(b, e[1]);
  }, M = l.findIndex((y) => f(y));
  return i === "dropdown" ? /* @__PURE__ */ T("div", { className: "dp-preset-dropdown-wrap", children: /* @__PURE__ */ B(
    "select",
    {
      className: "dp-preset-select",
      "aria-label": c,
      value: M >= 0 ? String(M) : "",
      onChange: (y) => {
        const g = y.target.value;
        g !== "" && s(l[Number(g)].resolve());
      },
      children: [
        /* @__PURE__ */ T("option", { value: "", children: o }),
        l.map((y, g) => /* @__PURE__ */ T("option", { value: g, disabled: u(y), children: y.label }, g))
      ]
    }
  ) }) : /* @__PURE__ */ T("div", { className: "dp-preset-chips", role: "group", "aria-label": "Quick select presets", children: l.map((y, g) => /* @__PURE__ */ T(
    "button",
    {
      className: ["dp-chip", f(y) ? "dp-chip--active" : ""].join(" "),
      onClick: () => s(y.resolve()),
      disabled: u(y),
      type: "button",
      children: y.label
    },
    g
  )) });
}
var E;
(function(n) {
  n[n.AM = 0] = "AM", n[n.PM = 1] = "PM";
})(E || (E = {}));
var O;
(function(n) {
  n[n.SUNDAY = 0] = "SUNDAY", n[n.MONDAY = 1] = "MONDAY", n[n.TUESDAY = 2] = "TUESDAY", n[n.WEDNESDAY = 3] = "WEDNESDAY", n[n.THURSDAY = 4] = "THURSDAY", n[n.FRIDAY = 5] = "FRIDAY", n[n.SATURDAY = 6] = "SATURDAY";
})(O || (O = {}));
var G;
(function(n) {
  n[n.JANUARY = 1] = "JANUARY", n[n.FEBRUARY = 2] = "FEBRUARY", n[n.MARCH = 3] = "MARCH", n[n.APRIL = 4] = "APRIL", n[n.MAY = 5] = "MAY", n[n.JUNE = 6] = "JUNE", n[n.JULY = 7] = "JULY", n[n.AUGUST = 8] = "AUGUST", n[n.SEPTEMBER = 9] = "SEPTEMBER", n[n.OCTOBER = 10] = "OCTOBER", n[n.NOVEMBER = 11] = "NOVEMBER", n[n.DECEMBER = 12] = "DECEMBER";
})(G || (G = {}));
function me(n, e) {
  n.assign("day", e.getDate()), n.assign("month", e.getMonth() + 1), n.assign("year", e.getFullYear());
}
function bn(n, e) {
  n.assign("hour", e.getHours()), n.assign("minute", e.getMinutes()), n.assign("second", e.getSeconds()), n.assign("millisecond", e.getMilliseconds()), n.assign("meridiem", e.getHours() < 12 ? E.AM : E.PM);
}
function ye(n, e) {
  n.imply("day", e.getDate()), n.imply("month", e.getMonth() + 1), n.imply("year", e.getFullYear());
}
function Et(n, e) {
  n.imply("hour", e.getHours()), n.imply("minute", e.getMinutes()), n.imply("second", e.getSeconds()), n.imply("millisecond", e.getMilliseconds()), n.imply("meridiem", e.getHours() < 12 ? E.AM : E.PM);
}
const Or = {
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
    dstStart: (n) => It(n, G.MARCH, O.SUNDAY, 2),
    dstEnd: (n) => It(n, G.OCTOBER, O.SUNDAY, 3)
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
    dstStart: (n) => ae(n, G.MARCH, O.SUNDAY, 2, 2),
    dstEnd: (n) => ae(n, G.NOVEMBER, O.SUNDAY, 1, 2)
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
    dstStart: (n) => ae(n, G.MARCH, O.SUNDAY, 2, 2),
    dstEnd: (n) => ae(n, G.NOVEMBER, O.SUNDAY, 1, 2)
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
    dstStart: (n) => ae(n, G.MARCH, O.SUNDAY, 2, 2),
    dstEnd: (n) => ae(n, G.NOVEMBER, O.SUNDAY, 1, 2)
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
    dstStart: (n) => ae(n, G.MARCH, O.SUNDAY, 2, 2),
    dstEnd: (n) => ae(n, G.NOVEMBER, O.SUNDAY, 1, 2)
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
function ae(n, e, t, a, r = 0) {
  let s = 0, i = 0;
  for (; i < a; )
    s++, new Date(n, e - 1, s).getDay() === t && i++;
  return new Date(n, e - 1, s, r);
}
function It(n, e, t, a = 0) {
  const r = t === 0 ? 7 : t, s = new Date(n, e - 1 + 1, 1, 12), i = s.getDay() === 0 ? 7 : s.getDay();
  let o;
  return i === r ? o = 7 : i < r ? o = 7 + i - r : o = i - r, s.setDate(s.getDate() - o), new Date(n, e - 1, s.getDate(), a);
}
function Dn(n, e, t = {}) {
  if (n == null)
    return null;
  if (typeof n == "number")
    return n;
  const a = t[n] ?? Or[n];
  return a == null ? null : typeof a == "number" ? a : e == null ? null : e > a.dstStart(e.getFullYear()) && !(e > a.dstEnd(e.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
}
const Sr = {
  day: 0,
  second: 0,
  millisecond: 0
};
function I(n, e) {
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
function ze(n) {
  const e = {};
  for (const t in n)
    e[t] = -n[t];
  return e;
}
class ue {
  constructor(e, t) {
    p(this, "instant");
    p(this, "timezoneOffset");
    this.instant = e ?? /* @__PURE__ */ new Date(), this.timezoneOffset = t ?? null;
  }
  static fromDate(e) {
    return new ue(e);
  }
  static fromInput(e, t) {
    if (e instanceof Date)
      return ue.fromDate(e);
    const a = (e == null ? void 0 : e.instant) ?? /* @__PURE__ */ new Date(), r = Dn(e == null ? void 0 : e.timezone, a, t);
    return new ue(a, r);
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
    p(this, "knownValues");
    p(this, "impliedValues");
    p(this, "reference");
    p(this, "_tags", /* @__PURE__ */ new Set());
    if (this.reference = e, this.knownValues = {}, this.impliedValues = {}, t)
      for (const r in t)
        this.knownValues[r] = t[r];
    const a = e.getDateWithAdjustedTimezone();
    this.imply("day", a.getDate()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear()), this.imply("hour", 12), this.imply("minute", 0), this.imply("second", 0), this.imply("millisecond", 0);
  }
  static createRelativeFromReference(e, t = Sr) {
    let a = I(e.getDateWithAdjustedTimezone(), t);
    const r = new N(e);
    return r.addTag("result/relativeDate"), "hour" in t || "minute" in t || "second" in t || "millisecond" in t ? (r.addTag("result/relativeDateAndTime"), bn(r, a), me(r, a), r.assign("timezoneOffset", e.getTimezoneOffset())) : (Et(r, a), r.imply("timezoneOffset", e.getTimezoneOffset()), "day" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.assign("weekday", a.getDay())) : "week" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.imply("weekday", a.getDay())) : (r.imply("day", a.getDate()), "month" in t ? (r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear())) : (r.imply("month", a.getMonth() + 1), "year" in t ? r.assign("year", a.getFullYear()) : r.imply("year", a.getFullYear())))), r;
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
    const t = this.dateWithoutTimezoneAdjustment(), a = I(t, e);
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
class be {
  constructor(e, t, a, r, s) {
    p(this, "refDate");
    p(this, "index");
    p(this, "text");
    p(this, "reference");
    p(this, "start");
    p(this, "end");
    this.reference = e, this.refDate = e.instant, this.index = t, this.text = a, this.start = r || new N(e), this.end = s;
  }
  clone() {
    const e = new be(this.reference, this.index, this.text);
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
function Mn(n, e, t = "\\s{0,5},?\\s{0,5}") {
  const a = e.replace(/\((?!\?)/g, "(?:");
  return `${n}${a}(?:${t}${a}){0,10}`;
}
function kr(n) {
  let e;
  return n instanceof Array ? e = [...n] : n instanceof Map ? e = Array.from(n.keys()) : e = Object.keys(n), e;
}
function X(n) {
  return `(?:${kr(n).sort((t, a) => a.length - t.length).join("|").replace(/\./g, "\\.")})`;
}
function En(n) {
  return n < 100 && (n > 50 ? n = n + 1900 : n = n + 2e3), n;
}
function Ge(n, e, t) {
  let a = new Date(n);
  a.setMonth(t - 1), a.setDate(e);
  const r = I(a, { year: 1 }), s = I(a, { year: -1 });
  return Math.abs(r.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) ? a = r : Math.abs(s.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) && (a = s), a.getFullYear();
}
const pt = {
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
}, Pn = {
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
}, se = {
  ...Pn,
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
}, Tt = {
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
}, wt = {
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
}, Nn = {
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
}, Ve = {
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
  ...Nn
}, An = `(?:${X(Tt)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function xr(n) {
  const e = n.toLowerCase();
  return Tt[e] !== void 0 ? Tt[e] : e === "a" || e === "an" || e == "the" ? 1 : e.match(/few/) ? 3 : e.match(/half/) ? 0.5 : e.match(/couple/) ? 2 : e.match(/several/) ? 7 : parseFloat(e);
}
const Ue = `(?:${X(wt)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function Le(n) {
  let e = n.toLowerCase();
  return wt[e] !== void 0 ? wt[e] : (e = e.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(e));
}
const Ke = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[5-9][0-9]|2[0-5])";
function qe(n) {
  if (/BE/i.test(n))
    return n = n.replace(/BE/i, ""), parseInt(n) - 543;
  if (/BCE?/i.test(n))
    return n = n.replace(/BCE?/i, ""), -parseInt(n);
  if (/(AD|CE)/i.test(n))
    return n = n.replace(/(AD|CE)/i, ""), parseInt(n);
  const e = parseInt(n);
  return En(e);
}
const On = `(${An})\\s{0,3}(${X(Ve)})`, Bt = new RegExp(On, "i"), Fr = `(${An})\\s{0,3}(${X(Nn)})`, Sn = "\\s{0,5},?(?:\\s*and)?\\s{0,5}", Re = Mn("(?:(?:about|around)\\s{0,3})?", On, Sn), Qe = Mn("(?:(?:about|around)\\s{0,3})?", Fr, Sn);
function De(n) {
  const e = {};
  let t = n, a = Bt.exec(t);
  for (; a; )
    Rr(e, a), t = t.substring(a[0].length).trim(), a = Bt.exec(t);
  return Object.keys(e).length == 0 ? null : e;
}
function Rr(n, e) {
  if (e[0].match(/^[a-zA-Z]+$/))
    return;
  const t = xr(e[1]), a = Ve[e[2].toLowerCase()];
  n[a] = t;
}
class U {
  constructor() {
    p(this, "cachedInnerPattern", null);
    p(this, "cachedPattern", null);
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
const Hr = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Re})(?=\\W|$)`, "i"), vr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Re})(?=\\W|$)`, "i"), Cr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Qe})(?=\\W|$)`, "i");
class Yr extends U {
  constructor(t) {
    super();
    p(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern(t) {
    return this.strictMode ? Cr : t.option.forwardDate ? Hr : vr;
  }
  innerExtract(t, a) {
    if (a[0].match(/^for\s*the\s*\w+/))
      return null;
    const r = De(a[1]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
const Wr = new RegExp(`(?:on\\s{0,3})?(${Ue})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${Ue}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${X(se)})(?:(?:-|/|,?\\s{0,3})(${Ke}(?!\\w)))?(?=\\W|$)`, "i"), Ut = 1, Lt = 2, _r = 3, jt = 4;
class $r extends U {
  innerPattern() {
    return Wr;
  }
  innerExtract(e, t) {
    const a = e.createParsingResult(t.index, t[0]), r = se[t[_r].toLowerCase()], s = Le(t[Ut]);
    if (s > 31)
      return t.index = t.index + t[Ut].length, null;
    if (a.start.assign("month", r), a.start.assign("day", s), t[jt]) {
      const i = qe(t[jt]);
      a.start.assign("year", i);
    } else {
      const i = Ge(e.refDate, s, r);
      a.start.imply("year", i);
    }
    if (t[Lt]) {
      const i = Le(t[Lt]);
      a.end = a.start.clone(), a.end.assign("day", i);
    }
    return a;
  }
}
const Ir = new RegExp(`(${X(se)})(?:-|/|\\s*,?\\s*)(${Ue})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${Ue})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${Ke}))?(?=\\W|$)(?!\\:\\d)`, "i"), Br = 1, zt = 2, lt = 3, ut = 4;
class Ur extends U {
  constructor(t) {
    super();
    p(this, "shouldSkipYearLikeDate");
    this.shouldSkipYearLikeDate = t;
  }
  innerPattern() {
    return Ir;
  }
  innerExtract(t, a) {
    const r = se[a[Br].toLowerCase()], s = Le(a[zt]);
    if (s > 31 || this.shouldSkipYearLikeDate && !a[lt] && !a[ut] && a[zt].match(/^2[0-5]$/))
      return null;
    const i = t.createParsingComponents({
      day: s,
      month: r
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (a[ut]) {
      const l = qe(a[ut]);
      i.assign("year", l);
    } else {
      const l = Ge(t.refDate, s, r);
      i.imply("year", l);
    }
    if (!a[lt])
      return i;
    const o = Le(a[lt]), c = t.createParsingResult(a.index, a[0]);
    return c.start = i, c.end = i.clone(), c.end.assign("day", o), c;
  }
}
const Lr = new RegExp(`((?:in)\\s*)?(${X(se)})\\s*(?:(?:,|-|of)?\\s*(${Ke})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), jr = 1, zr = 2, Gt = 3;
class Gr extends U {
  innerPattern() {
    return Lr;
  }
  innerExtract(e, t) {
    const a = t[zr].toLowerCase();
    if (t[0].length <= 3 && !Pn[a])
      return null;
    const r = e.createParsingResult(t.index + (t[jr] || "").length, t.index + t[0].length);
    r.start.imply("day", 1), r.start.addTag("parser/ENMonthNameParser");
    const s = se[a];
    if (r.start.assign("month", s), t[Gt]) {
      const i = qe(t[Gt]);
      r.start.assign("year", i);
    } else {
      const i = Ge(e.refDate, 1, s);
      r.start.imply("year", i);
    }
    return r;
  }
}
const Vr = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${X(se)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), Kr = 1, qr = 2, Vt = 3, Qr = 4;
class Xr extends U {
  constructor(t) {
    super();
    p(this, "strictMonthDateOrder");
    this.strictMonthDateOrder = t;
  }
  innerPattern() {
    return Vr;
  }
  innerExtract(t, a) {
    const r = parseInt(a[Kr]);
    let s = parseInt(a[Qr]), i = a[Vt] ? parseInt(a[Vt]) : se[a[qr].toLowerCase()];
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
const Jr = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), Zr = 1, es = 2;
class ts extends U {
  innerPattern() {
    return Jr;
  }
  innerExtract(e, t) {
    const a = parseInt(t[es]), r = parseInt(t[Zr]);
    return e.createParsingComponents().imply("day", 1).assign("month", r).assign("year", a);
  }
}
function ns(n, e, t, a) {
  return new RegExp(`${n}${e}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`, a);
}
function as(n, e) {
  return new RegExp(`^(${n})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${e}`, "i");
}
const dt = 2, ce = 3, _e = 4, $e = 5, ge = 6;
class rs {
  constructor(e = !1) {
    p(this, "strictMode");
    p(this, "cachedPrimaryPrefix", null);
    p(this, "cachedPrimarySuffix", null);
    p(this, "cachedPrimaryTimePattern", null);
    p(this, "cachedFollowingPhase", null);
    p(this, "cachedFollowingSuffix", null);
    p(this, "cachedFollowingTimePatten", null);
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
    let s = 0, i = null, o = parseInt(t[dt]);
    if (o > 100) {
      if (t[dt].length == 4 && t[ce] == null && !t[ge] || this.strictMode || t[ce] != null)
        return null;
      s = o % 100, o = Math.floor(o / 100);
    }
    if (o > 24)
      return null;
    if (t[ce] != null) {
      if (t[ce].length == 1 && !t[ge])
        return null;
      s = parseInt(t[ce]);
    }
    if (s >= 60)
      return null;
    if (o > 12 && (i = E.PM), t[ge] != null) {
      if (o > 12)
        return null;
      const c = t[ge][0].toLowerCase();
      c == "a" && (i = E.AM, o == 12 && (o = 0)), c == "p" && (i = E.PM, o != 12 && (o += 12));
    }
    if (r.assign("hour", o), r.assign("minute", s), i !== null ? r.assign("meridiem", i) : o < 12 ? r.imply("meridiem", E.AM) : r.imply("meridiem", E.PM), t[$e] != null) {
      const c = parseInt(t[$e].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[_e] != null) {
      const c = parseInt(t[_e]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    return r;
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = e.createParsingComponents();
    if (t[$e] != null) {
      const c = parseInt(t[$e].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[_e] != null) {
      const c = parseInt(t[_e]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    let s = parseInt(t[dt]), i = 0, o = -1;
    if (t[ce] != null ? i = parseInt(t[ce]) : s > 100 && (i = s % 100, s = Math.floor(s / 100)), i >= 60 || s > 24)
      return null;
    if (s >= 12 && (o = E.PM), t[ge] != null) {
      if (s > 12)
        return null;
      const c = t[ge][0].toLowerCase();
      c == "a" && (o = E.AM, s == 12 && (s = 0, r.isCertain("day") || r.imply("day", r.get("day") + 1))), c == "p" && (o = E.PM, s != 12 && (s += 12)), a.start.isCertain("meridiem") || (o == E.AM ? (a.start.imply("meridiem", E.AM), a.start.get("hour") == 12 && a.start.assign("hour", 0)) : (a.start.imply("meridiem", E.PM), a.start.get("hour") != 12 && a.start.assign("hour", a.start.get("hour") + 12)));
    }
    return r.assign("hour", s), r.assign("minute", i), o >= 0 ? r.assign("meridiem", o) : a.start.isCertain("meridiem") && a.start.get("hour") > 12 ? a.start.get("hour") - 12 > s ? r.imply("meridiem", E.AM) : s <= 12 && (r.assign("hour", s + 12), r.assign("meridiem", E.PM)) : s > 12 ? r.imply("meridiem", E.PM) : s <= 12 && r.imply("meridiem", E.AM), r.date().getTime() < a.start.date().getTime() && r.imply("day", r.get("day") + 1), r;
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
    return this.cachedPrimaryPrefix === e && this.cachedPrimarySuffix === t ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = ns(this.primaryPatternLeftBoundary(), e, t, this.patternFlags()), this.cachedPrimaryPrefix = e, this.cachedPrimarySuffix = t, this.cachedPrimaryTimePattern);
  }
  getFollowingTimePatternThroughCache() {
    const e = this.followingPhase(), t = this.followingSuffix();
    return this.cachedFollowingPhase === e && this.cachedFollowingSuffix === t ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = as(e, t), this.cachedFollowingPhase = e, this.cachedFollowingSuffix = t, this.cachedFollowingTimePatten);
  }
}
class ss extends rs {
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
      r >= 6 && r < 12 ? (a.assign("hour", a.get("hour") + 12), a.assign("meridiem", E.PM)) : r < 6 && a.assign("meridiem", E.AM);
    }
    if (t[0].endsWith("afternoon")) {
      a.assign("meridiem", E.PM);
      const r = a.get("hour");
      r >= 0 && r <= 6 && a.assign("hour", a.get("hour") + 12);
    }
    return t[0].endsWith("morning") && (a.assign("meridiem", E.AM), a.get("hour") < 12 && a.assign("hour", a.get("hour"))), a.addTag("parser/ENTimeExpressionParser");
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = super.extractFollowingTimeComponents(e, t, a);
    return r && r.addTag("parser/ENTimeExpressionParser"), r;
  }
}
const is = new RegExp(`(${Re})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), os = new RegExp(`(${Qe})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
class cs extends U {
  constructor(t) {
    super();
    p(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? os : is;
  }
  innerExtract(t, a) {
    const r = De(a[1]);
    return r ? N.createRelativeFromReference(t.reference, ze(r)) : null;
  }
}
const ls = new RegExp(`(${Re})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), us = new RegExp(`(${Qe})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), ds = 1;
class ms extends U {
  constructor(t) {
    super();
    p(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? us : ls;
  }
  innerExtract(t, a) {
    const r = De(a[ds]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
class kn {
  refine(e, t) {
    return t.filter((a) => this.isValid(e, a));
  }
}
class He {
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
class fs extends He {
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
      a.start.isOnlyWeekdayComponent() && I(i, { day: 7 }) > s ? (i = I(i, { day: 7 }), a.start.imply("day", i.getDate()), a.start.imply("month", i.getMonth() + 1), a.start.imply("year", i.getFullYear())) : t.start.isOnlyWeekdayComponent() && I(s, { day: -7 }) < i ? (s = I(s, { day: -7 }), t.start.imply("day", s.getDate()), t.start.imply("month", s.getMonth() + 1), t.start.imply("year", s.getFullYear())) : a.start.isDateWithUnknownYear() && I(i, { year: 1 }) > s ? (i = I(i, { year: 1 }), a.start.imply("year", i.getFullYear())) : t.start.isDateWithUnknownYear() && I(s, { year: -1 }) < i ? (s = I(s, { year: -1 }), t.start.imply("year", s.getFullYear())) : [a, t] = [t, a];
    }
    const r = t.clone();
    return r.start = t.start, r.end = a.start, r.index = Math.min(t.index, a.index), t.index < a.index ? r.text = t.text + e + a.text : r.text = a.text + e + t.text, r;
  }
}
class hs extends fs {
  patternBetween() {
    return /^\s*(to|-|–|until|through|till)\s*$/i;
  }
}
function Kt(n, e) {
  const t = n.clone(), a = n.start, r = e.start;
  if (t.start = qt(a, r), n.end != null || e.end != null) {
    const s = n.end == null ? n.start : n.end, i = e.end == null ? e.start : e.end, o = qt(s, i);
    if (n.end == null && o.date().getTime() < t.start.date().getTime()) {
      const c = new Date(o.date().getTime());
      c.setDate(c.getDate() + 1), o.isCertain("day") ? me(o, c) : ye(o, c);
    }
    t.end = o;
  }
  return t;
}
function qt(n, e) {
  const t = n.clone();
  e.isCertain("hour") ? (t.assign("hour", e.get("hour")), t.assign("minute", e.get("minute")), e.isCertain("second") ? (t.assign("second", e.get("second")), e.isCertain("millisecond") ? t.assign("millisecond", e.get("millisecond")) : t.imply("millisecond", e.get("millisecond"))) : (t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond")))) : (t.imply("hour", e.get("hour")), t.imply("minute", e.get("minute")), t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond"))), e.isCertain("timezoneOffset") && t.assign("timezoneOffset", e.get("timezoneOffset"));
  const a = n.get("meridiem") != null && (n.isCertain("meridiem") || Array.from(n.tags()).some((r) => r.startsWith("casualReference/")));
  return e.isCertain("meridiem") ? t.assign("meridiem", e.get("meridiem")) : e.get("meridiem") != null && !a && t.imply("meridiem", e.get("meridiem")), t.get("meridiem") == E.PM && t.get("hour") < 12 && (e.isCertain("hour") ? t.assign("hour", t.get("hour") + 12) : t.imply("hour", t.get("hour") + 12)), t.addTags(n.tags()), t.addTags(e.tags()), t;
}
class gs extends He {
  shouldMergeResults(e, t, a) {
    return (t.start.isOnlyDate() && a.start.isOnlyTime() || a.start.isOnlyDate() && t.start.isOnlyTime()) && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    const r = t.start.isOnlyDate() ? Kt(t, a) : Kt(a, t);
    return r.index = t.index, r.text = t.text + e + a.text, r;
  }
}
class Qt extends gs {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
  }
}
const ys = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
class ps {
  constructor(e) {
    p(this, "timezoneOverrides");
    this.timezoneOverrides = e;
  }
  refine(e, t) {
    const a = e.option.timezones ?? {};
    return t.forEach((r) => {
      const s = e.text.substring(r.index + r.text.length), i = ys.exec(s);
      if (!i)
        return;
      const o = i[1].toUpperCase(), c = r.start.date() ?? r.refDate ?? /* @__PURE__ */ new Date(), l = { ...this.timezoneOverrides, ...a }, u = Dn(o, c, l);
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
const Ts = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), ws = 1, bs = 2, Ds = 3;
class Ms {
  refine(e, t) {
    return t.forEach(function(a) {
      if (a.start.isCertain("timezoneOffset"))
        return;
      const r = e.text.substring(a.index + a.text.length), s = Ts.exec(r);
      if (!s)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${s[0]}' into : ${a}`);
      });
      const i = parseInt(s[bs]), o = parseInt(s[Ds] || "0");
      let c = i * 60 + o;
      c > 14 * 60 || (s[ws] === "-" && (c = -c), a.end != null && a.end.assign("timezoneOffset", c), a.start.assign("timezoneOffset", c), a.text += s[0]);
    }), t;
  }
}
class bt {
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
function Es(n, e, t) {
  const a = n.getDateWithAdjustedTimezone(), r = Ps(a, e, t);
  let s = new N(n);
  return s = s.addDurationAsImplied({ day: r }), s.assign("weekday", e), s;
}
function Ps(n, e, t) {
  const a = n.getDay();
  switch (t) {
    case "this":
      return Te(n, e);
    case "last":
      return xn(n, e);
    case "next":
      return a == O.SUNDAY ? e == O.SUNDAY ? 7 : e : a == O.SATURDAY ? e == O.SATURDAY ? 7 : e == O.SUNDAY ? 8 : 1 + e : e < a && e != O.SUNDAY ? Te(n, e) : Te(n, e) + 7;
  }
  return Ns(n, e);
}
function Ns(n, e) {
  const t = xn(n, e), a = Te(n, e);
  return a < -t ? a : t;
}
function Te(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a < 0 && (a += 7), a;
}
function xn(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a >= 0 && (a -= 7), a;
}
class As {
  refine(e, t) {
    return e.option.forwardDate && t.forEach((a) => {
      let r = e.reference.getDateWithAdjustedTimezone();
      if (a.start.isOnlyTime() && e.reference.instant > a.start.date()) {
        const s = e.reference.getDateWithAdjustedTimezone(), i = new Date(s);
        i.setDate(i.getDate() + 1), ye(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} time from the ref date (${s}) to the following day (${i})`);
        }), a.end && a.end.isOnlyTime() && (ye(a.end, i), a.start.date() > a.end.date() && (i.setDate(i.getDate() + 1), ye(a.end, i)));
      }
      if (a.start.isOnlyWeekdayComponent() && r > a.start.date()) {
        let s = Te(r, a.start.get("weekday")) || 7;
        const i = I(r, { day: s });
        if (ye(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} weekday (${a.start})`);
        }), a.end && a.start.date() > a.end.date()) {
          let o = Te(r, a.start.get("weekday")) || 7;
          const c = I(r, { day: o });
          ye(a.end, c), e.debug(() => {
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
class Os extends kn {
  constructor(t) {
    super();
    p(this, "strictMode");
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
const Ss = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), ks = 1, xs = 2, Fs = 3, Xt = 4, Rs = 5, Jt = 6, Zt = 7, Hs = 8, en = 9, tn = 10;
class vs extends U {
  innerPattern() {
    return Ss;
  }
  innerExtract(e, t) {
    const a = e.createParsingComponents({
      year: parseInt(t[ks]),
      month: parseInt(t[xs]),
      day: parseInt(t[Fs])
    });
    if (t[Xt] != null && (a.assign("hour", parseInt(t[Xt])), a.assign("minute", parseInt(t[Rs])), t[Jt] != null && a.assign("second", parseInt(t[Jt])), t[Zt] != null && a.assign("millisecond", parseInt(t[Zt])), t[Hs] != null)) {
      let r = 0;
      if (t[en]) {
        const s = parseInt(t[en]);
        let i = 0;
        t[tn] != null && (i = parseInt(t[tn])), r = s * 60, r < 0 ? r -= i : r += i;
      }
      a.assign("timezoneOffset", r);
    }
    return a.addTag("parser/ISOFormatParser");
  }
}
class Cs extends He {
  mergeResults(e, t, a) {
    const r = a.clone();
    return r.index = t.index, r.text = t.text + e + r.text, r.start.assign("weekday", t.start.get("weekday")), r.end && r.end.assign("weekday", t.start.get("weekday")), r;
  }
  shouldMergeResults(e, t, a) {
    return t.start.isOnlyWeekdayComponent() && !t.start.isCertain("hour") && a.start.isCertain("day") && e.match(/^,?\s*$/) != null;
  }
}
function Ys(n, e = !1) {
  return n.parsers.unshift(new vs()), n.refiners.unshift(new Cs()), n.refiners.unshift(new Ms()), n.refiners.unshift(new bt()), n.refiners.push(new ps()), n.refiners.push(new bt()), n.refiners.push(new As()), n.refiners.push(new Os(e)), n;
}
function Ws(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return me(t, e), bn(t, e), t.assign("timezoneOffset", n.getTimezoneOffset()), t.addTag("casualReference/now"), t;
}
function _s(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return me(t, e), Et(t, e), t.delete("meridiem"), t.addTag("casualReference/today"), t;
}
function $s(n) {
  return Bs(n).addTag("casualReference/yesterday");
}
function Is(n) {
  return Pt(n, 1).addTag("casualReference/tomorrow");
}
function Bs(n, e) {
  return Pt(n, -1);
}
function Pt(n, e) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {}), r = new Date(t.getTime());
  return r.setDate(r.getDate() + e), me(a, r), Et(a, r), a.delete("meridiem"), a;
}
function Us(n, e = 22) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {});
  return me(a, t), a.imply("hour", e), a.imply("meridiem", E.PM), a.addTag("casualReference/tonight"), a;
}
function Ls(n, e = 20) {
  const t = new N(n, {});
  return t.imply("meridiem", E.PM), t.imply("hour", e), t.addTag("casualReference/evening"), t;
}
function js(n) {
  const e = new N(n, {});
  return n.getDateWithAdjustedTimezone().getHours() > 2 && e.addDurationAsImplied({ day: 1 }), e.assign("hour", 0), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/midnight"), e;
}
function zs(n, e = 6) {
  const t = new N(n, {});
  return t.imply("meridiem", E.AM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/morning"), t;
}
function Gs(n, e = 15) {
  const t = new N(n, {});
  return t.imply("meridiem", E.PM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/afternoon"), t;
}
function Vs(n) {
  const e = new N(n, {});
  return e.imply("meridiem", E.AM), e.assign("hour", 12), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/noon"), e;
}
const Ks = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
class qs extends U {
  innerPattern(e) {
    return Ks;
  }
  innerExtract(e, t) {
    let a = e.refDate;
    const r = t[0].toLowerCase();
    let s = e.createParsingComponents();
    switch (r) {
      case "now":
        s = Ws(e.reference);
        break;
      case "today":
        s = _s(e.reference);
        break;
      case "yesterday":
        s = $s(e.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        s = Is(e.reference);
        break;
      case "tonight":
        s = Us(e.reference);
        break;
      case "overmorrow":
        s = Pt(e.reference, 2);
        break;
      default:
        if (r.match(/last\s*night/)) {
          if (a.getHours() > 6) {
            const i = new Date(a.getTime());
            i.setDate(i.getDate() - 1), a = i;
          }
          me(s, a), s.imply("hour", 0);
        }
        break;
    }
    return s.addTag("parser/ENCasualDateParser"), s;
  }
}
const Qs = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
class Xs extends U {
  innerPattern() {
    return Qs;
  }
  innerExtract(e, t) {
    let a = null;
    switch (t[1].toLowerCase()) {
      case "afternoon":
        a = Gs(e.reference);
        break;
      case "evening":
      case "night":
        a = Ls(e.reference);
        break;
      case "midnight":
        a = js(e.reference);
        break;
      case "morning":
        a = zs(e.reference);
        break;
      case "noon":
      case "midday":
        a = Vs(e.reference);
        break;
    }
    return a && a.addTag("parser/ENCasualTimeParser"), a;
  }
}
const Js = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${X(pt)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), Zs = 1, ei = 2, ti = 3;
class ni extends U {
  innerPattern() {
    return Js;
  }
  innerExtract(e, t) {
    const a = t[Zs], r = t[ti];
    let s = a || r;
    s = s || "", s = s.toLowerCase();
    let i = null;
    s == "last" || s == "past" ? i = "last" : s == "next" ? i = "next" : s == "this" && (i = "this");
    const o = t[ei].toLowerCase();
    let c;
    if (pt[o] !== void 0)
      c = pt[o];
    else if (o == "weekend")
      c = i == "last" ? O.SUNDAY : O.SATURDAY;
    else if (o == "weekday") {
      const l = e.reference.getDateWithAdjustedTimezone().getDay();
      l == O.SUNDAY || l == O.SATURDAY ? c = i == "last" ? O.FRIDAY : O.MONDAY : (c = l - 1, c = i == "last" ? c - 1 : c + 1, c = c % 5 + 1);
    } else
      return null;
    return Es(e.reference, c, i);
  }
}
const ai = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${X(Ve)})(?=\\s*)(?=\\W|$)`, "i"), ri = 1, si = 2;
class ii extends U {
  innerPattern() {
    return ai;
  }
  innerExtract(e, t) {
    const a = t[ri].toLowerCase(), r = t[si].toLowerCase(), s = Ve[r];
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
const oi = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), ci = 1, li = 5, nn = 2, an = 3, mt = 4;
class ui {
  constructor(e) {
    p(this, "groupNumberMonth");
    p(this, "groupNumberDay");
    this.groupNumberMonth = e ? an : nn, this.groupNumberDay = e ? nn : an;
  }
  pattern() {
    return oi;
  }
  extract(e, t) {
    const a = t.index + t[ci].length, r = t.index + t[0].length - t[li].length;
    if (a > 0 && e.text.substring(0, a).match("\\d/?$") || r < e.text.length && e.text.substring(r).match("^/?\\d"))
      return;
    const s = e.text.substring(a, r);
    if (s.match(/^\d\.\d$/) || s.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/) || !t[mt] && s.indexOf("/") < 0)
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
    if (i.start.assign("day", c), i.start.assign("month", o), t[mt]) {
      const l = parseInt(t[mt]), u = En(l);
      i.start.assign("year", u);
    } else {
      const l = Ge(e.refDate, c, o);
      i.start.imply("year", l);
    }
    return i.addTag("parser/SlashDateFormatParser");
  }
}
const di = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Re})(?=\\W|$)`, "i"), mi = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Qe})(?=\\W|$)`, "i");
class fi extends U {
  constructor(t = !0) {
    super();
    p(this, "allowAbbreviations");
    this.allowAbbreviations = t;
  }
  innerPattern() {
    return this.allowAbbreviations ? di : mi;
  }
  innerExtract(t, a) {
    const r = a[1].toLowerCase();
    let s = De(a[2]);
    if (!s)
      return null;
    switch (r) {
      case "last":
      case "past":
      case "-":
        s = ze(s);
        break;
    }
    return N.createRelativeFromReference(t.reference, s);
  }
}
function hi(n) {
  return n.text.match(/^[+-]/i) != null;
}
function rn(n) {
  return n.text.match(/^-/i) != null;
}
class gi extends He {
  shouldMergeResults(e, t, a) {
    return e.match(/^\s*$/i) ? hi(a) || rn(a) : !1;
  }
  mergeResults(e, t, a, r) {
    let s = De(a.text);
    rn(a) && (s = ze(s));
    const i = N.createRelativeFromReference(ue.fromDate(t.start.date()), s);
    return new be(t.reference, t.index, `${t.text}${e}${a.text}`, i);
  }
}
function sn(n) {
  return n.text.match(/\s+(before|from)$/i) != null;
}
function yi(n) {
  return n.text.match(/\s+(after|since)$/i) != null;
}
class pi extends He {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(e, t, a) {
    return !e.match(this.patternBetween()) || !sn(t) && !yi(t) ? !1 : !!a.start.get("day") && !!a.start.get("month") && !!a.start.get("year");
  }
  mergeResults(e, t, a) {
    let r = De(t.text);
    sn(t) && (r = ze(r));
    const s = N.createRelativeFromReference(ue.fromDate(a.start.date()), r);
    return new be(a.reference, t.index, `${t.text}${e}${a.text}`, s);
  }
}
const Ti = new RegExp(`^\\s*(${Ke})`, "i"), wi = 1;
class bi {
  refine(e, t) {
    return t.forEach(function(a) {
      if (!a.start.isDateWithUnknownYear())
        return;
      const r = e.text.substring(a.index + a.text.length), s = Ti.exec(r);
      if (!s || s[0].trim().length <= 3)
        return;
      e.debug(() => {
        console.log(`Extracting year: '${s[0]}' into : ${a}`);
      });
      const i = qe(s[wi]);
      a.end != null && a.end.assign("year", i), a.start.assign("year", i), a.text += s[0];
    }), t;
  }
}
class Di extends kn {
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
class Fn {
  createCasualConfiguration(e = !1) {
    const t = this.createConfiguration(!1, e);
    return t.parsers.push(new qs()), t.parsers.push(new Xs()), t.parsers.push(new Gr()), t.parsers.push(new ii()), t.parsers.push(new fi()), t.refiners.push(new Di()), t;
  }
  createConfiguration(e = !0, t = !1) {
    const a = Ys({
      parsers: [
        new ui(t),
        new Yr(e),
        new $r(),
        new Ur(t),
        new ni(),
        new ts(),
        new ss(e),
        new cs(e),
        new ms(e)
      ],
      refiners: [new Qt()]
    }, e);
    return a.parsers.unshift(new Xr(e)), a.refiners.unshift(new pi()), a.refiners.unshift(new gi()), a.refiners.unshift(new bt()), a.refiners.push(new Qt()), a.refiners.push(new bi()), a.refiners.push(new hs()), a;
  }
}
class we {
  constructor(e) {
    p(this, "parsers");
    p(this, "refiners");
    p(this, "defaultConfig", new Fn());
    e = e || this.defaultConfig.createCasualConfiguration(), this.parsers = [...e.parsers], this.refiners = [...e.refiners];
  }
  clone() {
    return new we({
      parsers: [...this.parsers],
      refiners: [...this.refiners]
    });
  }
  parseDate(e, t, a) {
    const r = this.parse(e, t, a);
    return r.length > 0 ? r[0].start.date() : null;
  }
  parse(e, t, a) {
    const r = new Mi(e, t, a);
    let s = [];
    return this.parsers.forEach((i) => {
      const o = we.executeParser(r, i);
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
      l instanceof be ? u = l : l instanceof N ? (u = e.createParsingResult(o.index, o[0]), u.start = l) : u = e.createParsingResult(o.index, o[0], l);
      const f = u.index, M = u.text;
      e.debug(() => console.log(`${t.constructor.name} extracted (at index=${f}) '${M}'`)), a.push(u), i = s.substring(f + M.length), o = r.exec(i);
    }
    return a;
  }
}
class Mi {
  constructor(e, t, a) {
    p(this, "text");
    p(this, "option");
    p(this, "reference");
    p(this, "refDate");
    this.text = e, this.option = a ?? {}, this.reference = ue.fromInput(t, this.option.timezones), this.refDate = this.reference.instant;
  }
  createParsingComponents(e) {
    return e instanceof N ? e : new N(this.reference, e);
  }
  createParsingResult(e, t, a, r) {
    const s = typeof t == "string" ? t : this.text.substring(e, t), i = a ? this.createParsingComponents(a) : null, o = r ? this.createParsingComponents(r) : null;
    return new be(this.reference, e, s, i, o);
  }
  debug(e) {
    this.option.debug && (this.option.debug instanceof Function ? this.option.debug(e) : this.option.debug.debug(e));
  }
}
const Nt = new Fn(), Ei = new we(Nt.createCasualConfiguration(!1));
new we(Nt.createConfiguration(!0, !1));
new we(Nt.createCasualConfiguration(!0));
const Pi = Ei;
function Ni(n, e, t) {
  return Pi.parse(n, e, t);
}
const Ai = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, Oi = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i, Si = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, ki = /^(this|last|next)\s+(week|month)$/i, xi = /^(end|beginning)\s+of\s+(this|next)\s+month$/i, Fi = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i, Ri = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i, Hi = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i, vi = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i, Ci = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i, Yi = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i, Wi = /^(christmas|halloween|valentine|new\s+year|independence\s+day|veterans\s+day|st\.?\s+patrick|cinco\s+de\s+mayo|labour\s+day|songkran|chakri\s+memorial\s+day|coronation\s+day|queen\s+suthida's\s+birthday|king's\s+birthday|the\s+queen\s+mother's\s+birthday|king\s+bhumibol\s+adulyadej\s+memorial\s+day|king\s+chulalongkorn\s+day|king\s+bhumibol\s+adulyadej's\s+birthday|constitution\s+day)\s+(\d{4})$/i, Rn = {
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
}, ft = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}, _i = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
}, $i = {
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
function Ii(n, e, t) {
  const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = new Date(t.getFullYear(), n - 1, e);
  return r >= a ? r : new Date(t.getFullYear() + 1, n - 1, e);
}
function ht(n, e) {
  const t = n.toLowerCase().trim().replace(/^next\s+/, ""), a = Rn[t];
  return a ? Ii(a[0], a[1], e) : null;
}
function gt(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? de(n, e) : a.startsWith("week") ? pe(n, e) : a.startsWith("month") ? ee(n, e) : n;
}
function Bi(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? ke(n, e) : a.startsWith("week") ? Mt(n, e) : a.startsWith("month") ? je(n, e) : n;
}
function Ui(n, e, t = !1) {
  const a = yt(n);
  let r = e - a;
  return (r < 0 || !t && r === 0) && (r += 7), de(n, r);
}
function on(n, e, t, a) {
  if (a > 0) {
    const r = new Date(n, e, 1), s = yt(r);
    let i = t - s;
    i < 0 && (i += 7);
    const o = new Date(n, e, 1 + i + (a - 1) * 7);
    return o.getMonth() !== e ? null : o;
  } else {
    const r = new Date(n, e + 1, 0);
    let i = yt(r) - t;
    return i < 0 && (i += 7), new Date(n, e, r.getDate() - i);
  }
}
function Li(n) {
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
function Hn(n, e = /* @__PURE__ */ new Date()) {
  var te;
  const t = n.trim();
  if (!t) return null;
  const a = t.toLowerCase(), r = t.match(Ai);
  if (r) {
    const h = parseInt(r[1], 10);
    return { range: [e, gt(e, h, r[2])], text: n };
  }
  const s = t.match(Oi);
  if (s) {
    const h = parseInt(s[1], 10);
    return { single: gt(e, h, s[2]), text: n };
  }
  const i = t.match(Si);
  if (i) {
    const h = parseInt(i[1], 10);
    return { range: [Bi(e, h, i[2]), e], text: n };
  }
  const o = t.match(ki);
  if (o) {
    const h = o[1].toLowerCase(), w = o[2].toLowerCase(), A = { weekStartsOn: 1 };
    if (w === "week") {
      const W = h === "last" ? Mt(e, 1) : h === "next" ? pe(e, 1) : e;
      return { range: [re(W, A), Dt(W, A)], text: n };
    }
    if (w === "month") {
      const W = h === "last" ? je(e, 1) : h === "next" ? ee(e, 1) : e;
      return { range: [Se(W), Oe(W)], text: n };
    }
  }
  const c = a.match(xi);
  if (c) {
    const w = c[2] === "next" ? ee(e, 1) : e;
    return { single: c[1] === "end" ? Oe(w) : Se(w), text: n };
  }
  const l = a.match(Wi);
  if (l) {
    const h = l[1], w = parseInt(l[2], 10), A = Rn[h];
    if (A)
      return { single: new Date(w, A[0] - 1, A[1]), text: n };
  }
  const u = a.match(Fi);
  if (u) {
    const h = parseInt(u[1], 10), w = u[2] === "next" ? ee(e, 1) : e;
    return { single: new Date(w.getFullYear(), w.getMonth(), h), text: n };
  }
  const f = a.match(Ri);
  if (f) {
    const h = f[1], w = ft[f[2]], A = Li(f[3]);
    if (A !== null && w !== void 0) {
      const W = h === "last" ? -1 : _i[h] ?? 1, L = e.getFullYear();
      let F = on(L, A, w, W);
      if ((!F || F < e) && (F = on(L + 1, A, w, W)), F) return { single: F, text: n };
    }
  }
  const M = a.match(Hi);
  if (M) {
    const h = ft[M[1]];
    return { single: Ui(e, h, !1), text: n };
  }
  const y = a.match(vi);
  if (y) {
    const h = y[1].startsWith("after") ? 2 : -2;
    return { single: de(e, h), text: n };
  }
  const g = a.match(Ci);
  if (g) {
    const h = ft[g[1]], w = pe(e, 1), A = nr(w, h, { weekStartsOn: 1 });
    return { single: pe(A, 1), text: n };
  }
  const b = a.match(Yi);
  if (b) {
    const h = b[1], w = $i[h] ?? parseInt(h, 10), A = b[2], W = b[3], L = Hn(W, e), F = (L == null ? void 0 : L.single) ?? ((te = L == null ? void 0 : L.range) == null ? void 0 : te[0]);
    if (F) return { single: gt(F, w, A), text: n };
  }
  const C = Ni(t, e);
  if (C.length > 0) {
    const h = C.find((w) => w.end != null);
    if (h) return { range: [h.start.date(), h.end.date()], text: n };
    if (C.length >= 2) {
      const w = C[0].start.date(), A = C[1].start.date();
      return { range: [w < A ? w : A, w < A ? A : w], text: n };
    }
    return { single: C[0].start.date(), text: n };
  }
  const K = t.match(/^(.+?)\s+to\s+(.+)$/i);
  if (K) {
    const h = ht(K[1], e), w = ht(K[2], h ?? e);
    if (h && w) return { range: [h, w], text: n };
  }
  const x = ht(t, e);
  return x ? { single: x, text: n } : null;
}
function ji() {
  const [n, e] = V(null), [t, a] = V(""), r = k((s) => {
    a(s), e(Hn(s));
  }, []);
  return { inputValue: t, preview: n, handleChange: r, setInputValue: a, setPreview: e };
}
function S(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function zi({
  selectionMode: n,
  locale: e,
  onCommit: t
}) {
  const { inputValue: a, preview: r, handleChange: s, setInputValue: i, setPreview: o } = ji(), c = () => {
    if (!r) return;
    const u = {
      single: r.single ? S(r.single) : void 0,
      range: r.range ? [S(r.range[0]), S(r.range[1])] : void 0
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
  return /* @__PURE__ */ B("div", { className: "dp-nl-input", children: [
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
function Gi({ isOpen: n, position: e, popoverRef: t, children: a }) {
  return n ? Kn(
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
function Vi({ value: n, onChange: e }) {
  const [t, a] = V(null), [r, s] = V(null), i = k(
    (l) => {
      if (r === null)
        s(l), e(null);
      else {
        const u = Ae(l, r) ? l : r, f = Ae(l, r) ? r : l;
        e([u, f]), s(null), a(null);
      }
    },
    [r, e]
  ), o = k(
    (l) => {
      r !== null && a(l);
    },
    [r]
  ), c = (() => {
    if (r) {
      if (t) {
        const l = Ae(t, r) ? t : r, u = Ae(t, r) ? r : t;
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
const cn = 8, ln = 4;
function Ki(n) {
  const { triggerRect: e, popoverRect: t, viewportWidth: a, viewportHeight: r, scrollX: s, scrollY: i } = n, o = r - e.bottom, c = e.top, l = o >= t.height || o >= c ? "bottom" : "top";
  let u = e.left + s;
  return u + t.width > a && (u = a - t.width - cn), u = Math.max(cn, u), { top: l === "bottom" ? e.bottom + i + ln : e.top + i - t.height - ln, left: u, placement: l };
}
function qi() {
  const [n, e] = V(!1), [t, a] = V({
    top: 0,
    left: 0,
    placement: "bottom"
  }), r = St(null), s = St(null), i = k(() => e(!0), []), o = k(() => e(!1), []), c = k(() => e((u) => !u), []), l = k(() => {
    !r.current || !s.current || a(
      Ki({
        triggerRect: r.current.getBoundingClientRect(),
        popoverRect: s.current.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      })
    );
  }, []);
  return un(() => {
    if (!n) return;
    const u = requestAnimationFrame(l), f = (y) => {
      s.current && !s.current.contains(y.target) && r.current && !r.current.contains(y.target) && o();
    }, M = (y) => {
      y.key === "Escape" && o();
    };
    return document.addEventListener("mousedown", f), document.addEventListener("keydown", M), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      cancelAnimationFrame(u), document.removeEventListener("mousedown", f), document.removeEventListener("keydown", M), window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [n, o, l]), { isOpen: n, open: i, close: o, toggle: c, position: t, triggerRef: r, popoverRef: s };
}
function Qi(n) {
  const e = {};
  return n.fontFamily && (e["--dp-font-family"] = n.fontFamily), n.fontSize && (e["--dp-font-size"] = n.fontSize), n.primaryColor && (e["--dp-primary"] = n.primaryColor), n.primaryTextColor && (e["--dp-primary-text"] = n.primaryTextColor), n.rangeColor && (e["--dp-range"] = n.rangeColor), n.weekendHeaderTextColor && (e["--dp-weekend-header-text"] = n.weekendHeaderTextColor), n.weekendTextColor && (e["--dp-weekend-text"] = n.weekendTextColor), n.textColor && (e["--dp-text"] = n.textColor), n.mutedTextColor && (e["--dp-muted"] = n.mutedTextColor), n.backgroundColor && (e["--dp-bg"] = n.backgroundColor), n.surfaceColor && (e["--dp-surface"] = n.surfaceColor), n.borderColor && (e["--dp-border"] = n.borderColor), n.borderRadius && (e["--dp-radius"] = n.borderRadius), n.daySize != null && (e["--dp-day-size"] = `${n.daySize}px`), n.shadow && (e["--dp-shadow"] = n.shadow), e;
}
const Xi = {
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
function ro({
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
  holidayTypes: f = ["public"],
  showNaturalLanguageInput: M = !1,
  showPresets: y = !1,
  showHolidays: g = !0,
  showWeekNumbers: b = !1,
  minDate: C,
  maxDate: K,
  from: x,
  until: te,
  disabledDates: h,
  weekStartsOn: w = 0,
  highlightWeekends: A = !0,
  showTodayButton: W = !1,
  todayButtonLabel: L = "Today",
  mode: F = "inline",
  triggerFormat: Xe,
  className: Je
}) {
  const { minDate: H, maxDate: v } = fr({
    minDate: C,
    maxDate: K,
    from: x,
    until: te
  }), Ze = dn(() => Qi({ ...Xi, ...s }), [s]), j = qi(), [ve, Ce] = V(() => {
    const d = S(/* @__PURE__ */ new Date());
    let m = new Date(d.getFullYear(), d.getMonth(), 1);
    if (Array.isArray(t) && t[0]) {
      const _ = S(t[0]);
      m = new Date(_.getFullYear(), _.getMonth(), 1);
    } else if (t instanceof Date) {
      const _ = S(t);
      m = new Date(_.getFullYear(), _.getMonth(), 1);
    }
    return he(m, H, v);
  }), [Y, z] = V(() => {
    let d = new Date(ve.getFullYear(), ve.getMonth() + 1, 1);
    if (Array.isArray(t) && t[1]) {
      const m = t[0] ? S(t[0]) : null, _ = S(t[1]);
      m && !vt(m, _) && (d = new Date(_.getFullYear(), _.getMonth(), 1));
    }
    return he(d, H, v);
  }), J = `${(H == null ? void 0 : H.getTime()) ?? ""}|${(v == null ? void 0 : v.getTime()) ?? ""}`, [Me, et] = V(J);
  Me !== J && (et(J), Ce((d) => {
    const m = he(d, H, v);
    return m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth() ? d : m;
  }), z((d) => {
    const m = he(d, H, v);
    return m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth() ? d : m;
  }));
  const [tt, nt] = V(""), at = e === "single" && t instanceof Date ? t : null, Ee = e === "range" && Array.isArray(t) ? t : null, { pendingStart: Ye, previewRange: rt, handleDayClick: We, handleDayHover: vn } = Vi({
    value: Ee,
    onChange: (d) => a == null ? void 0 : a(d)
  }), $ = k(
    (d) => xe(d, H, v, h),
    [H, v, h]
  ), ie = k(
    (d) => {
      Ce(he(d, H, v));
    },
    [H, v]
  ), oe = k(
    (d) => {
      z(he(d, H, v));
    },
    [H, v]
  ), Z = k(
    (d, m) => {
      const _ = S(d);
      if (ie(_), n === 2) {
        const st = S(m ?? d), jn = vt(_, st) ? new Date(_.getFullYear(), _.getMonth() + 1, 1) : new Date(st.getFullYear(), st.getMonth(), 1);
        oe(jn);
      }
    },
    [n, ie, oe]
  ), Cn = k(
    (d) => {
      const m = S(d);
      $(m) || (a == null || a(m), ie(m), n === 2 && oe(new Date(m.getFullYear(), m.getMonth() + 1, 1)), F === "popover" && j.close());
    },
    [n, a, F, j, $, ie, oe]
  ), Yn = k(() => {
    const d = S(/* @__PURE__ */ new Date());
    $(d) || (e === "range" ? (a == null || a([d, d]), Z(d, d)) : (a == null || a(d), ie(d), n === 2 && oe(new Date(d.getFullYear(), d.getMonth() + 1, 1))), F === "popover" && j.close());
  }, [e, a, Z, n, F, j, $, ie, oe]), Wn = k(
    (d) => {
      const m = S(d);
      if ($(m)) return;
      const _ = Ye !== null;
      We(m), F === "popover" && _ && j.close();
    },
    [Ye, We, F, j, $]
  ), _n = k(
    (d) => {
      const m = [S(d[0]), S(d[1])];
      $(m[0]) || $(m[1]) || (a == null || a(m), Z(m[0], m[1]));
    },
    [a, Z, $]
  ), $n = k(
    (d) => {
      if (e === "single" && d.single) {
        const m = S(d.single);
        if ($(m)) return;
        a == null || a(m), Z(m, new Date(m.getFullYear(), m.getMonth() + 1, 1));
      } else if (e === "range" && d.range) {
        const m = [S(d.range[0]), S(d.range[1])];
        if ($(m[0]) || $(m[1])) return;
        a == null || a(m), Z(m[0], m[1]);
      } else if (e === "range" && d.single) {
        const m = S(d.single);
        if ($(m)) return;
        a == null || a([m, m]), Z(m, m);
      } else if (d.single) {
        const m = S(d.single);
        if ($(m)) return;
        a == null || a(m), Z(m, new Date(m.getFullYear(), m.getMonth() + 1, 1));
      }
    },
    [e, a, Z, $]
  ), In = e === "range" ? Wn : Cn, Bn = xe(S(/* @__PURE__ */ new Date()), H, v, h), Un = "dd MMM yyyy", Ln = (() => {
    const d = Xe ?? Un;
    return Array.isArray(t) && t[0] && t[1] ? `${ot(t[0], d)} - ${ot(t[1], d)}` : t instanceof Date ? ot(t, d) : "Select date";
  })(), At = {
    selectionMode: e,
    selectedDate: at,
    rangeValue: Ee,
    previewRange: rt,
    onDayClick: In,
    onDayHover: e === "range" ? vn : () => {
    },
    onAnnounce: nt,
    config: {
      locale: r,
      weekStartsOn: w,
      highlightWeekends: A,
      showWeekNumbers: b,
      showHolidays: g,
      holidayTypes: f,
      customHolidays: u,
      minDate: H,
      maxDate: v,
      disabledDates: h
    }
  }, Ot = /* @__PURE__ */ B(
    "div",
    {
      className: ["dp-calendar-panel", Je].filter(Boolean).join(" "),
      "data-datepicker-root": !0,
      style: Ze,
      children: [
        M && /* @__PURE__ */ T(
          zi,
          {
            selectionMode: e,
            locale: r,
            onCommit: $n
          }
        ),
        y && e === "range" && /* @__PURE__ */ T(
          Ar,
          {
            presets: i,
            value: Ee,
            minDate: H,
            maxDate: v,
            disabledDates: h,
            onSelect: _n,
            display: o,
            dropdownPlaceholder: c,
            dropdownAriaLabel: l
          }
        ),
        /* @__PURE__ */ B("div", { className: `dp-months dp-months--${n}`, children: [
          /* @__PURE__ */ T(
            $t,
            {
              ...At,
              month: ve,
              onMonthChange: ie
            }
          ),
          n === 2 && /* @__PURE__ */ T(
            $t,
            {
              ...At,
              month: Y,
              onMonthChange: oe
            }
          )
        ] }),
        W && /* @__PURE__ */ T("div", { className: "dp-footer-actions", children: /* @__PURE__ */ T(
          "button",
          {
            type: "button",
            className: "dp-footer-btn",
            onClick: Yn,
            disabled: Bn,
            children: L
          }
        ) }),
        /* @__PURE__ */ T(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "dp-sr-only",
            children: tt
          }
        )
      ]
    }
  );
  return F === "popover" ? /* @__PURE__ */ B(Vn, { children: [
    /* @__PURE__ */ T(
      "button",
      {
        ref: j.triggerRef,
        className: "dp-trigger",
        onClick: j.toggle,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": j.isOpen,
        children: Ln
      }
    ),
    /* @__PURE__ */ T(
      Gi,
      {
        isOpen: j.isOpen,
        position: j.position,
        popoverRef: j.popoverRef,
        children: Ot
      }
    )
  ] }) : Ot;
}
function Ji(n, e = "en", t = ["public"]) {
  return (wn()[String(n)] ?? []).filter((s) => t.includes(s.type)).map((s) => ({
    date: s.date,
    name: e === "th" ? s.nameTH : s.name,
    nameTH: s.nameTH,
    type: s.type
  }));
}
function so(n, e = "en", t = ["public"]) {
  const a = /* @__PURE__ */ new Map();
  for (const r of Ji(n, e, t)) {
    const s = a.get(r.date) ?? [];
    s.push(r), a.set(r.date, s);
  }
  return a;
}
const io = {
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
  ro as DatePicker,
  Nr as builtInPresets,
  io as darkTheme,
  so as getHolidayMapForYear,
  Ji as getHolidaysForYear,
  Xi as lightTheme
};
