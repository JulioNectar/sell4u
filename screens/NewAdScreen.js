import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase'
import firebase from "firebase"

const NewAdScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Adicionar Anuncio",
            headerBackTitle: "Loja",
        });
    }, [navigation, route])

    const createAd = () => {

        db.collection('ads').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            adTitle: input,
            sellerName: auth.currentUser.displayName,
            sellerUID: auth.currentUser.uid,
            description: input2,
            adPhoto: input3,
            price: input4,
            sellerEmail: auth.currentUser.email,
        }),
            navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Input
                style={{ paddingLeft: 10 }}
                placeholder="Digite o nome do Anuncio"
                value={input}
                onChangeText={(text) => setInput(text)}

                leftIcon={
                    <SimpleLineIcons name='note' size={24} color="black" />

                } />
            <Input
                style={{ paddingLeft: 10 }}
                placeholder="Descrição"
                value={input2}
                onChangeText={(text) => setInput2(text)}

                leftIcon={
                    <SimpleLineIcons name='event' size={24} color="black" />

                } />
            <Input
                style={{ paddingLeft: 10 }}
                placeholder="Foto URL"
                value={input3}
                onChangeText={(text) => setInput3(text)}

                leftIcon={
                    <SimpleLineIcons name='picture' size={24} color="black" />
                } />
            <Input
                style={{ paddingLeft: 10 }}
                placeholder="Preco"
                value={input4}
                onChangeText={(text) => setInput4(text)}
                onSubmitEditing={createAd}
                leftIcon={
                    <SimpleLineIcons name='wallet' size={24} color="black" />
                } />
            <Button onPress={createAd} title='Criar novo Anuncio' />
        </View>
    )
}

export default NewAdScreen

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    }
})
