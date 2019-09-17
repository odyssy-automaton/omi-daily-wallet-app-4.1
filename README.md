# Daily Wallet App


Proof of Concept - android 4.1+ native app to show abridged wallet integration into a link drop style crypto wallet. Collaboration between OMI, Abridged and Odyssy


## Use cases

overview & functionality

- [Abridged integration](http://abridged.io/)

- Link drop flow
    - Send flow - Send a link to any user with the app. Link is generated and saved to db with status of unredeemed
    - Redeem flow - Copy link or deep link in with a link shared from another user. Gardian sends funds to recipient and marks db link redeemed
    - Direct send flow - directly sends to another xDAI wallet.

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

### `yarn start`

Runs your app in development mode. Starts Metro Bundler

```
yarn start -- --reset-cache
```

#### `react-native run-android`

Attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

#### `react-native log-android`

logs messages to the terminal

## Deployment

Currently this application is not hosted in the iOS or Andriod app stores. Production builds are created and deployed to AWS S3 and user are directed to download and side load the apk file onto thier machine.

There is a small website that is accessed from the send links. It either deeplinks the user into the application, if they have it installed on thier phone, or it instructs the user to download and install the app. 

upload built APKs to s3 for download links

https://omi-daily-wallet.odyssy.io/download.html

### Build command for apk (after the second command you may have to delete duplicate files in the res folder). Add keystore settings. Output APKs will be in the android build folder.

### for xdai:

```
export NODE_ENV=production

```
### for sokol:

```
export NODE_ENV=development

```

```

mkdir -p android/app/src/main/assets && rm -rf android/app/build && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
```
cd android && ./gradlew clean assembleRelease && cd ../
```
