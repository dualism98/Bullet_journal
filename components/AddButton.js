import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { w, h } from '../constants/Layout'

const AddButton = ({onPress, title}) =>{
    const { container, text } = styles

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={container}>
                <Text style={text}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w/3,
        minHeight: 30,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 8
    },

    text: {
        color: 'grey',
        textAlign: 'center',
        marginTop: 5
    }
})

export default AddButton