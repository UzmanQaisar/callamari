import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity as Touch,
  View,
  StyleSheet,
  Linking,
  FlatList,
  StatusBar
} from "react-native";
import { Icon } from "@rneui/themed";

const recentList = [
    { name: "Ghostbusters", number: "9289287145" },
    { name: "A Friend", number: "9599059258" },
    { name: "Your Bluff Mr. Bond", number: "AAA6687654" },
    { name: "John", number: "5644858875" },
    { name: "John Wick", number: "9685475241" },
    { name: "Yours Gods?", number: "6594226587" },
    { name: "Nein Wan Wan", number: "9635214001" },
    { name: "A Friend ... of a Friend", number: "9876598565" },
    { name: "A Vacuum Machine Seller", number: "18005649988" },
    { name: "Ma Look", number: "1800659989" },
    { name: "It Even", number: "657894558785" },
    { name: "In The Marines", number: "9289287145" },
  ];

const contactsListOLD = [
  {name: "Alpha", number: "1236547890"},
  {name: "Beta", number: "6977890"},
  {name: "Gamma", number: "57575757347890"},
  {name: "Delta", number: "17890"},
  {name: "Ci", number: "12365790"},
  {name: "Epsilon", number: "1577890"},
  {name: "Sigma", number: "576547890"},
  {name: "Ligma", number: "277890"},
]

const leadsList = [
  {name: "Any leads, boss?", number: "1236547890"},
  {name: "Nope", number: "6977890"},
  {name: "Son of a gun got away", number: "57575757347890"},
  {name: "Third time this month", number: "17890"},
  {name: "Sir, the mayor is here...", number: "12365790"},
  {name: "He is done. Or I am.", number: "1577890"},
  {name: "Mr. Mayor, Sir. There has b", number: "1577890"},
  {name: "Find him. Finish him. Blanket Immunity. Just get it done, McKlowski.", number: "1577890"},
]

