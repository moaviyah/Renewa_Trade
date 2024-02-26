    import { StyleSheet, Text, View, Dimensions, Image,Alert, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
    import React, {useState} from 'react'
    import { PRIMARY, SECONDARY, SUPPORTING } from '../colors'

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const SignIn = ({ navigation }) => {
        const [email, setEmail] = useState('');

        const handleContinue = () => {
            if (!email.trim()) {
                Alert.alert('Email is mandatory');
            } else {
                navigation.navigate('Login', { email });
            }
        };
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <StatusBar barStyle="light-content" />
                <View style={styles.topContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logo} />
                </View>
                <View style={styles.bottomContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Text style={styles.text}>
                        Continue with your Gmail Account
                    </Text>
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
                    <View style={[styles.textInput]}>
                        <TouchableOpacity onPress={handleContinue}>
                            <Text>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>
                        OR
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                        <Text style={[styles.text, { textDecorationLine: 'underline' }]}>
                            Create new account
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                        If you continue, you are accepting{'\n'}<Text style={{ textDecorationLine: 'underline' }}>Renewa Trade Term and Condition and privacy policy</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }

    export default SignIn

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: PRIMARY
        },
        topContainer: {
            backgroundColor: SECONDARY,
            height: height * 0.5,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            height: 120,
            width: 120,
            borderRadius: 15
        },
        bottomContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        text: {
            color: SECONDARY,
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
        }
    })