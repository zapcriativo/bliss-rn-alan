import React, { useState, useEffect } from 'react';


import { Text, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import ListView from '../components/HomeListView/ListView'

const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
                <ListView />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }
});

export default HomeScreen;