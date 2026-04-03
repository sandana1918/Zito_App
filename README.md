# Zito

Zito is a premium mobile-only Expo prototype for automatic income protection for gig workers.

## What's Included

- Premium React Native Expo app built for mobile-only presentation
- Local Express backend with seeded worker, coverage, risk, and payout data
- Sign in, create account, onboarding, payout history, risk, profile, and protection flows
- Hidden operator controls for AQI, platform outage, extreme heat, guided flow, and reset
- Seeded payout history for a polished first-run experience.

## Install

```bash
npm install
npm --prefix backend install
```

## Run

Terminal 1:

```bash
npm --prefix backend run dev
```

Terminal 2:

```bash
npm start
```

If you use a physical Android device, set `EXPO_PUBLIC_API_URL` to your machine IP before starting Expo.

## Demo Notes

- `Create Account` takes you through the protected onboarding flow
- `Sign In` takes you directly to the live dashboard
- `Profile` includes a logout action
- `History` is pre-seeded with believable automatic payouts

## Hidden Controls

Tap the small `ZITO` wordmark on the Profile screen five times to open the internal control panel. From there you can process the three disruption events, run a guided flow, or restore the baseline state.
