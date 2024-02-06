import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, TextInput, Button, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [sellerLocation, setSellerLocation] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = () => {
    // Implement your image upload logic here
    // For simplicity, this example uses a placeholder image
    setUploadedImage(require('../assets/user.png'));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Image Upload Section */}
        <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
          <View style={{borderWidth:2, borderRadius:100, padding:25}}>
            <Image source={require('../assets/profile.png')} style={{ height: 100, width: 100 }} />
          </View>
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '700' }}>Upload Picture</Text>
        </TouchableOpacity>

        {/* Product Details Inputs */}
        <TextInput
          placeholder="Product Name"
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          placeholder="Product Price"
          style={styles.input}
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <TextInput
          placeholder="Product Description"
          style={styles.input}
          numberOfLines={4}
          value={productDescription}
          onChangeText={setProductDescription}
        />
        <TextInput
          placeholder="Seller Location"
          style={styles.input}
          value={sellerLocation}
          onChangeText={setSellerLocation}
        />

        <TouchableOpacity style={styles.sellBtn}>
          <Text style={styles.btnText}>
            List Item
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  imageUploadButton: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  uploadImageText: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: 'white',
    borderWidth: 3,
    paddingVertical: height * 0.02,
    borderColor: PRIMARY
  },
  sellBtn: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: PRIMARY,
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: height * 0.02,
    fontWeight: '600',
    fontSize: 18

  }
});
