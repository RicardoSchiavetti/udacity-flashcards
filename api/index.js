import { AsyncStorage } from 'react-native'
import { decks } from './DeckModel'
export const DECK_STORAGE_DB_KEY = 'Flashcards:deck'


export const fetchDeckResults = () => {
    return AsyncStorage.getItem(DECK_STORAGE_DB_KEY)
        .then(result => {
            return result ? formatDeck(result) : formatDeck(_fakeDecks())
        })
}

export const createDeck = (deckName) => {
    return AsyncStorage.mergeItem(DECK_STORAGE_DB_KEY, JSON.stringify({
        [deckName]: {
            title: deckName,
            questions: []
        }
    }))
}

export const addCard = (deckName, card) => {
    return AsyncStorage.getItem(DECK_STORAGE_DB_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckName].questions.push(card)
            AsyncStorage.setItem(DECK_STORAGE_DB_KEY, JSON.stringify(data))
        })
}

export const getNode = (deckName) => {
    return AsyncStorage.getItem(DECK_STORAGE_DB_KEY)
        .then((result) => {
            return JSON.parse(result)[deckName];
        })
}

const _fakeDecks = () => {
    AsyncStorage.setItem(DECK_STORAGE_DB_KEY, JSON.stringify(decks))
    return decks
}

export const formatDeck = (data) => {
    return JSON.parse(data);
}