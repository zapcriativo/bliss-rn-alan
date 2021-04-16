import React, { Component, useState, useRef } from 'react'
import { View, StyleSheet, Alert, ScrollView } from 'react-native'

import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Icon, Text } from 'react-native-elements';

import api from '../helper/api'

const NewQuestion = (props) => {

    const question = useRef(null);
    const choices = useRef(null);

    const [questionTextField, setquestionTextField] = useState('');

    const [listChoices, setListChoices] = useState([])
    const [choiceTextField, setchoiceTextField] = useState();

    const [disableGlobal, setdisableGlobal] = useState(false)

    // Yup action to validate Question form field and if choice array is empty
    const FormSchema = Yup.object().shape({
        question: Yup.string().required("This field is required"),
        choices: Yup.array().min(1).required("This field is required"),
    });

    // Function to add new item to choice array when user press plus button on "add choices options" field
    function addChoice(value) {
        let ArrayChoices = listChoices
        checkExists = ArrayChoices.some(el => el === value);

        if (!checkExists) {
            ArrayChoices.push(value)
            setListChoices([...ArrayChoices])
            setchoiceTextField(null)
        } else {
            Alert.alert('This choice is already in the list')
        }
    }

    // Function to remove choice from array when user press trash icon on list
    function removeChoice(value) {
        let ArrayChoices = [...listChoices];
        ArrayChoices.splice(value, 1);
        setListChoices([...ArrayChoices])
    }

    // Function to send new question to save in API
    function saveNewQuestion(values) {
        setdisableGlobal(true)
        api.post("/questions", {
            question: values.question,
            choices: values.choices,
        })
            .then(function (response) {
                if (response.status <= 200 || response.status >= 300) {
                    Alert.alert('Ops!', 'We had a error on trying to save your question, please try again!')
                    setdisableGlobal(false)
                    return false
                }
                Alert.alert(
                    'Uhuu!',
                    'Your question as saved with sucess!',
                    [
                        { text: "OK", onPress: () => props.navigation.navigate('HomeScreen', { QuestionSaved: true }) }
                    ]
                );

            })
            .catch((error) => console.debug(error))
    }

    return (
        <ScrollView style={styles.container}>

            <Formik
                initialValues={{ question: questionTextField, choices: listChoices }}
                enableReinitialize={true}
                onSubmit={(values) => saveNewQuestion(values)}
                validationSchema={FormSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldTouched,
                }) => (
                    <View>
                        <Input
                            ref={question}
                            disabled={disableGlobal}
                            label={'Type your Question Here'}
                            autoCorrect={false}
                            clearButtonMode={'while-editing'}
                            errorMessage={errors.question}
                            containerStyle={{ marginBottom: 5 }}
                            value={questionTextField}
                            onChangeText={setquestionTextField}
                        />

                        <Input
                            ref={choices}
                            disabled={disableGlobal}
                            label={'Add choices options'}
                            onChangeText={setchoiceTextField}
                            value={choiceTextField}
                            containerStyle={{ marginBottom: -15 }}
                            autoCorrect={false}
                            rightIcon={
                                <Icon
                                    name='plus-circle'
                                    type='font-awesome'
                                    color='#517fa4'
                                    onPress={() => choiceTextField != null ? addChoice(choiceTextField) : Alert.alert('Do you need fill the field!')}
                                />
                            }
                            clearButtonMode={'while-editing'}
                            errorMessage={errors.choices}
                        />

                        {
                            listChoices.map((item, key) => (
                                <View style={styles.itemChoice} key={key}>
                                    <Text style={styles.itemChoiceText}>{item}</Text>
                                    <Icon
                                        name='trash'
                                        type='font-awesome'
                                        onPress={() => removeChoice(key)}
                                        size={18}
                                    />
                                </View>
                            ))
                        }

                        <Button
                            title="Save Question"
                            buttonStyle={styles.buttonStyle}
                            disabledStyle={{backgroundColor: '#535CF7'}}
                            disabled={disableGlobal}
                            loading={disableGlobal}
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#535CF7',
        padding: 15,
        paddingTop: 50
    },
    buttonStyle: {
        backgroundColor: '#535CF7',
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginTop: 29
    },
    itemChoice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginVertical: 10,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 10
    },
    itemChoiceText: {
        fontSize: 16
    }
})


export default React.memo(NewQuestion);
