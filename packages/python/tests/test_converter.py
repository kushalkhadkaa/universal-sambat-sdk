"""Basic unit tests for the BS/AD converter engine."""

import datetime
import pytest

from nepali_datepicker.converter import (
    bs_to_ad, ad_to_bs, bs2ad, ad2bs, today_bs,
    is_valid_bs, days_diff, month_name, BsDate, AdDate,
)


def test_bs_to_ad_known():
    ad = bs_to_ad(2081, 1, 15)
    assert ad.year == 2024
    assert ad.month == 4
    assert ad.day == 28
    assert ad.iso == "2024-04-28"


def test_ad_to_bs_known():
    bs = ad_to_bs("2024-04-28")
    assert bs.year == 2081
    assert bs.month == 1
    assert bs.day == 15
    assert bs.iso == "2081-01-15"


def test_bs2ad_string():
    assert bs2ad("2081-01-15") == "2024-04-28"


def test_ad2bs_string():
    assert ad2bs("2024-04-28") == "2081-01-15"


def test_today_bs():
    bs = today_bs()
    assert isinstance(bs, BsDate)
    assert 2080 <= bs.year <= 2100


def test_is_valid_bs_valid():
    assert is_valid_bs(2081, 1, 15) is True


def test_is_valid_bs_invalid():
    assert is_valid_bs(2081, 1, 40) is False   # day too large
    assert is_valid_bs(1969, 1, 1) is False     # year out of range


def test_days_diff():
    diff = days_diff("2081-01-01", "2081-01-15")
    assert diff == 14


def test_month_name_ne():
    assert month_name(1, "ne") == "बैशाख"
    assert month_name(12, "ne") == "चैत"


def test_month_name_en():
    assert month_name(1, "en") == "Baisakh"
    assert month_name(12, "en") == "Chaitra"


def test_roundtrip():
    for bs_y in range(2078, 2086):
        for bs_m in range(1, 13):
            bs = BsDate(bs_y, bs_m, 1)
            ad = bs.to_ad()
            bs2 = ad_to_bs(ad.date)
            assert bs2.year == bs_y and bs2.month == bs_m and bs2.day == 1


def test_invalid_month():
    with pytest.raises(ValueError):
        bs_to_ad(2081, 13, 1)


def test_bs_date_str():
    assert str(BsDate(2081, 1, 15)) == "2081-01-15"


def test_ad_date_date_property():
    ad = AdDate(2024, 4, 28)
    assert ad.date == datetime.date(2024, 4, 28)
