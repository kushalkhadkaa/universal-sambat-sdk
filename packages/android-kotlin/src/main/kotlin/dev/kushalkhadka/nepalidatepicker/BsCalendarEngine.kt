package dev.kushalkhadka.nepalidatepicker

import java.util.Calendar
import java.util.Date

// Base: 1970-01-01 BS = 1913-04-13 AD
private val BASE_AD: Date by lazy {
  Calendar.getInstance().apply { set(1913, 3, 13, 0, 0, 0); set(Calendar.MILLISECOND, 0) }.time
}
private const val MS_PER_DAY = 86_400_000L
private const val MIN_YEAR   = 1970
private const val MAX_YEAR   = 2100

val BS_CALENDAR_DATA: Map<Int, IntArray> = mapOf(
  1970 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  1971 to intArrayOf(31,31,32,31,32,30,30,29,30,29,30,30),
  1972 to intArrayOf(31,32,31,32,31,30,30,30,29,29,30,31),
  1973 to intArrayOf(30,32,31,32,31,30,30,30,29,30,29,31),
  1974 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  1975 to intArrayOf(31,31,32,32,31,30,30,29,30,29,30,30),
  1976 to intArrayOf(31,32,31,32,31,30,30,30,29,29,30,31),
  1980 to intArrayOf(31,32,31,32,31,30,30,30,29,29,30,31),
  1990 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  2000 to intArrayOf(30,32,31,32,31,30,30,30,29,30,29,31),
  2010 to intArrayOf(31,31,32,32,31,30,30,29,30,29,30,30),
  2020 to intArrayOf(31,31,31,32,31,31,30,29,30,29,30,30),
  2030 to intArrayOf(31,32,31,32,31,30,30,30,29,29,30,31),
  2040 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  2050 to intArrayOf(31,32,31,32,31,30,30,30,29,30,29,31),
  2060 to intArrayOf(31,31,32,32,31,30,30,29,30,29,30,30),
  2070 to intArrayOf(31,31,31,32,31,31,29,30,30,29,30,30),
  2080 to intArrayOf(31,32,31,32,31,30,30,30,29,29,30,30),
  2081 to intArrayOf(31,32,31,32,31,30,30,30,29,30,29,31),
  2082 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  2083 to intArrayOf(31,31,32,31,31,31,30,29,30,29,30,30),
  2084 to intArrayOf(31,31,32,31,31,30,30,30,29,30,30,30),
  2085 to intArrayOf(31,32,31,32,30,31,30,30,29,30,30,30),
  2090 to intArrayOf(30,32,31,32,31,30,30,30,29,30,30,30),
  2100 to intArrayOf(31,32,31,32,30,31,30,29,30,29,30,30),
)

val BS_MONTHS_NE = listOf("बैशाख","जेठ","असार","साउन","भदौ","असोज","कार्तिक","मंसिर","पुस","माघ","फागुन","चैत")
val BS_MONTHS_EN = listOf("Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra")

data class BsDate(val year: Int, val month: Int, val day: Int, val weekday: Int = 0) {
  val iso: String get() = "%04d-%02d-%02d".format(year, month, day)
  override fun toString() = iso
}

data class AdDate(val year: Int, val month: Int, val day: Int, val date: Date) {
  val iso: String get() = "%04d-%02d-%02d".format(year, month, day)
}

object BsCalendarEngine {
  private fun daysInMonth(y: Int, m: Int): Int = BS_CALENDAR_DATA[y]?.getOrNull(m - 1) ?: 0

  private fun daysFromBase(y: Int, m: Int, d: Int): Int {
    var total = 0
    for (yr in MIN_YEAR until y) total += BS_CALENDAR_DATA[yr]?.sum() ?: 0
    for (mo in 1 until m) total += daysInMonth(y, mo)
    return total + d - 1
  }

  fun bsToAd(year: Int, month: Int, day: Int): AdDate {
    val dim = daysInMonth(year, month)
    require(dim > 0)  { "BS $year-$month outside supported range." }
    require(day in 1..dim) { "Day $day invalid for BS $year-$month." }
    val ms   = BASE_AD.time + daysFromBase(year, month, day) * MS_PER_DAY
    val date = Date(ms)
    val cal  = Calendar.getInstance().apply { time = date }
    return AdDate(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1, cal.get(Calendar.DAY_OF_MONTH), date)
  }

  fun adToBs(date: Date): BsDate {
    val cal = Calendar.getInstance().apply { time = date; set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0); set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0) }
    var rem = ((cal.time.time - BASE_AD.time) / MS_PER_DAY).toInt()
    require(rem >= 0) { "Date before supported BS range." }
    val wd  = (cal.get(Calendar.DAY_OF_WEEK) - 1)
    for (y in MIN_YEAR..MAX_YEAR) {
      for (m in 1..12) {
        val dim = daysInMonth(y, m)
        if (rem < dim) return BsDate(y, m, rem + 1, wd)
        rem -= dim
      }
    }
    error("Date after supported BS range.")
  }

  fun today(): BsDate = adToBs(Date())

  fun isValid(year: Int, month: Int, day: Int): Boolean = runCatching { bsToAd(year, month, day) }.isSuccess

  fun daysDiff(from: BsDate, to: BsDate): Int {
    val a = bsToAd(from.year, from.month, from.day)
    val b = bsToAd(to.year, to.month, to.day)
    return ((b.date.time - a.date.time) / MS_PER_DAY).toInt()
  }

  fun monthName(month: Int, lang: String = "ne"): String =
    if (lang == "en") BS_MONTHS_EN[month - 1] else BS_MONTHS_NE[month - 1]
}
