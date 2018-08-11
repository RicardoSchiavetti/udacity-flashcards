import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import * as api from '../api'
import { gray, white, lightPurp } from '../utils/colors'

export default class NewDeck extends Component {

    state = {
        deckTitle: '',
        questions: [],
        question: '',
        answer: ''
    }

    componentDidMount = () => {
        this.setState({ deckTitle: this.props.navigation.getParam('deckTitle').deckTitle })
    }

    createCard = () => {
        const deckTitle = this.state.deckTitle;
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }

        api.addCard(deckTitle, card)
            .then(() => {
                this.textQuestion.clear();
                this.textAnswer.clear();
            })
    }


    render() {
        return (
            <View style={styles.deck}>
                <Text>Question</Text>
                <TextInput ref={input => { this.textQuestion = input }} style={{ height: 60 }} onChangeText={(question) => this.setState({ question })}></TextInput>
                <Text>Answer</Text>
                <TextInput ref={input => { this.textAnswer = input }} style={{ height: 60 }} onChangeText={(answer) => this.setState({ answer })}></TextInput>

                <View>
                    <TouchableOpacity style={styles.deckBtn} onPress={() => this.createCard()}>
                        <Text>Save Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: white,
        borderRadius: 16,
        padding: 20,
        margin: 5,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    deckBtn: {
        backgroundColor: lightPurp,
        padding: 10,
        margin: 5
    }
})