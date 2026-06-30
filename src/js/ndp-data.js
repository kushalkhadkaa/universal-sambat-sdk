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
