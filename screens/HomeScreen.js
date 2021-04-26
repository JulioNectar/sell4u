import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import AdListItem from '../components/AdListItem'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from "../firebase"
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])
    const [ads, setAds] = useState([])


    const signOutUser = () => {
        auth.signOut()
            .then(() => {
                navigation.replace('Login')
                Alert.alert("Deslogado da Conta")
            })
    }

    useEffect(() => {
        const unsubscribe = db.collection('ads').onSnapshot(snapshot => (
            setAds(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe
    }, [])

    const enterChatList = (id, chatName) => {
        navigation.navigate("ChatList", {
            id,
            chatName,
        })
    }

    useLayoutEffect(() => {

        navigation.setOptions({
            title: auth?.currentUser?.displayName,
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { signOutUser() }}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",

                    marginRight: 30
                }}>

                    <TouchableOpacity onPress={() => navigation.navigate('NewAd')} activeOpacity={0.5} >

                        <SimpleLineIcons name='pencil' size={24} color="black" />

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        paddingLeft: 25,
                    }} onPress={enterChatList} activeOpacity={0.5} >
                        <SimpleLineIcons name='bubbles' size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterAd = (id, adTitle, description, sellerName, sellerUID, adPhoto, price, sellerEmail) => {
        navigation.navigate("Ad", {
            id,
            adTitle,
            description,
            sellerName,
            sellerUID,
            adPhoto,
            price,
            sellerEmail,

        })
    }

    const deleteAd = (id) => {
        db.collection('ads').doc(id).delete();

        Alert.alert(
            "Deletar Anuncio",
            "Tem certeza?",
            [
                {
                    text: "Deletar",
                    onPress: () => Alert.alert(
                        "Você está prestes a deletar seu ANUNCIO",
                        "Tem certeza?",
                        [
                            {
                                text: "Deletar",
                                onPress: () => {
                                    db.collection('ads').doc(id).delete();

                                }
                            },
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    )
                },
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        )

    }

    return (
        <SafeAreaView >
            {/*<ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <AdListItem key={id} id={id} chatName={chatName} enterChat={enterChat} deleteChat={deleteChat} />

                ))}
                </ScrollView> */}
            <ScrollView style={styles.container}>
                {ads.map(({ id, data: { adTitle, sellerName, sellerUID, description, adPhoto, price, sellerEmail } }) => (
                    <AdListItem key={id} id={id} adTitle={adTitle} sellerName={sellerName} sellerUID={sellerUID} description={description} adPhoto={adPhoto} price={price} sellerEmail={sellerEmail} enterAd={enterAd} deleteAd={deleteAd} />
                ))}
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        height: '100%'
    }
})
