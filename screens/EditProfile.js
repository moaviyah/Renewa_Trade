import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput, Dimensions, Alert } from 'react-native';
import { PRIMARY } from '../colors';
import * as ImagePicker from 'expo-image-picker';
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child, push, update } from 'firebase/database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EditProfile = ({ navigation, route }) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData.name);
    const [phone, setPhone] = useState(userData.phone);
    const [profileImage, setProfileImage] = useState(userData.profileImage);
    const auth = getAuth();
    const db = getDatabase()
    const userId = auth.currentUser.uid
    const handleEditImage =async () => {
        try {
            // Ask permission to access the device's image library
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access image library is required!');
              return;
            }
        
            // Launch the image picker UI
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            if (!result.canceled) {
              // Get the local URI of the selected image
            const localUri = result.assets[0].uri;
            setProfileImage(localUri)
            }
          } catch (error) {
            console.log('Error picking image:', error);
            return null;
          }
    };

    const handleSave = () => {
        const userRef = ref(db,`users/${userId}`)
        try {
            update(userRef, {
                profileImage:profileImage,
                name: name,
                phone: phone
            }).then(()=>{
                Alert.alert('Profile Updated Successfully')
            })
        } catch (error) {
            Alert.alert('Something went wrong', error.message)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: PRIMARY }}>Edit Profile</Text>
                </View>
                <View style={styles.profileImageContainer}>
                    <TouchableOpacity onPress={handleEditImage} style={{ alignItems:'center'}}>
                        <Image source={profileImage ? { uri: profileImage } :require('../assets/profile.png') } style={styles.profileImage} />
                        <Text style={styles.editIcon}>Choose new Image</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
                    <TextInput style={styles.input} value={userData.email} editable={false} placeholder="Email" />
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
                </View>
                <TouchableOpacity
                style={{alignSelf:'center', backgroundColor:PRIMARY,width:width*0.9, paddingVertical:15, borderRadius:10, justifyContent:'center', alignItems:'center' }}
                onPress={()=>handleSave()}
                >
                    <Text style={{color:'white', fontSize:18}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20
    },
    profileImageContainer: {
        
        marginVertical:20,
        alignSelf:'center'
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editIcon: {
        marginTop: 5,
        color: PRIMARY,
        alignSelf:'center',
        fontSize:16
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: PRIMARY,
        marginBottom: 20,
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:10
    },
});
