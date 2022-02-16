import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config= {
    apiKey: "AIzaSyD7YlBM5a6MYmcrGuBFBrXXrAvGjY_e7Vk",
    authDomain: "crwn-db-8534c.firebaseapp.com",
    projectId: "crwn-db-8534c",
    storageBucket: "crwn-db-8534c.appspot.com",
    messagingSenderId: "241166685763",
    appId: "1:241166685763:web:e4054b3a93d4638ee9e6f6",
    measurementId: "G-VY77MM78TF"
  };

  export const createUserProfileDocument= async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef= firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
          const { displayName, email} = userAuth;
          const createdAt = new Date();

          try{
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })

          } catch (error) {
              console.log('error creating user', error.message);
          }
      }


      return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle= () => auth.signInWithPopup(provider);

  export default firebase;