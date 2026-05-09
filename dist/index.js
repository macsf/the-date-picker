var Mn = Object.defineProperty;
var En = (n, e, t) => e in n ? Mn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var h = (n, e, t) => En(n, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as $, jsx as D, Fragment as Pn } from "react/jsx-runtime";
import { useState as U, useEffect as Qt, useMemo as Xt, useCallback as F, useRef as Tt } from "react";
import { createPortal as Nn } from "react-dom";
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
const Jt = 6048e5, On = 864e5;
let Sn = {};
function De() {
  return Sn;
}
function X(n, e) {
  var o, c, l, u;
  const t = De(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? 7 : 0) + s - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function Se(n) {
  return X(n, { weekStartsOn: 1 });
}
function Zt(n) {
  const e = w(n), t = e.getFullYear(), a = G(n, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = Se(a), s = G(n, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Se(s);
  return e.getTime() >= r.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function z(n) {
  const e = w(n);
  return e.setHours(0, 0, 0, 0), e;
}
function wt(n) {
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
function An(n, e) {
  const t = z(n), a = z(e), r = +t - wt(t), s = +a - wt(a);
  return Math.round((r - s) / On);
}
function xn(n) {
  const e = Zt(n), t = G(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Se(t);
}
function Te(n, e) {
  const t = e * 7;
  return le(n, t);
}
function j(n, e) {
  const t = z(n), a = z(e);
  return +t == +a;
}
function kn(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Hn(n) {
  if (!kn(n) && typeof n != "number")
    return !1;
  const e = w(n);
  return !isNaN(Number(e));
}
function we(n) {
  const e = w(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Rn(n, e) {
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
function be(n) {
  const e = w(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Fn(n) {
  const e = w(n), t = G(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function ut(n, e) {
  var o, c, l, u;
  const t = De(), a = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, r = w(n), s = r.getDay(), i = (s < a ? -7 : 0) + 6 - (s - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
const Cn = {
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
}, vn = (n, e, t) => {
  let a;
  const r = Cn[n];
  return typeof r == "string" ? a = r : e === 1 ? a = r.one : a = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + a : a + " ago" : a;
};
function Ke(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const Yn = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Wn = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, _n = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, $n = {
  date: Ke({
    formats: Yn,
    defaultWidth: "full"
  }),
  time: Ke({
    formats: Wn,
    defaultWidth: "full"
  }),
  dateTime: Ke({
    formats: _n,
    defaultWidth: "full"
  })
}, In = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Bn = (n, e, t, a) => In[n];
function ge(n) {
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
const Un = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ln = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, jn = {
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
}, zn = {
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
}, Gn = {
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
}, Vn = {
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
}, Kn = (n, e) => {
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
}, qn = {
  ordinalNumber: Kn,
  era: ge({
    values: Un,
    defaultWidth: "wide"
  }),
  quarter: ge({
    values: Ln,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: ge({
    values: jn,
    defaultWidth: "wide"
  }),
  day: ge({
    values: zn,
    defaultWidth: "wide"
  }),
  dayPeriod: ge({
    values: Gn,
    defaultWidth: "wide",
    formattingValues: Vn,
    defaultFormattingWidth: "wide"
  })
};
function ye(n) {
  return (e, t = {}) => {
    const a = t.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], s = e.match(r);
    if (!s)
      return null;
    const i = s[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? Xn(o, (f) => f.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Qn(o, (f) => f.test(i))
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
function Qn(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function Xn(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function Jn(n) {
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
const Zn = /^(\d+)(th|st|nd|rd)?/i, ea = /\d+/i, ta = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, na = {
  any: [/^b/i, /^(a|c)/i]
}, aa = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ra = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, sa = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ia = {
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
}, oa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ca = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, la = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ua = {
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
}, da = {
  ordinalNumber: Jn({
    matchPattern: Zn,
    parsePattern: ea,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: ye({
    matchPatterns: ta,
    defaultMatchWidth: "wide",
    parsePatterns: na,
    defaultParseWidth: "any"
  }),
  quarter: ye({
    matchPatterns: aa,
    defaultMatchWidth: "wide",
    parsePatterns: ra,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: ye({
    matchPatterns: sa,
    defaultMatchWidth: "wide",
    parsePatterns: ia,
    defaultParseWidth: "any"
  }),
  day: ye({
    matchPatterns: oa,
    defaultMatchWidth: "wide",
    parsePatterns: ca,
    defaultParseWidth: "any"
  }),
  dayPeriod: ye({
    matchPatterns: la,
    defaultMatchWidth: "any",
    parsePatterns: ua,
    defaultParseWidth: "any"
  })
}, ma = {
  code: "en-US",
  formatDistance: vn,
  formatLong: $n,
  formatRelative: Bn,
  localize: qn,
  match: da,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function fa(n) {
  const e = w(n);
  return An(e, Fn(e)) + 1;
}
function en(n) {
  const e = w(n), t = +Se(e) - +xn(e);
  return Math.round(t / Jt) + 1;
}
function tn(n, e) {
  var u, f, E, P;
  const t = w(n), a = t.getFullYear(), r = De(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((f = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((P = (E = r.locale) == null ? void 0 : E.options) == null ? void 0 : P.firstWeekContainsDate) ?? 1, i = G(n, 0);
  i.setFullYear(a + 1, 0, s), i.setHours(0, 0, 0, 0);
  const o = X(i, e), c = G(n, 0);
  c.setFullYear(a, 0, s), c.setHours(0, 0, 0, 0);
  const l = X(c, e);
  return t.getTime() >= o.getTime() ? a + 1 : t.getTime() >= l.getTime() ? a : a - 1;
}
function ha(n, e) {
  var o, c, l, u;
  const t = De(), a = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, r = tn(n, e), s = G(n, 0);
  return s.setFullYear(r, 0, a), s.setHours(0, 0, 0, 0), X(s, e);
}
function nn(n, e) {
  const t = w(n), a = +X(t, e) - +ha(t, e);
  return Math.round(a / Jt) + 1;
}
function M(n, e) {
  const t = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(e, "0");
  return t + a;
}
const q = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), a = t > 0 ? t : 1 - t;
    return M(e === "yy" ? a % 100 : a, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : M(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return M(n.getDate(), e.length);
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
    return M(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return M(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return M(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return M(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, a = n.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, t - 3)
    );
    return M(r, e.length);
  }
}, re = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, bt = {
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
    return q.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, a) {
    const r = tn(n, a), s = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const i = s % 100;
      return M(i, 2);
    }
    return e === "Yo" ? t.ordinalNumber(s, { unit: "year" }) : M(s, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = Zt(n);
    return M(t, e.length);
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
    return M(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(a);
      case "QQ":
        return M(a, 2);
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
        return M(a, 2);
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
        return q.M(n, e);
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
        return M(a + 1, 2);
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
    const r = nn(n, a);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : M(r, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const a = en(n);
    return e === "Io" ? t.ordinalNumber(a, { unit: "week" }) : M(a, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : q.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const a = fa(n);
    return e === "Do" ? t.ordinalNumber(a, { unit: "dayOfYear" }) : M(a, e.length);
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
        return M(s, 2);
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
        return M(s, e.length);
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
        return M(r, e.length);
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
    return q.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : q.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const a = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(a, { unit: "hour" }) : M(a, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let a = n.getHours();
    return a === 0 && (a = 24), e === "ko" ? t.ordinalNumber(a, { unit: "hour" }) : M(a, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : q.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : q.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return q.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (e) {
      case "X":
        return Mt(a);
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
        return Mt(a);
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
        return "GMT" + Dt(a, ":");
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
        return "GMT" + Dt(a, ":");
      case "zzzz":
      default:
        return "GMT" + ee(a, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const a = Math.trunc(n.getTime() / 1e3);
    return M(a, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    const a = n.getTime();
    return M(a, e.length);
  }
};
function Dt(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), s = a % 60;
  return s === 0 ? t + String(r) : t + String(r) + e + M(s, 2);
}
function Mt(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + M(Math.abs(n) / 60, 2) : ee(n, e);
}
function ee(n, e = "") {
  const t = n > 0 ? "-" : "+", a = Math.abs(n), r = M(Math.trunc(a / 60), 2), s = M(a % 60, 2);
  return t + r + e + s;
}
const Et = (n, e) => {
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
}, an = (n, e) => {
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
}, ga = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], a = t[1], r = t[2];
  if (!r)
    return Et(n, e);
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
  return s.replace("{{date}}", Et(a, e)).replace("{{time}}", an(r, e));
}, ya = {
  p: an,
  P: ga
}, pa = /^D+$/, Ta = /^Y+$/, wa = ["D", "DD", "YY", "YYYY"];
function ba(n) {
  return pa.test(n);
}
function Da(n) {
  return Ta.test(n);
}
function Ma(n, e, t) {
  const a = Ea(n, e, t);
  if (console.warn(a), wa.includes(n)) throw new RangeError(a);
}
function Ea(n, e, t) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${a} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Pa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Na = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Oa = /^'([^]*?)'?$/, Sa = /''/g, Aa = /[a-zA-Z]/;
function qe(n, e, t) {
  var u, f, E, P;
  const a = De(), r = a.locale ?? ma, s = a.firstWeekContainsDate ?? ((f = (u = a.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, i = a.weekStartsOn ?? ((P = (E = a.locale) == null ? void 0 : E.options) == null ? void 0 : P.weekStartsOn) ?? 0, o = w(n);
  if (!Hn(o))
    throw new RangeError("Invalid time value");
  let c = e.match(Na).map((O) => {
    const m = O[0];
    if (m === "p" || m === "P") {
      const x = ya[m];
      return x(O, r.formatLong);
    }
    return O;
  }).join("").match(Pa).map((O) => {
    if (O === "''")
      return { isToken: !1, value: "'" };
    const m = O[0];
    if (m === "'")
      return { isToken: !1, value: xa(O) };
    if (bt[m])
      return { isToken: !0, value: O };
    if (m.match(Aa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + m + "`"
      );
    return { isToken: !1, value: O };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: r
  };
  return c.map((O) => {
    if (!O.isToken) return O.value;
    const m = O.value;
    (Da(m) || ba(m)) && Ma(m, e, String(n));
    const x = bt[m[0]];
    return x(o, m, r.localize, l);
  }).join("");
}
function xa(n) {
  const e = n.match(Oa);
  return e ? e[1].replace(Sa, "'") : n;
}
function rt(n) {
  return w(n).getDay();
}
function ka(n) {
  return w(n).getMonth();
}
function Ha(n) {
  return w(n).getFullYear();
}
function Ra(n, e) {
  const t = w(n), a = w(e);
  return t.getTime() > a.getTime();
}
function pe(n, e) {
  const t = w(n), a = w(e);
  return +t < +a;
}
function Fa(n, e, t) {
  const a = t == null ? void 0 : t.weekStartsOn, r = w(n), s = r.getDay(), o = (e % 7 + 7) % 7, c = 7 - a, l = e < 0 || e > 6 ? e - (s + c) % 7 : (o + c) % 7 - (s + c) % 7;
  return le(r, l);
}
function Pt(n, e) {
  const t = w(n), a = w(e);
  return t.getFullYear() === a.getFullYear() && t.getMonth() === a.getMonth();
}
function Ca(n, e) {
  const t = +w(n), [a, r] = [
    +w(e.start),
    +w(e.end)
  ].sort((s, i) => s - i);
  return t >= a && t <= r;
}
function st(n, e) {
  return le(n, -e);
}
function dt(n, e) {
  return te(n, -e);
}
function rn(n, e) {
  return Te(n, -e);
}
function va(n, e = 0) {
  const t = be(n), a = we(n), r = X(t, { weekStartsOn: e }), s = ut(a, { weekStartsOn: e }), i = Rn({ start: r, end: s }), o = [];
  let c = [];
  return i.forEach((l, u) => {
    c.push({
      date: l,
      isCurrentMonth: l >= t && l <= a
    }), (u + 1) % 7 === 0 && (o.push(c), c = []);
  }), { weeks: o, month: n };
}
function Ya(n, e = 0) {
  return e === 1 ? en(n) : nn(n, { weekStartsOn: 0 });
}
function Wa(n, e, t, a) {
  const r = z(n);
  return !!(e && pe(r, z(e)) || t && Ra(r, z(t)) || a != null && a.some((s) => j(s, r)));
}
function _a(n, e) {
  const { today: t, selectionMode: a, selectedDate: r, activeRange: s } = e, i = a === "single" && r != null && j(n, r), o = a === "range" && s != null && j(n, s[0]), c = a === "range" && s != null && j(n, s[1]), l = a === "range" && s != null && !j(s[0], s[1]) && Ca(z(n), {
    start: z(s[0]),
    end: z(s[1])
  }) && !j(n, s[0]) && !j(n, s[1]), u = j(n, t);
  return { isSelected: i, isRangeStart: o, isRangeEnd: c, isInRange: l, isToday: u };
}
function $a({
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
  onMouseEnter: E,
  onMouseLeave: P
}) {
  const [O, m] = U(!1), x = n.getDate(), k = ["dp-day"];
  e || k.push("dp-day--other-month"), c && k.push("dp-day--disabled"), l && k.push("dp-day--today"), (t || a || r) && k.push("dp-day--selected"), s && k.push("dp-day--in-range"), a && k.push("dp-day--range-start"), r && k.push("dp-day--range-end"), s && i && k.push("dp-day--row-start"), s && o && k.push("dp-day--row-end");
  const W = n.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ $("div", { className: "dp-day-wrapper", children: [
    (s || a || r) && /* @__PURE__ */ D(
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
        onClick: () => !c && f(n),
        onMouseEnter: () => !c && E(n),
        onMouseLeave: P,
        disabled: c,
        "aria-label": W,
        "aria-pressed": t || a || r,
        tabIndex: e && !c ? 0 : -1,
        type: "button",
        children: [
          /* @__PURE__ */ D("span", { className: "dp-day-number", children: x }),
          u.length > 0 && /* @__PURE__ */ $(
            "span",
            {
              className: "dp-holiday-dots",
              onMouseEnter: () => m(!0),
              onMouseLeave: () => m(!1),
              children: [
                u.slice(0, 2).map((L, d) => /* @__PURE__ */ D(
                  "span",
                  {
                    className: "dp-holiday-dot",
                    style: { backgroundColor: L.dotColor },
                    "aria-hidden": "true"
                  },
                  d
                )),
                O && /* @__PURE__ */ D("span", { className: "dp-holiday-tooltip", role: "tooltip", children: u.map((L) => L.name).join(", ") })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Ia = [
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
], Ba = [
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
function Ua({
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
  const l = ka(n), u = Ha(n), f = s === "th" ? Ba : Ia, E = [];
  for (let m = u - 10; m <= u + 10; m++)
    E.push(m);
  const P = o ? te(n, -1) < new Date(o.getFullYear(), o.getMonth(), 1) : !1, O = c ? te(n, 1) > new Date(c.getFullYear(), c.getMonth(), 1) : !1;
  return /* @__PURE__ */ $("div", { className: "dp-month-nav", children: [
    /* @__PURE__ */ D(
      "button",
      {
        className: "dp-nav-btn",
        onClick: e,
        disabled: P,
        "aria-label": "Previous month",
        children: "‹"
      }
    ),
    /* @__PURE__ */ $("div", { className: "dp-month-year-labels", children: [
      /* @__PURE__ */ D(
        "select",
        {
          className: "dp-month-select",
          value: l,
          onChange: (m) => a(Number(m.target.value)),
          "aria-label": "Select month",
          children: f.map((m, x) => /* @__PURE__ */ D("option", { value: x, children: m }, x))
        }
      ),
      /* @__PURE__ */ D(
        "select",
        {
          className: "dp-year-select",
          value: u,
          onChange: (m) => r(Number(m.target.value)),
          "aria-label": "Select year",
          children: E.map((m) => /* @__PURE__ */ D("option", { value: m, children: i === "buddhist" ? m + 543 : m }, m))
        }
      )
    ] }),
    /* @__PURE__ */ D(
      "button",
      {
        className: "dp-nav-btn",
        onClick: t,
        disabled: O,
        "aria-label": "Next month",
        children: "›"
      }
    )
  ] });
}
function La({ weekNumbers: n }) {
  return /* @__PURE__ */ $("div", { className: "dp-week-numbers", "aria-hidden": "true", children: [
    /* @__PURE__ */ D("div", { className: "dp-week-number-header", children: "W" }),
    n.map((e, t) => /* @__PURE__ */ D("div", { className: "dp-week-number", children: e }, t))
  ] });
}
const ja = {
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
function sn() {
  return JSON.parse(JSON.stringify(ja));
}
const Qe = /* @__PURE__ */ new Map();
function za(n) {
  const e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), a = String(n.getDate()).padStart(2, "0");
  return `${e}-${t}-${a}`;
}
function Ga(n, e, t) {
  return `${n}-${e}-${t.sort().join(",")}`;
}
const Nt = "#EF4444";
function Va(n, e, t = ["public"], a = !0, r = []) {
  const [s, i] = U([]);
  Qt(() => {
    if (!a) return;
    const c = Ga(n, e, t);
    if (Qe.has(c)) {
      i(Qe.get(c));
      return;
    }
    const E = (sn()[String(n)] ?? []).filter((P) => t.includes(P.type)).map((P) => ({
      ...P,
      name: e === "th" && P.nameTH ? P.nameTH : P.name
    }));
    Qe.set(c, E), i(E);
  }, [n, e, JSON.stringify(t), a]);
  const o = Xt(() => {
    const c = /* @__PURE__ */ new Map();
    return s.forEach((l) => {
      const u = l.date.slice(0, 10), f = c.get(u) ?? [];
      f.push({ name: l.name, dotColor: Nt }), c.set(u, f);
    }), r.forEach((l) => {
      const u = e === "th" ? l.nameTH : l.nameEN;
      c.set(l.date, [{ name: u, dotColor: l.dotColor ?? Nt }]);
    }), c;
  }, [s, r, e]);
  return {
    getHolidaysForDate(c) {
      return o.get(za(c)) ?? [];
    }
  };
}
const Ka = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], qa = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
function Ot({
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
    weekStartsOn: E,
    showWeekNumbers: P,
    showHolidays: O,
    holidayTypes: m,
    customHolidays: x,
    minDate: k,
    maxDate: W,
    disabledDates: L
  } = l, { weeks: d } = va(n, E), p = n.getFullYear(), y = Va(p, u, m, O, x), A = u === "th" ? qa : Ka, C = E === 1 ? [...A.slice(1), A[0]] : A, I = d.map((H) => Ya(H[0].date, E)), me = F(() => {
    const H = new Date(n.getFullYear(), n.getMonth() - 1, 1);
    e(H);
    const K = H.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(K);
  }, [n, e, u, c]), Ye = F(() => {
    const H = new Date(n.getFullYear(), n.getMonth() + 1, 1);
    e(H);
    const K = H.toLocaleString(u === "th" ? "th-TH" : "en-US", {
      month: "long",
      year: "numeric"
    });
    c(K);
  }, [n, e, u, c]), We = F(
    (H) => {
      e(new Date(n.getFullYear(), H, 1));
    },
    [n, e]
  ), _e = F(
    (H) => {
      e(new Date(H, n.getMonth(), 1));
    },
    [n, e]
  ), Ie = {
    today: /* @__PURE__ */ new Date(),
    selectionMode: t,
    selectedDate: a,
    activeRange: s ?? r
  };
  return /* @__PURE__ */ $("div", { className: "dp-calendar", children: [
    /* @__PURE__ */ D(
      Ua,
      {
        month: n,
        onPrev: me,
        onNext: Ye,
        onMonthSelect: We,
        onYearSelect: _e,
        locale: u,
        calendarSystem: f,
        minDate: k,
        maxDate: W
      }
    ),
    /* @__PURE__ */ $("div", { className: "dp-grid-container", children: [
      P && /* @__PURE__ */ D(La, { weekNumbers: I }),
      /* @__PURE__ */ $("div", { className: "dp-grid", children: [
        /* @__PURE__ */ D("div", { className: "dp-weekday-row", children: C.map((H, K) => /* @__PURE__ */ D("div", { className: "dp-weekday-label", "aria-hidden": "true", children: H }, K)) }),
        d.map((H, K) => /* @__PURE__ */ D("div", { className: "dp-week-row", children: H.map((_, fe) => {
          const Be = y.getHolidaysForDate(_.date), Ue = Wa(_.date, k, W, L), { isSelected: Le, isRangeStart: je, isRangeEnd: ze, isInRange: Ge, isToday: gt } = _a(_.date, Ie);
          return /* @__PURE__ */ D(
            $a,
            {
              date: _.date,
              isCurrentMonth: _.isCurrentMonth,
              isSelected: Le,
              isRangeStart: je,
              isRangeEnd: ze,
              isInRange: Ge,
              isRowStart: fe === 0,
              isRowEnd: fe === 6,
              isDisabled: Ue,
              isToday: gt,
              holidays: Be,
              onClick: i,
              onMouseEnter: o,
              onMouseLeave: () => o(null)
            },
            fe
          );
        }) }, K))
      ] })
    ] })
  ] });
}
const Qa = [
  {
    label: "This week",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [X(n, { weekStartsOn: 1 }), ut(n, { weekStartsOn: 1 })];
    }
  },
  {
    label: "Last 7 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [st(n, 6), n];
    }
  },
  {
    label: "Last 30 days",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [st(n, 29), n];
    }
  },
  {
    label: "This month",
    resolve: () => {
      const n = /* @__PURE__ */ new Date();
      return [be(n), we(n)];
    }
  },
  {
    label: "Last month",
    resolve: () => {
      const n = dt(/* @__PURE__ */ new Date(), 1);
      return [be(n), we(n)];
    }
  }
];
function Xa({ presets: n, value: e, onSelect: t }) {
  const a = n ?? Qa, r = (s) => {
    if (!e) return !1;
    const [i, o] = s.resolve();
    return j(i, e[0]) && j(o, e[1]);
  };
  return /* @__PURE__ */ D("div", { className: "dp-preset-chips", role: "group", "aria-label": "Quick select presets", children: a.map((s, i) => /* @__PURE__ */ D(
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
var b;
(function(n) {
  n[n.AM = 0] = "AM", n[n.PM = 1] = "PM";
})(b || (b = {}));
var S;
(function(n) {
  n[n.SUNDAY = 0] = "SUNDAY", n[n.MONDAY = 1] = "MONDAY", n[n.TUESDAY = 2] = "TUESDAY", n[n.WEDNESDAY = 3] = "WEDNESDAY", n[n.THURSDAY = 4] = "THURSDAY", n[n.FRIDAY = 5] = "FRIDAY", n[n.SATURDAY = 6] = "SATURDAY";
})(S || (S = {}));
var B;
(function(n) {
  n[n.JANUARY = 1] = "JANUARY", n[n.FEBRUARY = 2] = "FEBRUARY", n[n.MARCH = 3] = "MARCH", n[n.APRIL = 4] = "APRIL", n[n.MAY = 5] = "MAY", n[n.JUNE = 6] = "JUNE", n[n.JULY = 7] = "JULY", n[n.AUGUST = 8] = "AUGUST", n[n.SEPTEMBER = 9] = "SEPTEMBER", n[n.OCTOBER = 10] = "OCTOBER", n[n.NOVEMBER = 11] = "NOVEMBER", n[n.DECEMBER = 12] = "DECEMBER";
})(B || (B = {}));
function ae(n, e) {
  n.assign("day", e.getDate()), n.assign("month", e.getMonth() + 1), n.assign("year", e.getFullYear());
}
function on(n, e) {
  n.assign("hour", e.getHours()), n.assign("minute", e.getMinutes()), n.assign("second", e.getSeconds()), n.assign("millisecond", e.getMilliseconds()), n.assign("meridiem", e.getHours() < 12 ? b.AM : b.PM);
}
function ie(n, e) {
  n.imply("day", e.getDate()), n.imply("month", e.getMonth() + 1), n.imply("year", e.getFullYear());
}
function mt(n, e) {
  n.imply("hour", e.getHours()), n.imply("minute", e.getMinutes()), n.imply("second", e.getSeconds()), n.imply("millisecond", e.getMilliseconds()), n.imply("meridiem", e.getHours() < 12 ? b.AM : b.PM);
}
const Ja = {
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
    dstStart: (n) => St(n, B.MARCH, S.SUNDAY, 2),
    dstEnd: (n) => St(n, B.OCTOBER, S.SUNDAY, 3)
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
    dstStart: (n) => Q(n, B.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => Q(n, B.NOVEMBER, S.SUNDAY, 1, 2)
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
    dstStart: (n) => Q(n, B.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => Q(n, B.NOVEMBER, S.SUNDAY, 1, 2)
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
    dstStart: (n) => Q(n, B.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => Q(n, B.NOVEMBER, S.SUNDAY, 1, 2)
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
    dstStart: (n) => Q(n, B.MARCH, S.SUNDAY, 2, 2),
    dstEnd: (n) => Q(n, B.NOVEMBER, S.SUNDAY, 1, 2)
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
function Q(n, e, t, a, r = 0) {
  let s = 0, i = 0;
  for (; i < a; )
    s++, new Date(n, e - 1, s).getDay() === t && i++;
  return new Date(n, e - 1, s, r);
}
function St(n, e, t, a = 0) {
  const r = t === 0 ? 7 : t, s = new Date(n, e - 1 + 1, 1, 12), i = s.getDay() === 0 ? 7 : s.getDay();
  let o;
  return i === r ? o = 7 : i < r ? o = 7 + i - r : o = i - r, s.setDate(s.getDate() - o), new Date(n, e - 1, s.getDate(), a);
}
function cn(n, e, t = {}) {
  if (n == null)
    return null;
  if (typeof n == "number")
    return n;
  const a = t[n] ?? Ja[n];
  return a == null ? null : typeof a == "number" ? a : e == null ? null : e > a.dstStart(e.getFullYear()) && !(e > a.dstEnd(e.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
}
const Za = {
  day: 0,
  second: 0,
  millisecond: 0
};
function v(n, e) {
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
function ke(n) {
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
    const a = (e == null ? void 0 : e.instant) ?? /* @__PURE__ */ new Date(), r = cn(e == null ? void 0 : e.timezone, a, t);
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
class N {
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
  static createRelativeFromReference(e, t = Za) {
    let a = v(e.getDateWithAdjustedTimezone(), t);
    const r = new N(e);
    return r.addTag("result/relativeDate"), "hour" in t || "minute" in t || "second" in t || "millisecond" in t ? (r.addTag("result/relativeDateAndTime"), on(r, a), ae(r, a), r.assign("timezoneOffset", e.getTimezoneOffset())) : (mt(r, a), r.imply("timezoneOffset", e.getTimezoneOffset()), "day" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.assign("weekday", a.getDay())) : "week" in t ? (r.assign("day", a.getDate()), r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear()), r.imply("weekday", a.getDay())) : (r.imply("day", a.getDate()), "month" in t ? (r.assign("month", a.getMonth() + 1), r.assign("year", a.getFullYear())) : (r.imply("month", a.getMonth() + 1), "year" in t ? r.assign("year", a.getFullYear()) : r.imply("year", a.getFullYear())))), r;
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
    const t = this.dateWithoutTimezoneAdjustment(), a = v(t, e);
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
class ue {
  constructor(e, t, a, r, s) {
    h(this, "refDate");
    h(this, "index");
    h(this, "text");
    h(this, "reference");
    h(this, "start");
    h(this, "end");
    this.reference = e, this.refDate = e.instant, this.index = t, this.text = a, this.start = r || new N(e), this.end = s;
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
function ln(n, e, t = "\\s{0,5},?\\s{0,5}") {
  const a = e.replace(/\((?!\?)/g, "(?:");
  return `${n}${a}(?:${t}${a}){0,10}`;
}
function er(n) {
  let e;
  return n instanceof Array ? e = [...n] : n instanceof Map ? e = Array.from(n.keys()) : e = Object.keys(n), e;
}
function V(n) {
  return `(?:${er(n).sort((t, a) => a.length - t.length).join("|").replace(/\./g, "\\.")})`;
}
function un(n) {
  return n < 100 && (n > 50 ? n = n + 1900 : n = n + 2e3), n;
}
function He(n, e, t) {
  let a = new Date(n);
  a.setMonth(t - 1), a.setDate(e);
  const r = v(a, { year: 1 }), s = v(a, { year: -1 });
  return Math.abs(r.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) ? a = r : Math.abs(s.getTime() - n.getTime()) < Math.abs(a.getTime() - n.getTime()) && (a = s), a.getFullYear();
}
const it = {
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
}, dn = {
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
}, J = {
  ...dn,
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
}, ot = {
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
}, ct = {
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
}, mn = {
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
}, Re = {
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
  ...mn
}, fn = `(?:${V(ot)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
function tr(n) {
  const e = n.toLowerCase();
  return ot[e] !== void 0 ? ot[e] : e === "a" || e === "an" || e == "the" ? 1 : e.match(/few/) ? 3 : e.match(/half/) ? 0.5 : e.match(/couple/) ? 2 : e.match(/several/) ? 7 : parseFloat(e);
}
const Ae = `(?:${V(ct)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
function xe(n) {
  let e = n.toLowerCase();
  return ct[e] !== void 0 ? ct[e] : (e = e.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(e));
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
  return un(e);
}
const hn = `(${fn})\\s{0,3}(${V(Re)})`, At = new RegExp(hn, "i"), nr = `(${fn})\\s{0,3}(${V(mn)})`, gn = "\\s{0,5},?(?:\\s*and)?\\s{0,5}", Me = ln("(?:(?:about|around)\\s{0,3})?", hn, gn), ve = ln("(?:(?:about|around)\\s{0,3})?", nr, gn);
function de(n) {
  const e = {};
  let t = n, a = At.exec(t);
  for (; a; )
    ar(e, a), t = t.substring(a[0].length).trim(), a = At.exec(t);
  return Object.keys(e).length == 0 ? null : e;
}
function ar(n, e) {
  if (e[0].match(/^[a-zA-Z]+$/))
    return;
  const t = tr(e[1]), a = Re[e[2].toLowerCase()];
  n[a] = t;
}
class Y {
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
const rr = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Me})(?=\\W|$)`, "i"), sr = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Me})(?=\\W|$)`, "i"), ir = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${ve})(?=\\W|$)`, "i");
class or extends Y {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern(t) {
    return this.strictMode ? ir : t.option.forwardDate ? rr : sr;
  }
  innerExtract(t, a) {
    if (a[0].match(/^for\s*the\s*\w+/))
      return null;
    const r = de(a[1]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
const cr = new RegExp(`(?:on\\s{0,3})?(${Ae})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${Ae}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${V(J)})(?:(?:-|/|,?\\s{0,3})(${Fe}(?!\\w)))?(?=\\W|$)`, "i"), xt = 1, kt = 2, lr = 3, Ht = 4;
class ur extends Y {
  innerPattern() {
    return cr;
  }
  innerExtract(e, t) {
    const a = e.createParsingResult(t.index, t[0]), r = J[t[lr].toLowerCase()], s = xe(t[xt]);
    if (s > 31)
      return t.index = t.index + t[xt].length, null;
    if (a.start.assign("month", r), a.start.assign("day", s), t[Ht]) {
      const i = Ce(t[Ht]);
      a.start.assign("year", i);
    } else {
      const i = He(e.refDate, s, r);
      a.start.imply("year", i);
    }
    if (t[kt]) {
      const i = xe(t[kt]);
      a.end = a.start.clone(), a.end.assign("day", i);
    }
    return a;
  }
}
const dr = new RegExp(`(${V(J)})(?:-|/|\\s*,?\\s*)(${Ae})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${Ae})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${Fe}))?(?=\\W|$)(?!\\:\\d)`, "i"), mr = 1, Rt = 2, Xe = 3, Je = 4;
class fr extends Y {
  constructor(t) {
    super();
    h(this, "shouldSkipYearLikeDate");
    this.shouldSkipYearLikeDate = t;
  }
  innerPattern() {
    return dr;
  }
  innerExtract(t, a) {
    const r = J[a[mr].toLowerCase()], s = xe(a[Rt]);
    if (s > 31 || this.shouldSkipYearLikeDate && !a[Xe] && !a[Je] && a[Rt].match(/^2[0-5]$/))
      return null;
    const i = t.createParsingComponents({
      day: s,
      month: r
    }).addTag("parser/ENMonthNameMiddleEndianParser");
    if (a[Je]) {
      const l = Ce(a[Je]);
      i.assign("year", l);
    } else {
      const l = He(t.refDate, s, r);
      i.imply("year", l);
    }
    if (!a[Xe])
      return i;
    const o = xe(a[Xe]), c = t.createParsingResult(a.index, a[0]);
    return c.start = i, c.end = i.clone(), c.end.assign("day", o), c;
  }
}
const hr = new RegExp(`((?:in)\\s*)?(${V(J)})\\s*(?:(?:,|-|of)?\\s*(${Fe})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), gr = 1, yr = 2, Ft = 3;
class pr extends Y {
  innerPattern() {
    return hr;
  }
  innerExtract(e, t) {
    const a = t[yr].toLowerCase();
    if (t[0].length <= 3 && !dn[a])
      return null;
    const r = e.createParsingResult(t.index + (t[gr] || "").length, t.index + t[0].length);
    r.start.imply("day", 1), r.start.addTag("parser/ENMonthNameParser");
    const s = J[a];
    if (r.start.assign("month", s), t[Ft]) {
      const i = Ce(t[Ft]);
      r.start.assign("year", i);
    } else {
      const i = He(e.refDate, 1, s);
      r.start.imply("year", i);
    }
    return r;
  }
}
const Tr = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${V(J)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), wr = 1, br = 2, Ct = 3, Dr = 4;
class Mr extends Y {
  constructor(t) {
    super();
    h(this, "strictMonthDateOrder");
    this.strictMonthDateOrder = t;
  }
  innerPattern() {
    return Tr;
  }
  innerExtract(t, a) {
    const r = parseInt(a[wr]);
    let s = parseInt(a[Dr]), i = a[Ct] ? parseInt(a[Ct]) : J[a[br].toLowerCase()];
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
const Er = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), Pr = 1, Nr = 2;
class Or extends Y {
  innerPattern() {
    return Er;
  }
  innerExtract(e, t) {
    const a = parseInt(t[Nr]), r = parseInt(t[Pr]);
    return e.createParsingComponents().imply("day", 1).assign("month", r).assign("year", a);
  }
}
function Sr(n, e, t, a) {
  return new RegExp(`${n}${e}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`, a);
}
function Ar(n, e) {
  return new RegExp(`^(${n})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${e}`, "i");
}
const Ze = 2, Z = 3, Ne = 4, Oe = 5, se = 6;
class xr {
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
    let s = 0, i = null, o = parseInt(t[Ze]);
    if (o > 100) {
      if (t[Ze].length == 4 && t[Z] == null && !t[se] || this.strictMode || t[Z] != null)
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
    if (o > 12 && (i = b.PM), t[se] != null) {
      if (o > 12)
        return null;
      const c = t[se][0].toLowerCase();
      c == "a" && (i = b.AM, o == 12 && (o = 0)), c == "p" && (i = b.PM, o != 12 && (o += 12));
    }
    if (r.assign("hour", o), r.assign("minute", s), i !== null ? r.assign("meridiem", i) : o < 12 ? r.imply("meridiem", b.AM) : r.imply("meridiem", b.PM), t[Oe] != null) {
      const c = parseInt(t[Oe].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Ne] != null) {
      const c = parseInt(t[Ne]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    return r;
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = e.createParsingComponents();
    if (t[Oe] != null) {
      const c = parseInt(t[Oe].substring(0, 3));
      if (c >= 1e3)
        return null;
      r.assign("millisecond", c);
    }
    if (t[Ne] != null) {
      const c = parseInt(t[Ne]);
      if (c >= 60)
        return null;
      r.assign("second", c);
    }
    let s = parseInt(t[Ze]), i = 0, o = -1;
    if (t[Z] != null ? i = parseInt(t[Z]) : s > 100 && (i = s % 100, s = Math.floor(s / 100)), i >= 60 || s > 24)
      return null;
    if (s >= 12 && (o = b.PM), t[se] != null) {
      if (s > 12)
        return null;
      const c = t[se][0].toLowerCase();
      c == "a" && (o = b.AM, s == 12 && (s = 0, r.isCertain("day") || r.imply("day", r.get("day") + 1))), c == "p" && (o = b.PM, s != 12 && (s += 12)), a.start.isCertain("meridiem") || (o == b.AM ? (a.start.imply("meridiem", b.AM), a.start.get("hour") == 12 && a.start.assign("hour", 0)) : (a.start.imply("meridiem", b.PM), a.start.get("hour") != 12 && a.start.assign("hour", a.start.get("hour") + 12)));
    }
    return r.assign("hour", s), r.assign("minute", i), o >= 0 ? r.assign("meridiem", o) : a.start.isCertain("meridiem") && a.start.get("hour") > 12 ? a.start.get("hour") - 12 > s ? r.imply("meridiem", b.AM) : s <= 12 && (r.assign("hour", s + 12), r.assign("meridiem", b.PM)) : s > 12 ? r.imply("meridiem", b.PM) : s <= 12 && r.imply("meridiem", b.AM), r.date().getTime() < a.start.date().getTime() && r.imply("day", r.get("day") + 1), r;
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
    return this.cachedPrimaryPrefix === e && this.cachedPrimarySuffix === t ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = Sr(this.primaryPatternLeftBoundary(), e, t, this.patternFlags()), this.cachedPrimaryPrefix = e, this.cachedPrimarySuffix = t, this.cachedPrimaryTimePattern);
  }
  getFollowingTimePatternThroughCache() {
    const e = this.followingPhase(), t = this.followingSuffix();
    return this.cachedFollowingPhase === e && this.cachedFollowingSuffix === t ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = Ar(e, t), this.cachedFollowingPhase = e, this.cachedFollowingSuffix = t, this.cachedFollowingTimePatten);
  }
}
class kr extends xr {
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
      r >= 6 && r < 12 ? (a.assign("hour", a.get("hour") + 12), a.assign("meridiem", b.PM)) : r < 6 && a.assign("meridiem", b.AM);
    }
    if (t[0].endsWith("afternoon")) {
      a.assign("meridiem", b.PM);
      const r = a.get("hour");
      r >= 0 && r <= 6 && a.assign("hour", a.get("hour") + 12);
    }
    return t[0].endsWith("morning") && (a.assign("meridiem", b.AM), a.get("hour") < 12 && a.assign("hour", a.get("hour"))), a.addTag("parser/ENTimeExpressionParser");
  }
  extractFollowingTimeComponents(e, t, a) {
    const r = super.extractFollowingTimeComponents(e, t, a);
    return r && r.addTag("parser/ENTimeExpressionParser"), r;
  }
}
const Hr = new RegExp(`(${Me})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), Rr = new RegExp(`(${ve})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
class Fr extends Y {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? Rr : Hr;
  }
  innerExtract(t, a) {
    const r = de(a[1]);
    return r ? N.createRelativeFromReference(t.reference, ke(r)) : null;
  }
}
const Cr = new RegExp(`(${Me})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), vr = new RegExp(`(${ve})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), Yr = 1;
class Wr extends Y {
  constructor(t) {
    super();
    h(this, "strictMode");
    this.strictMode = t;
  }
  innerPattern() {
    return this.strictMode ? vr : Cr;
  }
  innerExtract(t, a) {
    const r = de(a[Yr]);
    return r ? N.createRelativeFromReference(t.reference, r) : null;
  }
}
class yn {
  refine(e, t) {
    return t.filter((a) => this.isValid(e, a));
  }
}
class Ee {
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
class _r extends Ee {
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
      a.start.isOnlyWeekdayComponent() && v(i, { day: 7 }) > s ? (i = v(i, { day: 7 }), a.start.imply("day", i.getDate()), a.start.imply("month", i.getMonth() + 1), a.start.imply("year", i.getFullYear())) : t.start.isOnlyWeekdayComponent() && v(s, { day: -7 }) < i ? (s = v(s, { day: -7 }), t.start.imply("day", s.getDate()), t.start.imply("month", s.getMonth() + 1), t.start.imply("year", s.getFullYear())) : a.start.isDateWithUnknownYear() && v(i, { year: 1 }) > s ? (i = v(i, { year: 1 }), a.start.imply("year", i.getFullYear())) : t.start.isDateWithUnknownYear() && v(s, { year: -1 }) < i ? (s = v(s, { year: -1 }), t.start.imply("year", s.getFullYear())) : [a, t] = [t, a];
    }
    const r = t.clone();
    return r.start = t.start, r.end = a.start, r.index = Math.min(t.index, a.index), t.index < a.index ? r.text = t.text + e + a.text : r.text = a.text + e + t.text, r;
  }
}
class $r extends _r {
  patternBetween() {
    return /^\s*(to|-|–|until|through|till)\s*$/i;
  }
}
function vt(n, e) {
  const t = n.clone(), a = n.start, r = e.start;
  if (t.start = Yt(a, r), n.end != null || e.end != null) {
    const s = n.end == null ? n.start : n.end, i = e.end == null ? e.start : e.end, o = Yt(s, i);
    if (n.end == null && o.date().getTime() < t.start.date().getTime()) {
      const c = new Date(o.date().getTime());
      c.setDate(c.getDate() + 1), o.isCertain("day") ? ae(o, c) : ie(o, c);
    }
    t.end = o;
  }
  return t;
}
function Yt(n, e) {
  const t = n.clone();
  e.isCertain("hour") ? (t.assign("hour", e.get("hour")), t.assign("minute", e.get("minute")), e.isCertain("second") ? (t.assign("second", e.get("second")), e.isCertain("millisecond") ? t.assign("millisecond", e.get("millisecond")) : t.imply("millisecond", e.get("millisecond"))) : (t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond")))) : (t.imply("hour", e.get("hour")), t.imply("minute", e.get("minute")), t.imply("second", e.get("second")), t.imply("millisecond", e.get("millisecond"))), e.isCertain("timezoneOffset") && t.assign("timezoneOffset", e.get("timezoneOffset"));
  const a = n.get("meridiem") != null && (n.isCertain("meridiem") || Array.from(n.tags()).some((r) => r.startsWith("casualReference/")));
  return e.isCertain("meridiem") ? t.assign("meridiem", e.get("meridiem")) : e.get("meridiem") != null && !a && t.imply("meridiem", e.get("meridiem")), t.get("meridiem") == b.PM && t.get("hour") < 12 && (e.isCertain("hour") ? t.assign("hour", t.get("hour") + 12) : t.imply("hour", t.get("hour") + 12)), t.addTags(n.tags()), t.addTags(e.tags()), t;
}
class Ir extends Ee {
  shouldMergeResults(e, t, a) {
    return (t.start.isOnlyDate() && a.start.isOnlyTime() || a.start.isOnlyDate() && t.start.isOnlyTime()) && e.match(this.patternBetween()) != null;
  }
  mergeResults(e, t, a) {
    const r = t.start.isOnlyDate() ? vt(t, a) : vt(a, t);
    return r.index = t.index, r.text = t.text + e + a.text, r;
  }
}
class Wt extends Ir {
  patternBetween() {
    return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
  }
}
const Br = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
class Ur {
  constructor(e) {
    h(this, "timezoneOverrides");
    this.timezoneOverrides = e;
  }
  refine(e, t) {
    const a = e.option.timezones ?? {};
    return t.forEach((r) => {
      const s = e.text.substring(r.index + r.text.length), i = Br.exec(s);
      if (!i)
        return;
      const o = i[1].toUpperCase(), c = r.start.date() ?? r.refDate ?? /* @__PURE__ */ new Date(), l = { ...this.timezoneOverrides, ...a }, u = cn(o, c, l);
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
const Lr = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), jr = 1, zr = 2, Gr = 3;
class Vr {
  refine(e, t) {
    return t.forEach(function(a) {
      if (a.start.isCertain("timezoneOffset"))
        return;
      const r = e.text.substring(a.index + a.text.length), s = Lr.exec(r);
      if (!s)
        return;
      e.debug(() => {
        console.log(`Extracting timezone: '${s[0]}' into : ${a}`);
      });
      const i = parseInt(s[zr]), o = parseInt(s[Gr] || "0");
      let c = i * 60 + o;
      c > 14 * 60 || (s[jr] === "-" && (c = -c), a.end != null && a.end.assign("timezoneOffset", c), a.start.assign("timezoneOffset", c), a.text += s[0]);
    }), t;
  }
}
class lt {
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
function Kr(n, e, t) {
  const a = n.getDateWithAdjustedTimezone(), r = qr(a, e, t);
  let s = new N(n);
  return s = s.addDurationAsImplied({ day: r }), s.assign("weekday", e), s;
}
function qr(n, e, t) {
  const a = n.getDay();
  switch (t) {
    case "this":
      return oe(n, e);
    case "last":
      return pn(n, e);
    case "next":
      return a == S.SUNDAY ? e == S.SUNDAY ? 7 : e : a == S.SATURDAY ? e == S.SATURDAY ? 7 : e == S.SUNDAY ? 8 : 1 + e : e < a && e != S.SUNDAY ? oe(n, e) : oe(n, e) + 7;
  }
  return Qr(n, e);
}
function Qr(n, e) {
  const t = pn(n, e), a = oe(n, e);
  return a < -t ? a : t;
}
function oe(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a < 0 && (a += 7), a;
}
function pn(n, e) {
  const t = n.getDay();
  let a = e - t;
  return a >= 0 && (a -= 7), a;
}
class Xr {
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
        const i = v(r, { day: s });
        if (ie(a.start, i), e.debug(() => {
          console.log(`${this.constructor.name} adjusted ${a} weekday (${a.start})`);
        }), a.end && a.start.date() > a.end.date()) {
          let o = oe(r, a.start.get("weekday")) || 7;
          const c = v(r, { day: o });
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
class Jr extends yn {
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
const Zr = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), es = 1, ts = 2, ns = 3, _t = 4, as = 5, $t = 6, It = 7, rs = 8, Bt = 9, Ut = 10;
class ss extends Y {
  innerPattern() {
    return Zr;
  }
  innerExtract(e, t) {
    const a = e.createParsingComponents({
      year: parseInt(t[es]),
      month: parseInt(t[ts]),
      day: parseInt(t[ns])
    });
    if (t[_t] != null && (a.assign("hour", parseInt(t[_t])), a.assign("minute", parseInt(t[as])), t[$t] != null && a.assign("second", parseInt(t[$t])), t[It] != null && a.assign("millisecond", parseInt(t[It])), t[rs] != null)) {
      let r = 0;
      if (t[Bt]) {
        const s = parseInt(t[Bt]);
        let i = 0;
        t[Ut] != null && (i = parseInt(t[Ut])), r = s * 60, r < 0 ? r -= i : r += i;
      }
      a.assign("timezoneOffset", r);
    }
    return a.addTag("parser/ISOFormatParser");
  }
}
class is extends Ee {
  mergeResults(e, t, a) {
    const r = a.clone();
    return r.index = t.index, r.text = t.text + e + r.text, r.start.assign("weekday", t.start.get("weekday")), r.end && r.end.assign("weekday", t.start.get("weekday")), r;
  }
  shouldMergeResults(e, t, a) {
    return t.start.isOnlyWeekdayComponent() && !t.start.isCertain("hour") && a.start.isCertain("day") && e.match(/^,?\s*$/) != null;
  }
}
function os(n, e = !1) {
  return n.parsers.unshift(new ss()), n.refiners.unshift(new is()), n.refiners.unshift(new Vr()), n.refiners.unshift(new lt()), n.refiners.push(new Ur()), n.refiners.push(new lt()), n.refiners.push(new Xr()), n.refiners.push(new Jr(e)), n;
}
function cs(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return ae(t, e), on(t, e), t.assign("timezoneOffset", n.getTimezoneOffset()), t.addTag("casualReference/now"), t;
}
function ls(n) {
  const e = n.getDateWithAdjustedTimezone(), t = new N(n, {});
  return ae(t, e), mt(t, e), t.delete("meridiem"), t.addTag("casualReference/today"), t;
}
function us(n) {
  return ms(n).addTag("casualReference/yesterday");
}
function ds(n) {
  return ft(n, 1).addTag("casualReference/tomorrow");
}
function ms(n, e) {
  return ft(n, -1);
}
function ft(n, e) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {}), r = new Date(t.getTime());
  return r.setDate(r.getDate() + e), ae(a, r), mt(a, r), a.delete("meridiem"), a;
}
function fs(n, e = 22) {
  const t = n.getDateWithAdjustedTimezone(), a = new N(n, {});
  return ae(a, t), a.imply("hour", e), a.imply("meridiem", b.PM), a.addTag("casualReference/tonight"), a;
}
function hs(n, e = 20) {
  const t = new N(n, {});
  return t.imply("meridiem", b.PM), t.imply("hour", e), t.addTag("casualReference/evening"), t;
}
function gs(n) {
  const e = new N(n, {});
  return n.getDateWithAdjustedTimezone().getHours() > 2 && e.addDurationAsImplied({ day: 1 }), e.assign("hour", 0), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/midnight"), e;
}
function ys(n, e = 6) {
  const t = new N(n, {});
  return t.imply("meridiem", b.AM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/morning"), t;
}
function ps(n, e = 15) {
  const t = new N(n, {});
  return t.imply("meridiem", b.PM), t.imply("hour", e), t.imply("minute", 0), t.imply("second", 0), t.imply("millisecond", 0), t.addTag("casualReference/afternoon"), t;
}
function Ts(n) {
  const e = new N(n, {});
  return e.imply("meridiem", b.AM), e.assign("hour", 12), e.imply("minute", 0), e.imply("second", 0), e.imply("millisecond", 0), e.addTag("casualReference/noon"), e;
}
const ws = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
class bs extends Y {
  innerPattern(e) {
    return ws;
  }
  innerExtract(e, t) {
    let a = e.refDate;
    const r = t[0].toLowerCase();
    let s = e.createParsingComponents();
    switch (r) {
      case "now":
        s = cs(e.reference);
        break;
      case "today":
        s = ls(e.reference);
        break;
      case "yesterday":
        s = us(e.reference);
        break;
      case "tomorrow":
      case "tmr":
      case "tmrw":
        s = ds(e.reference);
        break;
      case "tonight":
        s = fs(e.reference);
        break;
      case "overmorrow":
        s = ft(e.reference, 2);
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
const Ds = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
class Ms extends Y {
  innerPattern() {
    return Ds;
  }
  innerExtract(e, t) {
    let a = null;
    switch (t[1].toLowerCase()) {
      case "afternoon":
        a = ps(e.reference);
        break;
      case "evening":
      case "night":
        a = hs(e.reference);
        break;
      case "midnight":
        a = gs(e.reference);
        break;
      case "morning":
        a = ys(e.reference);
        break;
      case "noon":
      case "midday":
        a = Ts(e.reference);
        break;
    }
    return a && a.addTag("parser/ENCasualTimeParser"), a;
  }
}
const Es = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${V(it)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), Ps = 1, Ns = 2, Os = 3;
class Ss extends Y {
  innerPattern() {
    return Es;
  }
  innerExtract(e, t) {
    const a = t[Ps], r = t[Os];
    let s = a || r;
    s = s || "", s = s.toLowerCase();
    let i = null;
    s == "last" || s == "past" ? i = "last" : s == "next" ? i = "next" : s == "this" && (i = "this");
    const o = t[Ns].toLowerCase();
    let c;
    if (it[o] !== void 0)
      c = it[o];
    else if (o == "weekend")
      c = i == "last" ? S.SUNDAY : S.SATURDAY;
    else if (o == "weekday") {
      const l = e.reference.getDateWithAdjustedTimezone().getDay();
      l == S.SUNDAY || l == S.SATURDAY ? c = i == "last" ? S.FRIDAY : S.MONDAY : (c = l - 1, c = i == "last" ? c - 1 : c + 1, c = c % 5 + 1);
    } else
      return null;
    return Kr(e.reference, c, i);
  }
}
const As = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${V(Re)})(?=\\s*)(?=\\W|$)`, "i"), xs = 1, ks = 2;
class Hs extends Y {
  innerPattern() {
    return As;
  }
  innerExtract(e, t) {
    const a = t[xs].toLowerCase(), r = t[ks].toLowerCase(), s = Re[r];
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
const Rs = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), Fs = 1, Cs = 5, Lt = 2, jt = 3, et = 4;
class vs {
  constructor(e) {
    h(this, "groupNumberMonth");
    h(this, "groupNumberDay");
    this.groupNumberMonth = e ? jt : Lt, this.groupNumberDay = e ? Lt : jt;
  }
  pattern() {
    return Rs;
  }
  extract(e, t) {
    const a = t.index + t[Fs].length, r = t.index + t[0].length - t[Cs].length;
    if (a > 0 && e.text.substring(0, a).match("\\d/?$") || r < e.text.length && e.text.substring(r).match("^/?\\d"))
      return;
    const s = e.text.substring(a, r);
    if (s.match(/^\d\.\d$/) || s.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/) || !t[et] && s.indexOf("/") < 0)
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
    if (i.start.assign("day", c), i.start.assign("month", o), t[et]) {
      const l = parseInt(t[et]), u = un(l);
      i.start.assign("year", u);
    } else {
      const l = He(e.refDate, c, o);
      i.start.imply("year", l);
    }
    return i.addTag("parser/SlashDateFormatParser");
  }
}
const Ys = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Me})(?=\\W|$)`, "i"), Ws = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${ve})(?=\\W|$)`, "i");
class _s extends Y {
  constructor(t = !0) {
    super();
    h(this, "allowAbbreviations");
    this.allowAbbreviations = t;
  }
  innerPattern() {
    return this.allowAbbreviations ? Ys : Ws;
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
        s = ke(s);
        break;
    }
    return N.createRelativeFromReference(t.reference, s);
  }
}
function $s(n) {
  return n.text.match(/^[+-]/i) != null;
}
function zt(n) {
  return n.text.match(/^-/i) != null;
}
class Is extends Ee {
  shouldMergeResults(e, t, a) {
    return e.match(/^\s*$/i) ? $s(a) || zt(a) : !1;
  }
  mergeResults(e, t, a, r) {
    let s = de(a.text);
    zt(a) && (s = ke(s));
    const i = N.createRelativeFromReference(ne.fromDate(t.start.date()), s);
    return new ue(t.reference, t.index, `${t.text}${e}${a.text}`, i);
  }
}
function Gt(n) {
  return n.text.match(/\s+(before|from)$/i) != null;
}
function Bs(n) {
  return n.text.match(/\s+(after|since)$/i) != null;
}
class Us extends Ee {
  patternBetween() {
    return /^\s*$/i;
  }
  shouldMergeResults(e, t, a) {
    return !e.match(this.patternBetween()) || !Gt(t) && !Bs(t) ? !1 : !!a.start.get("day") && !!a.start.get("month") && !!a.start.get("year");
  }
  mergeResults(e, t, a) {
    let r = de(t.text);
    Gt(t) && (r = ke(r));
    const s = N.createRelativeFromReference(ne.fromDate(a.start.date()), r);
    return new ue(a.reference, t.index, `${t.text}${e}${a.text}`, s);
  }
}
const Ls = new RegExp(`^\\s*(${Fe})`, "i"), js = 1;
class zs {
  refine(e, t) {
    return t.forEach(function(a) {
      if (!a.start.isDateWithUnknownYear())
        return;
      const r = e.text.substring(a.index + a.text.length), s = Ls.exec(r);
      if (!s || s[0].trim().length <= 3)
        return;
      e.debug(() => {
        console.log(`Extracting year: '${s[0]}' into : ${a}`);
      });
      const i = Ce(s[js]);
      a.end != null && a.end.assign("year", i), a.start.assign("year", i), a.text += s[0];
    }), t;
  }
}
class Gs extends yn {
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
class Tn {
  createCasualConfiguration(e = !1) {
    const t = this.createConfiguration(!1, e);
    return t.parsers.push(new bs()), t.parsers.push(new Ms()), t.parsers.push(new pr()), t.parsers.push(new Hs()), t.parsers.push(new _s()), t.refiners.push(new Gs()), t;
  }
  createConfiguration(e = !0, t = !1) {
    const a = os({
      parsers: [
        new vs(t),
        new or(e),
        new ur(),
        new fr(t),
        new Ss(),
        new Or(),
        new kr(e),
        new Fr(e),
        new Wr(e)
      ],
      refiners: [new Wt()]
    }, e);
    return a.parsers.unshift(new Mr(e)), a.refiners.unshift(new Us()), a.refiners.unshift(new Is()), a.refiners.unshift(new lt()), a.refiners.push(new Wt()), a.refiners.push(new zs()), a.refiners.push(new $r()), a;
  }
}
class ce {
  constructor(e) {
    h(this, "parsers");
    h(this, "refiners");
    h(this, "defaultConfig", new Tn());
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
    const r = new Vs(e, t, a);
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
      l instanceof ue ? u = l : l instanceof N ? (u = e.createParsingResult(o.index, o[0]), u.start = l) : u = e.createParsingResult(o.index, o[0], l);
      const f = u.index, E = u.text;
      e.debug(() => console.log(`${t.constructor.name} extracted (at index=${f}) '${E}'`)), a.push(u), i = s.substring(f + E.length), o = r.exec(i);
    }
    return a;
  }
}
class Vs {
  constructor(e, t, a) {
    h(this, "text");
    h(this, "option");
    h(this, "reference");
    h(this, "refDate");
    this.text = e, this.option = a ?? {}, this.reference = ne.fromInput(t, this.option.timezones), this.refDate = this.reference.instant;
  }
  createParsingComponents(e) {
    return e instanceof N ? e : new N(this.reference, e);
  }
  createParsingResult(e, t, a, r) {
    const s = typeof t == "string" ? t : this.text.substring(e, t), i = a ? this.createParsingComponents(a) : null, o = r ? this.createParsingComponents(r) : null;
    return new ue(this.reference, e, s, i, o);
  }
  debug(e) {
    this.option.debug && (this.option.debug instanceof Function ? this.option.debug(e) : this.option.debug.debug(e));
  }
}
const ht = new Tn(), Ks = new ce(ht.createCasualConfiguration(!1));
new ce(ht.createConfiguration(!0, !1));
new ce(ht.createCasualConfiguration(!0));
const qs = Ks;
function Qs(n, e, t) {
  return qs.parse(n, e, t);
}
const Xs = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, Js = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i, Zs = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i, ei = /^(this|last|next)\s+(week|month)$/i, ti = /^(end|beginning)\s+of\s+(this|next)\s+month$/i, ni = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i, ai = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i, ri = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i, si = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i, ii = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i, oi = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i, ci = /^(christmas|halloween|valentine|new\s+year|independence\s+day|veterans\s+day|st\.?\s+patrick|cinco\s+de\s+mayo|labour\s+day|songkran|chakri\s+memorial\s+day|coronation\s+day|queen\s+suthida's\s+birthday|king's\s+birthday|the\s+queen\s+mother's\s+birthday|king\s+bhumibol\s+adulyadej\s+memorial\s+day|king\s+chulalongkorn\s+day|king\s+bhumibol\s+adulyadej's\s+birthday|constitution\s+day)\s+(\d{4})$/i, wn = {
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
}, tt = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}, li = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4
}, ui = {
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
function di(n, e, t) {
  const a = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = new Date(t.getFullYear(), n - 1, e);
  return r >= a ? r : new Date(t.getFullYear() + 1, n - 1, e);
}
function nt(n, e) {
  const t = n.toLowerCase().trim().replace(/^next\s+/, ""), a = wn[t];
  return a ? di(a[0], a[1], e) : null;
}
function at(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? le(n, e) : a.startsWith("week") ? Te(n, e) : a.startsWith("month") ? te(n, e) : n;
}
function mi(n, e, t) {
  const a = t.toLowerCase();
  return a.startsWith("day") ? st(n, e) : a.startsWith("week") ? rn(n, e) : a.startsWith("month") ? dt(n, e) : n;
}
function fi(n, e, t = !1) {
  const a = rt(n);
  let r = e - a;
  return (r < 0 || !t && r === 0) && (r += 7), le(n, r);
}
function Vt(n, e, t, a) {
  if (a > 0) {
    const r = new Date(n, e, 1), s = rt(r);
    let i = t - s;
    i < 0 && (i += 7);
    const o = new Date(n, e, 1 + i + (a - 1) * 7);
    return o.getMonth() !== e ? null : o;
  } else {
    const r = new Date(n, e + 1, 0);
    let i = rt(r) - t;
    return i < 0 && (i += 7), new Date(n, e, r.getDate() - i);
  }
}
function hi(n) {
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
function bn(n, e = /* @__PURE__ */ new Date()) {
  var L;
  const t = n.trim();
  if (!t) return null;
  const a = t.toLowerCase(), r = t.match(Xs);
  if (r) {
    const d = parseInt(r[1], 10);
    return { range: [e, at(e, d, r[2])], text: n };
  }
  const s = t.match(Js);
  if (s) {
    const d = parseInt(s[1], 10);
    return { single: at(e, d, s[2]), text: n };
  }
  const i = t.match(Zs);
  if (i) {
    const d = parseInt(i[1], 10);
    return { range: [mi(e, d, i[2]), e], text: n };
  }
  const o = t.match(ei);
  if (o) {
    const d = o[1].toLowerCase(), p = o[2].toLowerCase(), y = { weekStartsOn: 1 };
    if (p === "week") {
      const A = d === "last" ? rn(e, 1) : d === "next" ? Te(e, 1) : e;
      return { range: [X(A, y), ut(A, y)], text: n };
    }
    if (p === "month") {
      const A = d === "last" ? dt(e, 1) : d === "next" ? te(e, 1) : e;
      return { range: [be(A), we(A)], text: n };
    }
  }
  const c = a.match(ti);
  if (c) {
    const p = c[2] === "next" ? te(e, 1) : e;
    return { single: c[1] === "end" ? we(p) : be(p), text: n };
  }
  const l = a.match(ci);
  if (l) {
    const d = l[1], p = parseInt(l[2], 10), y = wn[d];
    if (y)
      return { single: new Date(p, y[0] - 1, y[1]), text: n };
  }
  const u = a.match(ni);
  if (u) {
    const d = parseInt(u[1], 10), p = u[2] === "next" ? te(e, 1) : e;
    return { single: new Date(p.getFullYear(), p.getMonth(), d), text: n };
  }
  const f = a.match(ai);
  if (f) {
    const d = f[1], p = tt[f[2]], y = hi(f[3]);
    if (y !== null && p !== void 0) {
      const A = d === "last" ? -1 : li[d] ?? 1, C = e.getFullYear();
      let I = Vt(C, y, p, A);
      if ((!I || I < e) && (I = Vt(C + 1, y, p, A)), I) return { single: I, text: n };
    }
  }
  const E = a.match(ri);
  if (E) {
    const d = tt[E[1]];
    return { single: fi(e, d, !1), text: n };
  }
  const P = a.match(si);
  if (P) {
    const d = P[1].startsWith("after") ? 2 : -2;
    return { single: le(e, d), text: n };
  }
  const O = a.match(ii);
  if (O) {
    const d = tt[O[1]], p = Te(e, 1), y = Fa(p, d, { weekStartsOn: 1 });
    return { single: Te(y, 1), text: n };
  }
  const m = a.match(oi);
  if (m) {
    const d = m[1], p = ui[d] ?? parseInt(d, 10), y = m[2], A = m[3], C = bn(A, e), I = (C == null ? void 0 : C.single) ?? ((L = C == null ? void 0 : C.range) == null ? void 0 : L[0]);
    if (I) return { single: at(I, p, y), text: n };
  }
  const x = Qs(t, e);
  if (x.length > 0) {
    const d = x.find((p) => p.end != null);
    if (d) return { range: [d.start.date(), d.end.date()], text: n };
    if (x.length >= 2) {
      const p = x[0].start.date(), y = x[1].start.date();
      return { range: [p < y ? p : y, p < y ? y : p], text: n };
    }
    return { single: x[0].start.date(), text: n };
  }
  const k = t.match(/^(.+?)\s+to\s+(.+)$/i);
  if (k) {
    const d = nt(k[1], e), p = nt(k[2], d ?? e);
    if (d && p) return { range: [d, p], text: n };
  }
  const W = nt(t, e);
  return W ? { single: W, text: n } : null;
}
function gi() {
  const [n, e] = U(null), [t, a] = U(""), r = F((s) => {
    a(s), e(bn(s));
  }, []);
  return { inputValue: t, preview: n, handleChange: r, setInputValue: a, setPreview: e };
}
function R(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function yi({
  selectionMode: n,
  locale: e,
  onCommit: t
}) {
  const { inputValue: a, preview: r, handleChange: s, setInputValue: i, setPreview: o } = gi(), c = () => {
    if (!r) return;
    const u = {
      single: r.single ? R(r.single) : void 0,
      range: r.range ? [R(r.range[0]), R(r.range[1])] : void 0
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
  return /* @__PURE__ */ $("div", { className: "dp-nl-input", children: [
    /* @__PURE__ */ D(
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
    l && /* @__PURE__ */ D("div", { className: "dp-nl-preview", "aria-live": "polite", children: l })
  ] });
}
function pi({ isOpen: n, position: e, popoverRef: t, children: a }) {
  return n ? Nn(
    /* @__PURE__ */ D(
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
function Ti({ value: n, onChange: e }) {
  const [t, a] = U(null), [r, s] = U(null), i = F(
    (l) => {
      if (r === null)
        s(l), e(null);
      else {
        const u = pe(l, r) ? l : r, f = pe(l, r) ? r : l;
        e([u, f]), s(null), a(null);
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
        const l = pe(t, r) ? t : r, u = pe(t, r) ? r : t;
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
const Kt = 8, qt = 4;
function wi(n) {
  const { triggerRect: e, popoverRect: t, viewportWidth: a, viewportHeight: r, scrollX: s, scrollY: i } = n, o = r - e.bottom, c = e.top, l = o >= t.height || o >= c ? "bottom" : "top";
  let u = e.left + s;
  return u + t.width > a && (u = a - t.width - Kt), u = Math.max(Kt, u), { top: l === "bottom" ? e.bottom + i + qt : e.top + i - t.height - qt, left: u, placement: l };
}
function bi() {
  const [n, e] = U(!1), [t, a] = U({
    top: 0,
    left: 0,
    placement: "bottom"
  }), r = Tt(null), s = Tt(null), i = F(() => e(!0), []), o = F(() => e(!1), []), c = F(() => e((u) => !u), []), l = F(() => {
    !r.current || !s.current || a(
      wi({
        triggerRect: r.current.getBoundingClientRect(),
        popoverRect: s.current.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      })
    );
  }, []);
  return Qt(() => {
    if (!n) return;
    const u = requestAnimationFrame(l), f = (P) => {
      s.current && !s.current.contains(P.target) && r.current && !r.current.contains(P.target) && o();
    }, E = (P) => {
      P.key === "Escape" && o();
    };
    return document.addEventListener("mousedown", f), document.addEventListener("keydown", E), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      cancelAnimationFrame(u), document.removeEventListener("mousedown", f), document.removeEventListener("keydown", E), window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [n, o, l]), { isOpen: n, open: i, close: o, toggle: c, position: t, triggerRef: r, popoverRef: s };
}
function Di(n) {
  const e = {};
  return n.fontFamily && (e["--dp-font-family"] = n.fontFamily), n.fontSize && (e["--dp-font-size"] = n.fontSize), n.primaryColor && (e["--dp-primary"] = n.primaryColor), n.primaryTextColor && (e["--dp-primary-text"] = n.primaryTextColor), n.rangeColor && (e["--dp-range"] = n.rangeColor), n.textColor && (e["--dp-text"] = n.textColor), n.mutedTextColor && (e["--dp-muted"] = n.mutedTextColor), n.backgroundColor && (e["--dp-bg"] = n.backgroundColor), n.surfaceColor && (e["--dp-surface"] = n.surfaceColor), n.borderColor && (e["--dp-border"] = n.borderColor), n.borderRadius && (e["--dp-radius"] = n.borderRadius), n.daySize != null && (e["--dp-day-size"] = `${n.daySize}px`), n.shadow && (e["--dp-shadow"] = n.shadow), e;
}
const Mi = {
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
function Ai({
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
  showWeekNumbers: E = !1,
  minDate: P,
  maxDate: O,
  disabledDates: m,
  weekStartsOn: x = 0,
  calendarSystem: k = "gregorian",
  mode: W = "inline",
  triggerFormat: L,
  className: d
}) {
  const p = Xt(() => Di({ ...Mi, ...s }), [s]), y = bi(), [A, C] = U(() => {
    const T = R(/* @__PURE__ */ new Date());
    if (Array.isArray(t) && t[0]) {
      const g = R(t[0]);
      return new Date(g.getFullYear(), g.getMonth(), 1);
    }
    if (t instanceof Date) {
      const g = R(t);
      return new Date(g.getFullYear(), g.getMonth(), 1);
    }
    return new Date(T.getFullYear(), T.getMonth(), 1);
  }), [I, me] = U(() => {
    if (Array.isArray(t) && t[1]) {
      const T = t[0] ? R(t[0]) : null, g = R(t[1]);
      return T && !Pt(T, g) ? new Date(g.getFullYear(), g.getMonth(), 1) : new Date(A.getFullYear(), A.getMonth() + 1, 1);
    }
    return new Date(A.getFullYear(), A.getMonth() + 1, 1);
  }), [Ye, We] = U(""), _e = e === "single" && t instanceof Date ? t : null, Pe = e === "range" && Array.isArray(t) ? t : null, { pendingStart: $e, previewRange: Ie, handleDayClick: H, handleDayHover: K } = Ti({
    value: Pe,
    onChange: (T) => a == null ? void 0 : a(T)
  }), _ = F(
    (T, g) => {
      const he = R(T);
      if (C(new Date(he.getFullYear(), he.getMonth(), 1)), n === 2) {
        const Ve = R(g ?? T), Dn = Pt(he, Ve) ? new Date(he.getFullYear(), he.getMonth() + 1, 1) : new Date(Ve.getFullYear(), Ve.getMonth(), 1);
        me(Dn);
      }
    },
    [n]
  ), fe = F(
    (T) => {
      const g = R(T);
      a == null || a(g), C(new Date(g.getFullYear(), g.getMonth(), 1)), n === 2 && me(new Date(g.getFullYear(), g.getMonth() + 1, 1)), W === "popover" && y.close();
    },
    [n, a, W, y]
  ), Be = F(
    (T) => {
      const g = $e !== null;
      H(T), W === "popover" && g && y.close();
    },
    [$e, H, W, y]
  ), Ue = F(
    (T) => {
      a == null || a(T), _(T[0], T[1]);
    },
    [a, _]
  ), Le = F(
    (T) => {
      if (e === "single" && T.single) {
        const g = R(T.single);
        a == null || a(g), _(g, new Date(g.getFullYear(), g.getMonth() + 1, 1));
      } else if (e === "range" && T.range) {
        const g = [R(T.range[0]), R(T.range[1])];
        a == null || a(g), _(g[0], g[1]);
      } else if (e === "range" && T.single) {
        const g = R(T.single);
        a == null || a([g, g]), _(g, g);
      } else if (T.single) {
        const g = R(T.single);
        a == null || a(g), _(g, new Date(g.getFullYear(), g.getMonth() + 1, 1));
      }
    },
    [e, a, _]
  ), je = e === "range" ? Be : fe, ze = "dd MMM yyyy", Ge = (() => {
    const T = L ?? ze;
    return Array.isArray(t) && t[0] && t[1] ? `${qe(t[0], T)} - ${qe(t[1], T)}` : t instanceof Date ? qe(t, T) : "Select date";
  })(), yt = {
    selectionMode: e,
    selectedDate: _e,
    rangeValue: Pe,
    previewRange: Ie,
    onDayClick: je,
    onDayHover: e === "range" ? K : () => {
    },
    onAnnounce: We,
    config: {
      locale: r,
      calendarSystem: k,
      weekStartsOn: x,
      showWeekNumbers: E,
      showHolidays: f,
      holidayTypes: c,
      customHolidays: o,
      minDate: P,
      maxDate: O,
      disabledDates: m
    }
  }, pt = /* @__PURE__ */ $(
    "div",
    {
      className: ["dp-calendar-panel", d].filter(Boolean).join(" "),
      "data-datepicker-root": !0,
      style: p,
      children: [
        l && /* @__PURE__ */ D(
          yi,
          {
            selectionMode: e,
            locale: r,
            onCommit: Le
          }
        ),
        u && e === "range" && /* @__PURE__ */ D(
          Xa,
          {
            presets: i,
            value: Pe,
            onSelect: Ue
          }
        ),
        /* @__PURE__ */ $("div", { className: `dp-months dp-months--${n}`, children: [
          /* @__PURE__ */ D(
            Ot,
            {
              ...yt,
              month: A,
              onMonthChange: C
            }
          ),
          n === 2 && /* @__PURE__ */ D(
            Ot,
            {
              ...yt,
              month: I,
              onMonthChange: me
            }
          )
        ] }),
        /* @__PURE__ */ D(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "dp-sr-only",
            children: Ye
          }
        )
      ]
    }
  );
  return W === "popover" ? /* @__PURE__ */ $(Pn, { children: [
    /* @__PURE__ */ D(
      "button",
      {
        ref: y.triggerRef,
        className: "dp-trigger",
        onClick: y.toggle,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": y.isOpen,
        children: Ge
      }
    ),
    /* @__PURE__ */ D(
      pi,
      {
        isOpen: y.isOpen,
        position: y.position,
        popoverRef: y.popoverRef,
        children: pt
      }
    )
  ] }) : pt;
}
function Ei(n, e = "en", t = ["public"]) {
  return (sn()[String(n)] ?? []).filter((s) => t.includes(s.type)).map((s) => ({
    date: s.date,
    name: e === "th" ? s.nameTH : s.name,
    nameTH: s.nameTH,
    type: s.type
  }));
}
function xi(n, e = "en", t = ["public"]) {
  const a = /* @__PURE__ */ new Map();
  for (const r of Ei(n, e, t)) {
    const s = a.get(r.date) ?? [];
    s.push(r), a.set(r.date, s);
  }
  return a;
}
const ki = {
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
  Ai as DatePicker,
  Qa as builtInPresets,
  ki as darkTheme,
  xi as getHolidayMapForYear,
  Ei as getHolidaysForYear,
  Mi as lightTheme
};
