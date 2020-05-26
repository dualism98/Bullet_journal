import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { w, h } from '../constants/Layout'

const AddButton = ({onPress, title, price}) =>{
    const { container, text, price_text } = styles

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={container}>
                <Text style={text}>{title}</Text>
                <Text style={price_text}>{price} ₽</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w,
        minHeight: 40,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: 'grey',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },

    text: {
        color: 'grey',
        fontSize: 20,
        flexWrap: 'wrap',
        maxWidth: w * 0.7,
    },

    price_text: {
        fontSize: 20,
        color: 'salmon',
        maxWidth: w * 0.3,
    }
})

export default AddButton