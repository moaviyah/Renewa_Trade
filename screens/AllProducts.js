import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { getDatabase, ref, onValue } from 'firebase/database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const db = getDatabase();
const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity id={item.productId} style={{ marginHorizontal: 5, marginVertical: 10 }} onPress={() => navigation.navigate('ProductDetails', { item })}>
        <Image source={{ uri: item.images[0] }} style={{ width: width / 2 - 25, height: width / 2 - 20, borderRadius: 10 }} />
        <Text style={{ fontSize: 18, marginVertical: 5 }}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/location.png')} style={{ height: 20, width: 20 }} />
          <Text style={{ color: 'gray' }}> {item.location}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Products</Text>
          <View style={{ width: 25 }} />
        </View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </View>
    </SafeAreaView>
  );
}

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PRIMARY,
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
    backgroundColor: SECONDARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  productImage: {
    width: width / 2 - 30,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productLocation: {
    fontSize: 14,
    color: 'gray',
  },
});
