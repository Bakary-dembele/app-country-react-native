import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

const HomeScreen = (props) => {
    console.log(props);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(props.route.params)
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={{color: 'white', fontFamily: "Supermercado", fontSize: 20}}>Welcome {user.firstname} {user.lastname} !</Text>
        </View>
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

export default HomeScreen;