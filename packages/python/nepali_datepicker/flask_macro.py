"""
Flask/Jinja2 helpers for Nepali DatePicker Studio.

Usage in Flask app:
    from nepali_datepicker.flask_macro import init_app
    init_app(app)          # registers globals + filters

Usage in Jinja2 template:
    {{ bs_today() }}                   → '2081-03-14'
    {{ '2081-01-15' | bs_to_ad }}      → '2024-04-28'
    {{ '2024-04-28' | ad_to_bs }}      → '2081-01-15'
    {{ nepali_datepicker_input('booking_date', theme='ocean-blue') }}
"""

from __future__ import annotations

from markupsafe import Markup

from .converter import bs_to_ad as _bs_to_ad, ad_to_bs as _ad_to_bs, today_bs


def _bs_to_ad_filter(value: str) -> str:
    try:
        y, m, d = map(int, value.split("-"))
        return str(_bs_to_ad(y, m, d))
    except Exception:
        return ""


def _ad_to_bs_filter(value: str) -> str:
    try:
        return str(_ad_to_bs(str(value)))
    except Exception:
        return ""


def _datepicker_input(
    name: str,
    value: str = "",
    theme: str = "classic-light",
    lang: str = "ne",
    placeholder: str = "",
    required: bool = False,
    class_: str = "",
    element_id: str = "",
) -> Markup:
    """Render a BS date picker input tag with inline init script."""
    import random
    eid = element_id or f"ndp-{random.randint(10000, 99999)}"
    ph = placeholder or ("मिति छान्नुहोस्" if lang == "ne" else "Select date")
    req = "required" if required else ""
    html = f"""<input
  type="text" id="{eid}" name="{name}" value="{value}"
  placeholder="{ph}" class="ndp-flask-input {class_}"
  autocomplete="off" readonly {req}
>
<script>
(function(){{
  function init(){{
    if(typeof NepaliDatePicker==='undefined'){{return setTimeout(init,80);}}
    new NepaliDatePicker('#{eid}',{{theme:{theme!r},lang:{lang!r}}});
  }}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
}})();
</script>"""
    return Markup(html)


def init_app(app) -> None:
    """
    Register Jinja2 globals and filters on a Flask app.

        from nepali_datepicker.flask_macro import init_app
        init_app(app)
    """
    app.jinja_env.globals.update(
        bs_today=lambda: str(today_bs()),
        nepali_datepicker_input=_datepicker_input,
    )
    app.jinja_env.filters.update(
        bs_to_ad=_bs_to_ad_filter,
        ad_to_bs=_ad_to_bs_filter,
    )
