import { SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY, SECONDARY } from '../colors'
import * as ImagePicker from 'expo-image-picker';
import { update } from 'firebase/database';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EditProduct = ({ navigation, route }) => {
    const { item } = route.params
    const [updatedName, setUpdatedName] = useState(item.name)
    const [updatedPrice, setUpdatedPrice] = useState(item.price)
    const [updatedDescription, setUpdatedDescription] = useState(item.description)
    const [updatedLocation, setUpdatedLocation] = useState(item.location)

    const initialImages = [...item.images, ...Array(9 - item.images.length).fill(null)];
    const [images, setImages] = useState(initialImages);

    const ImageSlot = ({ index, onImageSelect, image }) => {
        return (
            <TouchableOpacity style={styles.imageSlot} onPress={() => onImageSelect(index)}>
                {image ? <Image source={{ uri: image }} style={styles.uploadedImage} /> : <Image source={require('../assets/upload.png')} style={{ height: 25, width: 25 }} />}
            </TouchableOpacity>
        );
    };
    const handleImageSelect = async (index) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const newImages = [...images];
            newImages[index] = result.assets[0].uri;
            setImages(newImages);
        }
    };
    const handleClearImages = (index) => {
        setImages(Array(9).fill(null));0 
    };

    const handleListProduct = () => {
        const hasImages = images.some(image => image !== null);
        if (!updatedName.trim() || !updatedPrice.trim() || !updatedDescription.trim() || !updatedLocation.trim()) {
            Alert.alert('All fields are mandatory');
            return;
        } else if (!hasImages) {
            Alert.alert('Please select at least one product image');
            return;
        }
        const db = getDatabase();
        const auth = getAuth()

        const newProduct = {
            name: updatedName,
            price: updatedPrice,
            description: updatedDescription,
            images: images.filter(image => image !== null), // Filter out null images
            uid: auth.currentUser.uid, // Replace with the actual user's UID
            location: updatedLocation,
        };
        try {
            update(ref(db, `products/${item.productId}`), newProduct)
                .then(() => {
                    setUpdatedName('');
                    setUpdatedLocation('');
                    setUpdatedDescription('');
                    setUpdatedPrice('');
                    setImages(Array(9).fill(null));
                    navigation.goBack()
                    Alert.alert('Your product has been updated successfully');

                })

        } catch (error) {
            Alert.alert('Something went wrong. Please try again later')
        }

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }} >
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: PRIMARY }}>Edit Product</Text>
                </View>

                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, marginVertical: 30, fontWeight: 'bold' }}>Enter your product's details</Text>
                    {/* Product Details Inputs */}
                    <TextInput
                        placeholder="Product Name"
                        style={styles.input}
                        value={updatedName}
                        onChangeText={setUpdatedName}
                    />
                    <TextInput
                        placeholder="Product Price in PKR"
                        style={styles.input}
                        value={updatedPrice}
                        onChangeText={setUpdatedPrice}
                        keyboardType='decimal-pad'
                    />
                    <TextInput
                        placeholder="Product Description"
                        style={styles.input}
                        numberOfLines={4}
                        value={updatedDescription}
                        onChangeText={setUpdatedDescription}
                    />
                    <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '600', fontSize: 16, }}>Select upto 9 images </Text>
                        <TouchableOpacity onPress={handleClearImages}>
                            <Text style={{ color: 'blue', textDecorationLine: 'underline' }} >Clear</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        {images.map((image, index) => (
                            <ImageSlot key={index} index={index} onImageSelect={handleImageSelect} image={image} />
                        ))}
                    </View>
                    <TextInput
                        placeholder="Seller Location"
                        style={styles.input}
                        value={updatedLocation}
                        onChangeText={setUpdatedLocation}
                    />
                    <TouchableOpacity style={styles.sellBtn} onPress={handleListProduct}>
                        <Text style={styles.btnText}>
                            List Item
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EditProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
        padding: 20
    },
     imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxHeight: height
    },
    imageSlot: {
        width: 100,
        height: 100,
        aspectRatio: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 0.5
    },
    uploadedImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    uploadImageText: {
        fontSize: 16,
        color: 'black',
    },
    input: {
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 3,
        paddingVertical: height * 0.02,
        borderColor: PRIMARY
    },
    sellBtn: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: PRIMARY,
        alignItems: 'center',
        marginBottom: 30
    },
    btnText: {
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: height * 0.02,
        fontWeight: '600',
        fontSize: 18
    }
})