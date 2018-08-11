import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { green, red, white, lightPurp } from '../utils/colors'
import { clearNotifications, setNotification } from '../utils/NotificationControl';

export default class Quiz extends Component {

    state = {
        questions: [],
        index: 0,
        correct: 0,
        showAnswer: false,
    }

    componentDidMount = () => {
        this.setState({ questions: this.props.navigation.state.params.questions })
    }

    counter = (index, questions) => {
        return (
            <View style={styles.counter}>
                <Text style={{ fontSize: 16 }}>Questions: {index + 1}/{questions.length}</Text>
            </View>
        )
    }

    quiz = () => {
        console.log('processa quiz')
        const { questions } = this.props.navigation.state.params
        const { index, correct } = this.state

        if (index + 1 < questions.length) {
            this.setState({ index: index + 1 })
        } else {
            clearNotifications()
                .then(() => setNotification())

            Alert.alert(
                'Total: ' + Math.round((correct / index + 1) * 100) + '%',
                `${correct} correct answers of ${questions.length}. Retry ?`,
                [
                    {
                        text: 'Yes', onPress: () => this.setState({
                            index: 0,
                            correct: 0,
                            showAnswer: false
                        })
                    },
                    { text: 'No', onPress: () => this.props.navigation.navigate('Home') },
                ],
                { cancelable: false }
            )
        }

    }

    setAnswer = () => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    userChoose = () => {
        return (
            <View>
                <TouchableOpacity style={styles.answerBtnCorrect} onPress={() => { this.setState({ correct: this.state.correct + 1 }, this.quiz) }}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerBtnIncorrect} onPress={() => this.quiz()}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        const { index, showAnswer } = this.state
        //evita pegar do state para carregar as questões como ultima ação do componente
        const questions = this.props.navigation.state.params.questions

        const quizCard = questions.length > 0 && showAnswer ?
            <Text style={{ fontSize: 20, textAlign: 'center' }}>{questions[index].answer}</Text> :
            <Text style={{ fontSize: 20, textAlign: 'center' }}>{questions[index].question}</Text>
        return (
            <View >
                {this.counter(index, questions)}
                <View style={styles.quiz}>
                    {quizCard}
                </View>
                <TouchableOpacity style={styles.deckBtn} onPress={() => this.setAnswer()}>
                    <Text>{showAnswer ? 'Question' : 'Answer'}</Text>
                </TouchableOpacity>
                {this.userChoose()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
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
    },
    answerBtnCorrect: {
        backgroundColor: green,
        padding: 10
    },
    answerBtnIncorrect: {
        backgroundColor: red,
        padding: 10
    },
    counter: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
    quiz: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    }

})
