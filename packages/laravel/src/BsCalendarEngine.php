<?php

namespace KushalKhadka\NepaliDatePicker;

use DateTime;
use DateTimeZone;
use InvalidArgumentException;

/**
 * BsCalendarEngine — pure PHP BS/AD conversion
 * Base: 1970-01-01 BS = 1913-04-13 AD
 */
class BsCalendarEngine
{
    private const BASE_AD    = '1913-04-13';
    private const MIN_YEAR   = 1970;
    private const MAX_YEAR   = 2100;
    private const SEC_PER_DAY = 86400;

    private static array $data = [
        1970=>[31,31,32,31,31,31,30,29,30,29,30,30],1971=>[31,31,32,31,32,30,30,29,30,29,30,30],
        1972=>[31,32,31,32,31,30,30,30,29,29,30,31],1973=>[30,32,31,32,31,30,30,30,29,30,29,31],
        1974=>[31,31,32,31,31,31,30,29,30,29,30,30],1975=>[31,31,32,32,31,30,30,29,30,29,30,30],
        1976=>[31,32,31,32,31,30,30,30,29,29,30,31],1977=>[30,32,31,32,31,31,29,30,29,30,29,31],
        1978=>[31,31,32,31,31,31,30,29,30,29,30,30],1979=>[31,31,32,32,31,30,30,29,30,29,30,30],
        1980=>[31,32,31,32,31,30,30,30,29,29,30,31],1981=>[31,31,31,32,31,31,29,30,30,29,30,30],
        1990=>[31,31,32,31,31,31,30,29,30,29,30,30],2000=>[30,32,31,32,31,30,30,30,29,30,29,31],
        2010=>[31,31,32,32,31,30,30,29,30,29,30,30],2020=>[31,31,31,32,31,31,30,29,30,29,30,30],
        2030=>[31,32,31,32,31,30,30,30,29,29,30,31],2040=>[31,31,32,31,31,31,30,29,30,29,30,30],
        2050=>[31,32,31,32,31,30,30,30,29,30,29,31],2060=>[31,31,32,32,31,30,30,29,30,29,30,30],
        2070=>[31,31,31,32,31,31,29,30,30,29,30,30],2080=>[31,32,31,32,31,30,30,30,29,29,30,30],
        2081=>[31,32,31,32,31,30,30,30,29,30,29,31],2082=>[31,31,32,31,31,31,30,29,30,29,30,30],
        2083=>[31,31,32,31,31,31,30,29,30,29,30,30],2084=>[31,31,32,31,31,30,30,30,29,30,30,30],
        2085=>[31,32,31,32,30,31,30,30,29,30,30,30],2090=>[30,32,31,32,31,30,30,30,29,30,30,30],
        2100=>[31,32,31,32,30,31,30,29,30,29,30,30],
    ];

    private static array $monthsNe = ['बैशाख','जेठ','असार','साउन','भदौ','असोज','कार्तिक','मंसिर','पुस','माघ','फागुन','चैत'];
    private static array $monthsEn = ['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];

    private function daysInMonth(int $y, int $m): int
    {
        return self::$data[$y][$m - 1] ?? 0;
    }

    private function daysFromBase(int $y, int $m, int $d): int
    {
        $total = 0;
        for ($yr = self::MIN_YEAR; $yr < $y; $yr++) {
            $total += isset(self::$data[$yr]) ? array_sum(self::$data[$yr]) : 0;
        }
        for ($mo = 1; $mo < $m; $mo++) $total += $this->daysInMonth($y, $mo);
        return $total + $d - 1;
    }

    public function bsToAd(int $y, int $m, int $d): array
    {
        $dim = $this->daysInMonth($y, $m);
        if (!$dim) throw new InvalidArgumentException("BS $y-$m outside supported range.");
        if ($d < 1 || $d > $dim) throw new InvalidArgumentException("Day $d invalid for BS $y-$m.");
        $base = new DateTime(self::BASE_AD, new DateTimeZone('UTC'));
        $base->modify('+' . $this->daysFromBase($y, $m, $d) . ' days');
        return ['year' => (int)$base->format('Y'), 'month' => (int)$base->format('n'), 'day' => (int)$base->format('j'), 'iso' => $base->format('Y-m-d'), 'date' => $base];
    }

    public function adToBs(string|DateTime $date): array
    {
        $dt   = $date instanceof DateTime ? clone $date : new DateTime($date, new DateTimeZone('UTC'));
        $base = new DateTime(self::BASE_AD, new DateTimeZone('UTC'));
        $rem  = (int)$dt->diff($base)->days * ($dt >= $base ? 1 : -1);
        if ($rem < 0) throw new InvalidArgumentException('Date before supported BS range.');
        for ($y = self::MIN_YEAR; $y <= self::MAX_YEAR; $y++) {
            for ($m = 1; $m <= 12; $m++) {
                $dim = $this->daysInMonth($y, $m);
                if ($rem < $dim) { $day = $rem + 1; return ['year'=>$y,'month'=>$m,'day'=>$day,'iso'=>sprintf('%04d-%02d-%02d',$y,$m,$day)]; }
                $rem -= $dim;
            }
        }
        throw new InvalidArgumentException('Date after supported BS range.');
    }

    public function bs2ad(string $bs): string { [$y,$m,$d] = array_map('intval', explode('-', $bs)); return $this->bsToAd($y,$m,$d)['iso']; }
    public function ad2bs(string $ad): string { return $this->adToBs($ad)['iso']; }
    public function todayBs(): array { return $this->adToBs(new DateTime('now', new DateTimeZone('UTC'))); }
    public function isValidBs(int $y, int $m, int $d): bool { try { $this->bsToAd($y,$m,$d); return true; } catch (\Throwable) { return false; } }
    public function monthName(int $m, string $lang = 'ne'): string { return $lang === 'en' ? self::$monthsEn[$m-1] : self::$monthsNe[$m-1]; }
}
