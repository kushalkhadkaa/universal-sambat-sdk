"""
universal-sambat-sdk — Python/Django/Flask BS/AD conversion + form widgets

Quick start:
    from nepali_datepicker import bs_to_ad, ad_to_bs, today_bs
"""

from .converter import (
    bs_to_ad,
    ad_to_bs,
    bs2ad,
    ad2bs,
    today_bs,
    is_valid_bs,
    days_diff,
    month_name,
    BsDate,
    AdDate,
)

__all__ = [
    "bs_to_ad", "ad_to_bs", "bs2ad", "ad2bs",
    "today_bs", "is_valid_bs", "days_diff", "month_name",
    "BsDate", "AdDate",
]

__version__ = "1.2.0"
