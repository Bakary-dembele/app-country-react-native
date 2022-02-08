import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, FlatList } from 'react-native';

const LOGO = require("./assets/images/m2i-logo.png");
const imgUrl = "data:image/png;base64,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";
const users = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
];

export default function App() {
  const [state, setState] = useState("");
  return (
    // <ScrollView>
    <View style={styles.container}>
      <Image
        //source={LOGO}
        source={{uri: imgUrl}}
        style={styles.imgLogo}
       />
      <Text style={{color: 'white',fontWeight: 'bold', padding: 2, marginBottom: 10}}>2i-Tech Paris-2</Text>
      <TextInput placeholder="Entrer votre texte" placeholderTextColor="#fff"
      value={state}
      onChangeText={value => setState(value)}
       style={styles.textInput} />
       <FlatList 
         data={users}
         renderItem={user => <Text style={styles.userItem}>{user.item.id} : {user.item.name}</Text>}
       />
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderColor: "red",
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 250,
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10
  },
  imgLogo: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  userItem: {
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    textAlign: 'center',
    margin: 5,
    padding: 50
  }
})
