import React, { useLayoutEffect, useState, useRef } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, View, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, TextInput, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import firebase from "firebase"
import { auth, db } from '../firebase'
import AdListItem from '../components/AdListItem'




const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const inputMensagemRef = useRef(null);

    const focusMessageInput = () => {
        inputMensagemRef.current.focus()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Avatar rounded source={{
                        uri:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"

                    }} />

                    { auth?.currentUser?.uid === route.params.chatUser &&
                        <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }} >{route.params.adTitle} </Text>}

                    { auth?.currentUser?.uid !== route.params.chatUser &&
                        <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }} >{route.params.chatName.replace('chat with ', 'Chat com ') + " sobre " + route.params.adTitle} </Text>}



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
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>



                </View>
            )
        })
    }, [navigation])


    const dummy = useRef()
    /*
        const sendMessage = () => {
            Keyboard.dismiss();
            db.collection('stores').doc(route.params.identificacao).collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            })
            setInput("")
            focusMessageInput()
        }*/

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput("")
        focusMessageInput()
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))

        return unsubscribe
    }, [route])


    const enterAd = () => {
        navigation.navigate("Ad", {
            id: route.params.idAnuncio,
            adTitle: route.params.adTitle,
            description: route.params.description,
            sellerName: route.params.sellerName,
            sellerUID: route.params.sellerUID,
            photoURL: route.params.adPhoto,
            price: route.params.price,
            sellerEmail: route.params.sellerEmail
        })
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="green" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>

                        <AdListItem id={route.params.idAnuncio} adTitle={route.params.adTitle} sellerName={route.params.sellerName} sellerUID={route.params.sellerUID} description={route.params.description} adPhoto={route.params.adPhoto} price={route.params.price} sellerEmail={route.params.sellerEmail} enterAd={enterAd}> </AdListItem>


                        {messages.map(({ id, data }) => (

                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar containerStyle={{ //caso WEB
                                        position: "absolute",
                                        bottom: -15, right: -5
                                    }} rounded position="absolute" bottom={-15} right={-5} size={30} source={{ uri: data.photoURL }} />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar containerStyle={{ //caso WEB
                                        position: "absolute",
                                        bottom: -15,
                                        right: -5
                                    }} rounded position="absolute" bottom={-15} right={-5} size={30} source={{ uri: data.photoURL }} />
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                    <Text style={styles.senderText}>{data.message}</Text>

                                </View>
                            )
                        ))}

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput ref={inputMensagemRef} autoFocus value={input} onChangeText={(text) => setInput(text)} placeholder="Mensagem" style={styles.textInput} onSubmitEditing={sendMessage} />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2C6BED" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
    },
    text: {
        backgroundColor: 'pink',
        padding: 20,
        marginVertical: 5,
    },

    container: {
        flex: 1
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },

    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 1
    },

    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,

    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,

    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },

    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },

    sender: {
        padding: 15,
        backgroundColor: "#2868E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    }


})
