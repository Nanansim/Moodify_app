# Moodify Daily

Daily, hormone-smart cards that mirror your mood and cycle.

This project is an Expo + React Native experience designed for Galaxy (Android) and iPhone devices, currently targeting SDK 54. It helps users sync their daily rituals with their hormonal cycle and self-reported mood. Cards refresh automatically every day and can be adjusted to match personal cycle data.

## Features

- 🌗 **Cycle-aware insights** — Identify the current hormone phase from the saved cycle length and last period date.
- 💖 **Mood-personalized rituals** — Select a daily mood to unlock affirmations and tailored suggestions.
- 🔄 **Auto-refreshing cards** — Each day loads a new card with body, mind, and connection prompts aligned to the hormone phase.
- 💾 **Offline-friendly storage** — Preferences and daily mood selections persist locally with `AsyncStorage`.
- 📱 **Cross-platform ready** — Built with Expo to run on both iOS and Android without code changes.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Launch the app in Expo:

   ```bash
   npm run start
   ```

   - Press `a` to open on an Android emulator (Galaxy) or Expo Go.
   - Press `i` to open on the iOS simulator (iPhone) or Expo Go.

3. Inside the app:

   - Set your average cycle length and the first day of your most recent period.
   - Choose how you feel today to tailor the card's affirmation and rituals.
   - Revisit tomorrow for a refreshed hormone-smart card.

## Project structure

```
.
├── App.js                # Root React Native component
├── src/
│   ├── components/       # UI building blocks (cards, selectors, forms)
│   ├── constants/        # Hormone phase + mood definitions
│   └── hooks/            # AsyncStorage-powered state hooks
├── assets/               # Placeholder for Expo icons and splash artwork
├── app.json              # Expo project configuration
├── babel.config.js       # Babel preset configuration
└── package.json          # Dependencies and scripts
```

## Customization ideas

- Extend the `PHASES` constant with medical guidance from healthcare professionals.
- Connect to wearables or calendars for automatic cycle tracking.
- Localize UI copy to Korean or other preferred languages.

---

If you have trouble running the project, ensure you have the Expo CLI installed (`npm install -g expo-cli`) and the latest version of Node.js.
