import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Button,
TouchableOpacity } from 'react-native';
import axios from 'axios';

const CountriesScreen = (props) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //Appel API pour récupérer la liste des pays
        handleRegionSelection('all')
    }, [])

    

    const handleRegionSelection = (region) => {
        let param = ``;
        if(region === "all")
            param = region
        else
            param = `region/${region}`
        axios.get("https://restcountries.com/v3.1/" + param)
            .then(response => {
                //console.log("Rest countries response => ", response.data[0])
                const countries = response.data.map(country => {
                    return {
                        commonName: country.name.common,
                        frenchName: country.translations.fra.official,
                        region: country.region,
                        flag: country.flags.png,
                        population: country.population,
                        capital: country.capital ? country.capital[0] : "Non défini",
                        carSide: country.side === "right" ? "à droite" : "à gauche",
                        id: country.altSpellings[0]
                    }
                })
                setCountries(countries);
            })
            .catch(error => {
                console.error(error);
            })
        console.log(region);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Countries</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleRegionSelection('all')}><Text style={styles.regionButton}>All</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Africa')}><Text style={styles.regionButton}>Afrique</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Americas')}><Text style={styles.regionButton}>Amériques</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Asia')}><Text style={styles.regionButton}>Asie</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Europe')}><Text style={styles.regionButton}>Europe</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Oceania')}><Text style={styles.regionButton}>Océanie</Text></TouchableOpacity>
            </View>
            <Text style={styles.title}>Nombre de pays : {countries.length}</Text>
            <FlatList 
                data={countries}
                renderItem={country => 
                    <View style={styles.countryItem}>
                        <Image style={styles.flag} source={{uri: country.item.flag}} />
                        <Text style={styles.itemInfo}>Nom commun : {country.item.commonName}</Text>
                        <Text style={styles.itemInfo}>Nom français : {country.item.frenchName}</Text>
                        <Text style={styles.itemInfo}>Région : {country.item.region}</Text>
                        <Text style={styles.itemInfo}>Capitale : {country.item.capital}</Text>
                        <Text style={styles.itemInfo}>Style de conduite : {country.item.carSide}</Text>
                    </View>
                }
                keyExtractor={country => country.id}
            />
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
        marginHorizontal: 5
    },
    countryItem: {
        marginTop: 20,
        padding: 15,
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
        marginTop: 5,
        textAlign: 'center'
    }

})

export default CountriesScreen;