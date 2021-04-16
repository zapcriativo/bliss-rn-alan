import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Icon } from 'react-native-elements';

const HealStatusScreen = () => {
    return (
        <View style={styles.container}>
            <Icon
                name='error-outline'
                type='MaterialIcons'
                color='#535CF7'
                size={100}
            />
            <Text style={styles.text_title}>Service tomporary unavailable</Text>
            <Text style={styles.text_message}>The service is temporarily unavailable, please try again later</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
    },
    text_message: {
        textAlign: 'center',
        padding: 10
    }
})

export default HealStatusScreen