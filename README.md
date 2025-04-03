# Jet Lag: The Game - Hide + Seek Investigation Book

An **unofficial** investigation book web app for tracking your notes and
investigations while playing Jet Lag: The Game Hide and Seek home edition.

## Features

- Simple, lightweight web application built with lit.js
- No build steps required - runs directly in your browser
- All notes stored locally in your browser
- No syncing or server requirements - your data stays on your device
- Designed specifically to enhance your Jet Lag: The Game Hide and Seek
  experience

## Getting Started

### Using the Hosted Version (Recommended)

The easiest way to use the Investigation Book is through the hosted version:

Visit: https://butlerx.github.io/jetlag/

### Local Installation (For Testing)

If you need to run the application locally for testing:

1. Clone this repository:

   ```bash
   git clone https://github.com/butlerx/jetlag.git
   ```

2. Navigate to the project directory:

   ```bash
   cd jetlag
   ```

3. Start a local server using Python:

   ```bash
   python3 -m http.server 8000
   ```

4. Open your browser and go to `http://localhost:8000`

### Usage

1. Create a new investigation by clicking "New Investigation"
2. Add notes, clues, and theories as you play through the home game
3. Your data is automatically saved to your browser's local storage
4. Reference your notes as you work to solve the mystery

## Technical Details

This application is built using lit.js, a lightweight library for building web
components. The app runs entirely client-side with:

- No build steps or compilation required
- No external dependencies beyond lit.js
- All data stored in browser localStorage
- No internet connection required after initial load

## Important Notes

- **This is an UNOFFICIAL investigation book** - not affiliated with or endorsed
  by Jet Lag: The Game or its creators
- This app is intended to be used alongside the official Jet Lag: The Game Hide
  and Seek home game
- No data leaves your device - everything is stored locally in your browser

## Data Privacy

All your investigation notes are stored exclusively in your browser's
localStorage. There is no syncing functionality, and no data is transmitted to
any server. If you clear your browser data or use a different browser/device,
your notes will not be available.

## Acknowledgments

- This investigation book is a fan-made tool created to enhance the experience
  of playing Jet Lag: The Game Hide and Seek
- Jet Lag: The Game and all related properties are owned by their respective
  owners
