package dev.kushalkhadka.nepalidatepicker

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronLeft
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private val BgColor     = Color(0xFF0f172a)
private val CardColor   = Color(0xFF1e293b)
private val AccentColor = Color(0xFF38bdf8)
private val TextColor   = Color(0xFFf8fafc)
private val MutedColor  = Color(0xFF64748b)

/**
 * NepaliDatePicker — Jetpack Compose composable
 *
 * Usage:
 *   var selected by remember { mutableStateOf<BsDate?>(null) }
 *   NepaliDatePicker(selected = selected, onDateSelected = { selected = it })
 */
@Composable
fun NepaliDatePicker(
  selected:       BsDate?        = null,
  onDateSelected: (BsDate) -> Unit,
  firstDate:      BsDate?        = null,
  lastDate:       BsDate?        = null,
  lang:           String         = "ne",
  modifier:       Modifier       = Modifier,
) {
  val today = remember { BsCalendarEngine.today() }
  var year  by remember { mutableIntStateOf(selected?.year  ?: today.year) }
  var month by remember { mutableIntStateOf(selected?.month ?: today.month) }

  val daysInMonth  = BS_CALENDAR_DATA[year]?.getOrNull(month - 1) ?: 30
  val firstWeekday = remember(year, month) {
    runCatching { BsCalendarEngine.bsToAd(year, month, 1).date.let {
      val c = java.util.Calendar.getInstance().apply { time = it }
      (c.get(java.util.Calendar.DAY_OF_WEEK) - 1)
    }}.getOrDefault(0)
  }
  val headers = if (lang == "en") listOf("Su","Mo","Tu","We","Th","Fr","Sa")
                else              listOf("आ","सो","मं","बु","बि","शु","श")

  Column(
    modifier = modifier.background(BgColor, RoundedCornerShape(16.dp)).padding(bottom = 16.dp)
  ) {
    // Navigation header
    Row(
      modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 12.dp),
      horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(onClick = { if (month == 1) { year--; month = 12 } else month-- }) {
        Icon(Icons.Default.ChevronLeft, null, tint = TextColor)
      }
      Text("${BsCalendarEngine.monthName(month, lang)} $year", color = TextColor, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
      IconButton(onClick = { if (month == 12) { year++; month = 1  } else month++ }) {
        Icon(Icons.Default.ChevronRight, null, tint = TextColor)
      }
    }

    // Weekday headers
    Row(Modifier.fillMaxWidth().padding(horizontal = 8.dp)) {
      headers.forEach { h ->
        Text(h, modifier = Modifier.weight(1f), textAlign = TextAlign.Center, color = MutedColor, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
      }
    }
    Spacer(Modifier.height(4.dp))

    // Day grid
    val cellCount = firstWeekday + daysInMonth
    LazyVerticalGrid(
      columns    = GridCells.Fixed(7),
      modifier   = Modifier.fillMaxWidth().height(((cellCount / 7 + 1) * 48).dp).padding(horizontal = 8.dp),
      verticalArrangement   = Arrangement.spacedBy(4.dp),
      horizontalArrangement = Arrangement.spacedBy(4.dp),
    ) {
      items(cellCount) { i ->
        if (i < firstWeekday) { Box(Modifier.size(40.dp)) } else {
          val day = i - firstWeekday + 1
          val isSelected = selected?.let { it.year == year && it.month == month && it.day == day } == true
          val isDisabled = run {
            val d = BsDate(year, month, day)
            (firstDate != null && BsCalendarEngine.daysDiff(firstDate, d) < 0) ||
            (lastDate  != null && BsCalendarEngine.daysDiff(d, lastDate)  < 0)
          }
          Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
              .height(40.dp).fillMaxWidth()
              .clip(RoundedCornerShape(8.dp))
              .background(if (isSelected) AccentColor else CardColor)
              .clickable(enabled = !isDisabled) { onDateSelected(BsDate(year, month, day)) }
          ) {
            Text("$day",
              color = if (isDisabled) MutedColor else if (isSelected) Color.White else TextColor,
              fontSize = 14.sp,
              fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
            )
          }
        }
      }
    }
  }
}

/** Dialog wrapper for NepaliDatePicker */
@Composable
fun NepaliDatePickerDialog(
  onDismiss:      () -> Unit,
  onDateSelected: (BsDate) -> Unit,
  initialDate:    BsDate?  = null,
  firstDate:      BsDate?  = null,
  lastDate:       BsDate?  = null,
  lang:           String   = "ne",
) {
  var selected by remember { mutableStateOf(initialDate) }
  AlertDialog(
    onDismissRequest = onDismiss,
    containerColor   = Color(0xFF0f172a),
    text = {
      NepaliDatePicker(
        selected       = selected,
        onDateSelected = { selected = it },
        firstDate      = firstDate,
        lastDate       = lastDate,
        lang           = lang,
      )
    },
    confirmButton = {
      TextButton(onClick = { selected?.let(onDateSelected); onDismiss() }) {
        Text("OK", color = AccentColor)
      }
    },
    dismissButton = {
      TextButton(onClick = onDismiss) { Text("Cancel", color = MutedColor) }
    }
  )
}
