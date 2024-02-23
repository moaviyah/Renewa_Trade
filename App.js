import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import SignIn from './screens/SignIn';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Navigator from './screens/Navigator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import EditProduct from './screens/EditProduct';
import AllProducts from './screens/AllProducts';
import ProductDetails from './screens/ProductDetails';
import Messages from './screens/Messages';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Splash />;
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Navigator" component={Navigator} />
            <Stack.Screen name='EditProduct' component={EditProduct}/>
            <Stack.Screen name='AllProducts' component={AllProducts}/>
            <Stack.Screen name='ProductDetails' component={ProductDetails}/>
            <Stack.Screen name='Messages' component={Messages}/>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
