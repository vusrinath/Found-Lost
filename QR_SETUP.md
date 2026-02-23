# QR Code & Deep Linking Setup

## Installation

Run the following command to install the new dependencies:

```bash
npm install
```

Or if using yarn:

```bash
yarn install
```

## Dependencies Added

- `expo-print` - For printing QR codes
- `expo-sharing` - For sharing QR codes and box info
- `react-native-view-shot` - For capturing QR code as image

## Features Implemented

### 1. Deep Linking
- QR codes now contain deep links in format: `whatsinthebox://box/[id]`
- Scanning a QR code will open the app directly to that box
- Deep link handler configured in `app/_layout.tsx`

### 2. Share QR Code
- Captures QR code as PNG image
- Opens native share dialog
- Works on iOS and Android

### 3. Print QR Code
- Generates printable HTML with box info and QR code
- Opens native print dialog
- Supports different print sizes

### 4. Share Box Info
- Shares box details as text
- Includes box name, location, ID, and deep link
- Uses native share functionality

## Testing Deep Links

### iOS Simulator
```bash
xcrun simctl openurl booted "whatsinthebox://box/[box-id]"
```

### Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "whatsinthebox://box/[box-id]"
```

### Physical Device
Use a QR code scanner app to scan the generated QR codes.

## Configuration

The app scheme `whatsinthebox` is configured in `app.json`:
```json
{
  "expo": {
    "scheme": "whatsinthebox"
  }
}
```

## Usage

1. Create a box
2. Navigate to the QR code screen
3. Use the buttons to:
   - Share QR code image
   - Print QR code
   - Share box information

The QR code contains a deep link that will open the app to that specific box when scanned.
