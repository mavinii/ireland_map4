<p align="center">
  <h1 align="center"> 🗺 Literary Places in Ireland</h1>
</p>

<p align="center">
   <a aria-label="Supports Expo iOS" href="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" target="_blank"> <img alt="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
   <a aria-label="Supports Expo Android" href="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" target="_blank"> <img alt="Supports Expo iOS" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <a aria-label="runs with Expo Go" href="https://docs.expo.dev/" target="_blank">
    <img alt="Expo Go" src="https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000" />
  </a>
</p>

## 📚 Student Details 
- Module Title: `Mobile App 2`
- Lecture Name: [Saravanabalagi Ramachandran](https://github.com/saravanabalagi) 
- Student Name: `Marcos Oliveira`
- Student Number: `22931`

## 📝 Introduction:
The objective of this project is to develop a mobile app to showcase in map places of literary importance in Ireland and surrounding areas, related to poets, patrons, publishers in Ireland who lived in the 16th and 17th century. The requirements are as follows and all requirements carry equal weightage:

## Display markers on the map:
- [x] Load places and place types JSON data.
- [x] Display marker for all places using GPS coordinates.
- [x] Use different colours, one for each place type.
- [x] When marker is tapped, place name should be displayed on a pop-up info window.

## Show extended information:
- [x] When the pop up info window is tapped, show in full screen all details of the place (id, name, Gaelic name, type, GPS coordinates).
- [x] Show relevant image using any free web service, or search engine.
- [x] Show the image of the place if available, else, show a random image loaded from the internet.
- [x] Show a back button, when pressed, go back to map view.

## Allow filtering by Place Type:
- [x] Show dropdown for selecting Place Type, default value should be all.
- [x] When a specific Place Type is selected, show only the places with this Place Type on the map.

## Allow custom marker:
- [x] Long Press anywhere on map to show a draggable marker.
- [ ] Show distance to the nearest place (from the downloaded data), and on drag marker, update this info.
- [ ] Draw a semi-transparent blue circle around this marker with a radius of 10 km and show number of places within this radius.
- [ ] Create a slider to control the above radius in km (1-1000, default 10) and on change, update the circle on the map and update number of places within the radius info shown accordingly.

## ⭐️ Attention:
This project was developed using `Apple Maps`, if you want to run this project on Android with Google Maps, you will need to
import the `Google Maps` package and change the `MapView` component to `GoogleMap` provider:
```ts
import { GoogleMap } <-- ADD THIS HERE from 'react-native-maps'; 
```
And in your MapView component, change the `provider` prop to `PROVIDER_GOOGLE`:
```ts
<MapView
    provider={PROVIDER_GOOGLE} <-- ADD THIS HERE
    style={styles.map}
    initialRegion={{
      latitude: 53.419751,
      longitude: -7.76031,
      latitudeDelta: 5.0922,
      longitudeDelta: 5.0921,
    }}
    customMapStyle={mapStyle}
  ><Markers navigation={navigation} filter={filter} />
</MapView>
```

## Usage:
```js
npx expo start
```

## API Used:
- [Places](https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/places.json).
- [Place Types](https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/place_types.json).

## 🤝 References:
- https://reactnavigation.org/docs/getting-started/
- https://github.com/react-native-maps/react-native-maps
- https://www.youtube.com/watch?v=jvIQQ4ID2JY
- https://medium.com/featurepreneur/integrating-google-maps-with-react-native-62fc8b7ecded
- https://www.youtube.com/watch?v=q4fW3h9Mb7M
- https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
- https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
- https://oblador.github.io/react-native-vector-icons/


## ⚠️ Copyright Disclaimer:
Please note that this app project is part of `Dorset College's` sophomore semester project, however, it may contain some part of code that may be copyrighted, if so, please contact me so I can delete or give due to copyright. All the people were duly referenced in the `"References"` section above.

Please also note, this project is `non-profit`, however, this is not intended to be monetized.

---

<strong>Built with 💙 by [@Marcos Oliveira](https://www.linkedin.com/in/pgmarcosoliveira/)</strong>