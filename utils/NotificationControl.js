import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'


const KEY = 'Quiz:notification'

export function clearNotifications() {
    return AsyncStorage.removeItem(KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNewNotification() {
    return {
        title: 'Card QUIZ!',
        body: "Qhy don't try a QUIZ today???!!?!!?!?!",
        android: {
            priority: 'high',
            sticky: false
        }
    }
}

export function setNotification() {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((res) => {
            if (res === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            Notifications.scheduleLocalNotificationAsync(
                                createNewNotification(),
                                {
                                    time: new Date().getDate() + 1,
                                    repeat: 'day'
                                }
                            )
                            AsyncStorage.setItem(KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}