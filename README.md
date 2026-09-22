# Collexion

<div align="center">
  <img src="frontend/Collexion/assets/images/logo3.png" alt="Collexion logo" width="320" />
  <h3>Track your retro gaming collection in one place.</h3>
</div>

[![Expo](https://img.shields.io/badge/Expo-React%20Native-000020?logo=expo)](https://expo.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)](https://firebase.google.com)
[![React Native](https://img.shields.io/badge/React-Native-61DAFB?logo=react)](https://reactnative.dev)

Collexion is a simple retro and current gaming collection app built with Expo and React Native. It helps you track consoles, handhelds, and controllers with details like edition, condition, color, storage size, and notes.

## How it works

1. Add your items with category, name, condition, color, and optional notes.
2. Browse your consoles, handhelds, and controllers in organized views.
3. Open any item to review the full details, image, and metadata.
4. Edit or delete entries anytime, and your changes sync with Firebase.

## Features

- Add new items to your collection
- Browse by category
- View item details and photo
- Edit and delete items
- Store data in Firebase

## Screenshots

<table>
  <tr>
    <td><img src="frontend/Collexion/assets/screenshots/loginSide.png" alt="Login screen" width="300" /></td>
    <td><img src="frontend/Collexion/assets/screenshots/homeSide.png" alt="Home screen" width="300" /></td>
  </tr>
  <tr>
    <td><img src="frontend/Collexion/assets/screenshots/consoles.png" alt="Consoles screen" width="300" /></td>
    <td><img src="frontend/Collexion/assets/screenshots/consoleList.png" alt="Console list" width="300" /></td>
    <td><img src="frontend/Collexion/assets/screenshots/consoleDetails.png" alt="Console details" width="300" /></td>
  </tr>
</table>

## Tech Stack

- Expo
- React Native
- Firebase Firestore
- Expo Router
- TypeScript

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open it in Expo Go or a simulator.

## Project Structure

```bash
frontend/Collexion/
├── app/
├── assets/
├── components/
├── hooks/
├── lib/
├── data/
├── package.json
├── README.md
└── firestore.rules
```

## Notes

This project is designed for gamers who want a clean and easy way to organize their retro collection.
