import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";

function App() {
  const totalContacts = 420;
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
  const [previousCallList, setPreviousCallList] = useState(recentList);
  function handleCallMenuPress() {}
  function handleContactsMenuPress() {}
  function handleLeadsMenuPress() {}
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
              width: "80%",
            }}
            placeholder={`🔍  ${totalContacts} contacts ilyAppi`}
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

        <ScrollView style={{ height: "80%", backgroundColor: "grey" }}>
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
                    color="forestgreen"
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8, paddingLeft: 6 }}>
                <Text style={{ fontSize: 16 }}>{item.name} </Text>
                <Text style={{ fontSize: 12 }}>{item.number} </Text>
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
        </ScrollView>
      </View>
    </View>
  );
}

export default App;
