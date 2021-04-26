import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth, db } from '../firebase'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />
            <Image source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Echo_chat_icon.svg/1024px-Echo_chat_icon.svg.png"
            }} style={{ width: 100, height: 100 }} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input onSubmitEditing={signIn} placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <Button raised containerStyle={styles.button} onPress={signIn} title="login" />
            <Button raised onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="register" />
            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 340

    },

    button: {
        width: 200,
        marginTop: 10,

    }


})
