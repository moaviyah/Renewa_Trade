import { StyleSheet, SafeAreaView, Text, View, Dimensions, Image, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import React from 'react'
import { PRIMARY, SECONDARY, SUPPORTING } from '../colors'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
            <StatusBar barStyle='light-content' />
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={{ height: 20, width: 20, marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text}>
                        Create new accounts
                    </Text>
                    <Image source={require('../assets/icon.png')} style={{ height: 100, width: 100, borderRadius: 15, marginTop: 50 }} />
                    <Text style={{ fontWeight: 'bold', marginTop: 30, fontSize: 18 }}>
                        Enter account details
                    </Text>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/name.png')} style={{ height: 25, width: 25 }} />
                        <TextInput placeholder='Enter Your Name' style={{ flex: 1, marginLeft: 20 }} />
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/mail.png')} style={{ height: 25, width: 25 }} />
                        <TextInput placeholder='Enter Your Email Here' style={{ flex: 1, marginLeft: 20 }} />
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/pass.png')} style={{ height: 25, width: 25 }} />
                        <TextInput placeholder='Enter Password' style={{ flex: 1, marginLeft: 20 }} secureTextEntry />
                        <Image source={require('../assets/eye.png')} style={{ height: 25, width: 25, marginRight: 5 }} />
                    </View>
                    <KeyboardAvoidingView style={styles.textInput} behavior={Platform.OS === 'ios' ? 'padding':'height'}>
                        <Image source={require('../assets/pass.png')} style={{ height: 25, width: 25 }} />
                        <TextInput placeholder='Repeat Password' style={{ flex: 1, marginLeft: 20 }} secureTextEntry/>
                        <Image source={require('../assets/eye.png')} style={{ height: 25, width: 25, marginRight: 5 }} />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={{ backgroundColor: PRIMARY, width: width * 0.9, height: 50, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginTop: 50, }} >
                        <Text style={{ color: SECONDARY, fontSize: 18, }}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    textInput: {
        width: width * 0.9,
        backgroundColor: SUPPORTING,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
})