/**
 * Universal Sambat SDK — ndp-utils.js
 * Utility functions: number formatting, date formatting, validation.
 * Adapted from /calendar/assets/js/nepali-utils.js + nepali-converter.js
 */
(function (global) {
  'use strict';

  const D = global.NDPData;
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --─ Number Helpers ------------------------------------------─
  function toNepali(value) {
    return String(value).replace(/[0-9]/g, d => D.nepaliDigits[+d]);
  }

  function toEnglish(value) {
    return String(value).replace(/[०-९]/g, d => String(D.nepaliDigits.indexOf(d)));
  }

  function toLocalNumber(value, lang) {
    return lang === 'en' ? toEnglish(String(value)) : toNepali(String(value));
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  // --─ Name Helpers --------------------------------------------─
  function getMonthName(monthIndex, lang) {
    return lang === 'en'
      ? D.nepaliMonthsEn[monthIndex - 1] || ''
      : D.nepaliMonths[monthIndex - 1] || '';
  }

  function getWeekdayName(dayIndex, lang) {
    return lang === 'en'
      ? D.nepaliWeekdaysEn[dayIndex] || ''
      : D.nepaliWeekdays[dayIndex] || '';
  }

  function getShortWeekdayName(dayIndex, lang) {
    return lang === 'en'
      ? D.shortNepaliWeekdaysEn[dayIndex] || ''
      : D.shortNepaliWeekdays[dayIndex] || '';
  }

  function getEnglishMonthName(monthIndex, lang) {
    return lang === 'en'
      ? D.englishMonthsEn[monthIndex] || ''
      : D.englishMonthsNp[monthIndex] || '';
  }

  // --─ Days in Month --------------------------------------------
  function getDaysInMonth(year, month) {
    const yearData = D.calendarData[year];
    if (!yearData || month < 1 || month > 12) return null;
    return yearData[month - 1];
  }

  // --─ Format BS Date ------------------------------------------─
  function formatBsDate(year, month, day, lang, format) {
    lang = lang || 'ne';
    format = format || 'YYYY-MM-DD';
    const y = toLocalNumber(year, lang);
    const m = pad(month);
    const d = pad(day);
    const mName = getMonthName(month, lang);
    const dNum = toLocalNumber(day, lang);
    const yNum = toLocalNumber(year, lang);

    switch (format) {
      case 'YYYY-MM-DD': return `${toEnglish(year)}-${m}-${d}`;
      case 'DD/MM/YYYY': return `${d}/${m}/${toEnglish(year)}`;
      case 'long': return lang === 'en'
        ? `${mName} ${dNum}, ${yNum}`
        : `${yNum} ${mName} ${dNum} गते`;
      case 'short': return `${yNum}/${toLocalNumber(month, lang)}/${dNum}`;
      default: return `${toEnglish(year)}-${m}-${d}`;
    }
  }

  function formatAdDate(date, lang) {
    lang = lang || 'ne';
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const mName = getEnglishMonthName(m, lang);
    const dStr = toLocalNumber(d, lang);
    const yStr = toLocalNumber(y, lang);
    return `${mName} ${dStr}, ${yStr}`;
  }

  // --─ BS ↔ AD Conversion --------------------------------------─
  const baseAdUtc = Date.UTC(
    D.meta.baseAdDate.year,
    D.meta.baseAdDate.month - 1,
    D.meta.baseAdDate.day
  );

  function validateBsDate(year, month, day) {
    const days = getDaysInMonth(year, month);
    if (!days) throw new RangeError(`BS ${year}-${month} outside supported range.`);
    if (day < 1 || day > days) throw new RangeError(`BS day ${day} invalid for ${year}-${month}.`);
  }

  function isValidBsDate(year, month, day) {
    try { validateBsDate(+year, +month, +day); return true; }
    catch (e) { return false; }
  }

  function isValidAdDate(year, month, day) {
    const y = +year, m = +month, d = +day;
    const date = new Date(y, m - 1, d);
    return Number.isInteger(y) && Number.isInteger(m) && Number.isInteger(d) &&
      date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  }

  function getDaysFromBaseBs(year, month, day) {
    validateBsDate(year, month, day);
    let days = 0;
    for (let y = D.meta.minBsYear; y < year; y++) {
      days += D.calendarData[y].reduce((s, n) => s + n, 0);
    }
    for (let mo = 1; mo < month; mo++) {
      days += getDaysInMonth(year, mo);
    }
    return days + day - 1;
  }

  function bsToAdDate(bsYear, bsMonth, bsDay) {
    const daysFromBase = getDaysFromBaseBs(bsYear, bsMonth, bsDay);
    const utc = baseAdUtc + daysFromBase * MS_PER_DAY;
    const d = new Date(utc);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  function bsToAd(bsYear, bsMonth, bsDay) {
    const date = bsToAdDate(+bsYear, +bsMonth, +bsDay);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: date.getDay(),
      date: date
    };
  }

  function adToBs(adDate) {
    const date = adDate instanceof Date ? adDate : new Date(adDate);
    if (isNaN(date.getTime())) throw new RangeError('Invalid AD date.');
    const utcDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    let remaining = Math.floor((utcDay - baseAdUtc) / MS_PER_DAY);
    if (remaining < 0) throw new RangeError('AD date before supported BS range.');

    for (let y = D.meta.minBsYear; y <= D.meta.maxBsYear; y++) {
      for (let m = 1; m <= 12; m++) {
        const dim = getDaysInMonth(y, m);
        if (remaining < dim) {
          return { year: y, month: m, day: remaining + 1, weekday: date.getDay(), date };
        }
        remaining -= dim;
      }
    }
    throw new RangeError('AD date after supported BS range.');
  }

  function getTodayBs() {
    return adToBs(new Date());
  }

  function compareBsDates(a, b) {
    const la = a.year * 10000 + a.month * 100 + a.day;
    const lb = b.year * 10000 + b.month * 100 + b.day;
    return la === lb ? 0 : la > lb ? 1 : -1;
  }

  function bsDateToKey(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}`;
  }

  // --─ Holiday lookup ------------------------------------------─
  function getHolidays(year, month, day) {
    return [];
  }

  function isHoliday(year, month, day, weekday) {
    const isWeekend = (weekday === 0 || weekday === 6); // Sun/Sat
    return isWeekend;
  }

  // --─ First weekday of month ----------------------------------─
  function getFirstWeekdayOfMonth(year, month) {
    const adDate = bsToAdDate(year, month, 1);
    return adDate.getDay(); // 0=Sun, 6=Sat
  }

  // --─ Days diff ------------------------------------------------
  function daysDiffFromToday(adDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
    return Math.round((target - today) / MS_PER_DAY);
  }

  global.NDPUtils = {
    toNepali,
    toEnglish,
    toLocalNumber,
    pad,
    getMonthName,
    getWeekdayName,
    getShortWeekdayName,
    getEnglishMonthName,
    getDaysInMonth,
    formatBsDate,
    formatAdDate,
    bsToAd,
    bsToAdDate,
    adToBs,
    getTodayBs,
    compareBsDates,
    bsDateToKey,
    getHolidays,
    isHoliday,
    getFirstWeekdayOfMonth,
    daysDiffFromToday,
    isValidBsDate,
    isValidAdDate,
    getDaysFromBaseBs
  };

  // --─ Standard Developer Helpers ------------------------------
  global.Get2DigitNo = function(num) {
    return String(num).padStart(2, '0');
  };

  global.ParseDate = function(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split(/[-/.]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return { year: +parts[0], month: +parts[1], day: +parts[2] };
      if (parts[2].length === 4) return { year: +parts[2], month: +parts[1], day: +parts[0] };
    }
    return null;
  };

  global.ConvertToDateObject = function(dateStr, format) {
    const parsed = global.ParseDate(dateStr);
    if (!parsed) return null;
    return global.NDPUtils.bsToAdDate(parsed.year, parsed.month, parsed.day);
  };

  global.ConvertToDateFormat = function(dateObj, formatStr) {
    if (!dateObj) return '';
    const bs = global.NDPUtils.adToBs(dateObj);
    return global.NDPUtils.formatBsDate(bs.year, bs.month, bs.day, 'ne', formatStr);
  };

  global.AD2BS = function(adDateStr) {
    const d = new Date(adDateStr);
    if (isNaN(d.getTime())) return '';
    const bs = global.NDPUtils.adToBs(d);
    return `${bs.year}-${String(bs.month).padStart(2, '0')}-${String(bs.day).padStart(2, '0')}`;
  };

  global.BS2AD = function(bsDateStr) {
    const parsed = global.ParseDate(bsDateStr);
    if (!parsed) return '';
    const ad = global.NDPUtils.bsToAdDate(parsed.year, parsed.month, parsed.day);
    return `${ad.getFullYear()}-${String(ad.getMonth() + 1).padStart(2, '0')}-${String(ad.getDate()).padStart(2, '0')}`;
  };

  global.ConvertToUnicode = function(num) {
    return global.NDPUtils.toNepali(num);
  };

  global.ConvertToNumber = function(unicodeStr) {
    const english = global.NDPUtils.toEnglish(unicodeStr);
    return /^-?\d+(\.\d+)?$/.test(english) ? +english : english;
  };

  global.NumberToWords = function(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (num === 0) return 'Zero';
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + global.NumberToWords(num % 100) : '');
    return String(num);
  };

  global.NumberToWordsUnicode = function(num) {
    const npWords = ['', 'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ', 'दश', 'एघार', 'बाह्र', 'तेह्र', 'चौध', 'पन्ध्र', 'सोलह', 'सत्र', 'अठार', 'उन्नाइस', 'बीस'];
    if (num === 0) return 'शून्य';
    if (num <= 20) return npWords[num];
    return global.NDPUtils.toNepali(num);
  };

  global.AD = {
    GetCurrentDate: function() { return new Date(); },
    GetCurrentYear: function() { return new Date().getFullYear(); },
    GetCurrentMonth: function() { return new Date().getMonth() + 1; },
    GetCurrentDay: function() { return new Date().getDate(); },
    GetMonths: function() { return global.NDPData.englishMonthsNp; },
    GetMonth: function(index) { return global.NDPData.englishMonthsNp[index - 1] || ''; },
    GetDays: function() { return global.NDPData.nepaliWeekdaysEn; },
    GetDay: function(index) { return global.NDPData.nepaliWeekdaysEn[index] || ''; },
    GetDaysShort: function() { return global.NDPData.shortNepaliWeekdaysEn; },
    GetDayShort: function(index) { return global.NDPData.shortNepaliWeekdaysEn[index] || ''; },
    GetDaysInMonth: function(year, month) { return new Date(year, month, 0).getDate(); },
    DatesDiff: function(d1, d2) {
      return Math.round((new Date(d2) - new Date(d1)) / (24 * 60 * 60 * 1000));
    },
    AddDays: function(date, days) {
      const d = new Date(date);
      d.setDate(d.getDate() + days);
      return d;
    },
    GetFullDate: function(date) { return global.NDPUtils.formatAdDate(date, 'ne'); },
    GetFullDay: function(date) { return global.NDPUtils.getWeekdayName(date.getDay(), 'ne'); }
  };

  global.BS = {
    ValidateDate: function(y, m, d) { return global.NDPUtils.isValidBsDate(y, m, d); },
    IsBetweenDates: function(date, d1, d2) {
      const c = global.NDPUtils.compareBsDates(date, d1);
      const c2 = global.NDPUtils.compareBsDates(date, d2);
      return c >= 0 && c2 <= 0;
    },
    GetCurrentDate: function() { return global.NDPUtils.getTodayBs(); },
    GetCurrentYear: function() { return global.NDPUtils.getTodayBs().year; },
    GetCurrentMonth: function() { return global.NDPUtils.getTodayBs().month; },
    GetCurrentDay: function() { return global.NDPUtils.getTodayBs().day; },
    GetMonths: function() { return global.NDPData.nepaliMonthsEn; },
    GetMonth: function(index) { return global.NDPData.nepaliMonthsEn[index - 1] || ''; },
    GetMonthsInUnicode: function() { return global.NDPData.nepaliMonths; },
    GetMonthInUnicode: function(index) { return global.NDPData.nepaliMonths[index - 1] || ''; },
    GetFullDate: function(dateObj) { return global.NDPUtils.formatBsDate(dateObj.year, dateObj.month, dateObj.day, 'ne', 'long'); },
    GetDaysUnicode: function() { return global.NDPData.nepaliWeekdays; },
    GetDayUnicode: function(index) { return global.NDPData.nepaliWeekdays[index] || ''; },
    GetDaysUnicodeShort: function() { return global.NDPData.shortNepaliWeekdays; },
    GetDayUnicodeShort: function(index) { return global.NDPData.shortNepaliWeekdays[index] || ''; },
    GetFullDay: function(dateObj) {
      const ad = global.NDPUtils.bsToAdDate(dateObj.year, dateObj.month, dateObj.day);
      return global.NDPUtils.getWeekdayName(ad.getDay(), 'en');
    },
    GetFullDayInUnicode: function(dateObj) {
      const ad = global.NDPUtils.bsToAdDate(dateObj.year, dateObj.month, dateObj.day);
      return global.NDPUtils.getWeekdayName(ad.getDay(), 'ne');
    },
    GetDaysInMonth: function(y, m) { return global.NDPUtils.getDaysInMonth(y, m); },
    DatesDiff: function(d1, d2) {
      const ad1 = global.NDPUtils.bsToAdDate(d1.year, d1.month, d1.day);
      const ad2 = global.NDPUtils.bsToAdDate(d2.year, d2.month, d2.day);
      return Math.round((ad2 - ad1) / (24 * 60 * 60 * 1000));
    },
    AddDays: function(bsDate, days) {
      const ad = global.NDPUtils.bsToAdDate(bsDate.year, bsDate.month, bsDate.day);
      ad.setDate(ad.getDate() + days);
      return global.NDPUtils.adToBs(ad);
    },
    IsEqualTo: function(d1, d2) { return global.NDPUtils.compareBsDates(d1, d2) === 0; },
    IsGreaterThan: function(d1, d2) { return global.NDPUtils.compareBsDates(d1, d2) > 0; },
    IsLessThan: function(d1, d2) { return global.NDPUtils.compareBsDates(d1, d2) < 0; },
    IsGreaterThanOrEqualTo: function(d1, d2) { return global.NDPUtils.compareBsDates(d1, d2) >= 0; },
    IsLessThanOrEqualTo: function(d1, d2) { return global.NDPUtils.compareBsDates(d1, d2) <= 0; }
  };

}(typeof window !== 'undefined' ? window : this));
