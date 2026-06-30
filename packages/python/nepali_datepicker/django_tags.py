"""
Django integration for Universal Sambat SDK.

Features:
  - NepaliDateField  — form field with BS validation
  - BsDateInput      — form widget that renders the JS picker
  - bs_date validator (use with any CharField)
  - Template tag: {% load nepali_datepicker %} → {% bs_today %}
"""

from __future__ import annotations

from typing import Any, Optional

from django import forms
from django.core.exceptions import ValidationError
from django.utils.safestring import mark_safe

from .converter import bs_to_ad, ad_to_bs, today_bs, is_valid_bs, BsDate

# ──────────────────────────────────────────────────────────────────
# Widget
# ──────────────────────────────────────────────────────────────────

class BsDateInput(forms.TextInput):
    """
    TextInput that injects the NepaliDatePicker JS picker on render.

    Usage:
        class BookingForm(forms.Form):
            date = NepaliDateField(widget=BsDateInput(theme='ocean-blue'))
    """

    def __init__(self, theme: str = "classic-light", lang: str = "ne", attrs=None):
        self.theme = theme
        self.lang = lang
        super().__init__(attrs=attrs)

    def render(self, name, value, attrs=None, renderer=None):
        if attrs is None:
            attrs = {}
        attrs.setdefault("autocomplete", "off")
        attrs.setdefault("readonly", True)
        html = super().render(name, value, attrs, renderer)
        field_id = attrs.get("id") or f"id_{name}"
        script = f"""
<script>
(function(){{
  function init(){{
    if(typeof NepaliDatePicker==='undefined'){{return setTimeout(init,80);}}
    new NepaliDatePicker('#{field_id}',{{
      theme:{self.theme!r},lang:{self.lang!r}
    }});
  }}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
}})();
</script>"""
        return mark_safe(html + script)


# ──────────────────────────────────────────────────────────────────
# Form field
# ──────────────────────────────────────────────────────────────────

class NepaliDateField(forms.CharField):
    """
    Form field that accepts and validates BS dates (YYYY-MM-DD).
    Returns a BsDate instance on .clean().

    Usage:
        class BookingForm(forms.Form):
            booking_date = NepaliDateField(widget=BsDateInput())
    """

    default_error_messages = {
        "invalid": "Enter a valid Bikram Sambat date in YYYY-MM-DD format.",
    }

    def to_python(self, value: Any) -> Optional[BsDate]:
        value = super().to_python(value)
        if not value:
            return None
        try:
            parts = value.strip().split("-")
            if len(parts) != 3:
                raise ValueError
            y, m, d = map(int, parts)
            bs_to_ad(y, m, d)           # validates range + day
            return BsDate(y, m, d)
        except (ValueError, TypeError):
            raise ValidationError(self.error_messages["invalid"], code="invalid")

    def prepare_value(self, value):
        if isinstance(value, BsDate):
            return str(value)
        return value


# ──────────────────────────────────────────────────────────────────
# Model field
# ──────────────────────────────────────────────────────────────────

try:
    from django.db import models

    class BsDateModelField(models.CharField):
        """
        Django model field storing a BS date string 'YYYY-MM-DD'.

        Usage:
            class Booking(models.Model):
                bs_date = BsDateModelField(max_length=10)
        """

        description = "Bikram Sambat date (YYYY-MM-DD)"

        def __init__(self, *args, **kwargs):
            kwargs.setdefault("max_length", 10)
            super().__init__(*args, **kwargs)

        def formfield(self, **kwargs):
            kwargs.setdefault("form_class", NepaliDateField)
            kwargs.setdefault("widget", BsDateInput())
            return super().formfield(**kwargs)

        def validate(self, value, model_instance):
            super().validate(value, model_instance)
            try:
                y, m, d = map(int, value.split("-"))
                if not is_valid_bs(y, m, d):
                    raise ValueError
            except (ValueError, AttributeError):
                raise ValidationError(f"'{value}' is not a valid BS date (YYYY-MM-DD).")

except ImportError:
    pass   # Django not installed, skip model field


# ──────────────────────────────────────────────────────────────────
# DRF serializer field
# ──────────────────────────────────────────────────────────────────

try:
    from rest_framework import serializers

    class BsDateField(serializers.CharField):
        """
        DRF field for BS dates.

        Usage:
            class BookingSerializer(serializers.Serializer):
                date = BsDateField()
        """

        def to_internal_value(self, data):
            value = super().to_internal_value(data)
            try:
                y, m, d = map(int, value.split("-"))
                bs_to_ad(y, m, d)
                return BsDate(y, m, d)
            except Exception:
                self.fail("invalid", value=value)

        def to_representation(self, value):
            if isinstance(value, BsDate):
                return str(value)
            return value

except ImportError:
    pass


# ──────────────────────────────────────────────────────────────────
# Template tags (register via INSTALLED_APPS)
# ──────────────────────────────────────────────────────────────────

try:
    from django import template

    register = template.Library()

    @register.simple_tag
    def bs_today():
        """{% bs_today %} → '2081-03-14'"""
        return str(today_bs())

    @register.filter(name="bs_to_ad")
    def bs_to_ad_filter(value: str) -> str:
        """{{ '2081-01-15'|bs_to_ad }} → '2024-04-28'"""
        try:
            y, m, d = map(int, value.split("-"))
            return str(bs_to_ad(y, m, d))
        except Exception:
            return ""

    @register.filter(name="ad_to_bs")
    def ad_to_bs_filter(value) -> str:
        """{{ '2024-04-28'|ad_to_bs }} → '2081-01-15'"""
        try:
            return str(ad_to_bs(str(value)))
        except Exception:
            return ""

except ImportError:
    pass
