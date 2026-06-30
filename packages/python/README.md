# Universal Sambat SDK — Python Package

Pure Python Bikram Sambat (BS) ↔ Gregorian (AD) conversion engine with Django form fields, model fields, template tags, DRF serializer field, Flask Jinja2 helpers, and FastAPI router.

## Installation

```bash
pip install universal-sambat-sdk

# With Django support
pip install "universal-sambat-sdk[django]"

# With Flask
pip install "universal-sambat-sdk[flask]"

# With FastAPI + Pydantic
pip install "universal-sambat-sdk[fastapi]"

# Everything
pip install "universal-sambat-sdk[all]"
```

## Core API

```python
from nepali_datepicker import bs_to_ad, ad_to_bs, today_bs, is_valid_bs

# BS → AD
ad = bs_to_ad(2081, 1, 15)
print(ad.iso)          # '2024-04-28'
print(ad.year)         # 2024

# AD → BS
bs = ad_to_bs('2024-04-28')
print(bs.iso)          # '2081-01-15'
print(bs.year)         # 2081

# String shortcuts
from nepali_datepicker import bs2ad, ad2bs
bs2ad('2081-01-15')    # '2024-04-28'
ad2bs('2024-04-28')    # '2081-01-15'

# Today
today = today_bs()     # BsDate(year=..., month=..., day=...)

# Validate
is_valid_bs(2081, 1, 15)  # True
is_valid_bs(2081, 1, 40)  # False

# Month name
from nepali_datepicker import month_name
month_name(1, 'ne')    # 'बैशाख'
month_name(1, 'en')    # 'Baisakh'
```

## Django Integration

### `settings.py`

```python
INSTALLED_APPS = [
    ...
    'nepali_datepicker',   # enables template tags
]
```

### Form field + widget

```python
from nepali_datepicker.django_tags import NepaliDateField, BsDateInput

class BookingForm(forms.Form):
    booking_date = NepaliDateField(
        widget=BsDateInput(theme='ocean-blue', lang='ne')
    )
```

The widget automatically injects the JS picker — include the CSS/JS in your base template:

```html
<link rel="stylesheet" href="{% static 'nepali-datepicker/nepali-datepicker.css' %}">
...
<script src="{% static 'nepali-datepicker/nepali-datepicker.js' %}"></script>
```

### Model field

```python
from nepali_datepicker.django_tags import BsDateModelField

class Booking(models.Model):
    booking_date = BsDateModelField(max_length=10)
```

### Validation

```python
from django.core.exceptions import ValidationError

# In forms.py:
booking_date = NepaliDateField()
# → raises ValidationError if not valid BS date
```

### Template tags

```django
{% load nepali_datepicker %}

Today in BS: {% bs_today %}
AD to BS:    {{ '2024-04-28'|ad_to_bs }}
BS to AD:    {{ '2081-01-15'|bs_to_ad }}
```

### DRF serializer field

```python
from nepali_datepicker.django_tags import BsDateField

class BookingSerializer(serializers.Serializer):
    booking_date = BsDateField()
```

## Flask Integration

```python
from flask import Flask
from nepali_datepicker.flask_macro import init_app

app = Flask(__name__)
init_app(app)
```

In Jinja2 templates:

```jinja2
Today: {{ bs_today() }}
{{ '2024-04-28' | ad_to_bs }}
{{ '2081-01-15' | bs_to_ad }}
{{ nepali_datepicker_input('booking_date', theme='ocean-blue') | safe }}
```

## FastAPI Integration

```python
from fastapi import FastAPI
from nepali_datepicker.fastapi_utils import router as ndp_router

app = FastAPI()
app.include_router(ndp_router, prefix="/dates", tags=["dates"])
```

Endpoints:
- `GET /dates/bs-to-ad?year=2081&month=1&day=15`
- `GET /dates/ad-to-bs?date=2024-04-28`
- `GET /dates/today-bs`

## Testing

```bash
pip install pytest
pytest packages/python/tests/
```

## Requirements

- Python 3.8+
- No mandatory dependencies (stdlib only for core engine)

## License

MIT © Kushal Khadka
