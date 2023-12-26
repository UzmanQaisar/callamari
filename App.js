import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
const recentList = [
    { name: "Ghostbusters", number: "9876543210" },
    { name: "A Friend", number: "1800 69 420" },
    { name: "Your Bluff Mr. Bond", number: "AAA6687654" },
    { name: "John", number: "5644858875" },
    { name: "John Wick", number: "9685475241" },
    { name: "Yours Gods?", number: "6594226587" },
    { name: "Nein Wan Wan", number: "9635214001" },
    { name: "A Friend ... of a Friend", number: "9876598565" },
    { name: "A Vacuum Machine Seller", number: "18005649988" },
    { name: "Ma Look", number: "1800659989" },
    { name: "It Even", number: "657894558785" },
    { name: "In The Marines", number: "356365615236446583" },
  ];

const contactsList = [
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
  function handleCallMenuPress() {setCurrentMenu("RECENT")}
  function handleContactsMenuPress() {setCurrentMenu("CONTACTS")}
  function handleLeadsMenuPress() {setCurrentMenu("LEADS")}
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
          backgroundColor: "ghostwhite",
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            height: "5%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 36,
            backgroundColor: "ghostwhite",
          }}
        ></View>

        <View
          style={{
            height: "7%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 36,
            backgroundColor: "ghostwhite",
          }}
        >
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleCallMenuPress}>
              <Icon
                name="call"
                type="Ionicons"
                size={24}
                color="blue"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleContactsMenuPress}>
              <Icon
                name="persons"
                type="fontisto"
                size={24}
                color="orangered"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleLeadsMenuPress}>
              <Icon
                name="handshake"
                type="font-awesome-5"
                size={24}
                color="green"
                solid
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: "6%",
            width: "80%",
            marginHorizontal: "10%",
            borderWidth: 1,
            borderColor: "gainsboro",
            borderRadius: 36,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "ghostwhite",
          }}
        >
          <TextInput
            style={{
              fontSize: 20,
              width: "86%",
            }}
            placeholder={`🔍  ${recentList.length} contacts`}
            onChangeText={handleSearchCallList}
          ></TextInput>
        </View>

        <View
          style={{
            height: "1%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 36,
            backgroundColor: "ghostwhite",
          }}
        ></View>

        {currentMenu == "RECENT" && <ScrollView style={{ height: "80%", backgroundColor: "ghostwhite" }}>
          {previousCallList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: "ghostwhite",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="user"
                    type="font-awesome-5"
                    size={24}
                    color="blue"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Text style={{ fontSize: 16 }}>{item.name} </Text>
                <Text style={{ fontSize: 12, color: "dimgrey" }}>{item.number} </Text>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="grey"
                    solid
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>}

        {currentMenu == "CONTACTS" && <ScrollView style={{ height: "80%", backgroundColor: "ghostwhite" }}>
          {contactsList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: "ghostwhite",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="person"
                    type="fontisto"
                    size={24}
                    color="orangered"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Text style={{ fontSize: 16 }}>{item.name} </Text>
                <Text style={{ fontSize: 12, color: "dimgrey" }}>{item.number} </Text>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="dimgrey"
                    solid
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>}

        {currentMenu == "LEADS" && <ScrollView style={{ height: "80%", backgroundColor: "ghostwhite" }}>
          {leadsList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: "ghostwhite",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="thumbs-up"
                    type="entypo"
                    size={24}
                    color="green"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Text style={{ fontSize: 16 }}>{item.name} </Text>
                <Text style={{ fontSize: 12, color: "dimgrey" }}>{item.number} </Text>
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="font-awesome-5"
                    size={20}
                    color="dimgrey"
                    solid
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>}
      </View>
    </View>
  );
}

export default App;
