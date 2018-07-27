import Rebase from 're-base';
// import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC5sh_v_mMfdeQZipPbxAVx1wx1q_uyiYU",
    authDomain: "tastebyt3s-1494190748449.firebaseapp.com",
    databaseURL: "https://tastebyt3s-1494190748449.firebaseio.com",
    // projectId: "tastebyt3s-1494190748449",
    // storageBucket: "tastebyt3s-1494190748449.appspot.com",
    // messagingSenderId: "862444135029"
  };
  
// const app = firebase.initializeApp(config);
const base = Rebase.createClass(config);

export default base;