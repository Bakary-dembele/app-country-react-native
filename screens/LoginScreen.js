import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {

    const [request, response, promptAsync] =
        Google.useAuthRequest({
            expoClientId: '275019743251-dg8tmucchi8m90rq155m4hf5jmnaq6es.apps.googleusercontent.com',
            iosClientId: '',
            androidClientId: '',
            webClientId: '275019743251-dg8tmucchi8m90rq155m4hf5jmnaq6es.apps.googleusercontent.com'
        });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const accessToken = authentication.accessToken;
            axios.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + accessToken)
                .then(response => {
                    console.log(response)
                    const userDetails = response.data;
                    console.log(userDetails);
                    const { given_name, family_name, email, picture } = userDetails;

                    AsyncStorage.setItem('userDetails', JSON.stringify(
                        {
                            firstname: given_name,
                            lastname: family_name,
                            email: email,
                            picture: picture
                        })
                    )
                        .then(() => {
                            console.log("Stockage des informations users dans le AsyncStorage")
                            props.navigation.navigate("HomeScreen");
                        })
                        .catch(error => {
                            console.log("AsynStorage call to setItem failure : ", error)
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [response])

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', fontFamily: "Supermercado", fontSize: 20 }}>Login Screen</Text>
            <Button title='Login with Google' disabled={!request} onPress={() => {
                promptAsync()
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 2,
        borderColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 5
    }
})

export default LoginScreen;