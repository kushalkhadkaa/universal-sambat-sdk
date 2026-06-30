name: Feature request
about: Suggest a new configuration option, theme, or widget layout
title: '[FEATURE] '
labels: enhancement
assignees: ''
body:
  - type: textarea
    id: feature-description
    attributes:
      label: Describe the Feature
      description: Provide a clear and concise description of what you want to happen.
      placeholder: Describe the requested enhancement.
    validations:
      required: true
  - type: textarea
    id: use-cases
    attributes:
      label: Use Cases & Rationale
      description: Explain how this feature benefits developers using this library.
      placeholder: Describe the situations where this is useful.
    validations:
      required: true
