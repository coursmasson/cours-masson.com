import firebase from 'firebase'

/*export default firebase.initializeApp({
  // apiKey: 'AIzaSyCqwUL7L-vm2eFX78ZvjlnEGvQI1iEg0t0',
  // authDomain: 'react-moltin-app.firebaseapp.com',
  // databaseURL: 'https://react-moltin-app.firebaseio.com',
  // storageBucket: 'react-moltin-app.appspot.com'
  apiKey: 'AIzaSyD0W48KHVnb9LkL_mNDS8Muf1gRqzX5S8Y',
  authDomain: "de-coursmassondev.firebaseapp.com",
  databaseURL: "https://de-coursmassondev.firebaseio.com",
  projectId: "de-coursmassondev",
  storageBucket: "de-coursmassondev.appspot.com",
  messagingSenderId: "778726261062"
})*/

export const init = () => {
  return firebase.initializeApp({
  // apiKey: 'AIzaSyCqwUL7L-vm2eFX78ZvjlnEGvQI1iEg0t0',
  // authDomain: 'react-moltin-app.firebaseapp.com',
  // databaseURL: 'https://react-moltin-app.firebaseio.com',
  // storageBucket: 'react-moltin-app.appspot.com'
  apiKey: 'AIzaSyD0W48KHVnb9LkL_mNDS8Muf1gRqzX5S8Y',
  authDomain: "de-coursmassondev.firebaseapp.com",
  databaseURL: "https://de-coursmassondev.firebaseio.com",
  projectId: "de-coursmassondev",
  storageBucket: "de-coursmassondev.appspot.com",
  messagingSenderId: "778726261062"
}).database()
}