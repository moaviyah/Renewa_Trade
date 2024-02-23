import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth'
const MyAds = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser.uid
  useEffect(() => {
    // Function to fetch user's products from the database
    const fetchUserProducts = () => {
      const db = getDatabase();
      const productsRef = ref(db, 'products');
      const userProductsQuery = query(productsRef, orderByChild('uid'), equalTo(userId));

      onValue(userProductsQuery, (snapshot) => {
        const productsData = [];
        snapshot.forEach((childSnapshot) => {
          const product = childSnapshot.val();
          productsData.push(product);
        });
        setProducts(productsData);
      });
    };

    // Call the function to fetch user's products
    fetchUserProducts();
  }, [userId]);

  const renderProductItem = ({ item }) => { 
    const firstImageUrl = item.images.length > 0 ? item.images[0] : null;

    return (
      <View style={styles.productItem}>
        <Image source={{ uri: firstImageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>PKR <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>
        </View>
        <TouchableOpacity style={styles.editButton}
          onPress={() => navigation.navigate('EditProduct', {item})}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <View style={{ borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, margin: 20, fontWeight: '700', borderBottomWidth: 1 }}>Your Products</Text>
        </View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          renderItem={renderProductItem}
          style={{ marginTop: 10, marginHorizontal: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY,
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
