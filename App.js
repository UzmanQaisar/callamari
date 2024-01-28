import React, { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
    setDialedNumber(prev => prev + num)
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


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("I have only begun");
  //       const response = await fetch('https://raw.githubusercontent.com/UzmanQaisar/callamari/main/tempServer/myContacts.json');
  //       const jsonData = await response.json();
  //       setContactsList(jsonData);
  //       console.log("I am finished.")
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
              width: "86%",
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
                <TouchableOpacity>
                  <Icon
                    name="person-outline"
                    type="Ionicons"
                    size={32}
                    color="#e7e8ea"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <TouchableOpacity onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </TouchableOpacity>
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
                <TouchableOpacity>
                  <Icon
                    name="person"
                    type="Ionicons"
                    size={32}
                    color="#e7e8ea"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <TouchableOpacity onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </TouchableOpacity>
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
                <TouchableOpacity>
                  <Icon
                    name="thumbs-up"
                    type="entypo"
                    size={28}
                    color="#e7e8ea"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <TouchableOpacity onPress={() => handleCallThisPerson(item.number, item)}>
                  <Text style={{ fontSize: 16, color: "#e7e8ea", fontFamily: "whitney-medium" }}>{item.name} </Text>
                  <Text style={{ fontSize: 12, color: "#e7e8ea", fontFamily: "whitney-book" }}>{item.number} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="silver"
                    solid
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>}

        <View style={xxx.menuStyle} >
          <TouchableOpacity 
          onPress={handleCallMenuPress}
          style={{
              width: "17%",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#e7e8ea",
              borderRadius: 40
            }}>
              <Icon
                name="call"
                type="Ionicons"
                size={20}
                color="#00aaff"
                reverse={currentMenu == "RECENT"}
              />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={handleLeadsMenuPress}
            style={{
              width: "17%",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#e7e8ea",
              borderRadius: 40
            }}>      
              <Icon
                name="handshake"
                type="font-awesome-5"
                size={20}
                color="#00aaff"
                solid
                reverse={currentMenu == "LEADS"}
              />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={handleContactsMenuPress}
            style={{
              width: "17%",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#e7e8ea",
              borderRadius: 40
            }}>   
              <Icon
                name="persons"
                type="fontisto"
                size={20}
                color="#00aaff"
                reverse={currentMenu == "CONTACTS"}
              />
          </TouchableOpacity>
        </View>

        {!dialPad && <View style={[xxx.tacButtons, {bottom: "19%"}]}
        >
          <TouchableOpacity>
            <Icon 
              name="phone-forwarded"
              type="MaterialIcons"
              size={30}
              color="#00aaff"
            />
          </TouchableOpacity>
        </View>}

        {!dialPad && <View style={[xxx.tacButtons, {bottom: "10%"}]}
        >
          <TouchableOpacity onPress={() => setDialPad(!dialPad)}>
            <Icon 
              name="dialpad"
              type="Entypo"
              size={30}
              color="#00aaff"
            />
          </TouchableOpacity>
        </View>}

        {dialPad && <View style={xxx.dialPadStyle} >
          <View style={xxx.dialStrip}>
            <TouchableOpacity style={xxx.backSpace}></TouchableOpacity>
            <Text style={{fontSize: 30, fontFamily: "whitney-semibold", letterSpacing: 1, flex: 8, textAlign: "center"}}>{dialedNumber}</Text>
            <TouchableOpacity style={xxx.backSpace} onPress={removeDigits}>
              <Icon 
                  name="backspace"
                  type="IonIcons"
                  size={28}
                  color="#2c2d31"
              />
            </TouchableOpacity>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(1)}><Text style={xxx.digits}>1</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(2)}><Text style={xxx.digits}>2</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(3)}><Text style={xxx.digits}>3</Text></TouchableOpacity>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(4)}><Text style={xxx.digits}>4</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(5)}><Text style={xxx.digits}>5</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(6)}><Text style={xxx.digits}>6</Text></TouchableOpacity>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(7)}><Text style={xxx.digits}>7</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(8)}><Text style={xxx.digits}>8</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(9)}><Text style={xxx.digits}>9</Text></TouchableOpacity>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "17%"}]}>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(`*`)}><Text style={xxx.digits}>*</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(0)}><Text style={xxx.digits}>0</Text></TouchableOpacity>
            <TouchableOpacity style={xxx.keypadButton} onPress={() => addDigit(`#`)}><Text style={xxx.digits}>#</Text></TouchableOpacity>
          </View>
          <View style={[xxx.dialPadRowStyle, {height: "18%"}]}>
            <View style={xxx.keypadButton}></View>
            <View style={xxx.keypadButton}>
              <TouchableOpacity onPress={() => handleCallThisPerson(dialedNumber)}>
                <Icon 
                  name="phone"
                  type="MaterialIcons"
                  size={28}
                  color="#16a085"
                  reverse
                />
              </TouchableOpacity>
            </View>
            <View style={xxx.keypadButton}>
              <TouchableOpacity onPress={() => setDialPad(!dialPad)}>
                <Icon
                  name="chevron-down"
                  type="font-awesome-5"
                  size={28}
                  color="#16a085"
                  solid
                />
              </TouchableOpacity>
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
    justifyContent: "center"
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
    borderRadius: 48, 
    height: 52, 
    width: 52
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
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#535A63",
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#702670",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchBarParent: {    
    height: "6%",
    width: "80%",
    marginHorizontal: "10%",
    borderWidth: 0,
    borderColor: "#702670",
    borderRadius: 36,
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
    fontSize: 28,
    color: "#2c2d31",
    fontFamily: "whitney-semibold"
  }
})





export default App;
