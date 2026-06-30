# create-nepali-datepicker

Scaffold a new project pre-wired with [Nepali DatePicker Studio](https://kushalkhadkaa.github.io/nepali-datepicker-studio/) — the Bikram Sambat (BS) date picker library.

## Usage

```bash
npx create-nepali-datepicker my-app --framework react
```

## Options

| Option | Values | Default |
|--------|--------|---------|
| `--framework` | `react`, `vue`, `next`, `svelte`, `angular`, `vanilla` | `react` |
| `--theme` | Any of 22 NDP themes | `classic-light` |
| `--lang` | `ne`, `en` | `ne` |

## Examples

```bash
# React app with ocean-blue theme
npx create-nepali-datepicker booking-form --framework react --theme ocean-blue

# Vue app in English
npx create-nepali-datepicker my-vue-app --framework vue --lang en

# Next.js with SSR-safe dynamic import pre-wired
npx create-nepali-datepicker nabil-portal --framework next

# Svelte 5 with Runes
npx create-nepali-datepicker svelte-app --framework svelte

# Vanilla HTML/JS (CDN, no build step)
npx create-nepali-datepicker quick-demo --framework vanilla
```

Then:

```bash
cd my-app
npm install
npm run dev
```

## What Gets Generated

Each scaffold includes:
- `package.json` with the correct framework + NDP package
- `vite.config.js` / `next.config.js` (where applicable)
- `src/App.*` with a working date picker pre-wired for the selected theme and language
- Ready to run with `npm run dev`

## License

MIT © Kushal Khadka
