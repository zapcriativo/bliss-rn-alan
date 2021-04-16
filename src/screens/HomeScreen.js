import React, { Fragment, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';

import { Button } from 'react-native-elements'
import ListView from '../components/HomeListView/ListView'

export default ({navigation}) => {

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#535CF7' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="light-content" backgroundColor="#535CF7" />
                <ListView navigation={navigation} />
                <View style={styles.containerButtons}>
                    <Button
                        Outline
                        title="CREATE NEW QUESTION"
                        containerStyle={styles.buttonOutStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => navigation.navigate('newQuestion')}
                    />
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    containerButtons: {
        backgroundColor: '#fff'
    },
    buttonOutStyle: {
        margin: 10
    },
    buttonStyle: {
        backgroundColor: '#535CF7',
        borderRadius: 10,
        padding: 15
    }
});
