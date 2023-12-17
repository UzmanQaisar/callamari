import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

function App() {
  const totalContacts = 420;
  const recentList = [
    {name: 'Ghostbusters', number: '9876543210'},
    {name: 'A Friend', number: '1800 69 420'},
    {name: 'Your Bluff Mr. Bond', number: 'AAA6687654'},
    {name: 'Ghostbusters', number: '9876543210'},
    {name: 'A Friend', number: '1800 69 420'},
    {name: 'Your Bluff Mr. Bond', number: 'AAA6687654'},
    {name: 'Ghostbusters', number: '9876543210'},
    {name: 'A Friend', number: '1800 69 420'},
    {name: 'Your Bluff Mr. Bond', number: 'AAA6687654'},
    {name: 'Ghostbusters', number: '9876543210'},
    {name: 'A Friend', number: '1800 69 420'},
    {name: 'Your Bluff Mr. Bond', number: 'AAA6687654'},
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'salmon',
        height: '100%', 
        width: '100%',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'linen',
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            height: '7%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 36,
            backgroundColor: 'thistle',
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                color: 'blue',
                fontSize: 24,
              }}>
              📞
            </Text> */} 
            {/* <Icon name="heart" type="font-awesome" /> */}
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 24,
              }}>
              🧑‍🦰
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 24,
              }}>
              ✔️
            </Text>
          </View>
        </View>
        <View
          style={{
            height: '1.5%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 36,
            backgroundColor: 'tomato',
          }}></View>
        <View
          style={{
            height: '6.5%',
            width: '90%',
            marginHorizontal: '5%',
            borderRadius: 36,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'gainsboro',
          }}>
          <TextInput
            style={{
              fontSize: 20,
              width: '80%',
            }}
            placeholder={`🔍  ${totalContacts} contacts`}></TextInput>
        </View>
        <View
          style={{
            height: '1.5%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 36,
            backgroundColor: 'tomato',
          }}></View>
        <ScrollView style={{height: '83.5%', backgroundColor: 'grey'}}>
          {recentList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: 'lightgray',
                borderWidth: 1,
                height: "11.5%"
              }}>
              <Text>{item.name} </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
