import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'

import { Avatar, Text } from 'react-native-elements';
import RNPoll, { IChoice } from "react-native-poll";
import Moment from 'moment';
Moment.locale('en');
import api from '../helper/api'

const DetailScreen = ({ navigation }) => {

    const [QuestionData, setQuestionData] = useState()
    const [TotalVotes, setTotalVotes] = useState()


    // Loading data from question 
    useEffect(() => {
        let QuestionID = navigation.getParam('id')
        api.get("/questions/" + QuestionID)
            .then(function (response) {
                if (response.status == 200) {

                    // set current total of votes 
                    let total_votes = 0
                    response.data.choices.map(choices => {
                        total_votes = Math.floor(total_votes + choices.votes)
                        console.log(choices.votes)
                        console.log(total_votes)
                    })
                    setTotalVotes(total_votes)
                    setQuestionData(response.data)

                } else {
                    Alert.alert('Ops!', 'We had an error on get question details', [
                        { text: "OK", onPress: () => navigation.navigate('HomeScreen') }
                    ])
                }
            })
    }, [])


    return (
        <ScrollView style={styles.container}>
            {QuestionData != null ? (
                <View style={styles.content}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: QuestionData.image_url }}
                        />

                        <Text h4 style={styles.question_title}>{QuestionData.id} - {QuestionData.question}</Text>
                        <Text style={styles.question_date}>Published at {Moment(QuestionData.published_at).format('d MMM Y')}</Text>
                        <Text style={styles.title_answers}>Select your choice: </Text>
                    </View>
                    <RNPoll
                        totalVotes={TotalVotes}
                        choices={QuestionData.choices}
                        fillBackgroundColor={'#535CF7'}
                        style={{marginTop: -20}}
                    />
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <ActivityIndicator size="large" color="#535CF7" />
                </View>
            )}
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 15
    },
    question_title: {
        marginVertical: 20,
        textAlign: 'center',

    },
    question_date: {
        color: '#757575',
        marginBottom: 10
    },
    title_answers: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    item_choice: {
        margin: 10,
        flexDirection: 'row'
    }
})


export default React.memo(DetailScreen);
