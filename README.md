# Daily Wallet App

===

## Use cases

overview & functionality

- Abridged integration (link?)

- Link drop flow
- Send flow
- Redeem flow
- Direct send flow

## API

The application interacts with the api in the following scenarios:

### 1. Signup/Initial installation

When then app is initally installed it creates a new Abridged SDK contract wallet account/device. The app then hits the signup api endpoint and sends along it's new device ID. The API grabs a pre-deployed SDK wallet account and add the passed device ID to the wallet making the app one of the wallet owners.

endpoint: /links/signup
method: POST
body must include a valid SDK 'userDeviceAddress'

### 2. Get link status

When a user visits the app with a link on thier clipboard the app will send a get request to this endpoint to get the status of the link. This takes a linkID and will tell the app if the link has already been redeemed and it's value.

endpoint: /links/get/{linkId}
method: GET

### 3. Send a link

When a user clicks to send funds the app will make a post to this endpoint to create the link. The API will generate a link ID add a link to the database. It will return the full url for the link back to the app for iut to display to the user.

endpoint: links/send
method: POST
body must include a valid SDK 'senderAddress' and 'amount'

### 4. Redeem a link

When a user clicks to redeem a link on thier clipboard the app will send a PUT request to this endpoint with the linkID and the app's wallet address. The API will validate the data, send some gas to the sender's address and initiate a transfer of funds from the sender's account to the app's account.

endpoint: links/redeem
method: PUT
body must include a valid SDK 'redeemerAddress' and 'linkId'

## Development Setup

This is a React Native applicaiton. Docs can be found [here](https://facebook.github.io/react-native/docs/getting-started).

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

The most recent version of the docs are available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Available Scripts

### `npm start`

Runs your app in development mode.

```
npm start -- --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

## Deployment

Currently this application is not hosted in the iOS or Andriod app stores. Production builds are created and deployed to AWS S3 and user are directed to download and side load the apk file onto thier machine.

There is a small website that is accessed from the sedn links. It either deeplinks the user into the application, if they have it installed on thier phone, or it instructs the user to download and install the app.

https://omi-daily-wallet.odyssy.io/download.html

### Build command

```
npm build
```
