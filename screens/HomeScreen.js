import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        useAsyncStorage('userDetails').getItem()
            .then(userDetails => {
                setUser(JSON.parse(userDetails));
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const navigateToCountries = () => {
        props.navigation.navigate("CountriesScreen");
    }

    return (
        <View style={styles.container}>
            <Image style={styles.userPicture} source={{ uri: user.picture }} />
            <Text style={styles.text}>Welcome {user.firstname} {user.lastname} !</Text>
            <Text style={styles.text}>You're are logged with email : {user.email}</Text>
            <Button title='See countries' onPress={() => { navigateToCountries() }} />
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
    text: {
        color: 'white',
        fontFamily: "Supermercado",
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    userPicture: {
        width: 100,
        height: 100,
        marginBottom: 15,
        borderRadius: 50
    }
})

export default HomeScreen;