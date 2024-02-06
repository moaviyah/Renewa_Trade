import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';

const data = [
  {
    id: '1',
    profileImage: require('../assets/user.png'),
    name: 'John Doe',
    lastText: 'Hello, Is is still available?',
  },
  {
    id: '2',
    profileImage: require('../assets/user.png'),
    name: 'Jane Smith',
    lastText: 'Sure, I can meet you there!',
  },
  // Add more data items as needed
];

const Chat = () => {
  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastText}>{item.lastText}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
      <View style={{borderBottomWidth:1}}>
      <Text style={{fontSize:18, margin:20, fontWeight:'700', borderBottomWidth:1}}>All Messages</Text>
      </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastText: {
    fontSize: 16,
  },
});
