import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Account = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState(null);
  const userId = auth.currentUser.uid
  console.log(userId)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log('No user data available');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

      fetchUserData();
    
  }, [auth.currentUser]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        {/* Top section with profile picture and user name */}
        <View style={styles.topSection}>
          <Image source={require('../assets/boy.png')} style={styles.profilePicture} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData ? userData.name : 'John Doe'}</Text>
            <Text style={{marginTop:5}}>{userData ? userData.phone : '+92 300 3344555'}</Text>
          </View>
        </View>

        {/* Button for View and Edit Profile */}
        <TouchableOpacity style={styles.editProfileButton}>
          <Image source={require('../assets/edit.png')} style={{ height: 35, width: 35, marginLeft: width * 0.05 }} />
          <Text style={styles.editProfileButtonText}>View and Edit Profile</Text>
        </TouchableOpacity>

        {/* Tabs for Help & Support, Privacy Policy, and Log Out */}
        <View style={styles.tabsContainer}>
          {/* Help & Support */}
          <TouchableOpacity style={styles.tab}>
            <Image source={require('../assets/support.png')} style={{ height: 35, width: 35, marginLeft: width * 0.05 }} />
            <Text style={styles.tabText}>Help & Support</Text>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity style={styles.tab}>
            <Image source={require('../assets/privacy.png')} style={{ height: 35, width: 35, marginLeft: width * 0.05 }} />
            <Text style={styles.tabText}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity style={styles.tab} onPress={handleLogout}>
            <Image source={require('../assets/logout.png')} style={{ height: 35, width: 35, marginLeft: width * 0.05 }} />
            <Text style={[styles.tabText, { color: 'red' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
    paddingHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editProfileButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
  },
  tabsContainer: {
    marginTop: 50,
  },
  tab: {
    flexDirection: 'row',
    backgroundColor: SECONDARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
  },
});
