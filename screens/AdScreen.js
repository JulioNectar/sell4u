import React, { useState, useLayoutEffect } from 'react'
import { SafeAreaView, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import firebase from "firebase"


const AdScreen = ({ navigation, route, id }) => {

    const createChat = async () => {

        await db.collection('chats').doc("Chat about " + route.params.id + " with " + auth?.currentUser?.uid).set({
            chatName: "chat with " + auth?.currentUser?.displayName,
            chatUser: auth?.currentUser?.uid,

            adPhoto: route.params.adPhoto,
            sellerUID: route.params.sellerUID,
            adTitle: route.params.adTitle,
            description: route.params.description,
            sellerName: route.params.sellerName,
            price: route.params.price,
            sellerEmail: route.params.sellerEmail

        }).then(() => {

            navigation.navigate("Chat", {
                id: "Chat about " + route.params.id + " with " + auth?.currentUser?.uid,
                idAnuncio: route.params.id,
                chatName: "chat with " + auth?.currentUser?.displayName,
                chatUser: auth?.currentUser?.uid,

                adPhoto: route.params.adPhoto,
                sellerUID: route.params.sellerUID,
                adTitle: route.params.adTitle,
                description: route.params.description,
                sellerName: route.params.sellerName,
                price: route.params.price,
                sellerEmail: route.params.sellerEmail
            })

        }).catch(error => alert(error))
    }

    return (
        <View activeOpacity={1} key={id} bottomDivider>
            <ListItem>
                <Avatar rounded style={styles.avatar}
                    source={{
                        uri: route.params.adPhoto
                    }}
                />
            </ListItem>

            <ListItem style={styles.itemAnuncio}>
                <ListItem.Content >
                    <ListItem.Title style={{ fontWeight: "800" }}>
                        {route.params.adTitle}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {route.params.description}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                        <Text>Preço: R${route.params.price}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>

            </ListItem>
            {auth?.currentUser?.email !== "julioooc@gmail.com" && auth?.currentUser?.uid !== route.params.sellerUID && <TouchableOpacity onPress={createChat} activeOpacity={0.5}>
                <Avatar rounded style={styles.iconeChat}
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"
                    }}
                />
            </TouchableOpacity>
            }
        </View >
    )
}

export default AdScreen

const styles = StyleSheet.create({
    avatar: {
        width: 400,
        height: 300,
        alignContent: 'center'
    },

    itemAnuncio: {
        shadowColor: "black",
        height: 150,

    },
    iconeChat: {
        position: 'absolute',
        right: 1,
        bottom: 1,
        paddingBottom: 35,
        paddingRight: 35,
        height: 130,
        width: 130
    }
})
