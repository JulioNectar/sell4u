import React from 'react'
import { ShadowPropTypesIOS } from 'react-native'
import { Image, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { auth, db } from "../firebase"

const AdListItem = ({ id, adTitle, sellerName, sellerUID, description, adPhoto, price, sellerEmail, enterAd, deleteAd }) => {

    return (
        <ListItem style={styles.cardItem} activeOpacity={0.5} onPress={() => enterAd(id, adTitle, description, sellerName, sellerUID, adPhoto, price, sellerEmail)} deleteAd={deleteAd} key={id} bottomDivider>
            <Avatar rounded style={styles.avatar}
                source={{
                    uri: adPhoto
                }}
            />


            <ListItem.Content style={styles.adItem}>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {adTitle}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
                    {description}
                </ListItem.Subtitle>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    <Text>Preço: R${price}</Text>
                </ListItem.Subtitle>
            </ListItem.Content>
            {(auth?.currentUser?.email === "julioooc@gmail.com" || auth?.currentUser?.uid === sellerUID) && <Button title="X" onPress={() => deleteAd(id)} />}
        </ListItem >
    )
}

export default AdListItem

const styles = StyleSheet.create({
    avatar: {
        width: 140
    },

    cardItem: {
        alignItems: "center",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        shadowColor: "black",
        height: 140,
    },
    adItem: {
        marginTop: 10,
        marginBottom: 5,
        margin: 1,
        shadowColor: "black",
        height: 100,
    }

})
