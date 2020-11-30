import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBhQxrc8h42vmmEVVQ7cp_gWmWYlYOTo7A',
  authDomain: 'react-firebase-chat-app-ebacd.firebaseapp.com',
  databaseURL: 'https://react-firebase-chat-app-ebacd.firebaseio.com',
  projectId: 'react-firebase-chat-app-ebacd',
  storageBucket: 'react-firebase-chat-app-ebacd.appspot.com',
  messagingSenderId: '804665050980',
  appId: '1:804665050980:web:a6fdabf023a822f98f1c71',
  measurementId: 'G-W8SJVKP78T',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
