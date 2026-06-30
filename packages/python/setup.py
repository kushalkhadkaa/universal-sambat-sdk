from setuptools import setup, find_packages

setup(
    name="nepali-datepicker-studio",
    version="1.2.0",
    description="Python/Django server-side BS↔AD conversion utilities for Nepali DatePicker Studio.",
    author="Kushal Khadka",
    author_email="kushalkhadkaa@gmail.com",
    url="https://kushalkhadkaa.github.io/nepali-datepicker-studio/",
    license="MIT",
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=[],
    extras_require={
        "django": ["Django>=3.2"],
        "flask":  ["Flask>=2.0"],
        "fastapi":["fastapi>=0.95"],
    },
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Topic :: Software Development :: Libraries",
    ],
)
