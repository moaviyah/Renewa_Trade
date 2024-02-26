import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, StatusBar, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { PRIMARY } from '../colors';

const Support = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        try {
            const response = await fetch('http://52.200.241.210:8000/chat-bot/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputText }),
            });
            const data = await response.json();
            // Combine user's message and bot's response into a single message object
            const newMessage = { text: inputText, type: 'user' };
            const botResponse = { text: data, type: 'bot' };
            
            setMessages(prevMessages => [...prevMessages, newMessage, botResponse]);
            setInputText('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    
    

    // Function to render chat messages
    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: PRIMARY }} behavior={Platform.OS === 'ios' ? 'padding':'height'}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: PRIMARY }}>Help Center</Text>
                </View>
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.messageList}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your message here"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Support;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    botMessage: {
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
