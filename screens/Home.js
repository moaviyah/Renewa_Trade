import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PRIMARY, SECONDARY } from '../colors'
import { getDatabase, ref, onValue } from 'firebase/database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Home = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(db, 'products');

        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productArray = data ? Object.values(data).reverse() : [];
            setProducts(productArray);
            setLoading(false)
        });
    }, []);

    const categories = [
        {
            id: 1,
            image: require('../assets/bottle.png'),
            name: 'Plastic'
        },
        {
            id: 2,
            image: require('../assets/wood.png'),
            name: 'Wood'
        },
        {
            id: 3,
            image: require('../assets/glass.png'),
            name: 'Glass'
        },
        {
            id: 4,
            image: require('../assets/others.png'),
            name: 'Others'
        }
    ]

    const renderCategory = ({ item }) => (
        <TouchableOpacity id={item.id} style={{ margin: 10, alignItems: 'center' }}>
            <Image source={item.image} style={{ width: width / 4 - 20, height: width / 4 - 20 }} />
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
    const renderProduct = ({ item }) => {
        return (
            <TouchableOpacity id={item?.productId} style={{ margin: 10, }} onPress={() => navigation.navigate('ProductDetails', { item })}>
                <Image source={{ uri: item?.images[0] }} style={{ width: width / 2 - 20, height: width / 2 - 20, borderRadius: 10 }} />
                <Text style={{ fontSize: 18, marginVertical: 5 }}>{item?.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/location.png')} style={{ height: 20, width: 20 }} />
                    <Text style={{ color: 'gray' }}> {item?.location}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {
                loading ? (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <ActivityIndicator size={'large'} color={PRIMARY} />
                    </View>
                )
                    :
                    (
                        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
                            <StatusBar barStyle='light-content' />
                            <ScrollView style={styles.container}>
                                <View style={styles.topContainer}>
                                    <Text style={{ color: 'white' }}>Hello</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/location.png')} style={{ height: 20, width: 20 }} />
                                        <Text>Islamabad, Pakistan</Text>
                                    </View>

                                </View>
                                <View style={styles.searchBar}>
                                    <Image source={require('../assets/search.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ color: 'gray', marginLeft: 10 }}>Find Wood, Plastic and more...</Text>
                                </View>
                                <View style={styles.secondContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 20 }}>
                                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 22, alignSelf: 'center' }}>
                                            Recyle your waste {'\n'} properly!
                                        </Text>
                                        <Image source={require('../assets/plasticTrash.jpeg')} style={{ height: 120, width: 120, borderRadius: 10 }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10 }}>
                                        <TouchableOpacity style={{ backgroundColor: 'white', width: width / 2 - 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: width / 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '400' }}>Buy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: 'white', width: width / 2 - 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: width / 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '400' }}>Sell</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'gray' }}>
                                        Browse Categories
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{ textDecorationLine: 'underline' }}>
                                            See all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <FlatList
                                        horizontal
                                        renderItem={renderCategory}
                                        keyExtractor={(item) => item?.id}
                                        data={categories}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                    <Text style={{}}>
                                        Newly Posted
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
                                        <Text style={{ textDecorationLine: 'underline' }}>
                                            See all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <FlatList
                                        horizontal
                                        renderItem={renderProduct}
                                        keyExtractor={(item) => item?.productId}
                                        data={products}
                                        initialNumToRender={2}
                                    />
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    )
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
    },
    topContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    searchBar: {
        height: height * 0.07,
        borderWidth: 2,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    secondContainer: {
        backgroundColor: PRIMARY,
        margin: 10,
        borderRadius: 10
    }
})