# Ingrdnt

Your intelligent health companion app.## Overview
Ingrdnt is a React Native mobile application that helps users make informed decisions about food ingredients.

## Features
- 📸 Scan ingredient labels with your camera
- 🔍 Instant ingredient analysis
- ⚠️ Health alerts for harmful ingredients
- 💚 Get healthier alternatives
- 📊 Track your scanning history
- 🔐 Secure user authentication

## Tech Stack
- **React Native** - Cross-platform mobile development
- **Expo** - Development and build toolchain
- **Firebase** - Authentication and data storage
- **React Navigation** - Navigation library

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Ingrdnt.git
```

2. Navigate to the project directory:
```bash
cd Ingrdnt
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npx expo start
```

5. Run on your device:
- Install the Expo Go app on your iOS or Android device
- Scan the QR code from your terminal

## Project Structure
```
Ingrdnt/
├── src/
│   ├── screens/      # App screens
│   ├── navigation/   # Navigation setup
│   ├── theme/        # Theme configuration
│   └── utils/        # Utility functions
├── assets/          # Images and static files
├── data/            # JSON data files
└── App.js           # Entry point
```

## Screens

### WelcomeScreen
First screen users see with app introduction

### AuthIntroScreen
Choose between sign in and sign up

### SignInScreen
User authentication with email/password

### HomeScreen
Main dashboard with scan option

### ScanScreen
Camera interface for scanning ingredient labels

### ResultScreen
Display analysis results and alternatives

### HistoryScreen
View past scans and their results

## Key Features Explained

### Ingredient Scanning
Users can take photos of ingredient labels, and the app processes them to extract ingredient information.

### Health Analysis
Each ingredient is checked against a comprehensive database to identify potential health concerns.

### Smart Alternatives
For harmful ingredients, the app suggests healthier alternatives with similar properties.

## Configuration

### Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication and Firestore
3. Add your Firebase config to the app

## Development

### Running on iOS
```bash
npx expo start --ios
```

### Running on Android
```bash
npx expo start --android
```

### Building for Production
```bash
npx expo build:android
npx expo build:ios
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, please open an issue on GitHub.

## Acknowledgments
- React Native community for excellent documentation
- Expo team for simplifying mobile development
- All contributors who help improve this app

---
Made with ❤️ for healthier living
## Overview
Ingrdnt is a React Native mobile application that helps users make informed decisions about food ingredients.

## Features
- 📸 Scan ingredient labels with your camera
- 🔍 Instant ingredient analysis
- ⚠️ Health alerts for harmful ingredients
- 💚 Get healthier alternatives
- 📊 Track your scanning history
- 🔐 Secure user authentication

## Tech Stack
- **React Native** - Cross-platform mobile development
- **Expo** - Development and build toolchain
- **Firebase** - Authentication and data storage
- **React Navigation** - Navigation library

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Ingrdnt.git
```

2. Navigate to the project directory:
```bash
cd Ingrdnt
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npx expo start
```

5. Run on your device:
- Install the Expo Go app on your iOS or Android device
- Scan the QR code from your terminal

## Project Structure
```
Ingrdnt/
├── src/
│   ├── screens/      # App screens
│   ├── navigation/   # Navigation setup
│   ├── theme/        # Theme configuration
│   └── utils/        # Utility functions
├── assets/          # Images and static files
├── data/            # JSON data files
└── App.js           # Entry point
```

## Screens

### WelcomeScreen
First screen users see with app introduction

### AuthIntroScreen
Choose between sign in and sign up

### SignInScreen
User authentication with email/password

### HomeScreen
Main dashboard with scan option

### ScanScreen
Camera interface for scanning ingredient labels
