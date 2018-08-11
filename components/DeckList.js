import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import * as api from '../api'
import { white, blueEyes, lightPurp } from '../utils/colors'

export default class DeckList extends Component {
    componentDidMount = () => {
        this._fetchDecks()
    }

    componentDidUpdate = () => {
        this._fetchDecks()
    }

    _fetchDecks = () => {
        api.fetchDeckResults()
            .then(decks => { this.setState({ decks }) })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.deck}>
                <Text style={{ fontSize: 22 }}>{item.title}</Text>
                <Text>{item.questions.length} cards</Text>
                <TouchableOpacity style={styles.deckBtn} onPress={() => this.props.navigation.navigate('Deck', {
                    deck: { item }
                })}><Text>Go</Text></TouchableOpacity>
            </View>
        )
    }

    render() {
        const decks = this.state ? this.state.decks : []
        return (
            <View>
                <TouchableOpacity style={styles.deck} onPress={() => this.props.navigation.navigate('NewDeck')}>
                    <Text style={{ fontSize: 22 }}>New deck</Text>
                </TouchableOpacity>
                <FlatList
                    data={Object.values(decks)}
                    keyExtractor={item => item.title}
                    renderItem={this.renderItem}
                />
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
        padding: 10
    }
})