function App() {
  
  const [previousCallList, setPreviousCallList] = useState(recentList);
  const [currentMenu, setCurrentMenu] = useState("RECENT");
  const [dialPad, setDialPad] = useState(false);
  const [dialedNumber,setDialedNumber] = useState("");
  const [contactsList, setContactsList] = useState([])

  function handleCallMenuPress() {setCurrentMenu("RECENT")};
  function handleLeadsMenuPress() {setCurrentMenu("LEADS")};

  async function handleContactsMenuPress() {
    setCurrentMenu("CONTACTS");
    const response = await fetch('https://raw.githubusercontent.com/UzmanQaisar/callamari/main/tempServer/myContacts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    if (jsonData) {
      setContactsList(jsonData);
    }
  };

  function handleSearchCallList(searchTerm) {
    if (searchTerm == "") {
      setPreviousCallList(recentList);
    } else {
      const filteredPreviousCallList = previousCallList.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.number.includes(searchTerm)
      );
      setPreviousCallList(filteredPreviousCallList);
    }
  };

  function addDigit(num) {
    setDialedNumber(dialedNumber + num)
  };

  function removeDigits() {
    setDialedNumber(prev => prev.slice(0, -1))
  }

  function handleCallThisPerson (itemNumber, item) {
    if (item) {
      setPreviousCallList(prev => [item, ...prev])
    }
    if (itemNumber) {
      Linking.openURL(`tel:${itemNumber}`)
      .catch((err) => console.error('Error opening phone app:', err))
    }
  };

  const letterToDigit = {
    "a": 2, "b": 2, "c": 2,
    "d": 3, "e": 3, "f": 3,
    "g": 4, "h": 4, "i": 4,
    "j": 5, "k": 5, "l": 5,
    "m": 6, "n": 6, "o": 6,
    "p": 7, "q": 7, "r": 7, "s": 7, 
    "t": 8, "u": 8, "v": 8,
    "w": 9, "x": 9, "y": 9, "z": 9
  }

  function convertNameToNumber(name) {
    const lowercaseName = name.toLowerCase();
    let number = '';  
    for (let i = 0; i < lowercaseName.length; i++) {
      const char = lowercaseName[i];
      const digit = letterToDigit[char];
      if (digit) {
        number += digit;
      }
    }  
    return number;
  };

  const contactsWithNumbers = recentList.map(contact => ({
    ...contact,
    nameToNumber: convertNameToNumber(contact.name)
  }));
  AsyncStorage.setItem('contacts', JSON.stringify(contactsWithNumbers))
  .then(() => console.log('Contacts saved successfully'))
  .catch(error => console.error('Error saving contacts:', error));



  const [fontsLoaded] = useFonts({
    'whitney-light': require('./assets/fonts/whitney-light.otf'),
    'whitney-book': require('./assets/fonts/whitney-book.otf'),
    'whitney-medium': require('./assets/fonts/whitney-medium.otf'),
    'whitney-semibold': require('./assets/fonts/whitney-semibold.otf'),
  });
  if (!fontsLoaded) {
    return <View style={{
      flex: 1,
      backgroundColor: "#2c2d31",
      height: "100%",
      width: "100%",
    }}/>;
  }
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "salmon",
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#2c2d31",
          height: "100%",
          width: "100%",
        }}
      >

        <StatusBar barStyle="light-content"/>
        
        <View
          style={{
            height: "1%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 36,
            backgroundColor: "#2c2d31",
          }}
        ></View>        

        <View style={xxx.searchBarParent} >
          <TextInput
            style={{
              fontSize: 20,
              width: "76%",
              color: "#2c2d31",
              fontFamily: "whitney-book"
            }}
            placeholder={`🔍  ${recentList.length} contacts`}
            onChangeText={handleSearchCallList}
          ></TextInput>
        </View>
        
        {currentMenu == "RECENT" && <ScrollView style={{ height: "84%", backgroundColor: "#2c2d31" }}>
          {previousCallList.map((item, index) => (
            <View key={index} style={xxx.contactEntry} >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="person-outline"
                    type="Ionicons"
                    size={32}
                    color="#e7e8ea"
                    solid
                  />
                </Touch>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Touch onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </Touch>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </Touch>
              </View>
            </View>
          ))}
        </ScrollView>}

        {currentMenu == "CONTACTS" && (
        <FlatList 
          style={{ height: "84%", backgroundColor: "#2c2d31" }}
          data={contactsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: "#2c2d31",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="person"
                    type="Ionicons"
                    size={32}
                    color="#e7e8ea"
                    solid
                  />
                </Touch>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Touch onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </Touch>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </Touch>
              </View>
            </View>
          )}
        />
        )}          

        {currentMenu == "LEADS" && <ScrollView style={{ height: "84%", backgroundColor: "#2c2d31" }}>
          {leadsList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: "#2c2d31",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="thumbs-up"
                    type="entypo"
                    size={28}
                    color="#e7e8ea"
                    solid
                  />
                </Touch>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Touch onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </Touch>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <Touch>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </Touch>
              </View>
            </View>
          ))}
        </ScrollView>}

        <View style={xxx.menuStyle} >
          <View style={[xxx.menuItems, {borderTopWidth: currentMenu === "RECENT" ? 4 : 0}]}>
                <Touch onPress={handleCallMenuPress} style={xxx.touchInView}>
                    <Image source={require("./assets/clockColors.png")} style={{width: 36, height: 36}}/>
                </Touch>
          </View>
          <View style={[xxx.menuItems, {borderTopWidth: currentMenu === "LEADS" ? 4 : 0}]}>
                <Touch onPress={handleLeadsMenuPress} style={xxx.touchInView}>
                    <Image source={require("./assets/contactNext.png")} style={{width: 36, height: 36}}/>
                </Touch>
          </View>
          <View style={[xxx.menuItems, {borderTopWidth: currentMenu === "CONTACTS" ? 4 : 0}]}>
                <Touch onPress={handleContactsMenuPress} style={xxx.touchInView}>
                    <Image source={require("./assets/contacts.png")} style={{width: 36, height: 36}}/>
                </Touch>
          </View>
        </View>

        {!dialPad && <View style={[xxx.tacButtons, {bottom: "10%", height: 60, width: 60}]}>
          <Touch style={{height: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
            <Image 
            source={require('./assets/callNext.png')} 
            style={{width: 30, height: 30, tintColor: "#00aaff"}}
            resizeMode="contain"
            />
        </Touch>
        </View>}

        {!dialPad && <View style={[xxx.tacButtons, {bottom: "20%", height: 60, width: 60}]}
        >
          <Touch onPress={() => setDialPad(!dialPad)}>
            <Icon 
              name="dialpad"
              type="Entypo"
              size={36}
              color="#00aaff"
            />
          </Touch>
        </View>}

        {dialPad && <View style={xxx.dialPadStyle} >
          <View style={xxx.dialStrip}>
            <Touch style={xxx.backSpace}></Touch>
            <Text style={{fontSize: 30, fontFamily: "whitney-semibold", letterSpacing: 1, flex: 8, textAlign: "center"}}>{dialedNumber}</Text>
            <Touch style={xxx.backSpace} onPress={removeDigits}>
              <Icon 
                  name="backspace"
                  type="IonIcons"
                  size={28}
                  color="#2c2d31"
              />
            </Touch>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("1")}>
                            <Text style={xxx.digits}>1</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("2")}>
                            <Text style={xxx.digits}>2</Text>
                            <Text style={xxx.letters}>ABC</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("3")}>
                            <Text style={xxx.digits}>3</Text>
                            <Text style={xxx.letters}>DEF</Text>
                        </Touch>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("4")}>
                            <Text style={xxx.digits}>4</Text>
                            <Text style={xxx.letters}>GHI</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("5")}>
                            <Text style={xxx.digits}>5</Text>
                            <Text style={xxx.letters}>JKL</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("6")}>
                            <Text style={xxx.digits}>6</Text>
                            <Text style={xxx.letters}>MNO</Text>
                        </Touch>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("7")}>
                            <Text style={xxx.digits}>7</Text>
                            <Text style={xxx.letters}>PQRS</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("8")}>
                            <Text style={xxx.digits}>8</Text>
                            <Text style={xxx.letters}>TUV</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("9")}>
                            <Text style={xxx.digits}>9</Text>
                            <Text style={xxx.letters}>WXYZ</Text>
                        </Touch>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit(`*`)}>
                            <Text style={xxx.digits}>*</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit("0")}>
                            <Text style={xxx.digits}>0</Text>
                            <Text style={xxx.letters}>+</Text>
                        </Touch>
                        <Touch style={xxx.keypadButton} onPress={() => addDigit(`#`)}>
                            <Text style={xxx.digits}>#</Text>
                        </Touch>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "18%"}]}>
            <View style={xxx.keypadButton}></View>
            <View style={xxx.keypadButton}>
              <Touch onPress={() => handleCallThisPerson(dialedNumber)}>
                <Icon 
                  name="phone"
                  type="MaterialIcons"
                  size={28}
                  color="#16a085"
                  reverse
                />
              </Touch>
            </View>
            <View style={xxx.keypadButton}>
              <Touch onPress={() => setDialPad(!dialPad)}>
                <Icon
                  name="chevron-down"
                  type="font-awesome-5"
                  size={28}
                  color="#16a085"
                  solid
                />
              </Touch>
            </View>
          </View>
        </View>}

      </View>
    </View>
  );
}


