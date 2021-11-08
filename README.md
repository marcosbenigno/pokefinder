# Pokefinder

Pokefinder is a mobile app to find informations about Pokemons, using information provided from Pokeapi. You can find the high fidelity wireframes at [this link (Figma file)](https://www.figma.com/file/CX8SVCtKSDrPPJywi6j1DE/Untitled?node-id=0%3A1). The app was developed using React Native.

## Instalation
After cloning the repository, you need to install the dependencies with:

```sh
yarn install
```
## Executing using Android
You can execute the app in development mode running:
```sh
npx react-native run-android
```
### "Error 3" trying to run the app
If you get "Error 3" when trying to run the app, you need to run the following commands and try running again:
```sh
cd android 
./gradlew uninstallAll 
cd .. 
```
