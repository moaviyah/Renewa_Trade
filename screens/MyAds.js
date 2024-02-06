import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';

const data = [
  {
    id: '1',
    productImage: require('../assets/product1.png'),
    name: 'Product 1',
    price: '$50',
  },
  {
    id: '2',
    productImage: require('../assets/product2.png'),
    name: 'Product 2',
    price: '$80',
  },
  {
    id: '3',
    productImage: require('../assets/product2.png'),
    name: 'Product 3',
    price: '$120',
  },
  // Add more data items as needed
];

const MyAds = () => {
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.productImage} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
      <View style={{borderBottomWidth:1}}>
      <Text style={{fontSize:18, margin:20, fontWeight:'700', borderBottomWidth:1}}>Your Products</Text>
      </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          style={{marginTop:10, marginHorizontal:10}}
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
