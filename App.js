import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
const Stack = createStackNavigator();
import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import colors from './src/helpers/colors'

import DetailsScreen from './src/components/DetailScreen/DetailsScreen'
import CartScreenContainer from './src/components/CartScreen/CartScreenContainer'
import HomeScreenContainer from './src/components/HomeScreen/HomeScreenContainer';
import LoginScreen from './src/components/LoginScreen/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen/RegisterScreen';
import {Provider} from "react-redux";
import store from './src/redux/redux-store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor={colors.white}/>
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreenContainer} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreenContainer} />
         </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});
