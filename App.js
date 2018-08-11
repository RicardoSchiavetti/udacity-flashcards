import React from 'react';
import { View } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { gray } from './utils/colors';
import { createStackNavigator } from 'react-navigation'

export default class App extends React.Component {
  render() {

    const MainNavigator = createStackNavigator({
      Home: {
        screen: DeckList,
        navigationOptions: () => ({
          title: 'Decks',
          headerBackTitle: 'Main decks'
        })
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions: () => ({
          title: 'New Deck',
          headerBackTitle: 'Create a new Deck'
        })
      },
      Deck: {
        screen: Deck,
        navigationOptions: () => ({
          title: 'Deck',
          headerBackTitle: 'Deck'
        })
      },
      NewCard: {
        screen: NewCard,
        navigationOptions: () => ({
          title: 'New Card',
          headerBackTitle: 'New Card'
        })
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: () => ({
          title: 'Quiz!',
          headerBackTitle: '!! Quiz !!'
        })
      }
    },
      { initialRouteName: 'Home' })

    return (
      <View style={{ flex: 1, backgroundColor: gray }}>
        <MainNavigator />
      </View>
    );
  }
}