import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, StatusBar, TextInput, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';

const Messages = ({ navigation, route }) => {
    const { item } = route.params;
    console.log('messafe passing data',item)
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const currentUser = user.uid;
    const receiverId = item.uid;
    const userName = user.displayName
    useEffect(() => {
        // Fetch messages from the database
        const db = getDatabase();
        const messagesRef = ref(db, `messages/${currentUser}/${receiverId}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMessages(Object.values(data).reverse())
            }
        })

    }, []);

    const sendMessage = () => {
        if (!messageText.trim()) return;
        const db = getDatabase();
        const newMessageRef = (ref(db, `messages/${currentUser}/${receiverId}`));
        const otherUsersRef = (ref(db, `messages/${receiverId}/${currentUser}`));
        push(newMessageRef, {
            senderId: currentUser,
            receiverId: receiverId,
            message: messageText.trim(),
            timestamp: new Date().toISOString(),
            name:userName
        }).then(()=>{
            push(otherUsersRef, {
                senderId: currentUser,
                receiverId: receiverId,
                message: messageText.trim(),
                timestamp: new Date().toISOString(),
                name:userName 
            })
        });
        setMessageText('');
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.senderId === currentUser ? styles.sentMessage : styles.receivedMessage]}>
            <Text>{item.message}</Text>
            {/* Add sender's name/profile picture, timestamp, etc. */}
        </View>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: PRIMARY }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderBottomWidth:1, paddingBottom:15, paddingHorizontal:20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginLeft: 70 }}>
                        {item.userName}
                    </Text>
                </View>
                {/* <ScrollView style={{ flex: 1 }}> */}
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item, index) => index.toString()}
                        inverted
                        contentContainerStyle={{paddingHorizontal:10}}
                    />
                {/* </ScrollView> */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={messageText}
                        onChangeText={setMessageText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Messages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
        paddingVertical:20
    },
    messageContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal:20
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6', // Example color for sent messages
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAEAEA', // Example color for received messages
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal:10
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        paddingVertical: 20,
    },
    sendButton: {
        backgroundColor: PRIMARY,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
