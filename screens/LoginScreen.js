import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '156601157754-m28p5fna485soi50b7mgn210ce7phteu.apps.googleusercontent.com',
        iosClientId: '',
        androidClientId: '',
        webClientId: '156601157754-m28p5fna485soi50b7mgn210ce7phteu.apps.googleusercontent.com'
    });

    useEffect(() => {
        console.log(response);
    }, [response])

    const navigateToHome = () => {
        //console.log(props);
        props.navigation.navigate("HomeScreen", {
            firstname: props.route.params.firstname,
            lastname: props.route.params.lastname,
            age: props.route.params.age
        });
    }
    return (
        <View style={styles.container}>
            <Text style={{color: 'white',fontFamily: "Supermercado", fontSize: 20}}>Login Screen</Text>
            <Button title='Login with Google' onPress={() => {
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