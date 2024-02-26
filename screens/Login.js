import { StyleSheet, SafeAreaView, Text, View,Alert, Dimensions, Image, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY, SECONDARY, SUPPORTING } from '../colors'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = ({ navigation, route }) => {
    const { email } = route.params || '';
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Email and password are required');
            return;
        }
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={{ height: 20, width: 20, marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text}>
                        Login Screen
                    </Text>
                    <Image source={require('../assets/icon.png')} style={{ height: 100, width: 100, borderRadius: 15, marginTop: 50 }} />
                    <Text style={{ fontWeight: 'bold', marginTop: 30, fontSize: 18 }}>
                        Enter Account Credentials
                    </Text>
                    <View style={styles.textInput}>
                        <Image source={require('../assets/mail.png')} style={{ height: 25, width: 25 }} />
                        <TextInput
                            placeholder='Enter Your Email Here'
                            style={{ flex: 1, marginLeft: 20 }}
                            value={email}
                            editable={false}
                            onPressIn={() => navigation.goBack()}
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
                    <TouchableOpacity style={{ backgroundColor: PRIMARY, width: width * 0.9, height: 50, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginTop: 50, }}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: SECONDARY, fontSize: 18, }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Login;

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
});
