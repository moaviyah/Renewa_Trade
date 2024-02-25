import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar,Alert, SafeAreaView, Image, TouchableOpacity, TextInput, Button, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, push, set } from 'firebase/database';
import {getAuth} from 'firebase/auth';
import axios from 'axios';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ImageSlot = ({ index, onImageSelect, image }) => {
  return (
    <TouchableOpacity style={styles.imageSlot} onPress={() => onImageSelect(index)}>
      {image ? <Image source={{ uri: image }} style={styles.uploadedImage} /> : <Image source={require('../assets/upload.png')} style={{ height: 25, width: 25 }} />}
    </TouchableOpacity>
  );
};

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [sellerLocation, setSellerLocation] = useState('');
  const [images, setImages] = useState(Array(9).fill(null));
  const db = getDatabase();
  const auth = getAuth();
  const userName = auth.currentUser.displayName
  
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
   const handleClearImages = () => {
    setImages(Array(9).fill(null));
  };



  const classifyImage = async (imageUri) => {
    console.log('image url',imageUri)
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
    });
  
    try {
        const response = await axios.post('https://552e-110-39-14-50.ngrok-free.app/classify-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const data = response.data;
        console.log('Predictions:', data.predictions);
  
        const productKey = push(ref(db, 'products')).key;
        const newProduct = {
          name: productName,
          price: productPrice,
          description: productDescription,
          images: images.filter(image => image !== null), // Filter out null images
          uid: auth.currentUser.uid, // Replace with the actual user's UID
          location: sellerLocation,
          productId:productKey,
          timestamp: Date.now(),
          userName:userName
        };
        // set(ref(db, `products/${productKey}`), newProduct)
        // .then(()=>{
        //   setProductName('');
        //   setSellerLocation('');
        //   setProductDescription('');
        //   setProductPrice('');
        //   setImages(Array(9).fill(null));
        //   Alert.alert('Your product has been listed successfully');
        // })
    } catch (error) {
        Alert.alert('Something went wrong', error.message)
        return
    }
  };
  

  const handleListProduct = () => {
    const hasImages = images.some(image => image !== null);
    if (!productName.trim() || !productPrice.trim() ||!productDescription.trim()||!sellerLocation.trim()) {
      Alert.alert('All fileds are mandatory');
      return;
  }else if (!hasImages){
    Alert.alert('Please Select atlease one product image')
  }
  classifyImage(images[0])
  };

  return (
    <View style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, marginVertical: 30, fontWeight: 'bold' }}>Enter your product's details</Text>
          {/* Product Details Inputs */}
          <TextInput
            placeholder="Product Name"
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            placeholder="Product Price in PKR"
            style={styles.input}
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType='decimal-pad'
          />
          <TextInput
            placeholder="Product Description"
            style={styles.input}
            numberOfLines={4}
            value={productDescription}
            onChangeText={setProductDescription}
          />
          <TextInput
            placeholder="Enter Your city"
            style={styles.input}
            value={sellerLocation}
            onChangeText={setSellerLocation}
          />
          <View style={{flexDirection:'row',  marginVertical:10, justifyContent:'space-between'}}>
          <Text style={{fontWeight:'600', fontSize:16,}}>Select upto 9 images </Text>
          <TouchableOpacity onPress={handleClearImages}>
          <Text style={{color:'blue', textDecorationLine:'underline'}} >Clear</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <ImageSlot key={index} index={index} onImageSelect={handleImageSelect} image={image} />
            ))}
          </View>
          
          <TouchableOpacity style={styles.sellBtn} onPress={handleListProduct}>
            <Text style={styles.btnText}>
              List Item
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
};


export default Sell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
    padding: 16,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight:height
  },
  imageSlot: {
    width: 100,
    height:100,
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
});
