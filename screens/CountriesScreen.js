import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Button,
TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const CountriesScreen = (props) => {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [researchPattern, setResearchPattern] = useState("");

    useEffect(() => {
        //Appel API pour récupérer la liste des pays
        handleRegionSelection('all')
    }, [])

    const navigateToCountryDetails = (countryName) => {
        props.navigation.navigate("CountryDetailsScreen", {
            countryName
        });
    }

    const handleRegionSelection = (region) => {
        let param = ``;
        if(region === "all")
            param = region
        else
            param = `region/${region}`;
        setLoading(true);
        axios.get("https://restcountries.com/v3.1/" + param)
            .then(response => {
                console.log("Rest countries response => ", response.data[2])
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
                setCurrentPage(1);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    let pagination = [];
    let countriesList = [];
    if(countries) {
        let end = countries.length / 10;
        if(countries.length % 10 !== 0)
            end++;
        for (let i=1; i<= end; i++) {
            pagination.push(
                <TouchableOpacity key={i} onPress={() => setCurrentPage(i)}>
                    <Text style={styles.regionButton}>{i}</Text>
                </TouchableOpacity>
            )
        }
        const beginList = (currentPage - 1) * 10;
        const endList = currentPage * 10;
        countriesList = countries.slice(beginList, endList);
    }

    const renderHeader = () => {
        return (
            <TextInput
                style={styles.textInput} 
                placeholder="Entrer le nom d'un pays"
                value={researchPattern}
                onChangeText={pattern => {
                    setResearchPattern(pattern)
                    filterCountries()
                    }}
            />
        )
    }

    const filterCountries = () => {
        setLoading(true);
        const newCountriesList = countriesList.filter(country => {
            const countryInfo = `${country.commonName.toLowerCase()}
            ${country.frenchName.toLowerCase()}`;
            const research = researchPattern.toLowerCase();
            return countryInfo.indexOf(research) > -1;
        })
        setCountries(newCountriesList);
        setCurrentPage(1);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pays</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleRegionSelection('all')}><Text style={styles.regionButton}>Tous</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Africa')}><Text style={styles.regionButton}>Afrique</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Americas')}><Text style={styles.regionButton}>Amériques</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Asia')}><Text style={styles.regionButton}>Asie</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Europe')}><Text style={styles.regionButton}>Europe</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionSelection('Oceania')}><Text style={styles.regionButton}>Océanie</Text></TouchableOpacity>
            </View>
            {
                loading && <View>
                    <Text style={styles.title}>Chargement...</Text>
                </View>
            }
            {
                !loading &&
                <>
            <Text style={styles.title}>Nombre de pays : {countries.length}</Text>
            <View style={styles.buttonContainer}>{pagination}</View>
            <FlatList 
                data={countriesList}
                renderItem={country => 
                    <View style={styles.countryItem}>
                        <Image style={styles.flag} source={{uri: country.item.flag}} />
                        <Text style={styles.itemInfo}>Nom commun : {country.item.commonName}</Text>
                        <Text style={styles.itemInfo}>Nom français : {country.item.frenchName}</Text>
                        <Text style={styles.itemInfo}>Région : {country.item.region}</Text>
                        <Text style={styles.itemInfo}>Capitale : {country.item.capital}</Text>
                        <Text style={styles.itemInfo}>Style de conduite : {country.item.carSide}</Text>
                        <TouchableOpacity onPress={() => navigateToCountryDetails(country.item.commonName)}><Text style={styles.regionButton}>Voir détails</Text></TouchableOpacity>
                    </View>
                }
                keyExtractor={country => country.id}
                //ListHeaderComponent={() => renderHeader()}
            />
            </>
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

export default CountriesScreen;