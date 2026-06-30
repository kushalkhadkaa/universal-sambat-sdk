/*!
 * Universal Sambat SDK v1.2.0
 * https://kushalkhadkaa.github.io/universal-sambat-sdk/
 * (c) 2026 Kushal Khadka
 * Released under the MIT License
 */

var _ndp_window = typeof globalThis !== 'undefined' ? globalThis
  : (typeof window !== 'undefined' ? window : {});
var _ndp_document = (typeof _ndp_window !== 'undefined' && _ndp_window.document) ? _ndp_window.document : {
  createElement: () => ({ style: {}, appendChild: () => {}, setAttribute: () => {} }),
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};
var window = _ndp_window;
var document = _ndp_document;


/* ─── ndp-data.js ─── */
/**
 * Universal Sambat SDK — ndp-data.js
 * Nepali calendar data: BS year→month-days mapping, names, meta.
 * Verified source from /calendar/assets/js/nepali-data.js
 * Base date: AD 1913-04-13 = BS 1970-01-01
 */
(function (global) {
  'use strict';

  const nepaliMonths = [
    'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
    'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'
  ];

  const nepaliMonthsEn = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  const nepaliWeekdays = [
    'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'
  ];

  const nepaliWeekdaysEn = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const shortNepaliWeekdays = [
    'आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'
  ];

  const shortNepaliWeekdaysEn = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];

  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  const englishMonthsNp = [
    'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
    'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
  ];

  const englishMonthsEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // BS Calendar Data — verified against trusted calendar reference
  const calendarData = {
    1970:[31,31,32,31,31,31,30,29,30,29,30,30],
    1971:[31,31,32,31,32,30,30,29,30,29,30,30],
    1972:[31,32,31,32,31,30,30,30,29,29,30,31],
    1973:[30,32,31,32,31,30,30,30,29,30,29,31],
    1974:[31,31,32,31,31,31,30,29,30,29,30,30],
    1975:[31,31,32,32,31,30,30,29,30,29,30,30],
    1976:[31,32,31,32,31,30,30,30,29,29,30,31],
    1977:[30,32,31,32,31,31,29,30,29,30,29,31],
    1978:[31,31,32,31,31,31,30,29,30,29,30,30],
    1979:[31,31,32,32,31,30,30,29,30,29,30,30],
    1980:[31,32,31,32,31,30,30,30,29,29,30,31],
    1981:[31,31,31,32,31,31,29,30,30,29,30,30],
    1982:[31,31,32,31,31,31,30,29,30,29,30,30],
    1983:[31,31,32,32,31,30,30,29,30,29,30,30],
    1984:[31,32,31,32,31,30,30,30,29,29,30,31],
    1985:[31,31,31,32,31,31,29,30,30,29,30,30],
    1986:[31,31,32,31,31,31,30,29,30,29,30,30],
    1987:[31,32,31,32,31,30,30,29,30,29,30,30],
    1988:[31,32,31,32,31,30,30,30,29,29,30,31],
    1989:[31,31,31,32,31,31,30,29,30,29,30,30],
    1990:[31,31,32,31,31,31,30,29,30,29,30,30],
    1991:[31,32,31,32,31,30,30,30,29,29,30,30],
    1992:[31,32,31,32,31,30,30,30,29,30,29,31],
    1993:[31,31,31,32,31,31,30,29,30,29,30,30],
    1994:[31,31,32,31,31,31,30,29,30,29,30,30],
    1995:[31,32,31,32,31,30,30,30,29,29,30,30],
    1996:[31,32,31,32,31,30,30,30,29,30,29,31],
    1997:[31,31,32,31,31,31,30,29,30,29,30,30],
    1998:[31,31,32,31,31,31,30,29,30,29,30,30],
    1999:[31,32,31,32,31,30,30,30,29,29,30,31],
    2000:[30,32,31,32,31,30,30,30,29,30,29,31],
    2001:[31,31,32,31,31,31,30,29,30,29,30,30],
    2002:[31,31,32,32,31,30,30,29,30,29,30,30],
    2003:[31,32,31,32,31,30,30,30,29,29,30,31],
    2004:[30,32,31,32,31,30,30,30,29,30,29,31],
    2005:[31,31,32,31,31,31,30,29,30,29,30,30],
    2006:[31,31,32,32,31,30,30,29,30,29,30,30],
    2007:[31,32,31,32,31,30,30,30,29,29,30,31],
    2008:[31,31,31,32,31,31,29,30,30,29,29,31],
    2009:[31,31,32,31,31,31,30,29,30,29,30,30],
    2010:[31,31,32,32,31,30,30,29,30,29,30,30],
    2011:[31,32,31,32,31,30,30,30,29,29,30,31],
    2012:[31,31,31,32,31,31,29,30,30,29,30,30],
    2013:[31,31,32,31,31,31,30,29,30,29,30,30],
    2014:[31,31,32,32,31,30,30,29,30,29,30,30],
    2015:[31,32,31,32,31,30,30,30,29,29,30,31],
    2016:[31,31,31,32,31,31,29,30,30,29,30,30],
    2017:[31,31,32,31,31,31,30,29,30,29,30,30],
    2018:[31,32,31,32,31,30,30,29,30,29,30,30],
    2019:[31,32,31,32,31,30,30,30,29,30,29,31],
    2020:[31,31,31,32,31,31,30,29,30,29,30,30],
    2021:[31,31,32,31,31,31,30,29,30,29,30,30],
    2022:[31,32,31,32,31,30,30,30,29,29,30,30],
    2023:[31,32,31,32,31,30,30,30,29,30,29,31],
    2024:[31,31,31,32,31,31,30,29,30,29,30,30],
    2025:[31,31,32,31,31,31,30,29,30,29,30,30],
    2026:[31,32,31,32,31,30,30,30,29,29,30,31],
    2027:[30,32,31,32,31,30,30,30,29,30,29,31],
    2028:[31,31,32,31,31,31,30,29,30,29,30,30],
    2029:[31,31,32,31,32,30,30,29,30,29,30,30],
    2030:[31,32,31,32,31,30,30,30,29,29,30,31],
    2031:[30,32,31,32,31,30,30,30,29,30,29,31],
    2032:[31,31,32,31,31,31,30,29,30,29,30,30],
    2033:[31,31,32,32,31,30,30,29,30,29,30,30],
    2034:[31,32,31,32,31,30,30,30,29,29,30,31],
    2035:[30,32,31,32,31,31,29,30,30,29,29,31],
    2036:[31,31,32,31,31,31,30,29,30,29,30,30],
    2037:[31,31,32,32,31,30,30,29,30,29,30,30],
    2038:[31,32,31,32,31,30,30,30,29,29,30,31],
    2039:[31,31,31,32,31,31,29,30,30,29,30,30],
    2040:[31,31,32,31,31,31,30,29,30,29,30,30],
    2041:[31,31,32,32,31,30,30,29,30,29,30,30],
    2042:[31,32,31,32,31,30,30,30,29,29,30,31],
    2043:[31,31,31,32,31,31,29,30,30,29,30,30],
    2044:[31,31,32,31,31,31,30,29,30,29,30,30],
    2045:[31,32,31,32,31,30,30,29,30,29,30,30],
    2046:[31,32,31,32,31,30,30,30,29,29,30,31],
    2047:[31,31,31,32,31,31,30,29,30,29,30,30],
    2048:[31,31,32,31,31,31,30,29,30,29,30,30],
    2049:[31,32,31,32,31,30,30,30,29,29,30,30],
    2050:[31,32,31,32,31,30,30,30,29,30,29,31],
    2051:[31,31,31,32,31,31,30,29,30,29,30,30],
    2052:[31,31,32,31,31,31,30,29,30,29,30,30],
    2053:[31,32,31,32,31,30,30,30,29,29,30,30],
    2054:[31,32,31,32,31,30,30,30,29,30,29,31],
    2055:[31,31,32,31,31,31,30,29,30,29,30,30],
    2056:[31,31,32,31,32,30,30,29,30,29,30,30],
    2057:[31,32,31,32,31,30,30,30,29,29,30,31],
    2058:[30,32,31,32,31,30,30,30,29,30,29,31],
    2059:[31,31,32,31,31,31,30,29,30,29,30,30],
    2060:[31,31,32,32,31,30,30,29,30,29,30,30],
    2061:[31,32,31,32,31,30,30,30,29,29,30,31],
    2062:[30,32,31,32,31,31,29,30,29,30,29,31],
    2063:[31,31,32,31,31,31,30,29,30,29,30,30],
    2064:[31,31,32,32,31,30,30,29,30,29,30,30],
    2065:[31,32,31,32,31,30,30,30,29,29,30,31],
    2066:[31,31,31,32,31,31,29,30,30,29,29,31],
    2067:[31,31,32,31,31,31,30,29,30,29,30,30],
    2068:[31,31,32,32,31,30,30,29,30,29,30,30],
    2069:[31,32,31,32,31,30,30,30,29,29,30,31],
    2070:[31,31,31,32,31,31,29,30,30,29,30,30],
    2071:[31,31,32,31,31,31,30,29,30,29,30,30],
    2072:[31,32,31,32,31,30,30,29,30,29,30,30],
    2073:[31,32,31,32,31,30,30,30,29,29,30,31],
    2074:[31,31,31,32,31,31,30,29,30,29,30,30],
    2075:[31,31,32,31,31,31,30,29,30,29,30,30],
    2076:[31,32,31,32,31,30,30,30,29,29,30,30],
    2077:[31,32,31,32,31,30,30,30,29,30,29,31],
    2078:[31,31,31,32,31,31,30,29,30,29,30,30],
    2079:[31,31,32,31,31,31,30,29,30,29,30,30],
    2080:[31,32,31,32,31,30,30,30,29,29,30,30],
    2081:[31,32,31,32,31,30,30,30,29,30,29,31],
    2082:[31,31,32,31,31,31,30,29,30,29,30,30],
    2083:[31,31,32,31,31,31,30,29,30,29,30,30],
    2084:[31,31,32,31,31,30,30,30,29,30,30,30],
    2085:[31,32,31,32,30,31,30,30,29,30,30,30],
    2086:[30,32,31,32,31,30,30,30,29,30,30,30],
    2087:[31,31,32,31,31,31,30,30,29,30,30,30],
    2088:[30,31,32,32,30,31,30,30,29,30,30,30],
    2089:[30,32,31,32,31,30,30,30,29,30,30,30],
    2090:[30,32,31,32,31,30,30,30,29,30,30,30],
    2091:[31,31,32,31,31,31,30,30,29,30,30,30],
    2092:[30,31,32,32,31,30,30,30,29,30,30,30],
    2093:[30,32,31,32,31,30,30,30,29,30,30,30],
    2094:[31,31,32,31,31,30,30,30,29,30,30,30],
    2095:[31,31,32,31,31,31,30,29,30,30,30,30],
    2096:[31,31,32,32,31,30,30,29,30,29,30,30],
    2097:[31,32,31,32,31,30,30,30,29,30,30,30],
    2098:[31,31,32,31,31,31,29,30,29,30,29,31],
    2099:[31,31,32,31,31,31,30,29,29,30,30,30],
    2100:[31,32,31,32,30,31,30,29,30,29,30,30]
  };

  const meta = {
    minBsYear: 1970,
    maxBsYear: 2100,
    baseAdDate: { year: 1913, month: 4, day: 13 },
    baseBsDate: { year: 1970, month: 1, day: 1 }
  };

  // Holiday data — public holidays and festivals
  const holidayData = {
    // -- 2081 BS --------------------------------------------------------------─
    "2081-01-01": [{ title: "नयाँ वर्ष", titleEn: "New Year", type: "public_holiday", isHoliday: true }],
    "2081-01-04": [{ title: "मातातीर्थ औंसी", titleEn: "Matatirtha Aunsi (Mother's Day)", type: "public_holiday", isHoliday: true }],
    "2081-01-11": [{ title: "लोकतन्त्र दिवस", titleEn: "Loktantra Diwas", type: "public_holiday", isHoliday: true }],
    "2081-02-15": [{ title: "गणतन्त्र दिवस", titleEn: "Republic Day", type: "public_holiday", isHoliday: true }],
    "2081-06-03": [{ title: "संविधान दिवस", titleEn: "Constitution Day", type: "public_holiday", isHoliday: true }],
    "2081-06-24": [{ title: "फूलपाती", titleEn: "Phulpati (Dashain)", type: "festival", isHoliday: true }],
    "2081-06-27": [{ title: "विजया दशमी", titleEn: "Vijaya Dashami (Dashain)", type: "public_holiday", isHoliday: true }],
    "2081-07-15": [{ title: "लक्ष्मी पूजा", titleEn: "Laxmi Puja (Tihar)", type: "festival", isHoliday: true }],
    "2081-07-17": [{ title: "भाइटीका", titleEn: "Bhai Tika (Tihar)", type: "public_holiday", isHoliday: true }],
    "2081-09-10": [{ title: "क्रिसमस", titleEn: "Christmas Day", type: "public_holiday", isHoliday: true }],
    "2081-09-27": [{ title: "पृथ्वी जयन्ती", titleEn: "Prithvi Jayanti", type: "national_day", isHoliday: true }],
    "2081-11-07": [{ title: "प्रजातन्त्र दिवस", titleEn: "Prajatantra Diwas", type: "public_holiday", isHoliday: true }],

    // -- 2082 BS --------------------------------------------------------------─
    "2082-01-01": [{ title: "नयाँ वर्ष", titleEn: "New Year", type: "public_holiday", isHoliday: true }],
    "2082-01-04": [{ title: "मातातीर्थ औंसी", titleEn: "Matatirtha Aunsi (Mother's Day)", type: "public_holiday", isHoliday: true }],
    "2082-01-11": [{ title: "लोकतन्त्र दिवस", titleEn: "Loktantra Diwas", type: "public_holiday", isHoliday: true }],
    "2082-02-15": [{ title: "गणतन्त्र दिवस", titleEn: "Republic Day", type: "public_holiday", isHoliday: true }],
    "2082-06-03": [{ title: "संविधान दिवस", titleEn: "Constitution Day", type: "public_holiday", isHoliday: true }],
    "2082-06-15": [{ title: "फूलपाती", titleEn: "Phulpati (Dashain)", type: "festival", isHoliday: true }],
    "2082-06-18": [{ title: "विजया दशमी", titleEn: "Vijaya Dashami (Dashain)", type: "public_holiday", isHoliday: true }],
    "2082-07-05": [{ title: "लक्ष्मी पूजा", titleEn: "Laxmi Puja (Tihar)", type: "festival", isHoliday: true }],
    "2082-07-07": [{ title: "भाइटीका", titleEn: "Bhai Tika (Tihar)", type: "public_holiday", isHoliday: true }],
    "2082-09-10": [{ title: "क्रिसमस", titleEn: "Christmas Day", type: "public_holiday", isHoliday: true }],
    "2082-09-27": [{ title: "पृथ्वी जयन्ती", titleEn: "Prithvi Jayanti", type: "national_day", isHoliday: true }],
    "2082-11-07": [{ title: "प्रजातन्त्र दिवस", titleEn: "Prajatantra Diwas", type: "public_holiday", isHoliday: true }],

    // -- 2083 BS — corrected lunar dates --------------------------------------
    "2083-01-01": [{ title: "नयाँ वर्ष", titleEn: "New Year", type: "public_holiday", isHoliday: true }],
    "2083-01-04": [{ title: "मातातीर्थ औंसी", titleEn: "Matatirtha Aunsi (Mother's Day)", type: "public_holiday", isHoliday: true }],
    "2083-01-06": [{ title: "परशुराम जयन्ती", titleEn: "Parashurama Jayanti", type: "public_holiday", isHoliday: true }],
    "2083-01-11": [{ title: "लोकतन्त्र दिवस", titleEn: "Loktantra Diwas", type: "public_holiday", isHoliday: true }],
    "2083-01-18": [{ title: "बुद्ध जयन्ती", titleEn: "Buddha Jayanti", type: "public_holiday", isHoliday: true }],
    "2083-02-15": [{ title: "गणतन्त्र दिवस", titleEn: "Republic Day", type: "public_holiday", isHoliday: true }],
    "2083-03-15": [{ title: "राष्ट्रिय धान दिवस", titleEn: "National Paddy Day", type: "public_holiday", isHoliday: true }],
    "2083-04-05": [{ title: "नाग पञ्चमी", titleEn: "Nag Panchami", type: "public_holiday", isHoliday: true }],
    "2083-05-01": [{ title: "हरितालिका तीज", titleEn: "Haritalika Teej", type: "public_holiday", isHoliday: true }],
    "2083-05-12": [{ title: "जनै पूर्णिमा", titleEn: "Janai Purnima", type: "public_holiday", isHoliday: true }],
    "2083-06-03": [{ title: "संविधान दिवस", titleEn: "Constitution Day", type: "public_holiday", isHoliday: true }],
    "2083-06-31": [{ title: "फूलपाती", titleEn: "Fulpati (Dashain)", type: "festival", isHoliday: true }],
    "2083-07-01": [{ title: "महाअष्टमी", titleEn: "Maha Ashtami", type: "public_holiday", isHoliday: true }],
    "2083-07-03": [{ title: "महानवमी", titleEn: "Maha Navami", type: "public_holiday", isHoliday: true }],
    "2083-07-04": [{ title: "विजया दशमी", titleEn: "Vijaya Dashami (Dashain)", type: "public_holiday", isHoliday: true }],
    "2083-07-22": [{ title: "लक्ष्मी पूजा", titleEn: "Laxmi Puja (Deepawali)", type: "festival", isHoliday: true }],
    "2083-07-24": [{ title: "गोवर्धन पूजा", titleEn: "Govardhan Puja", type: "public_holiday", isHoliday: true }],
    "2083-07-25": [{ title: "भाइटीका", titleEn: "Bhai Tika (Tihar)", type: "public_holiday", isHoliday: true }],
    "2083-07-29": [{ title: "छठ पर्व", titleEn: "Chhath Parva", type: "public_holiday", isHoliday: true }],
    "2083-09-10": [{ title: "क्रिसमस", titleEn: "Christmas Day", type: "public_holiday", isHoliday: true }],
    "2083-09-15": [{ title: "तामु ल्होसार", titleEn: "Tamu Lhosar", type: "public_holiday", isHoliday: true }],
    "2083-09-27": [{ title: "पृथ्वी जयन्ती", titleEn: "Prithvi Jayanti", type: "national_day", isHoliday: true }],
    "2083-10-01": [{ title: "माघे संक्रान्ति", titleEn: "Maghe Sankranti", type: "public_holiday", isHoliday: true }],
    "2083-10-28": [{ title: "बसन्त पञ्चमी", titleEn: "Basanta Panchami / Saraswati Puja", type: "public_holiday", isHoliday: true }],
    "2083-10-16": [{ title: "शहिद दिवस", titleEn: "Martyrs Day", type: "national_day", isHoliday: true }],
    "2083-11-07": [{ title: "महाशिवरात्रि / प्रजातन्त्र दिवस", titleEn: "Maha Shivaratri / Prajatantra Diwas", type: "public_holiday", isHoliday: true }],
    "2083-11-14": [{ title: "फागु पूर्णिमा (होली)", titleEn: "Fagu Purnima (Holi)", type: "public_holiday", isHoliday: true }],
    "2083-11-25": [{ title: "ग्याल्पो ल्होसार", titleEn: "Gyalpo Lhosar", type: "public_holiday", isHoliday: true }],
    "2083-12-23": [{ title: "घोडे जात्रा", titleEn: "Ghode Jatra", type: "public_holiday", isHoliday: true }]
  };

  // -- Dynamic fallback: fixed-BS-date holidays for every year --------------
  for (let y = 1970; y <= 2100; y += 1) {
    const pad = (n) => String(n).padStart(2, "0");
    const set = (key, entry) => { if (!holidayData[key]) holidayData[key] = [entry]; };

    set(`${y}-01-01`, { title: "नयाँ वर्ष",        titleEn: "New Year",             type: "public_holiday", isHoliday: true });
    set(`${y}-01-04`, { title: "मातातीर्थ औंसी",   titleEn: "Matatirtha Aunsi",     type: "public_holiday", isHoliday: true });
    set(`${y}-01-11`, { title: "लोकतन्त्र दिवस",   titleEn: "Loktantra Diwas",      type: "public_holiday", isHoliday: true });
    set(`${y}-02-15`, { title: "गणतन्त्र दिवस",    titleEn: "Republic Day",          type: "public_holiday", isHoliday: true });
    set(`${y}-03-15`, { title: "राष्ट्रिय धान दिवस", titleEn: "National Paddy Day",  type: "public_holiday", isHoliday: true });
    set(`${y}-06-03`, { title: "संविधान दिवस",      titleEn: "Constitution Day",      type: "public_holiday", isHoliday: true });
    set(`${y}-09-10`, { title: "क्रिसमस",           titleEn: "Christmas Day",         type: "public_holiday", isHoliday: true });
    set(`${y}-09-27`, { title: "पृथ्वी जयन्ती",    titleEn: "Prithvi Jayanti",       type: "national_day",   isHoliday: true });
    set(`${y}-11-07`, { title: "प्रजातन्त्र दिवस", titleEn: "Prajatantra Diwas",    type: "public_holiday", isHoliday: true });
  }

  global.NDPData = {
    nepaliMonths,
    nepaliMonthsEn,
    nepaliWeekdays,
    nepaliWeekdaysEn,
    shortNepaliWeekdays,
    shortNepaliWeekdaysEn,
    nepaliDigits,
    englishMonthsNp,
    englishMonthsEn,
    calendarData,
    holidayData,
    meta
  };

}(typeof window !== 'undefined' ? window : this));


