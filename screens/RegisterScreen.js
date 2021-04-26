import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pictureURL, setPictureURL] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Voltar"
        })
    }, [navigation])

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                if (email === "Julioooc@gmail.com") {
                    authUser.user.updateProfile({
                        displayName: name,
                        photoURL: pictureURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    })

                } else {
                    authUser.user.updateProfile({
                        displayName: name,
                        photoURL: pictureURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    })

                }


            })
            .catch((error) => alert(error.message))
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Crie a sua Conta</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Nome" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Senha" type="text" value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Picture URL" type="text" value={pictureURL} onChangeText={(text) => setPictureURL(text)} onSubmitEditing={register} />
            </View>
            <Button containerStyle={styles.button} raised onPress={register} title="Register" />
            <View style={{ padding: 100 }} />
        </KeyboardAvoidingView >
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    }
})