import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import SignIn from './screens/SignIn';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Navigator from './screens/Navigator';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Spalsh' component={Splash}/>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Navigator' component={Navigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