/* ─── ndp-utils.js ─── */
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


/* ─── ndp-core.js ─── */
/**
 * Universal Sambat SDK — ndp-core.js
 * Main datepicker engine: popup, inline, single/range/multiple modes,
 * 20+ themes, keyboard navigation, events, full API.
 * Expanded with 20 developer-focused features including presets, time picker, 
 * tithis, fiscal year, unicode forced digit toggles, and modal viewports.
 * Upgraded with range date-time selectors, 9 presets, future/past restriction toggles.
 */
(function (global) {
  'use strict';

  const U = global.NDPUtils;
  const D = global.NDPData;
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --─ Defaults ------------------------------------------------─
  const DEFAULTS = {
    theme: 'classic-light',
    lang: 'ne',
    mode: 'single',          // 'single' | 'range' | 'multiple'
    format: 'YYYY-MM-DD',
    inline: false,
    showAdDate: true,        // show mini AD date under each BS day
    showHolidays: false,
    showTodayBtn: true,
    showClearBtn: true,
    minDate: null,           // { year, month, day }
    maxDate: null,           // { year, month, day }
    disabledDates: [],       // array of { year, month, day }
    weekStart: 0,            // 0=Sun, 1=Mon
    placeholder: '',
    position: 'auto',        // 'auto' | 'bottom' | 'top'
    animate: true,
    closeOnSelect: true,     // for single/range modes
    onChange: null,
    onOpen: null,
    onClose: null,
    onRangeChange: null,
    onMonthChange: null,

    // 20 Premium Developer Features Defaults
    unicodeDates: null,      // true = force NP digits, false = force EN digits, null = follow lang
    showTithi: false,        // show traditional Lunar Tithi in tooltips
    showFiscalYear: false,   // show Nepalese Fiscal Year (आ.व. २०८०/८१) in footer
    enableTime: false,       // enable inline Time Picker
    timeFormat: 'HH:MM',     // time display format
    presets: false,          // enable range presets sidebar (in range mode)
    renderDay: null,         // custom renderer function(dayObj, cellElement)
    disabledDaysOfWeek: [],  // days of week to disable (0=Sun, 6=Sat)
    mobileFriendly: true,    // auto display as full-screen modal on mobile
    keyboardHelp: true,      // keyboard shortcuts drawer
    quickNav: true,          // month/year title quick selector menus
    autoMask: false,         // automatically format typed date strings
    exportAdInput: null,     // hidden selector to export synchronized AD date
    autoValidate: true,      // auto-apply error visual styles for bad dates
    highlightWeekends: true, // distinct style for weekends
    onToday: null,
    onClear: null,
    
    // Future & Past blocks
    futureOnly: false,       // disable today and all past dates
    pastOnly: false,         // disable today and all future dates
    disableHolidays: false   // true = disable all weekends & public holidays
  };

  // --─ Instance counter ------------------------------------------
  let instanceCount = 0;

  // --─ NepaliDatePicker Class ------------------------------------
  function NepaliDatePicker(element, options) {
    if (typeof element === 'string') element = document.querySelector(element);
    if (!element) throw new Error('NepaliDatePicker: element not found.');

    this._el = element;
    this._opts = Object.assign({}, DEFAULTS, options || {});
    
    // Compatibility option mappings
    if (options) {
      if (options.dateFormat) this._opts.format = options.dateFormat;
      if (options.onSelect) this._opts.onChange = options.onSelect;
      if (options.range === true) this._opts.mode = 'range';
      if (options.multiple === true) this._opts.mode = 'multiple';
      if (options.language === 'english') this._opts.lang = 'en';
      if (options.language === 'nepali') this._opts.lang = 'ne';
      if (options.unicodeDate === true) this._opts.unicodeDates = true;

      const parseDateOption = (val) => {
        if (!val) return null;
        if (typeof val === 'object' && val.year && val.month && val.day) {
          return { year: +val.year, month: +val.month, day: +val.day };
        }
        if (typeof val === 'string') {
          const parts = val.split(/[-/.]/);
          if (parts.length === 3) {
            if (parts[0].length === 4) {
              return { year: +parts[0], month: +parts[1], day: +parts[2] };
            } else if (parts[2].length === 4) {
              return { year: +parts[2], month: +parts[1], day: +parts[0] };
            }
          }
        }
        return null;
      };

      if (options.minDate) this._opts.minDate = parseDateOption(options.minDate);
      if (options.maxDate) this._opts.maxDate = parseDateOption(options.maxDate);

      if (options.disableDates && Array.isArray(options.disableDates)) {
        this._opts.disabledDates = options.disableDates.map(d => parseDateOption(d)).filter(Boolean);
      }
      if (options.animation) {
        this._opts.animationType = options.animation; // 'slide' | 'fade'
      }
    }

    this._id = 'ndp-' + (++instanceCount);
    this._today = U.getTodayBs();

    // State
    this._currentYear = this._today.year;
    this._currentMonth = this._today.month;
    this._selectedDate = null;
    this._rangeStart = null;
    this._rangeEnd = null;
    this._multiDates = [];
    this._hoverDate = null;
    this._isOpen = false;
    this._picker = null;
    this._backdrop = null;
    this._viewMode = 'days'; // 'days' | 'months' | 'years'

    // Time Picker State (Single selection)
    const now = new Date();
    this._selectedHour = now.getHours();
    this._selectedMinute = Math.floor(now.getMinutes() / 5) * 5; // round to nearest 5

    // Range Selection Time Picker State
    this._selectedStartHour = 12;
    this._selectedStartMinute = 0;
    this._selectedEndHour = 12;
    this._selectedEndMinute = 0;

    this._init();
  }

  // --─ Init ------------------------------------------------------
  NepaliDatePicker.prototype._init = function () {
    const el = this._el;
    const opts = this._opts;

    // Set up input element
    if (el.tagName === 'INPUT') {
      el.readOnly = !opts.autoMask;
      if (opts.placeholder) el.placeholder = opts.placeholder;
      el.setAttribute('autocomplete', 'off');
      el.addEventListener('click', () => this.open());
      el.addEventListener('keydown', (e) => this._handleInputKeydown(e));
      
      if (opts.autoMask) {
        this._bindAutoMask();
      }
    }

    if (opts.inline) {
      this._buildPicker();
      this._picker.classList.add('ndp-inline');
      el.parentNode.insertBefore(this._picker, el.nextSibling);
      el.style.display = 'none';
      this._render();
    }
  };

  // --─ Dynamic digit helper --------------------------------------
  NepaliDatePicker.prototype._toLocalNumber = function (val) {
    const opts = this._opts;
    if (opts.unicodeDates === true) return U.toNepali(val);
    if (opts.unicodeDates === false) return U.toEnglish(val);
    return U.toLocalNumber(val, opts.lang);
  };

  // --─ Dynamic date formatting based on unicodeDates ------------─
  NepaliDatePicker.prototype._formatBsDate = function (year, month, day, customHour, customMinute) {
    const opts = this._opts;
    const lang = opts.lang;
    const format = opts.format;
    const yStr = opts.unicodeDates === true ? U.toNepali(year) : (opts.unicodeDates === false ? U.toEnglish(year) : U.toLocalNumber(year, lang));
    const mStr = U.pad(month);
    const dStr = opts.unicodeDates === true ? U.toNepali(day) : (opts.unicodeDates === false ? U.toEnglish(day) : U.toLocalNumber(day, lang));
    const mName = U.getMonthName(month, lang);
    const yNum = yStr;
    const dNum = dStr;

    // Support for 7 specific hotel/restaurant booking AD formats with time
    if (typeof format === 'string' && format.includes('Time')) {
      const ad = U.bsToAd(year, month, day);
      const adDate = ad.date;
      const dd = String(adDate.getDate()).padStart(2, '0');
      const mm = String(adDate.getMonth() + 1).padStart(2, '0');
      const yyyy = adDate.getFullYear();
      
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[adDate.getMonth()];
      
      const hr = customHour !== undefined ? customHour : (this._selectedHour || 0);
      const min = customMinute !== undefined ? customMinute : (this._selectedMinute || 0);
      
      const h12 = hr % 12 || 12;
      const ampm = hr >= 12 ? 'PM' : 'AM';
      const time12 = `${String(h12).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ampm}`;
      const time24 = `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      
      switch (format) {
        case 'Day Month Year Time 12 hour':
          return `${dd} ${monthName} ${yyyy} - ${time12}`;
        case 'Month Day Year Time 12 hour':
          return `${monthName} ${dd} ${yyyy} - ${time12}`;
        case 'mm-dd-yyyy Time 12 hour':
          return `${mm}-${dd}-${yyyy} ${time12}`;
        case 'dd-mm-yyyy Time 12 hour':
          return `${dd}-${mm}-${yyyy} ${time12}`;
        case 'yyyy-dd-mm Time 12 hour':
          return `${yyyy}-${dd}-${mm} ${time12}`;
        case 'yyyy-mm-dd Time 12 hour':
          return `${yyyy}-${mm}-${dd} ${time12}`;
        case 'yyyy-mm-dd Time 24 hour':
          return `${yyyy}-${mm}-${dd} ${time24}`;
      }
    }

    switch (format) {
      case 'YYYY-MM-DD': 
        return `${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}-${mStr}-${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}`;
      case 'YYYY/MM/DD': 
        return `${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}/${mStr}/${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}`;
      case 'YYYY.MM.DD': 
        return `${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}.${mStr}.${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}`;
      case 'DD-MM-YYYY': 
        return `${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}-${mStr}-${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}`;
      case 'DD/MM/YYYY': 
        return `${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}/${mStr}/${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}`;
      case 'DD.MM.YYYY': 
        return `${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}.${mStr}.${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}`;
      case 'MM-DD-YYYY': 
        return `${mStr}-${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}-${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}`;
      case 'MM/DD/YYYY': 
        return `${mStr}/${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}/${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}`;
      case 'DD MMMM YYYY': {
        const ad = U.bsToAd(year, month, day);
        const adDate = ad.date;
        const adDayStr = U.pad(adDate.getDate());
        const adMonthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const adMonthName = adMonthNames[adDate.getMonth()];
        const adYearStr = adDate.getFullYear();
        return `${adDayStr} ${adMonthName} ${adYearStr}`;
      }
      case 'long': 
        return lang === 'en' ? `${mName} ${dNum}, ${yNum}` : `${yNum} ${mName} ${dNum} गते`;
      case 'short': 
        return `${yNum}/${opts.unicodeDates === true ? U.toNepali(month) : (opts.unicodeDates === false ? U.toEnglish(month) : U.toLocalNumber(month, lang))}/${dNum}`;
      default: 
        return `${opts.unicodeDates === true ? U.toNepali(year) : U.toEnglish(year)}-${mStr}-${opts.unicodeDates === true ? U.toNepali(day) : U.toEnglish(day)}`;
    }
  };

  // --─ Input Auto Masking ----------------------------------------
  NepaliDatePicker.prototype._bindAutoMask = function () {
    const el = this._el;
    const opts = this._opts;
    el.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 8) val = val.slice(0, 8);
      
      let formatted = '';
      if (val.length > 0) formatted += val.slice(0, 4);
      if (val.length >= 5) formatted += '-' + val.slice(4, 6);
      if (val.length >= 7) formatted += '-' + val.slice(6, 8);
      
      e.target.value = formatted;
      
      if (val.length === 8) {
        const y = +val.slice(0, 4);
        const m = +val.slice(4, 6);
        const d = +val.slice(6, 8);
        if (U.isValidBsDate(y, m, d)) {
          this._selectedDate = { year: y, month: m, day: d };
          this._currentYear = y;
          this._currentMonth = m;
          this._renderDays();
          if (opts.onChange) opts.onChange(this.getDate());
          this._syncAdExport();
          if (opts.autoValidate) el.classList.remove('ndp-input-error');
        } else {
          if (opts.autoValidate) el.classList.add('ndp-input-error');
        }
      } else {
        if (opts.autoValidate && val.length > 0) el.classList.add('ndp-input-error');
        else if (opts.autoValidate) el.classList.remove('ndp-input-error');
      }
    });
  };

  // --─ BS Fiscal Year Generator ----------------------------------
  NepaliDatePicker.prototype._getFiscalYear = function (year, month) {
    let fyStart, fyEnd;
    if (month >= 4) {
      fyStart = year;
      fyEnd = year + 1;
    } else {
      fyStart = year - 1;
      fyEnd = year;
    }
    const startStr = this._toLocalNumber(fyStart);
    const endStr = this._toLocalNumber(String(fyEnd).slice(2));
    return `आ.व. ${startStr}/${endStr}`;
  };

  // --─ Build Picker DOM ------------------------------------------
  NepaliDatePicker.prototype._buildPicker = function () {
    const opts = this._opts;
    const wrap = document.createElement('div');
    wrap.className = `ndp-picker ndp-theme-${opts.theme}`;
    if (opts.animationType === 'slide') {
      wrap.classList.add('ndp-anim-slide');
    } else if (opts.animationType === 'fade') {
      wrap.classList.add('ndp-anim-fade');
    }
    if (opts.presets && opts.mode === 'range') {
      wrap.classList.add('ndp-has-presets');
    }
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Nepali Date Picker');
    wrap.id = this._id + '-picker';

    // 1. Range Presets Sidebar HTML (9 Presets)
    let presetsHtml = '';
    if (opts.presets && opts.mode === 'range') {
      const isNp = opts.lang === 'ne';
      presetsHtml = `
        <div class="ndp-presets-sidebar">
          <button type="button" class="ndp-preset-btn" data-preset="today">${isNp ? 'आज (Today)' : 'Today'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="tomorrow">${isNp ? 'भोलि (Tomorrow)' : 'Tomorrow'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="thisWeek">${isNp ? 'यो हप्ता (This Wk)' : 'This Week'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="prevWeek">${isNp ? 'गत हप्ता (Prev Wk)' : 'Prev Week'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="thisMonth">${isNp ? 'यो महिना (This Mo)' : 'This Month'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="lastMonth">${isNp ? 'गत महिना (Last Mo)' : 'Last Month'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="last2Months">${isNp ? 'गत २ महिना' : 'Last 2 Mos'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="nextMonth">${isNp ? 'अर्को महिना (Next Mo)' : 'Next Month'}</button>
          <button type="button" class="ndp-preset-btn" data-preset="fiscalYear">${isNp ? 'यो आ.व. (Fiscal Yr)' : 'Fiscal Year'}</button>
        </div>
      `;
    }

    // 2. Time Picker HTML (Supports Range time picker)
    let timeHtml = '';
    if (opts.enableTime) {
      if (opts.mode === 'range') {
        const isNp = opts.lang === 'ne';
        let shOptions = '', smOptions = '';
        let ehOptions = '', emOptions = '';
        for (let h = 0; h < 24; h++) {
          shOptions += `<option value="${h}" ${h === this._selectedStartHour ? 'selected' : ''}>${U.pad(h)}</option>`;
          ehOptions += `<option value="${h}" ${h === this._selectedEndHour ? 'selected' : ''}>${U.pad(h)}</option>`;
        }
        for (let m = 0; m < 60; m += 5) {
          smOptions += `<option value="${m}" ${m === this._selectedStartMinute ? 'selected' : ''}>${U.pad(m)}</option>`;
          emOptions += `<option value="${m}" ${m === this._selectedEndMinute ? 'selected' : ''}>${U.pad(m)}</option>`;
        }
        timeHtml = `
          <div class="ndp-time-picker-row ndp-time-range-row">
            <div class="ndp-time-range-col">
              <span class="ndp-time-label">${isNp ? 'सुरु समय:' : 'Start:'}</span>
              <select class="ndp-time-select ndp-time-start-hour">${shOptions}</select>
              <span class="ndp-time-sep">:</span>
              <select class="ndp-time-select ndp-time-start-minute">${smOptions}</select>
            </div>
            <div class="ndp-time-range-col">
              <span class="ndp-time-label">${isNp ? 'अन्तिम समय:' : 'End:'}</span>
              <select class="ndp-time-select ndp-time-end-hour">${ehOptions}</select>
              <span class="ndp-time-sep">:</span>
              <select class="ndp-time-select ndp-time-end-minute">${emOptions}</select>
            </div>
          </div>
        `;
      } else {
        let hrOptions = '', minOptions = '';
        for (let h = 0; h < 24; h++) {
          hrOptions += `<option value="${h}" ${h === this._selectedHour ? 'selected' : ''}>${U.pad(h)}</option>`;
        }
        for (let m = 0; m < 60; m += 5) {
          minOptions += `<option value="${m}" ${m === this._selectedMinute ? 'selected' : ''}>${U.pad(m)}</option>`;
        }
        timeHtml = `
          <div class="ndp-time-picker-row">
            <span class="ndp-time-label">${opts.lang === 'ne' ? 'समय:' : 'Time:'}</span>
            <select class="ndp-time-select ndp-time-hour">${hrOptions}</select>
            <span class="ndp-time-sep">:</span>
            <select class="ndp-time-select ndp-time-minute">${minOptions}</select>
          </div>
        `;
      }
    }

    // 3. Keyboard Help button
    let kbHelpHtml = '';
    if (opts.keyboardHelp && !opts.inline) {
      kbHelpHtml = `<button class="ndp-kb-help-btn" type="button" title="Shortcuts">?</button>`;
    }

    // 4. Fiscal Year Indicator text
    let fyTextHtml = '';
    if (opts.showFiscalYear) {
      fyTextHtml = `<div class="ndp-footer-fy-text"></div>`;
    }

    wrap.innerHTML = `
      ${presetsHtml}
      <div class="ndp-main-container">
        <div class="ndp-header">
          <button class="ndp-nav-btn ndp-prev-year" type="button" aria-label="Previous year">&#8810;</button>
          <button class="ndp-nav-btn ndp-prev-month" type="button" aria-label="Previous month">&#8249;</button>
          <div class="ndp-title-area">
            <button class="ndp-title-year" type="button"></button>
            <button class="ndp-title-month" type="button"></button>
          </div>
          <button class="ndp-nav-btn ndp-next-month" type="button" aria-label="Next month">&#8250;</button>
          <button class="ndp-nav-btn ndp-next-year" type="button" aria-label="Next year">&#187;</button>
          ${kbHelpHtml}
        </div>
        <div class="ndp-body">
          <div class="ndp-weekdays"></div>
          <div class="ndp-days-grid"></div>
          <div class="ndp-months-grid ndp-hidden"></div>
          <div class="ndp-years-grid ndp-hidden"></div>
        </div>
        ${timeHtml}
        <div class="ndp-footer">
          <div class="ndp-footer-left">
            ${opts.showTodayBtn ? `<button class="ndp-today-btn" type="button">${opts.lang === 'ne' ? 'आज' : 'Today'}</button>` : ''}
            ${fyTextHtml}
          </div>
          <div class="ndp-footer-right">
            <span class="ndp-duration-badge ndp-hidden"></span>
            ${opts.showClearBtn ? `<button class="ndp-clear-btn" type="button">${opts.lang === 'ne' ? 'सफा' : 'Clear'}</button>` : ''}
          </div>
        </div>
      </div>
      
      <!-- Shortcuts panel -->
      <div class="ndp-kb-drawer ndp-hidden">
        <div class="ndp-kb-drawer-header">
          <span>${opts.lang === 'ne' ? 'सर्टकटहरू' : 'Shortcuts'}</span>
          <button type="button" class="ndp-kb-drawer-close">&times;</button>
        </div>
        <div class="ndp-kb-drawer-body">
          <div><span class="ndp-kb-key">Esc</span> ${opts.lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close picker'}</div>
          <div><span class="ndp-kb-key">←</span> ${opts.lang === 'ne' ? 'गत महिना' : 'Prev Month'}</div>
          <div><span class="ndp-kb-key">→</span> ${opts.lang === 'ne' ? 'अर्को महिना' : 'Next Month'}</div>
          <div><span class="ndp-kb-key">↑</span> ${opts.lang === 'ne' ? 'गत वर्ष' : 'Prev Year'}</div>
          <div><span class="ndp-kb-key">↓</span> ${opts.lang === 'ne' ? 'अर्को वर्ष' : 'Next Year'}</div>
        </div>
      </div>
    `;

    this._picker = wrap;
    this._bindPickerEvents();
  };

  // --─ Bind Events ----------------------------------------------─
  NepaliDatePicker.prototype._bindPickerEvents = function () {
    const p = this._picker;
    const opts = this._opts;

    p.querySelector('.ndp-prev-year').addEventListener('click', () => this._navigateYear(-1));
    p.querySelector('.ndp-next-year').addEventListener('click', () => this._navigateYear(1));
    p.querySelector('.ndp-prev-month').addEventListener('click', () => this._navigateMonth(-1));
    p.querySelector('.ndp-next-month').addEventListener('click', () => this._navigateMonth(1));
    
    if (!opts.quickNav) {
      p.querySelector('.ndp-title-year').addEventListener('click', () => this._showView('years'));
      p.querySelector('.ndp-title-month').addEventListener('click', () => this._showView('months'));
    }

    const todayBtn = p.querySelector('.ndp-today-btn');
    if (todayBtn) todayBtn.addEventListener('click', () => this._goToday());

    const clearBtn = p.querySelector('.ndp-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Presets Click Bindings
    if (opts.presets && opts.mode === 'range') {
      p.querySelectorAll('.ndp-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this._applyPreset(btn.dataset.preset);
        });
      });
    }

    // Time Dropdown Bindings (Single vs Range)
    if (opts.enableTime) {
      if (opts.mode === 'range') {
        const shSel = p.querySelector('.ndp-time-start-hour');
        const smSel = p.querySelector('.ndp-time-start-minute');
        const ehSel = p.querySelector('.ndp-time-end-hour');
        const emSel = p.querySelector('.ndp-time-end-minute');
        
        shSel.addEventListener('change', (e) => {
          this._selectedStartHour = +e.target.value;
          this._updateInput();
          this._syncAdExport();
        });
        smSel.addEventListener('change', (e) => {
          this._selectedStartMinute = +e.target.value;
          this._updateInput();
          this._syncAdExport();
        });
        ehSel.addEventListener('change', (e) => {
          this._selectedEndHour = +e.target.value;
          this._updateInput();
          this._syncAdExport();
        });
        emSel.addEventListener('change', (e) => {
          this._selectedEndMinute = +e.target.value;
          this._updateInput();
          this._syncAdExport();
        });
      } else {
        const hrSel = p.querySelector('.ndp-time-hour');
        const minSel = p.querySelector('.ndp-time-minute');
        hrSel.addEventListener('change', (e) => {
          this._selectedHour = +e.target.value;
          this._updateInput();
          if (opts.onChange && opts.mode === 'single') opts.onChange(this.getDate());
        });
        minSel.addEventListener('change', (e) => {
          this._selectedMinute = +e.target.value;
          this._updateInput();
          if (opts.onChange && opts.mode === 'single') opts.onChange(this.getDate());
        });
      }
    }

    // Keyboard shortcuts help drawer toggling
    const helpBtn = p.querySelector('.ndp-kb-help-btn');
    const drawer = p.querySelector('.ndp-kb-drawer');
    if (helpBtn && drawer) {
      helpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.toggle('ndp-hidden');
      });
      p.querySelector('.ndp-kb-drawer-close').addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.add('ndp-hidden');
      });
    }

    p.addEventListener('keydown', (e) => this._handlePickerKeydown(e));
    p.addEventListener('click', (e) => e.stopPropagation());
  };

  // --─ Render ----------------------------------------------------
  NepaliDatePicker.prototype._render = function () {
    if (this._viewMode === 'days') this._renderDays();
    else if (this._viewMode === 'months') this._renderMonths();
    else if (this._viewMode === 'years') this._renderYears();
    this._updateTitle();
  };

  // --─ Update Title / Quick Navigation --------------------------─
  NepaliDatePicker.prototype._updateTitle = function () {
    const opts = this._opts;
    const yearBtn = this._picker.querySelector('.ndp-title-year');
    const monthBtn = this._picker.querySelector('.ndp-title-month');

    if (opts.quickNav && this._viewMode === 'days') {
      // Quick jump select menus
      let yearSelect = `<select class="ndp-select-nav ndp-select-year">`;
      for (let y = D.meta.minBsYear; y <= D.meta.maxBsYear; y++) {
        yearSelect += `<option value="${y}" ${y === this._currentYear ? 'selected' : ''}>${this._toLocalNumber(y)}</option>`;
      }
      yearSelect += `</select>`;
      yearBtn.innerHTML = yearSelect;
      yearBtn.querySelector('select').addEventListener('change', (e) => {
        this._currentYear = +e.target.value;
        this._render();
      });

      let monthSelect = `<select class="ndp-select-nav ndp-select-month">`;
      for (let m = 1; m <= 12; m++) {
        monthSelect += `<option value="${m}" ${m === this._currentMonth ? 'selected' : ''}>${U.getMonthName(m, opts.lang)}</option>`;
      }
      monthSelect += `</select>`;
      monthBtn.innerHTML = monthSelect;
      monthBtn.querySelector('select').addEventListener('change', (e) => {
        this._currentMonth = +e.target.value;
        this._render();
      });
    } else {
      yearBtn.textContent = this._toLocalNumber(this._currentYear);
      monthBtn.textContent = U.getMonthName(this._currentMonth, opts.lang);
    }
  };

  NepaliDatePicker.prototype._showView = function (view) {
    this._viewMode = view;
    const daysGrid = this._picker.querySelector('.ndp-days-grid');
    const weekdays = this._picker.querySelector('.ndp-weekdays');
    const monthsGrid = this._picker.querySelector('.ndp-months-grid');
    const yearsGrid = this._picker.querySelector('.ndp-years-grid');

    daysGrid.classList.toggle('ndp-hidden', view !== 'days');
    weekdays.classList.toggle('ndp-hidden', view !== 'days');
    monthsGrid.classList.toggle('ndp-hidden', view !== 'months');
    yearsGrid.classList.toggle('ndp-hidden', view !== 'years');
    this._render();
  };

  // --─ Render Days ----------------------------------------------─
  NepaliDatePicker.prototype._renderDays = function () {
    const opts = this._opts;
    const { lang, showAdDate, showHolidays, weekStart, showTithi, showFiscalYear } = opts;
    const year = this._currentYear;
    const month = this._currentMonth;
    const totalDays = U.getDaysInMonth(year, month);
    const firstWeekday = U.getFirstWeekdayOfMonth(year, month);
    const today = this._today;

    // Fiscal Year display
    const fyText = this._picker.querySelector('.ndp-footer-fy-text');
    if (fyText && showFiscalYear) {
      fyText.textContent = this._getFiscalYear(year, month);
    }

    // Weekday headers
    const wdContainer = this._picker.querySelector('.ndp-weekdays');
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const wd = (i + weekStart) % 7;
      const name = U.getShortWeekdayName(wd, lang);
      const isSun = wd === 0;
      weekdays.push(`<div class="ndp-weekday${isSun ? ' ndp-weekday-holiday' : ''}">${name}</div>`);
    }
    wdContainer.innerHTML = weekdays.join('');

    // Day cells
    const grid = this._picker.querySelector('.ndp-days-grid');
    let html = '';

    // Leading empty cells
    let startOffset = (firstWeekday - weekStart + 7) % 7;
    for (let i = 0; i < startOffset; i++) {
      html += '<div class="ndp-day ndp-day-empty"></div>';
    }

    for (let d = 1; d <= totalDays; d++) {
      const weekday = (firstWeekday + d - 1) % 7;
      const adInfo = U.bsToAd(year, month, d);
      const holidays = [];
      const isWeekend = weekday === 0 || weekday === 6; // Sunday or Saturday
      const isHol = isWeekend;
      const isToday = year === today.year && month === today.month && d === today.day;

      // Selection state
      let isSelected = false, isRangeStart = false, isRangeEnd = false, isInRange = false, isHover = false;

      if (opts.mode === 'single' && this._selectedDate) {
        isSelected = U.compareBsDates({ year, month, day: d }, this._selectedDate) === 0;
      } else if (opts.mode === 'range') {
        if (this._rangeStart) isRangeStart = U.compareBsDates({ year, month, day: d }, this._rangeStart) === 0;
        if (this._rangeEnd) isRangeEnd = U.compareBsDates({ year, month, day: d }, this._rangeEnd) === 0;
        if (this._rangeStart && this._rangeEnd) {
          const cur = { year, month, day: d };
          isInRange = U.compareBsDates(cur, this._rangeStart) > 0 && U.compareBsDates(cur, this._rangeEnd) < 0;
        }
        // Hover range preview
        if (this._rangeStart && !this._rangeEnd && this._hoverDate) {
          const cur = { year, month, day: d };
          const hov = this._hoverDate;
          const cmp = U.compareBsDates(this._rangeStart, hov);
          if (cmp < 0) {
            isInRange = U.compareBsDates(cur, this._rangeStart) > 0 && U.compareBsDates(cur, hov) < 0;
            isHover = U.compareBsDates(cur, hov) === 0;
          } else {
            isInRange = U.compareBsDates(cur, hov) > 0 && U.compareBsDates(cur, this._rangeStart) < 0;
            isHover = U.compareBsDates(cur, hov) === 0;
          }
        }
      } else if (opts.mode === 'multiple') {
        isSelected = this._multiDates.some(md => U.compareBsDates({ year, month, day: d }, md) === 0);
      }

      // Disabled state
      let isDisabled = false;
      if (opts.minDate && U.compareBsDates({ year, month, day: d }, opts.minDate) < 0) isDisabled = true;
      if (opts.maxDate && U.compareBsDates({ year, month, day: d }, opts.maxDate) > 0) isDisabled = true;
      if (opts.disabledDates && opts.disabledDates.some(dd => U.compareBsDates({ year, month, day: d }, dd) === 0)) isDisabled = true;
      if (opts.disabledDaysOfWeek && opts.disabledDaysOfWeek.indexOf(weekday) >= 0) isDisabled = true;

      // Future Only / Past Only Checks
      if (opts.futureOnly && U.compareBsDates({ year, month, day: d }, today) <= 0) isDisabled = true;
      if (opts.pastOnly && U.compareBsDates({ year, month, day: d }, today) >= 0) isDisabled = true;

      // Custom disabler options
      if (opts.disableToday && U.compareBsDates({ year, month, day: d }, today) === 0) isDisabled = true;
      if (typeof opts.disableDaysBefore === 'number') {
        const adDate = U.bsToAdDate(year, month, d);
        if (U.daysDiffFromToday(adDate) < -opts.disableDaysBefore) isDisabled = true;
      }
      if (typeof opts.disableDaysAfter === 'number') {
        const adDate = U.bsToAdDate(year, month, d);
        if (U.daysDiffFromToday(adDate) > opts.disableDaysAfter) isDisabled = true;
      }

      // Disable public holidays and weekends if enabled
      if (opts.disableHolidays && isHol) isDisabled = true;

      // Lunar Tithi Calculation
      let tithiText = '';
      if (showTithi) {
        const totalDaysCount = U.getDaysFromBaseBs(year, month, d);
        const cycleLength = 29.5305888;
        const phase = (totalDaysCount + 24) % cycleLength;
        const tithiIndex = Math.floor((phase / cycleLength) * 30);
        const tithiNames = [
          'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)', 
          'पञ्चमी (Panchami)', 'षष्ठी (Shasthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)', 
          'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)', 
          'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'पूर्णिमा (Purnima)',
          'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)', 
          'पञ्चमी (Panchami)', 'षष्ठी (Shasthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)', 
          'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)', 
          'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'औंसी (Aunshi)'
        ];
        tithiText = tithiNames[tithiIndex] || '';
      }

      const classes = [
        'ndp-day',
        isToday ? 'ndp-today ndp-today-pulse' : '',
        isSelected ? 'ndp-selected' : '',
        isRangeStart ? 'ndp-range-start' : '',
        isRangeEnd ? 'ndp-range-end' : '',
        isInRange ? 'ndp-in-range' : '',
        isHover ? 'ndp-range-hover' : '',
        isHol && !isSelected ? 'ndp-holiday' : '',
        isWeekend && opts.highlightWeekends ? 'ndp-weekend' : '',
        isDisabled ? 'ndp-disabled' : '',
        holidays.some(h => h.type === 'festival') ? 'ndp-festival' : ''
      ].filter(Boolean).join(' ');

      const dayNum = this._toLocalNumber(d);
      const adDay = showAdDate ? `<span class="ndp-ad-day">${adInfo.day}</span>` : '';

      // Holiday indicators
      let dots = '';
      if (showHolidays && holidays.length > 0 && !isWeekend) {
        dots = `<span class="ndp-dots">${holidays.slice(0, 3).map(h =>
          `<span class="ndp-dot ndp-dot-${h.type}"></span>`
        ).join('')}</span>`;
      }

      // Tooltip aggregation
      let tooltipTitle = holidays.length > 0 && !isWeekend
        ? holidays.map(h => lang === 'en' ? (h.titleEn || h.title) : h.title).join(', ')
        : '';
      if (showTithi && tithiText) {
        tooltipTitle = tooltipTitle ? `${tooltipTitle} | ${tithiText}` : tithiText;
      }

      html += `<div class="${classes}" 
        data-year="${year}" data-month="${month}" data-day="${d}" 
        role="gridcell" tabindex="${isDisabled ? -1 : 0}"
        aria-label="${dayNum}"
        ${tooltipTitle ? `data-tooltip="${tooltipTitle}"` : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        ${isSelected ? 'aria-selected="true"' : ''}>
        <span class="ndp-day-num">${dayNum}</span>
        ${adDay}
        ${dots}
        ${tooltipTitle ? `<div class="ndp-tooltip">${tooltipTitle}</div>` : ''}
      </div>`;
    }

    grid.innerHTML = html;

    // Bind Day clicks & hover
    grid.querySelectorAll('.ndp-day:not(.ndp-disabled):not(.ndp-day-empty)').forEach(cell => {
      cell.addEventListener('click', () => {
        const y = +cell.dataset.year, m = +cell.dataset.month, dy = +cell.dataset.day;
        this._selectDate(y, m, dy);
      });
      if (opts.mode === 'range') {
        cell.addEventListener('mouseenter', () => {
          const y = +cell.dataset.year, m = +cell.dataset.month, dy = +cell.dataset.day;
          if (this._rangeStart && !this._rangeEnd) {
            this._hoverDate = { year: y, month: m, day: dy };
            this._updateHoverStyles();
          }
        });
      }
    });

    if (opts.mode === 'range') {
      grid.addEventListener('mouseleave', () => {
        if (this._rangeStart && !this._rangeEnd) {
          this._hoverDate = null;
          this._clearHoverStyles();
        }
      });
    }

    // Custom Day Renderer callback hook
    if (opts.renderDay) {
      grid.querySelectorAll('.ndp-day:not(.ndp-day-empty)').forEach(cell => {
        const y = +cell.dataset.year, m = +cell.dataset.month, dy = +cell.dataset.day;
        opts.renderDay({ year: y, month: m, day: dy, isToday: cell.classList.contains('ndp-today'), isDisabled: cell.classList.contains('ndp-disabled') }, cell);
      });
    }

    // Update range duration Badge
    this._updateDurationBadge();
  };

  // --─ Hover Range Styles Toggles --------------------------------─
  NepaliDatePicker.prototype._updateHoverStyles = function () {
    if (!this._rangeStart || this._rangeEnd || !this._hoverDate) return;
    
    const grid = this._picker.querySelector('.ndp-days-grid');
    if (!grid) return;

    const start = this._rangeStart;
    const hov = this._hoverDate;
    const cmp = U.compareBsDates(start, hov);

    grid.querySelectorAll('.ndp-day:not(.ndp-day-empty)').forEach(cell => {
      const y = +cell.dataset.year;
      const m = +cell.dataset.month;
      const d = +cell.dataset.day;
      const cur = { year: y, month: m, day: d };

      let isInRange = false;
      let isHover = false;

      if (cmp < 0) {
        isInRange = U.compareBsDates(cur, start) > 0 && U.compareBsDates(cur, hov) < 0;
        isHover = U.compareBsDates(cur, hov) === 0;
      } else {
        isInRange = U.compareBsDates(cur, hov) > 0 && U.compareBsDates(cur, start) < 0;
        isHover = U.compareBsDates(cur, hov) === 0;
      }

      cell.classList.toggle('ndp-in-range', isInRange);
      cell.classList.toggle('ndp-range-hover', isHover);
    });

    this._updateDurationBadge();
  };

  NepaliDatePicker.prototype._clearHoverStyles = function () {
    const grid = this._picker.querySelector('.ndp-days-grid');
    if (!grid) return;
    grid.querySelectorAll('.ndp-day').forEach(cell => {
      cell.classList.remove('ndp-in-range');
      cell.classList.remove('ndp-range-hover');
    });
    this._updateDurationBadge();
  };



  // --─ Range duration badge helper ------------------------------─
  NepaliDatePicker.prototype._updateDurationBadge = function () {
    const opts = this._opts;
    const durBadge = this._picker.querySelector('.ndp-duration-badge');
    if (!durBadge || opts.mode !== 'range') return;

    if (this._rangeStart && this._rangeEnd) {
      const adS = U.bsToAdDate(this._rangeStart.year, this._rangeStart.month, this._rangeStart.day);
      const adE = U.bsToAdDate(this._rangeEnd.year, this._rangeEnd.month, this._rangeEnd.day);
      const diffDays = Math.round(Math.abs(adE - adS) / MS_PER_DAY) + 1;
      const countStr = this._toLocalNumber(diffDays);
      durBadge.textContent = opts.lang === 'ne' ? `${countStr} दिन` : `${countStr} Days`;
      durBadge.classList.remove('ndp-hidden');
    } else if (this._rangeStart) {
      durBadge.textContent = opts.lang === 'ne' ? '१ दिन' : '1 Day';
      durBadge.classList.remove('ndp-hidden');
    } else {
      durBadge.classList.add('ndp-hidden');
    }
  };

  // --─ Apply Preset Range (9 Presets) ----------------------------
  NepaliDatePicker.prototype._applyPreset = function (type) {
    const today = this._today;
    let start, end;
    
    function addDays(bsDate, days) {
      const adObj = U.bsToAdDate(bsDate.year, bsDate.month, bsDate.day);
      adObj.setDate(adObj.getDate() + days);
      const result = U.adToBs(adObj);
      return { year: result.year, month: result.month, day: result.day };
    }

    switch (type) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'tomorrow':
        const tom = addDays(today, 1);
        start = tom;
        end = tom;
        break;
      case 'thisWeek': {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        start = U.adToBs(startOfWeek);
        end = U.adToBs(endOfWeek);
        break;
      }
      case 'prevWeek': {
        const now2 = new Date();
        const startOfPrevWeek = new Date(now2);
        startOfPrevWeek.setDate(now2.getDate() - now2.getDay() - 7);
        const endOfPrevWeek = new Date(startOfPrevWeek);
        endOfPrevWeek.setDate(startOfPrevWeek.getDate() + 6);
        start = U.adToBs(startOfPrevWeek);
        end = U.adToBs(endOfPrevWeek);
        break;
      }
      case 'thisMonth':
        start = { year: today.year, month: today.month, day: 1 };
        end = { year: today.year, month: today.month, day: U.getDaysInMonth(today.year, today.month) };
        break;
      case 'lastMonth': {
        let lm = today.month - 1;
        let ly = today.year;
        if (lm < 1) { lm = 12; ly--; }
        start = { year: ly, month: lm, day: 1 };
        end = { year: ly, month: lm, day: U.getDaysInMonth(ly, lm) };
        break;
      }
      case 'last2Months': {
        let lmEnd = today.month - 1;
        let lyEnd = today.year;
        if (lmEnd < 1) { lmEnd = 12; lyEnd--; }
        
        let lmStart = today.month - 2;
        let lyStart = today.year;
        if (lmStart < 1) {
          lmStart = lmStart === 0 ? 12 : 11;
          lyStart--;
        }
        start = { year: lyStart, month: lmStart, day: 1 };
        end = { year: lyEnd, month: lmEnd, day: U.getDaysInMonth(lyEnd, lmEnd) };
        break;
      }
      case 'nextMonth': {
        let nm = today.month + 1;
        let ny = today.year;
        if (nm > 12) { nm = 1; ny++; }
        start = { year: ny, month: nm, day: 1 };
        end = { year: ny, month: nm, day: U.getDaysInMonth(ny, nm) };
        break;
      }
      case 'fiscalYear':
        if (today.month >= 4) { // Shrawan
          start = { year: today.year, month: 4, day: 1 };
          end = { year: today.year + 1, month: 3, day: U.getDaysInMonth(today.year + 1, 3) };
        } else {
          start = { year: today.year - 1, month: 4, day: 1 };
          end = { year: today.year, month: 3, day: U.getDaysInMonth(today.year, 3) };
        }
        break;
    }
    
    this._rangeStart = start;
    this._rangeEnd = end;
    this._hoverDate = null;
    this._currentYear = end.year;
    this._currentMonth = end.month;
    
    this._updateInput();
    this._render();
    if (this._opts.onRangeChange) this._opts.onRangeChange(start, end);
    this._syncAdExport();
    if (this._opts.closeOnSelect) this.close();
  };

  // --─ Render Months --------------------------------------------
  NepaliDatePicker.prototype._renderMonths = function () {
    const { lang } = this._opts;
    const grid = this._picker.querySelector('.ndp-months-grid');
    let html = '';
    for (let m = 1; m <= 12; m++) {
      const isSelected = m === this._currentMonth;
      const isToday = this._currentYear === this._today.year && m === this._today.month;
      html += `<div class="ndp-month-cell ${isSelected ? 'ndp-selected' : ''} ${isToday ? 'ndp-today' : ''}" 
        data-month="${m}" role="button" tabindex="0">
        ${U.getMonthName(m, lang)}
      </div>`;
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.ndp-month-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        this._currentMonth = +cell.dataset.month;
        this._showView('days');
      });
    });
  };

  // --─ Render Years --------------------------------------------─
  NepaliDatePicker.prototype._renderYears = function () {
    const { lang } = this._opts;
    const grid = this._picker.querySelector('.ndp-years-grid');
    const startYear = Math.floor(this._currentYear / 12) * 12;
    let html = '';
    for (let y = startYear; y < startYear + 16; y++) {
      if (y < D.meta.minBsYear || y > D.meta.maxBsYear) {
        html += '<div class="ndp-year-cell ndp-disabled"></div>';
        continue;
      }
      const isSelected = y === this._currentYear;
      const isToday = y === this._today.year;
      html += `<div class="ndp-year-cell ${isSelected ? 'ndp-selected' : ''} ${isToday ? 'ndp-today' : ''}" 
        data-year="${y}" role="button" tabindex="0">
        ${this._toLocalNumber(y)}
      </div>`;
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.ndp-year-cell:not(.ndp-disabled)').forEach(cell => {
      cell.addEventListener('click', () => {
        this._currentYear = +cell.dataset.year;
        this._showView('months');
      });
    });
  };

  // --─ Date Selection ------------------------------------------─
  NepaliDatePicker.prototype._selectDate = function (year, month, day) {
    const opts = this._opts;

    if (opts.mode === 'single') {
      this._selectedDate = { year, month, day };
      this._updateInput();
      this._renderDays();
      if (opts.onChange) opts.onChange(this.getDate());
      this._syncAdExport();
      if (opts.closeOnSelect) this.close();

    } else if (opts.mode === 'range') {
      if (!this._rangeStart || (this._rangeStart && this._rangeEnd)) {
        this._rangeStart = { year, month, day };
        this._rangeEnd = null;
        this._hoverDate = null;
        this._updateInput();
        if (opts.onRangeChange) opts.onRangeChange(this._rangeStart, null);
        this._syncAdExport();
      } else {
        const cmp = U.compareBsDates({ year, month, day }, this._rangeStart);
        if (cmp < 0) {
          this._rangeStart = { year, month, day };
          this._rangeEnd = null;
          this._hoverDate = null;
          this._updateInput();
          if (opts.onRangeChange) opts.onRangeChange(this._rangeStart, null);
          this._syncAdExport();
          this._renderDays();
          return;
        } else if (cmp === 0) {
          this._rangeStart = null;
          this._hoverDate = null;
          this._updateInput();
          if (opts.onRangeChange) opts.onRangeChange(null, null);
          this._syncAdExport();
          this._renderDays();
          return;
        } else {
          this._rangeEnd = { year, month, day };
        }
        this._hoverDate = null;
        this._updateInput();
        if (opts.onRangeChange) opts.onRangeChange(this._rangeStart, this._rangeEnd);
        this._syncAdExport();
        if (opts.closeOnSelect) this.close();
      }
      this._renderDays();

    } else if (opts.mode === 'multiple') {
      const idx = this._multiDates.findIndex(md => U.compareBsDates({ year, month, day }, md) === 0);
      if (idx >= 0) this._multiDates.splice(idx, 1);
      else this._multiDates.push({ year, month, day });
      this._multiDates.sort((a, b) => U.compareBsDates(a, b));
      this._updateInput();
      this._renderDays();
      if (opts.onChange) opts.onChange(this.getDates());
    }
  };

  // --─ Update Input value ----------------------------------------
  NepaliDatePicker.prototype._updateInput = function () {
    const el = this._el;
    if (el.tagName !== 'INPUT') return;
    const opts = this._opts;
    const hasTimeInFormat = typeof opts.format === 'string' && opts.format.includes('Time');

    let timeSuffix = '';
    if (opts.enableTime && opts.mode !== 'range' && !hasTimeInFormat) {
      timeSuffix = ` ${U.pad(this._selectedHour)}:${U.pad(this._selectedMinute)}`;
    }

    if (opts.mode === 'single' && this._selectedDate) {
      const d = this._selectedDate;
      el.value = this._formatBsDate(d.year, d.month, d.day, this._selectedHour, this._selectedMinute) + timeSuffix;
      if (opts.autoValidate) el.classList.remove('ndp-input-error');
    } else if (opts.mode === 'range') {
      if (this._rangeStart && this._rangeEnd) {
        const s = this._rangeStart, e = this._rangeEnd;
        const sf = this._formatBsDate(s.year, s.month, s.day, this._selectedStartHour, this._selectedStartMinute);
        const ef = this._formatBsDate(e.year, e.month, e.day, this._selectedEndHour, this._selectedEndMinute);
        let startSuffix = '', endSuffix = '';
        if (opts.enableTime && !hasTimeInFormat) {
          startSuffix = ` ${U.pad(this._selectedStartHour)}:${U.pad(this._selectedStartMinute)}`;
          endSuffix = ` ${U.pad(this._selectedEndHour)}:${U.pad(this._selectedEndMinute)}`;
        }
        el.value = `${sf}${startSuffix} → ${ef}${endSuffix}`;
      } else if (this._rangeStart) {
        const s = this._rangeStart;
        const sf = this._formatBsDate(s.year, s.month, s.day, this._selectedStartHour, this._selectedStartMinute);
        let startSuffix = '';
        if (opts.enableTime && !hasTimeInFormat) {
          startSuffix = ` ${U.pad(this._selectedStartHour)}:${U.pad(this._selectedStartMinute)}`;
        }
        el.value = `${sf}${startSuffix} → …`;
      } else {
        el.value = '';
      }
    } else if (opts.mode === 'multiple') {
      el.value = this._multiDates.map(d =>
        this._formatBsDate(d.year, d.month, d.day)
      ).join(', ');
    }
  };

  // --─ Export AD Date synchronization ----------------------------
  NepaliDatePicker.prototype._syncAdExport = function () {
    const opts = this._opts;
    if (!opts.exportAdInput) return;
    const target = document.querySelector(opts.exportAdInput);
    if (!target) return;

    if (opts.mode === 'single' && this._selectedDate) {
      const ad = U.bsToAd(this._selectedDate.year, this._selectedDate.month, this._selectedDate.day);
      let timeSuffix = '';
      if (opts.enableTime) {
        timeSuffix = ` ${U.pad(this._selectedHour)}:${U.pad(this._selectedMinute)}`;
      }
      target.value = `${ad.year}-${U.pad(ad.month)}-${U.pad(ad.day)}${timeSuffix}`;
    } else if (opts.mode === 'range' && this._rangeStart && this._rangeEnd) {
      const adS = U.bsToAd(this._rangeStart.year, this._rangeStart.month, this._rangeStart.day);
      const adE = U.bsToAd(this._rangeEnd.year, this._rangeEnd.month, this._rangeEnd.day);
      let startSuffix = '', endSuffix = '';
      if (opts.enableTime) {
        startSuffix = ` ${U.pad(this._selectedStartHour)}:${U.pad(this._selectedStartMinute)}`;
        endSuffix = ` ${U.pad(this._selectedEndHour)}:${U.pad(this._selectedEndMinute)}`;
      }
      target.value = `${adS.year}-${U.pad(adS.month)}-${U.pad(adS.day)}${startSuffix} to ${adE.year}-${U.pad(adE.month)}-${U.pad(adE.day)}${endSuffix}`;
    } else {
      target.value = '';
    }
    // Dispatch native change event
    const event = new Event('change', { bubbles: true });
    target.dispatchEvent(event);
  };

  // --─ Navigation ----------------------------------------------─
  NepaliDatePicker.prototype._navigateMonth = function (dir) {
    this._currentMonth += dir;
    if (this._currentMonth > 12) { this._currentMonth = 1; this._currentYear++; }
    if (this._currentMonth < 1) { this._currentMonth = 12; this._currentYear--; }
    this._currentYear = Math.max(D.meta.minBsYear, Math.min(D.meta.maxBsYear, this._currentYear));
    this._showView('days');
    if (this._opts.onMonthChange) this._opts.onMonthChange(this._currentYear, this._currentMonth);
  };

  NepaliDatePicker.prototype._navigateYear = function (dir) {
    this._currentYear = Math.max(D.meta.minBsYear, Math.min(D.meta.maxBsYear, this._currentYear + dir));
    this._showView('days');
  };

  NepaliDatePicker.prototype._goToday = function () {
    this._currentYear = this._today.year;
    this._currentMonth = this._today.month;
    this._showView('days');
    
    if (this._opts.mode === 'single') {
      // Don't select if today is disabled (e.g. futureOnly is true)
      let isDisabled = false;
      const today = this._today;
      const opts = this._opts;
      const weekday = U.bsToAdDate(today.year, today.month, today.day).getDay();
      if (opts.disabledDaysOfWeek && opts.disabledDaysOfWeek.indexOf(weekday) >= 0) isDisabled = true;
      if (opts.futureOnly) isDisabled = true;
      
      if (!isDisabled) {
        this._selectedDate = { year: this._today.year, month: this._today.month, day: this._today.day };
        this._updateInput();
        this._syncAdExport();
        if (this._opts.onChange) this._opts.onChange(this.getDate());
        if (this._opts.closeOnSelect) this.close();
      }
    }
    if (this._opts.onToday) this._opts.onToday();
  };

  // --─ Open / Close / Modal layout positioning ------------------
  NepaliDatePicker.prototype.open = function () {
    if (this._isOpen) return;
    if (this._opts.inline) return;

    if (!this._picker) this._buildPicker();

    // Navigate to selections if available
    if (this._selectedDate) {
      this._currentYear = this._selectedDate.year;
      this._currentMonth = this._selectedDate.month;
    } else if (this._rangeStart) {
      this._currentYear = this._rangeStart.year;
      this._currentMonth = this._rangeStart.month;
    }

    this._viewMode = 'days';
    this._render();

    document.body.appendChild(this._picker);
    this._position();

    // Animate in
    requestAnimationFrame(() => {
      this._picker.classList.add('ndp-open');
    });

    this._isOpen = true;

    // Click outside handler
    this._outsideHandler = (e) => {
      if (!e.target || !document.contains(e.target)) return;
      const path = e.composedPath ? e.composedPath() : [];
      if (path.includes(this._picker) || path.includes(this._el)) return;
      if (this._picker.contains(e.target) || e.target === this._el) return;
      if (e.target.classList && e.target.classList.contains('ndp-select-nav')) return;
      this.close();
    };
    setTimeout(() => document.addEventListener('click', this._outsideHandler), 0);

    if (this._opts.onOpen) this._opts.onOpen();
  };

  NepaliDatePicker.prototype.close = function () {
    if (!this._isOpen || !this._picker) return;
    
    this._picker.classList.remove('ndp-open');
    this._picker.classList.add('ndp-closing');
    
    if (this._backdrop) {
      this._backdrop.classList.remove('ndp-backdrop-active');
    }

    setTimeout(() => {
      if (this._picker && this._picker.parentNode) {
        this._picker.parentNode.removeChild(this._picker);
      }
      if (this._backdrop && this._backdrop.parentNode) {
        this._backdrop.parentNode.removeChild(this._backdrop);
      }
      if (this._picker) this._picker.classList.remove('ndp-closing');
      this._backdrop = null;
      this._isOpen = false;
    }, 200);
    
    document.removeEventListener('click', this._outsideHandler);
    if (this._opts.onClose) this._opts.onClose();
    this._el.focus && this._el.focus();
  };

  NepaliDatePicker.prototype.toggle = function () {
    if (this._isOpen) this.close(); else this.open();
  };

  // --─ Position Calculation ------------------------------------─
  NepaliDatePicker.prototype._position = function () {
    const isMobile = window.innerWidth <= 640 && this._opts.mobileFriendly;
    
    if (isMobile) {
      this._picker.style.position = 'fixed';
      this._picker.style.top = '50%';
      this._picker.style.left = '50%';
      this._picker.style.transform = 'translate(-50%, -50%)';
      this._picker.style.zIndex = '999999';
      
      if (!this._backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = 'ndp-backdrop';
        this._backdrop.addEventListener('click', () => this.close());
        document.body.appendChild(this._backdrop);
      }
      requestAnimationFrame(() => {
        this._backdrop.classList.add('ndp-backdrop-active');
      });
    } else {
      if (this._backdrop && this._backdrop.parentNode) {
        this._backdrop.parentNode.removeChild(this._backdrop);
      }
      this._backdrop = null;
      this._picker.style.transform = '';
      
      const elRect = this._el.getBoundingClientRect();
      const pickerH = 320;
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      const wh = window.innerHeight;

      let top;
      const positionBelow = elRect.bottom + pickerH < wh || this._opts.position === 'bottom';

      if (positionBelow || this._opts.position === 'bottom') {
        top = elRect.bottom + scrollY + 6;
      } else {
        top = elRect.top + scrollY - pickerH - 6;
      }
      let left = elRect.left + scrollX;

      const pw = this._opts.presets && this._opts.mode === 'range' ? 440 : 300;
      if (left + pw > window.innerWidth) {
        left = window.innerWidth - pw - 8;
      }

      this._picker.style.position = 'absolute';
      this._picker.style.top = top + 'px';
      this._picker.style.left = left + 'px';
      this._picker.style.zIndex = '99999';
    }
  };

  // --─ Keyboard ------------------------------------------------─
  NepaliDatePicker.prototype._handleInputKeydown = function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.open(); }
    if (e.key === 'Escape') this.close();
  };

  NepaliDatePicker.prototype._handlePickerKeydown = function (e) {
    if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); this._navigateMonth(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this._navigateMonth(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); this._navigateYear(-1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._navigateYear(1); }
  };

  // --─ Public API Methods ----------------------------------------
  NepaliDatePicker.prototype.setDate = function (dateObj) {
    if (!dateObj) return;
    this._selectedDate = { year: +dateObj.year, month: +dateObj.month, day: +dateObj.day };
    this._currentYear = this._selectedDate.year;
    this._currentMonth = this._selectedDate.month;
    
    // Parse time if included
    if (this._opts.enableTime && dateObj.hour !== undefined) this._selectedHour = +dateObj.hour;
    if (this._opts.enableTime && dateObj.minute !== undefined) this._selectedMinute = +dateObj.minute;

    this._updateInput();
    this._syncAdExport();
    if (this._isOpen || this._opts.inline) this._render();
  };

  NepaliDatePicker.prototype.setMinDate = function (dateObj) {
    if (!dateObj) {
      this._opts.minDate = null;
    } else {
      this._opts.minDate = { year: +dateObj.year, month: +dateObj.month, day: +dateObj.day };
    }
    if (this._isOpen || this._opts.inline) this._render();
  };

  NepaliDatePicker.prototype.getDate = function () {
    if (!this._selectedDate) return null;
    const d = this._selectedDate;
    const adInfo = U.bsToAd(d.year, d.month, d.day);
    
    const result = {
      year: d.year, month: d.month, day: d.day,
      formatted: this._formatBsDate(d.year, d.month, d.day),
      adDate: adInfo
    };
    if (this._opts.enableTime) {
      result.hour = this._selectedHour;
      result.minute = this._selectedMinute;
      result.formattedTime = `${U.pad(this._selectedHour)}:${U.pad(this._selectedMinute)}`;
    }
    return result;
  };

  NepaliDatePicker.prototype.getDates = function () {
    return this._multiDates.map(d => ({
      year: d.year, month: d.month, day: d.day,
      formatted: this._formatBsDate(d.year, d.month, d.day)
    }));
  };

  NepaliDatePicker.prototype.getRange = function () {
    if (!this._rangeStart) return null;
    return { start: this._rangeStart, end: this._rangeEnd };
  };

  NepaliDatePicker.prototype.clear = function () {
    this._selectedDate = null;
    this._rangeStart = null;
    this._rangeEnd = null;
    this._multiDates = [];
    this._hoverDate = null;
    if (this._el.tagName === 'INPUT') {
      this._el.value = '';
      this._el.classList.remove('ndp-input-error');
    }
    this._syncAdExport();
    if (this._isOpen || this._opts.inline) this._render();
    if (this._opts.onClear) this._opts.onClear();
  };

  NepaliDatePicker.prototype.setTheme = function (theme) {
    if (!this._picker) return;
    const classes = Array.from(this._picker.classList);
    classes.forEach(c => { if (c.startsWith('ndp-theme-')) this._picker.classList.remove(c); });
    this._picker.classList.add('ndp-theme-' + theme);
    this._opts.theme = theme;
  };

  NepaliDatePicker.prototype.setLang = function (lang) {
    this._opts.lang = lang;
    if (this._isOpen || this._opts.inline) this._render();
  };

  NepaliDatePicker.prototype.jumpTo = function (year, month) {
    this._currentYear = year;
    this._currentMonth = month || 1;
    this._viewMode = 'days';
    if (this._isOpen || this._opts.inline) this._render();
  };

  NepaliDatePicker.prototype.destroy = function () {
    this.close();
    if (this._opts.inline && this._picker && this._picker.parentNode) {
      this._picker.parentNode.removeChild(this._picker);
    }
    if (this._el.tagName === 'INPUT') {
      this._el.readOnly = false;
      this._el.style.display = '';
      this._el.classList.remove('ndp-input-error');
    }
    this._picker = null;
  };

  // --─ Static utility exports ------------------------------------
  NepaliDatePicker.today = function () { return U.getTodayBs(); };
  NepaliDatePicker.bsToAd = function (y, m, d) { return U.bsToAd(y, m, d); };
  NepaliDatePicker.adToBs = function (date) { return U.adToBs(date); };
  NepaliDatePicker.version = '1.2.0';

  global.NepaliDatePicker = NepaliDatePicker;

}(typeof window !== 'undefined' ? window : this));


/* ─── ndp-converter-widget.js ─── */
/**
 * Universal Sambat SDK — ndp-converter-widget.js
 * Standalone AD ↔ BS date converter widget component.
 */
(function (global) {
  'use strict';

  const U = global.NDPUtils;
  const D = global.NDPData;

  function NepaliConverterWidget(container, options) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) throw new Error('NepaliConverterWidget: container not found.');

    this._container = container;
    this._opts = Object.assign({
      theme: 'classic-light',
      lang: 'ne',
      defaultMode: 'bs-to-ad',
      showDaysDiff: true,
      showWeekday: true,
      onConvert: null
    }, options || {});

    this._mode = this._opts.defaultMode;
    this._result = null;
    this._init();
  }

  NepaliConverterWidget.prototype._init = function () {
    this._container.className = `ndp-converter ndp-theme-${this._opts.theme}`;
    this._build();
    this._bind();
    this._switchMode(this._mode);
    this._convert();
  };

  NepaliConverterWidget.prototype._build = function () {
    const o = this._opts;
    this._container.innerHTML = `
      <div class="ndp-conv-header">
        <h3 class="ndp-conv-title">मिति रूपान्तरण र गणना</h3>
        <div class="ndp-conv-toggle" role="group">
          <button class="ndp-conv-tab active" data-mode="bs-to-ad" type="button">
            <span class="ndp-conv-tab-icon">🇳🇵</span> वि.सं. → ई.सं.
          </button>
          <button class="ndp-conv-tab" data-mode="ad-to-bs" type="button">
            <span class="ndp-conv-tab-icon">📅</span> ई.सं. → वि.सं.
          </button>
          <button class="ndp-conv-tab" data-mode="date-diff" type="button">
            <span class="ndp-conv-tab-icon">⏳</span> उमेर / मिति अन्तर
          </button>
        </div>
      </div>
      <div class="ndp-conv-body">
        <!-- 1. Single Date Converter Inputs -->
        <div class="ndp-conv-inputs-group" id="conv-inputs-single">
          <div class="ndp-conv-inputs">
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-year-lbl">वर्ष</label>
              <input class="ndp-conv-input" id="conv-year" type="number" min="1970" max="2100" placeholder="२०८३" />
            </div>
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-month-lbl">महिना</label>
              <select class="ndp-conv-select" id="conv-month"></select>
            </div>
            <div class="ndp-conv-field">
              <label class="ndp-conv-label" id="conv-day-lbl">गते / दिन</label>
              <select class="ndp-conv-select" id="conv-day"></select>
            </div>
          </div>
        </div>

        <!-- 2. Date Difference / Age Inputs -->
        <div class="ndp-conv-inputs-group ndp-hidden" id="conv-inputs-diff">
          <div class="ndp-conv-diff-row-label" style="font-size: 10px; font-weight: 600; color: var(--ndp-muted, #888); margin-bottom: 4px; text-transform: uppercase;">सुरु मिति / जन्म मिति (वि.सं.)</div>
          <div class="ndp-conv-inputs" style="margin-bottom: 12px;">
            <div class="ndp-conv-field">
              <input class="ndp-conv-input" id="conv-diff-start-year" type="number" min="1970" max="2100" placeholder="वर्ष" />
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-start-month"></select>
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-start-day"></select>
            </div>
          </div>

          <div class="ndp-conv-diff-row-label" style="font-size: 10px; font-weight: 600; color: var(--ndp-muted, #888); margin-bottom: 4px; text-transform: uppercase;">अन्तिम मिति / आज (वि.सं.)</div>
          <div class="ndp-conv-inputs">
            <div class="ndp-conv-field">
              <input class="ndp-conv-input" id="conv-diff-end-year" type="number" min="1970" max="2100" placeholder="वर्ष" />
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-end-month"></select>
            </div>
            <div class="ndp-conv-field">
              <select class="ndp-conv-select" id="conv-diff-end-day"></select>
            </div>
          </div>
        </div>

        <!-- Calculate Trigger Button -->
        <button class="ndp-conv-btn" id="conv-convert-btn" type="button">
          <span>⇄</span> रूपान्तरण / गणना गर्नुहोस्
        </button>

        <!-- Dynamic Results Containers -->
        <div class="ndp-conv-result ndp-conv-placeholder" id="conv-result">
          <div class="ndp-conv-placeholder-icon">🗓</div>
          <p id="conv-placeholder-text">माथिको मिति छान्नुहोस् र रूपान्तरण गर्नुहोस्।</p>
        </div>

        <!-- Single Conversion Result Card -->
        <div class="ndp-conv-result-card ndp-hidden" id="conv-result-card">
          <div class="ndp-conv-arrow-row">
            <div class="ndp-conv-from">
              <div class="ndp-conv-from-label" id="conv-from-label">वि.सं.</div>
              <div class="ndp-conv-date-wrapper">
                <span class="ndp-conv-from-date" id="conv-from-date"></span>
                <button class="ndp-conv-copy-btn" id="conv-copy-from" title="Copy Date" type="button">📋</button>
              </div>
            </div>
            <div class="ndp-conv-arrow">→</div>
            <div class="ndp-conv-to">
              <div class="ndp-conv-to-label" id="conv-to-label">ई.सं.</div>
              <div class="ndp-conv-date-wrapper">
                <span class="ndp-conv-to-date" id="conv-to-date"></span>
                <button class="ndp-conv-copy-btn" id="conv-copy-to" title="Copy Date" type="button">📋</button>
              </div>
            </div>
          </div>
          <div class="ndp-conv-meta">
            <span class="ndp-conv-meta-item" id="conv-weekday"></span>
            <span class="ndp-conv-meta-item" id="conv-days-diff"></span>
          </div>
        </div>

        <!-- Age / Date Difference Result Card -->
        <div class="ndp-conv-result-card ndp-hidden" id="conv-diff-card" style="padding: 16px;">
          <div style="text-align: center; margin-bottom: 12px; border-bottom: 1px solid var(--ndp-border, rgba(0,0,0,0.08)); padding-bottom: 10px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--ndp-muted, #999); letter-spacing: 0.05em; margin-bottom: 4px;">उमेर र समय अन्तराल</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--ndp-primary, #c0392b);" id="conv-diff-primary-val">0 वर्ष, 0 महिना, 0 दिन</div>
          </div>
          <div class="ndp-conv-meta" style="justify-content: center; gap: 8px;">
            <span class="ndp-conv-meta-item" id="conv-diff-total-days" style="font-weight: 600; font-size: 11px;"></span>
            <span class="ndp-conv-meta-item" id="conv-diff-status" style="font-weight: 600; font-size: 11px;"></span>
          </div>
        </div>

        <!-- Error Card -->
        <div class="ndp-conv-error ndp-hidden" id="conv-error">
          <span class="ndp-conv-error-icon">⚠</span>
          <span id="conv-error-msg"></span>
        </div>
      </div>
    `;
  };

  NepaliConverterWidget.prototype._bind = function () {
    const c = this._container;
    c.querySelectorAll('.ndp-conv-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this._switchMode(tab.dataset.mode);
        this._convert();
      });
    });

    c.querySelector('#conv-convert-btn').addEventListener('click', () => this._convert());

    // Single inputs listeners
    c.querySelector('#conv-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-year').addEventListener('input', () => { this._refreshDays(); this._convert(); });
    c.querySelector('#conv-month').addEventListener('change', () => { this._refreshDays(); this._convert(); });
    c.querySelector('#conv-day').addEventListener('change', () => { this._convert(); });

    // Diff start inputs listeners
    c.querySelector('#conv-diff-start-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-diff-start-year').addEventListener('input', () => { this._refreshDiffDays('start'); this._convert(); });
    c.querySelector('#conv-diff-start-month').addEventListener('change', () => { this._refreshDiffDays('start'); this._convert(); });
    c.querySelector('#conv-diff-start-day').addEventListener('change', () => { this._convert(); });

    // Diff end inputs listeners
    c.querySelector('#conv-diff-end-year').addEventListener('keydown', (e) => { if (e.key === 'Enter') this._convert(); });
    c.querySelector('#conv-diff-end-year').addEventListener('input', () => { this._refreshDiffDays('end'); this._convert(); });
    c.querySelector('#conv-diff-end-month').addEventListener('change', () => { this._refreshDiffDays('end'); this._convert(); });
    c.querySelector('#conv-diff-end-day').addEventListener('change', () => { this._convert(); });

    // Copies
    c.querySelector('#conv-copy-from').addEventListener('click', () => {
      const text = c.querySelector('#conv-from-date').textContent;
      this._copyText(text, c.querySelector('#conv-copy-from'));
    });
    c.querySelector('#conv-copy-to').addEventListener('click', () => {
      const text = c.querySelector('#conv-to-date').textContent;
      this._copyText(text, c.querySelector('#conv-copy-to'));
    });
  };

  NepaliConverterWidget.prototype._switchMode = function (mode) {
    this._mode = mode;
    const c = this._container;
    const today = U.getTodayBs();
    const adToday = new Date();

    c.querySelectorAll('.ndp-conv-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    this._hideResult();

    if (mode === 'date-diff') {
      c.querySelector('#conv-inputs-single').classList.add('ndp-hidden');
      c.querySelector('#conv-inputs-diff').classList.remove('ndp-hidden');
      c.querySelector('#conv-placeholder-text').textContent = 'मितिहरू छान्नुहोस् र अन्तर गणना गर्नुहोस्।';

      // Start Date (Defaults to Baisakh 1, 2040)
      const startYearInput = c.querySelector('#conv-diff-start-year');
      startYearInput.value = 2040;
      this._fillMonthOptionsForElement(c.querySelector('#conv-diff-start-month'), 'bs-to-ad', 1);
      this._fillDayOptionsForElement(c.querySelector('#conv-diff-start-day'), 'bs-to-ad', 2040, 1, 1);

      // End Date (Defaults to today)
      const endYearInput = c.querySelector('#conv-diff-end-year');
      endYearInput.value = today.year;
      this._fillMonthOptionsForElement(c.querySelector('#conv-diff-end-month'), 'bs-to-ad', today.month);
      this._fillDayOptionsForElement(c.querySelector('#conv-diff-end-day'), 'bs-to-ad', today.year, today.month, today.day);

    } else {
      c.querySelector('#conv-inputs-single').classList.remove('ndp-hidden');
      c.querySelector('#conv-inputs-diff').classList.add('ndp-hidden');
      c.querySelector('#conv-placeholder-text').textContent = 'माथिको मिति छान्नुहोस् र रूपान्तरण गर्नुहोस्।';

      if (mode === 'bs-to-ad') {
        c.querySelector('#conv-year-lbl').textContent = 'वर्ष (वि.सं.)';
        c.querySelector('#conv-month-lbl').textContent = 'महिना';
        c.querySelector('#conv-day-lbl').textContent = 'गते';
        const yearInput = c.querySelector('#conv-year');
        yearInput.min = D.meta.minBsYear;
        yearInput.max = D.meta.maxBsYear;
        yearInput.value = today.year;
        yearInput.placeholder = U.toNepali(today.year);
        this._fillMonthOptionsForElement(c.querySelector('#conv-month'), mode, today.month);
        this._fillDayOptionsForElement(c.querySelector('#conv-day'), mode, today.year, today.month, today.day);
      } else {
        c.querySelector('#conv-year-lbl').textContent = 'Year (AD)';
        c.querySelector('#conv-month-lbl').textContent = 'Month (AD)';
        c.querySelector('#conv-day-lbl').textContent = 'Day (AD)';
        const yearInput = c.querySelector('#conv-year');
        yearInput.min = 1900;
        yearInput.max = 2100;
        yearInput.value = adToday.getFullYear();
        yearInput.placeholder = adToday.getFullYear();
        this._fillMonthOptionsForElement(c.querySelector('#conv-month'), mode, adToday.getMonth() + 1);
        this._fillDayOptionsForElement(c.querySelector('#conv-day'), mode, adToday.getFullYear(), adToday.getMonth() + 1, adToday.getDate());
      }
    }
  };

  NepaliConverterWidget.prototype._fillMonthOptionsForElement = function (selectEl, mode, selectedMonth) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    const months = mode === 'bs-to-ad' ? D.nepaliMonths : D.englishMonthsEn;
    months.forEach((name, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = name;
      if (i + 1 === selectedMonth) opt.selected = true;
      selectEl.appendChild(opt);
    });
  };

  NepaliConverterWidget.prototype._fillDayOptionsForElement = function (selectEl, mode, year, month, selectedDay) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    let totalDays;
    if (mode === 'bs-to-ad') {
      totalDays = U.getDaysInMonth(+year, +month) || 30;
    } else {
      totalDays = new Date(+year, +month, 0).getDate();
    }
    for (let d = 1; d <= totalDays; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = mode === 'bs-to-ad' ? U.toNepali(d) : d;
      if (d === +selectedDay) opt.selected = true;
      selectEl.appendChild(opt);
    }
  };

  NepaliConverterWidget.prototype._refreshDays = function () {
    const c = this._container;
    const year = +c.querySelector('#conv-year').value;
    const month = +c.querySelector('#conv-month').value;
    const currentDay = +c.querySelector('#conv-day').value || 1;
    this._fillDayOptionsForElement(c.querySelector('#conv-day'), this._mode, year, month, currentDay);
  };

  NepaliConverterWidget.prototype._refreshDiffDays = function (prefix) {
    const c = this._container;
    const year = +c.querySelector(`#conv-diff-${prefix}-year`).value;
    const month = +c.querySelector(`#conv-diff-${prefix}-month`).value;
    const currentDay = +c.querySelector(`#conv-diff-${prefix}-day`).value || 1;
    this._fillDayOptionsForElement(c.querySelector(`#conv-diff-${prefix}-day`), 'bs-to-ad', year, month, currentDay);
  };

  NepaliConverterWidget.prototype._convert = function () {
    const c = this._container;
    this._hideResult();

    if (this._mode === 'date-diff') {
      const sy = +c.querySelector('#conv-diff-start-year').value;
      const sm = +c.querySelector('#conv-diff-start-month').value;
      const sd = +c.querySelector('#conv-diff-start-day').value;

      const ey = +c.querySelector('#conv-diff-end-year').value;
      const em = +c.querySelector('#conv-diff-end-month').value;
      const ed = +c.querySelector('#conv-diff-end-day').value;

      if (!U.isValidBsDate(sy, sm, sd) || !U.isValidBsDate(ey, em, ed)) {
        this._showError('कृपया मान्य वि.सं. सुरु र अन्तिम मितिहरू छान्नुहोस्।');
        return;
      }

      try {
        const startBs = { year: sy, month: sm, day: sd };
        const endBs = { year: ey, month: em, day: ed };

        // Calculate differences
        const totalDays = global.BS.DatesDiff(startBs, endBs);
        const diffObj = this._calcBsDiffDetailed(startBs, endBs);

        c.querySelector('#conv-result').classList.add('ndp-hidden');
        c.querySelector('#conv-diff-card').classList.remove('ndp-hidden');
        c.querySelector('#conv-error').classList.add('ndp-hidden');

        // Formatted String (e.g. ४२ वर्ष, ५ महिना, १२ दिन)
        const yrStr = diffObj.years > 0 ? `${U.toNepali(diffObj.years)} वर्ष ` : '';
        const moStr = diffObj.months > 0 ? `${U.toNepali(diffObj.months)} महिना ` : '';
        const dyStr = `${U.toNepali(diffObj.days)} दिन`;
        
        c.querySelector('#conv-diff-primary-val').textContent = (yrStr + moStr + dyStr).trim() || '० दिन';
        c.querySelector('#conv-diff-total-days').textContent = `⏱ कुल: ${U.toNepali(Math.abs(totalDays))} दिन`;
        
        let statusText = '';
        if (totalDays === 0) statusText = '• दुवै समान मिति हुन्';
        else if (totalDays > 0) statusText = '• भविष्यको अवधि';
        else statusText = '• ऐतिहासिक अवधि (उमेर)';
        c.querySelector('#conv-diff-status').textContent = statusText;

        this._result = { startBs, endBs, totalDays, detail: diffObj };
        if (this._opts.onConvert) this._opts.onConvert(this._result);
      } catch (err) {
        this._showError('मिति गणना गर्दा समस्या देखा पर्यो।');
      }

    } else {
      const year = +c.querySelector('#conv-year').value;
      const month = +c.querySelector('#conv-month').value;
      const day = +c.querySelector('#conv-day').value;

      try {
        if (this._mode === 'bs-to-ad') {
          if (!U.isValidBsDate(year, month, day)) {
            this._showError('कृपया मान्य वि.सं. मिति छान्नुहोस्।');
            return;
          }
          const ad = U.bsToAd(year, month, day);
          const bsStr = U.formatBsDate(year, month, day, 'ne', 'long');
          const adStr = U.formatAdDate(ad.date, 'en');
          const weekday = U.getWeekdayName(ad.weekday, 'ne');
          const diff = U.daysDiffFromToday(ad.date);
          this._showResult('वि.सं.', bsStr, 'ई.सं.', adStr, weekday, diff);
          this._result = { bsDate: { year, month, day }, adDate: ad };
          if (this._opts.onConvert) this._opts.onConvert(this._result);

        } else {
          if (!U.isValidAdDate(year, month, day)) {
            this._showError('यो ई.सं. मिति मान्य छैन।');
            return;
          }
          const adDate = new Date(year, month - 1, day);
          const bs = U.adToBs(adDate);
          const bsStr = U.formatBsDate(bs.year, bs.month, bs.day, 'ne', 'long');
          const adStr = U.formatAdDate(adDate, 'en');
          const weekday = U.getWeekdayName(adDate.getDay(), 'ne');
          const diff = U.daysDiffFromToday(adDate);
          this._showResult('ई.सं.', adStr, 'वि.सं.', bsStr, weekday, diff);
          this._result = { bsDate: bs, adDate: { year, month, day, date: adDate } };
          if (this._opts.onConvert) this._opts.onConvert(this._result);
        }
      } catch (e) {
        this._showError('यो मिति समर्थित दायराभन्दा बाहिर छ।');
      }
    }
  };

  NepaliConverterWidget.prototype._calcBsDiffDetailed = function (d1, d2) {
    let cmp = U.compareBsDates(d1, d2);
    let start = cmp <= 0 ? d1 : d2;
    let end = cmp <= 0 ? d2 : d1;

    let years = end.year - start.year;
    let months = end.month - start.month;
    let days = end.day - start.day;

    if (days < 0) {
      let prevMonth = end.month - 1;
      let prevYear = end.year;
      if (prevMonth < 1) {
        prevMonth = 12;
        prevYear--;
      }
      const daysInPrevMonth = U.getDaysInMonth(prevYear, prevMonth) || 30;
      days += daysInPrevMonth;
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, isNegative: cmp > 0 };
  };

  NepaliConverterWidget.prototype._showResult = function (fromLabel, fromDate, toLabel, toDate, weekday, diff) {
    const c = this._container;
    c.querySelector('#conv-result').classList.add('ndp-hidden');
    c.querySelector('#conv-result-card').classList.remove('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.add('ndp-hidden');
    c.querySelector('#conv-from-label').textContent = fromLabel;
    c.querySelector('#conv-from-date').textContent = fromDate;
    c.querySelector('#conv-to-label').textContent = toLabel;
    c.querySelector('#conv-to-date').textContent = toDate;
    c.querySelector('#conv-weekday').textContent = '📅 ' + weekday;
    let diffText = '';
    if (diff === 0) diffText = '• आज';
    else if (diff === 1) diffText = '• भोलि';
    else if (diff === -1) diffText = '• हिजो';
    else if (diff > 0) diffText = `• ${U.toNepali(diff)} दिन पछि`;
    else diffText = `• ${U.toNepali(Math.abs(diff))} दिन अगाडि`;
    c.querySelector('#conv-days-diff').textContent = diffText;
  };

  NepaliConverterWidget.prototype._showError = function (msg) {
    const c = this._container;
    c.querySelector('#conv-result').classList.add('ndp-hidden');
    c.querySelector('#conv-result-card').classList.add('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.remove('ndp-hidden');
    c.querySelector('#conv-error-msg').textContent = msg;
  };

  NepaliConverterWidget.prototype._hideResult = function () {
    const c = this._container;
    c.querySelector('#conv-result').classList.remove('ndp-hidden');
    c.querySelector('#conv-result-card').classList.add('ndp-hidden');
    c.querySelector('#conv-diff-card').classList.add('ndp-hidden');
    c.querySelector('#conv-error').classList.add('ndp-hidden');
  };

  NepaliConverterWidget.prototype._copyText = function (text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = '✓';
      btn.style.color = 'var(--ndp-success, #2ecc71)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.color = '';
      }, 2000);
    });
  };

  NepaliConverterWidget.prototype.setTheme = function (theme) {
    const classes = Array.from(this._container.classList);
    classes.forEach(cls => { if (cls.startsWith('ndp-theme-')) this._container.classList.remove(cls); });
    this._container.classList.add('ndp-theme-' + theme);
    this._opts.theme = theme;
  };

  NepaliConverterWidget.prototype.getResult = function () { return this._result; };

  global.NepaliConverterWidget = NepaliConverterWidget;

}(typeof window !== 'undefined' ? window : this));



const NepaliDatePicker, NepaliConverterWidget, AD2BS, BS2AD, Get2DigitNo, ConvertToUnicode, ConvertToNumber, NumberToWords, NumberToWordsUnicode, ParseDate, ConvertToDateObject = window.NepaliDatePicker, window.NepaliConverterWidget, window.AD2BS, window.BS2AD, window.Get2DigitNo, window.ConvertToUnicode, window.ConvertToNumber, window.NumberToWords, window.NumberToWordsUnicode, window.ParseDate, window.ConvertToDateObject;
export { NepaliDatePicker, NepaliConverterWidget, AD2BS, BS2AD, Get2DigitNo, ConvertToUnicode, ConvertToNumber, NumberToWords, NumberToWordsUnicode, ParseDate, ConvertToDateObject };
export default window.NepaliDatePicker;
