import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Dimensions, Image, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { PRIMARY, SECONDARY, SUPPORTING } from '../colors';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Database, getDatabase, ref, set } from 'firebase/database';
import app from '../config'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const database = getDatabase();
    const auth = getAuth()
    const handleCreateAccount = () => 
    {
        if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim())
        {
            Alert.alert('All fields are mandatory');
        } 
        else if(password != confirmPassword)
        {
            Alert.alert('Passwords do not match');
        }
        else
        {
            
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials)=>{
                const user = userCredentials;
                const userData = {
                    name,
                    email,
                    phone,
                    userId : user.user.uid,
                };
                set(ref(database, `users/${userCredentials.user.uid}`), userData)
                .then(()=>{
                    console.log('User Account Created'),
                    updateProfile(
                        auth.currentUser,
                        {
                            displayName:name
                        }
                    )
                    navigation.navigate('Navigator')
                }).catch((error)=>{
                    console.log('Error Saving user Data: ', error)
                });
            }).catch((error)=>{
                console.log('Error Creating User:', error);
                Alert.alert('Something went wrong, please try again later')
            })
            console.log('OK');
        }
    };

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
                    <Image source={require('../assets/icon.png')} style={{ height: 100, width: 100, borderRadius: 15, marginTop: 10 }} />
                    <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 18 }}>
                        Enter account details
                    </Text>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/name.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Enter Your Name'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/mail.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Enter Your Email Here'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/phone.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Enter Your Phone Here'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/pass.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Enter Password'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={showPassword ? require('../assets/invisible.png') : require('../assets/eye.png')} style={{ height: 25, width: 25, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/pass.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Confirm Password'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            spellCheck={false}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Image source={showConfirmPassword ? require('../assets/invisible.png') : require('../assets/eye.png')} style={{ height: 25, width: 25, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={handleCreateAccount}
                    >
                        <Text style={styles.buttonText}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUp;

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
    },
    createAccountButton: {
        backgroundColor: PRIMARY,
        width: width * 0.9,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: SECONDARY,
        fontSize: 18,
    }
});
