import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import { auth, db } from "../firebase"
const ItemChat = ({ id, chatName, chatUser, enterChat, deleteChat, adPhoto, sellerUID, price, route, navigation,

    adTitle,
    description,
    sellerName,
    sellerEmail }) => {

    return (
        <ListItem activeOpacity={0.5} onPress={() => enterChat(id, chatName, chatUser, sellerUID, adPhoto,
            adTitle,
            description,
            sellerName,
            price,
            sellerEmail)} key={id} bottomDivider>
            <Avatar rounded
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"
                }}
            />
            <ListItem.Content>

                <ListItem.Title style={{ fontWeight: "800" }}>
                    {(auth?.currentUser?.email === "julioooc@gmail.com") ? (
                        chatName.replace('chat with ', 'Chat com ') + " sobre " + adTitle

                    ) : (
                        adTitle
                    )}
                </ListItem.Title>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    <Text> Preço: R$ {price}</Text>
                </ListItem.Title>

            </ListItem.Content>
            <Avatar rounded style={styles.avatar}
                source={{
                    uri: adPhoto
                }}
            />
            <Button title="X" onPress={() => deleteChat(id)} />
        </ListItem >
    )
}

export default ItemChat

const styles = StyleSheet.create({

    avatar: {
        height: 70,
        width: 70,
    }
})