const xxx = StyleSheet.create({
  keypadButton: {
    height: "80%",
    width: "32%", 
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: "column",
  },
  tacButtons: {    
    position: "absolute", 
    right: "6%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    backgroundColor: "#535a63",
    // borderWidth: 2,
    borderColor: "#008cff",
    borderRadius: 24
  },
  dialPadStyle: {    
    position: "absolute", 
    bottom: "10%", 
    right: "5%",
    zIndex: 20,
    flexDirection: "column",
    backgroundColor: "#e7e8ea",
    borderRadius: 20,
    // borderWidth: 1,
    borderColor: "#00aaff",
    overflow: "hidden",
    height: "54%", 
    width: "90%"
  },
  dialPadRowStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28
  },
  menuStyle: {    
    height: "9%",
    width: "100%",
    marginHorizontal: "0%",
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#535A63",
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#702670",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItems: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#00aaff",
  },
  touchInView: {
    height: "100%", 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center"
  },
  searchBarParent: {    
    height: "6%",
    width: "80%",
    marginHorizontal: "10%",
    borderWidth: 0,
    borderColor: "#702670",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#e7e8ea",
  },
  contactEntry: {
    padding: 20,
    backgroundColor: "#2c2d31",
    flexDirection: "row",
  },
  dialStrip: {
    width: "100%", 
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    height: "14%", 
    backgroundColor: "#16a085"
  },
  backSpace: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  digits: {
    fontSize: 32,
    color: "#2c2d31",
    fontFamily: "whitney-semibold"
  },
  letters: {
    fontSize: 14,
    color: "#2c2d31",
    fontFamily: "whitney-book",
    letterSpacing: 1.4,    
  }
})





export default App;
