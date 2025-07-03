# Jet Lag: The Game - Hide + Seek Investigation Book

An **unofficial** investigation book web app for tracking your notes and
investigations while playing Jet Lag: The Game Hide and Seek home edition.

## Features

- Simple, lightweight web application built with Yew
- All notes stored locally in your browser
- No syncing or server requirements - your data stays on your device
- Designed specifically to enhance your Jet Lag: The Game Hide and Seek
  experience

## Getting Started

### Using the Hosted Version (Recommended)

The easiest way to use the Investigation Book is through the hosted version:

Visit: https://butlerx.github.io/jetlag/

### Installation (For Development)

If you want to run or develop the application locally:

1. Install Rust if you don't already have it:
   https://www.rust-lang.org/tools/install

2. Add the WebAssembly target:

   ```bash
   rustup target add wasm32-unknown-unknown
   ```

3. Install Trunk and wasm-bindgen-cli:

   ```bash
   cargo install trunk wasm-bindgen-cli
   ```

4. Clone this repository:

   ```bash
   git clone https://github.com/butlerx/jetlag.git
   ```

5. Navigate to the project directory:
   ```bash
   cd jetlag
   ```

### Running Locally

Start a local development server with:

```bash
trunk serve
```

This will automatically rebuild the app whenever changes are detected and run a
local server. Access the app at `http://localhost:8080` in your browser.

### Building for Release

To create an optimized production build:

```bash
trunk build --release --public-url /jetlag
```

The output will be located in the `dist` directory.

### Usage

1. Create a new investigation by clicking "New Investigation"
2. Add notes, clues, and theories as you play through the home game
3. Your data is automatically saved to your browser's local storage
4. Reference your notes as you work to solve the mystery

## Technical Details

This application is built using Yew, a modern Rust framework for creating
multi-threaded front-end web apps with WebAssembly. The app runs entirely
client-side with:

- Rust compiled to WebAssembly for high performance
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
