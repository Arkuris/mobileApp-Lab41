import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Linking } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import AppBar from './components/AppBar';
import ContactItem from './components/ContactItem';
import MapViewComponent from './components/MapView/index.js';
import LocationPickerModal from './components/LocationModal/index.js';
import * as Contacts from 'expo-contacts';
// protocol linking -> linking to features like http / sms / tel

// View -> A div, there is always 1 root div per screen / layout.
// Text -> default text object -> p tags, h1 - h6, list items.

const randomLocations = [
  { name: "Eiffel Tower, Paris", latitude: 48.8584, longitude: 2.2945 },
  { name: "Great Wall of China", latitude: 40.4319, longitude: 116.5704 },
  { name: "Sydney Opera House", latitude: -33.8568, longitude: 151.2153 },
  { name: "Statue of Liberty, New York", latitude: 40.6892, longitude: -74.0445 },
  { name: "Taj Mahal, India", latitude: 27.1751, longitude: 78.0421 },
  { name: "Machu Picchu, Peru", latitude: -13.1631, longitude: -72.5450 },
  { name: "Pyramids of Giza, Egypt", latitude: 29.9792, longitude: 31.1342 },
  { name: "Mount Fuji, Japan", latitude: 35.3606, longitude: 138.7274 },
  { name: "Grand Canyon, USA", latitude: 36.1069, longitude: -112.1129 },
  { name: "Colosseum, Rome", latitude: 41.8902, longitude: 12.4922 },
  { name: "Acropolis of Athens, Greece", latitude: 37.9715, longitude: 23.7257 },
  { name: "Big Ben, London", latitude: 51.5007, longitude: -0.1246 },
  { name: "Table Mountain, South Africa", latitude: -33.9628, longitude: 18.4098 },
  { name: "Angkor Wat, Cambodia", latitude: 13.4125, longitude: 103.8670 },
  { name: "Petra, Jordan", latitude: 30.3285, longitude: 35.4444 },
  { name: "Sagrada Familia, Barcelona", latitude: 41.4036, longitude: 2.1744 },
  { name: "Chichen Itza, Mexico", latitude: 20.6843, longitude: -88.5678 },
  { name: "Banff National Park, Canada", latitude: 51.4968, longitude: -115.9281 },
  { name: "Victoria Falls, Zambia/Zimbabwe", latitude: -17.9243, longitude: 25.8572 },
  { name: "Christ the Redeemer, Brazil", latitude: -22.9519, longitude: -43.2105 },
  { name: "Stonehenge, England", latitude: 51.1789, longitude: -1.8262 },
  { name: "Borobudur Temple, Indonesia", latitude: -7.6079, longitude: 110.2038 },
  { name: "The Louvre, France", latitude: 48.8606, longitude: 2.3376 },
  { name: "Golden Gate Bridge, San Francisco", latitude: 37.8199, longitude: -122.4783 },
  { name: "Serengeti National Park, Tanzania", latitude: -2.3333, longitude: 34.8333 },
  { name: "Galápagos Islands, Ecuador", latitude: -0.9538, longitude: -90.9656 },
  { name: "Neuschwanstein Castle, Germany", latitude: 47.5576, longitude: 10.7498 },
  { name: "The Dead Sea, Jordan/Israel", latitude: 31.5590, longitude: 35.4732 },
  { name: "Ha Long Bay, Vietnam", latitude: 20.9100, longitude: 107.1839 },
  { name: "Uluru (Ayers Rock), Australia", latitude: -25.3444, longitude: 131.0369 }
];

export default function App() {
    const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showPopup, setShowPopup] = useState(false);

  const changeRegion = (location) => {
    console.log("New location:", location);
    setMapRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
    setShowPopup(false);
  }
  
  const [contactData, setContactData] = useState([]);

  const getContacts = async () => {
    let { status } = await Contacts.requestPermissionsAsync(); // new thing!  => must ask users for personal data access.
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      setContactData(data);
    }
  }

  const call = (contact) => {
    let phoneNumber = contact.phoneNumbers[0].number;
    let link = 'tel:' + phoneNumber; // protocol + URL
    Linking.canOpenURL(link)
      .then(isSupported => Linking.openURL(link))
      .catch((e) => {
        console.error("CANT USE LINK!!", e);
      })
  }

  useEffect(() => {
    console.log('APP IS LOADED!');
    getContacts();
  }, []);

  console.log('MY CONTACTS FROM MY PHONE:', contactData);
  return (
    // New thing -> JSX does not contain HTML.
    // All the things we may take for granted about HTML, we now need components directly from react-native.
    <NativeBaseProvider>
      <SafeAreaView style={styles.safeArea}>
        <Box style={styles.container}>
         <MapViewComponent region={mapRegion} />
          <LocationPickerModal 
            isVisible={showPopup} 
            locations={randomLocations}
            onSelectLocation={changeRegion}
            onClose={() => setShowPopup(false)}
          />
          <FlatList
            // style={styles.list}
            contentContainerStyle={styles.list}
            data={contactData} // a list of data object to do something.
            keyExtractor={contact => contact.id} // a function that returns a "key" on every child of the list.
            renderItem={({ item }) => <ContactItem title={item.name} handlePress={() => call(item)} />} // a function that returns a child element
          />
          <StatusBar style="auto" />
          <AppBar onMoreVertPress={() => setShowPopup(true)} />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

// we need to create our own css object in each component.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2,
    // borderColor: 'purple',
  },
  list: {
    width: '100%',
    alignItems: 'center'
  },
  footerText: {
    color: 'red',
  }
});
