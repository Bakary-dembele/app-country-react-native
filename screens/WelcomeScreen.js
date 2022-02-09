import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = (props) => {
    //console.log(props);
    const navigateToLogin = () => {
        //console.log(props);
        props.navigation.navigate("LoginScreen", {
            firstname: "John",
            lastname: "Smith",
            age: 35
        });
    }
    return (
        <View style={styles.container}>
            <Text style={{color: 'white', fontFamily: "Supermercado", fontSize: 20}}
            >Welcome Screen</Text>
            <TouchableOpacity onPress={navigateToLogin}>
                <View style={styles.button}>
                    <Text>Login</Text>
                </View>
            </TouchableOpacity>
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

export default WelcomeScreen;