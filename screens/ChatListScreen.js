import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from "../firebase"
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import ItemChat from '../components/ItemChat'
import firebase from 'firebase'

const ChatListScreen = ({ navigation, route }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Store",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Avatar rounded source={{
                        uri:
                            auth?.currentUser?.photoURL

                    }} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }} > Chats </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>

                </View>
            )
        });

    }, [navigation, route])

    const enterChat = (id, chatName, chatUser, sellerUID, adPhoto, adTitle, description, sellerName, price, sellerEmail) => {
        navigation.navigate("Chat", {
            id,
            chatName,
            chatUser,

            adPhoto,
            sellerUID,
            adTitle,
            description,
            sellerName,
            price,
            sellerEmail,
        })
    }

    const deleteChat = (id) => {
        db.collection('chats').doc(id).delete();
    }

    return (
        <SafeAreaView >

            <ScrollView style={styles.container}>


                {chats.map(({ id, data: { chatName, chatUser, adPhoto, sellerUID, adTitle, description, sellerName, price, sellerEmail } }) => (
                    <View key={id}>

                        {(auth?.currentUser?.email === "julioooc@gmail.com") ? (
                            <ItemChat id={id} chatName={chatName} enterChat={enterChat} chatUser={chatUser} adPhoto={adPhoto} deleteChat={deleteChat} sellerUID={sellerUID} adTitle={adTitle} description={description} sellerName={sellerName} price={price} sellerEmail={sellerEmail} />
                        ) : (
                            <></>
                        )}

                        {(chatUser === auth?.currentUser?.uid) ? (
                            <ItemChat id={id} chatName={chatName} enterChat={enterChat} chatUser={chatUser} adPhoto={adPhoto} deleteChat={deleteChat} sellerUID={sellerUID} adTitle={adTitle} description={description} sellerName={sellerName} price={price} sellerEmail={sellerEmail} />
                        ) : (
                            <></>
                        )}

                    </View>
                ))}




            </ScrollView>

        </SafeAreaView >
    )
}

export default ChatListScreen

const styles = StyleSheet.create({

    container: {
        height: '100%'
    }
})
