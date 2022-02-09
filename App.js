import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import * as Font from 'expo-font';

// const Stack = createStackNavigator();
// console.log('Stack navigator : ', Stack);

const { Navigator, Screen } = createStackNavigator();

const App = () => {

    useEffect(() => {
        loadRessources();
    }, []);

    const [loading, setLoading] = useState(true);

    const loadRessources = async () => {
        try {
            await Font.loadAsync({
                "Supermercado": require("./assets/fonts/SupermercadoOne-Regular.ttf"),
                "Festive": require("./assets/fonts/Festive-Regular.ttf")
            })
            setLoading(false);
        } catch(e) {
            console.log("erreur lors du chargement des polices ", e);
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white'}}>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "red"
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20
                },
                headerTitleAlign: 'center'
            }}>
                <Screen name="WelcomeScreen" component={WelcomeScreen} options={{
                    title: "Welcome"
                }}/>
                <Screen name="LoginScreen" component={LoginScreen} options={
                    {
                        headerLeft: false,
                        title: "Connection",
                        // headerStyle: {
                        //     backgroundColor: "yellow"
                        // },
                        // headerTintColor: "black"
                    }
                }/>
                <Screen name="HomeScreen" component={HomeScreen} options= 
                    {{
                        headerShown: false
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default App;