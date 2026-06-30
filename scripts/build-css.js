const fs = require('fs');
const path = require('path');

const themesFile = path.join(__dirname, '../src/css/ndp-themes.css');
const outputDir = path.join(__dirname, '../dist/themes');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(themesFile)) {
  console.error("Themes source file not found!");
  process.exit(1);
}

const content = fs.readFileSync(themesFile, 'utf-8');

// Match class styles of form .ndp-theme-[name] { ... }
const themeRegex = /(\.ndp-theme-[a-zA-Z0-9-]+\s*\{[\s\S]*?\})/g;
const matches = content.match(themeRegex) || [];

matches.forEach(themeBlock => {
  const nameMatch = themeBlock.match(/\.ndp-theme-([a-zA-Z0-9-]+)/);
  if (nameMatch) {
    const themeName = nameMatch[1];
    const themePath = path.join(outputDir, `${themeName}.css`);
    fs.writeFileSync(themePath, `/* Theme: ${themeName} */\n${themeBlock}\n`);
  }
});

console.log(`Separated ${matches.length} visual themes into dist/themes/ directory successfully!`);
