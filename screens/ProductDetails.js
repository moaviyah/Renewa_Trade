import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { getDatabase, ref, onValue } from 'firebase/database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const db = getDatabase();

const ProductDetails = ({ navigation, route }) => {
  const { item } = route.params; 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userRef = ref(db, `users/${item.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      } else {
        setUser(null);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [item.uid]);

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.productImage} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 25 }} />
        </View>
        <ScrollView>
          <FlatList
            horizontal
            data={item.images}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
            {user && (
            <View style={styles.userDetails}>
              {user.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
              ) : (
                <Image source={require('../assets/profile.png')} style={styles.profilePicture} />
              )}
              <View style={styles.contactButtons}>
                <View>
                <Text>{user.name}</Text>
                <Text>{user.phone}</Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:30}}>
                <TouchableOpacity style={styles.chatButton} onPress={()=>navigation.navigate('Messages', {item})}>
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton}>
                  <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
            <Text style={{marginTop:10, fontWeight:'bold'}}>Description</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
    padding: 20,
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
  productImage: {
    width: width - 40,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    paddingVertical: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactButtons: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  chatButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  callButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
