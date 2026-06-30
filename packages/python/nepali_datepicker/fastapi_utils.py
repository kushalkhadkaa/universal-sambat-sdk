"""
FastAPI integration helpers for Nepali DatePicker Studio.

Features:
  - BsDateStr  — Annotated type for use in Pydantic models / path params
  - bs_to_ad / ad_to_bs route helpers
  - A ready-made APIRouter with /bs-to-ad and /ad-to-bs endpoints

Usage:
    from nepali_datepicker.fastapi_utils import router as ndp_router
    app.include_router(ndp_router, prefix="/dates", tags=["dates"])
"""

from __future__ import annotations

from typing import Annotated, Optional
from datetime import date

try:
    from fastapi import APIRouter, HTTPException, Query
    from pydantic import BaseModel, field_validator
    from .converter import bs_to_ad as _bs_to_ad, ad_to_bs as _ad_to_bs, today_bs, BsDate, AdDate

    # ── Pydantic model ────────────────────────────────────────────────

    class BsDateModel(BaseModel):
        year: int
        month: int
        day: int

        @field_validator("month")
        @classmethod
        def month_range(cls, v):
            if not 1 <= v <= 12:
                raise ValueError("month must be 1–12")
            return v

        def to_bs_date(self) -> BsDate:
            return BsDate(self.year, self.month, self.day)

    class BsToAdResponse(BaseModel):
        bs: str
        ad: str
        ad_year: int
        ad_month: int
        ad_day: int

    class AdToBsResponse(BaseModel):
        ad: str
        bs: str
        bs_year: int
        bs_month: int
        bs_day: int

    # ── Router ────────────────────────────────────────────────────────

    router = APIRouter()

    @router.get("/bs-to-ad", response_model=BsToAdResponse)
    def route_bs_to_ad(
        year:  int = Query(..., ge=1970, le=2100),
        month: int = Query(..., ge=1, le=12),
        day:   int = Query(..., ge=1, le=32),
    ):
        """Convert BS date to AD date."""
        try:
            ad = _bs_to_ad(year, month, day)
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
        bs_str = f"{year:04d}-{month:02d}-{day:02d}"
        return BsToAdResponse(bs=bs_str, ad=str(ad), ad_year=ad.year, ad_month=ad.month, ad_day=ad.day)

    @router.get("/ad-to-bs", response_model=AdToBsResponse)
    def route_ad_to_bs(
        date_str: str = Query(..., alias="date", description="AD date in YYYY-MM-DD format"),
    ):
        """Convert AD date to BS date."""
        try:
            ad_date = date.fromisoformat(date_str)
            bs = _ad_to_bs(ad_date)
        except (ValueError, TypeError) as e:
            raise HTTPException(status_code=422, detail=str(e))
        return AdToBsResponse(ad=date_str, bs=str(bs), bs_year=bs.year, bs_month=bs.month, bs_day=bs.day)

    @router.get("/today-bs")
    def route_today_bs():
        """Return today's date in Bikram Sambat."""
        bs = today_bs()
        return {"bs": str(bs), "year": bs.year, "month": bs.month, "day": bs.day}

except ImportError:
    # fastapi or pydantic not installed
    router = None  # type: ignore
