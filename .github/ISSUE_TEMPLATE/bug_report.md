name: Bug report
about: Create a report to help us improve layout or javascript code
title: '[BUG] '
labels: bug
assignees: ''
body:
  - type: markdown
    attributes:
      value: |
        Thank you for reporting a bug! Please fill out the template below with as much detail as possible to help us reproduce the issue.
  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Provide a clear and concise description of the bug.
      placeholder: Tell us what went wrong.
    validations:
      required: true
  - type: textarea
    id: reproduction-steps
    attributes:
      label: Steps to Reproduce
      description: List the steps required to replicate the behavior.
      placeholder: |
        1. Initialize picker with options...
        2. Click on date...
        3. Observe layout/javascript behavior...
    validations:
      required: true
  - type: textarea
    id: options
    attributes:
      label: Initialization Options
      description: Paste the Javascript options used to initialize the picker.
      placeholder: |
        new NepaliDatePicker('#datepicker', {
          theme: 'classic-light',
          ...
        });
  - type: input
    id: browser
    attributes:
      label: Browser & OS
      description: e.g. Chrome 124 on macOS Sonoma, Safari on iOS 17
      placeholder: Browser details
    validations:
      required: true
