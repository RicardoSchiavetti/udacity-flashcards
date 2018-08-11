import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightPurp } from '../utils/colors';
import * as api from '../api';

export default class Deck extends Component {
    state = {
        deck: []
    }

    componentDidMount = () => {
        if (this.props.navigation.getParam('deck')) {
            this.setState({ deck: this.props.navigation.getParam('deck').item })
        } else {
            api.getNode(this.props.navigation.getParam('deckName').title)
                .then((deck => {
                    this.setState({ deck })
                }))
        }
    }

    componentDidUpdate = () => {
        this.state.deck &&
            api.getNode(this.state.deck.title)
                .then((deck => {
                    this.setState({ deck })
                }))
    }

    render() {
        const deckTitle = this.state.deck ? this.state.deck.title : '';
        const questions = this.state.deck.questions ? this.state.deck.questions.length : 0;
        return (

            <View style={styles.deck}>
                <Text style={{ fontSize: 22 }}>Title: {deckTitle}</Text>
                <Text style={{ fontSize: 16 }}>{questions} cards</Text>
                <TouchableOpacity style={styles.deckBtn}
                    disabled={questions === 0}
                    onPress={() => this.props.navigation.navigate('Quiz', { questions: this.state.deck.questions })}>
                    <Text>Quiz</Text></TouchableOpacity>
                <TouchableOpacity style={styles.deckBtn}
                    onPress={() => this.props.navigation.navigate('NewCard', { deckTitle: { deckTitle } })}>
                    <Text>Add Question</Text>
                </TouchableOpacity>
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