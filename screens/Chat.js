import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Image, Linking } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Chat = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const auth = getAuth()
  const currentUserId = auth.currentUser.uid; // Replace with actual current user ID

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, `messages/${currentUserId}`);
    
        onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          console.log('chat data', data)
          if (data) {
            const userChats = [];
            Object.entries(data).forEach(([uid, messages]) => {
              const lastMessageKey = Object.keys(messages).pop();
              const lastMessage = messages[lastMessageKey];
    
              // Fetch user information for otherUserId
              const userRef = ref(db, `users/${uid}`);
              onValue(userRef, (userSnapshot) => {
                const userData = userSnapshot.val();
                if (userData) {
                  const profileImage = userData.profileImage;
                  const userName = userData.name
                  // Add chat item with user information
                  userChats.push({
                    uid,
                    userName,
                    lastMessage: lastMessage.message,
                    timestamp: lastMessage.timestamp,
                    profileImage: profileImage ? profileImage : null, // Assuming profileImage is stored in userData
                  });
    
                  // Update state
                  setChats(userChats);
                }
              });
            });
          }
        });
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={()=>navigation.navigate('Messages', {item})} key={item.otherUserId}>
      <Image source={item.profileImage ? { uri: item.profileImage } : require('../assets/profile.png')} style={styles.profileImage}/>
      <View style={styles.userInfo}>
        <Text style={styles.otherUserId}>{item.userName}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} >
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom:20}}> All Chats</Text>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.otherUserId}
        key={(item)=> item.otherUserId} 
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal:10
  },
  chatItem: {
    flexDirection:'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems:'center',
    borderTopWidth:1,
    borderTopColor:'#ccc'
  },
  userInfo: {
   
    flex:1
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  otherUserId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 16,
  },
});
