import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import * as api from '../api'
import { gray, white, lightPurp } from '../utils/colors'

export default class NewDeck extends Component {
    state = {
        titleCard: ''

    }

    createDeck = () => {
        const title = this.state.titleCard;
        api.createDeck(title)
            .then(() => this.props.navigation.navigate('Deck', {
                deckName: { title }
            }))
    }


    render() {
        return (
            <View style={styles.deck}>
                <Text style={{ fontSize: 22 }}>Title of new Deck</Text>
                <TextInput style={{ height: 60 }} onChangeText={(titleCard) => this.setState({ titleCard })}></TextInput>

                {this.state.titleCard.length > 0 &&
                    <View>
                        <TouchableOpacity style={styles.deckBtn} onPress={() => this.createDeck()}>
                            <Text>Create Deck</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: white,
        borderRadius: 16,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        alignSelf: 'auto',
        justifyContent: 'center',
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
