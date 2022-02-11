import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, Button } from 'react-native';
import axios from 'axios';

const CountryDetailsScreen = (props) => {

    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        retrieveCountry(props.route.params.countryName)
    }, [])

    const retrieveCountry = (country) => {
        setLoading(true);
        axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            .then(response => {
                console.log("Rest country response => ", response.data[0])
                // const countries = response.data.map(country => {
                //     return {
                //         commonName: country.name.common,
                //         frenchName: country.translations.fra.official,
                //         region: country.region,
                //         flag: country.flags.png,
                //         population: country.population,
                //         capital: country.capital ? country.capital[0] : "Non défini",
                //         carSide: country.side === "right" ? "à droite" : "à gauche",
                //         id: country.altSpellings[0]
                //     }
                // })
                setCountry(response.data[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pays</Text>
            {
                loading && <View>
                    <Text style={styles.title}>Chargement...</Text>
                </View>
            }
            
            {
                !loading && 
            <View style={styles.countryItem}>
                <Image style={styles.flag} source={{uri: country.flags.png}} />
                <Text style={styles.itemInfo}>Nom commun : {country.name.common}</Text>
                <Text style={styles.itemInfo}>Nom français : {country.translations.fra.official}</Text>
                <Text style={styles.itemInfo}>Région : {country.region}</Text>
                <Text style={styles.itemInfo}>Capitale : {country.capital ? country.capital[0] : "Non définie"}</Text>
                <Text style={styles.itemInfo}>Nombre d'habitants : {country.population}</Text>
                <Text style={styles.itemInfo}>Style de conduite : {country.car.side === "right" ? "à droite" : "à gauche"}</Text>
                <Text style={styles.itemInfo}>Pays membre de l'ONU : {country.unMember ? "Oui" : "Non"}</Text>
                <Button title="Afficher Maps" onPress={() => Linking.openURL(country.maps.googleMaps)} />
            </View>
            }
                
            <StatusBar style="auto" />
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
    title: {
        color: 'white',
        fontFamily: "Supermercado",
        fontSize: 20,
        marginVertical: 15
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    regionButton: {
        alignSelf: 'flex-start',
        width: 'auto',
        backgroundColor: "white",
        color: "black",
        fontSize: 17,
        borderRadius: 7,
        padding: 3,
        marginHorizontal: 3
    },
    countryItem: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    flag: {
        width: 150,
        height: 100,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#fff"
    },
    itemInfo: {
        color: 'white',
        marginBottom: 5,
        textAlign: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        marginVertical: 15,
        marginHorizontal: 10,
        height: 30,
        borderRadius: 15,
        padding: 5
    }
})

export default CountryDetailsScreen;