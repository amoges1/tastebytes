//1. Build navigation with JS


// 2. Fetch user data

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC5sh_v_mMfdeQZipPbxAVx1wx1q_uyiYU",
    authDomain: "tastebyt3s-1494190748449.firebaseapp.com",
    databaseURL: "https://tastebyt3s-1494190748449.firebaseio.com",
    projectId: "tastebyt3s-1494190748449",
    storageBucket: "tastebyt3s-1494190748449.appspot.com",
    messagingSenderId: "862444135029"
    };
firebase.initializeApp(config);

//Firebase database instance
var database = firebase.database();

var user = 'user1';


function setRecs(recommendations) {
    
    var recs = document.getElementById("recs");

     
}

function getUserData(user) {
   // console.log(this.user); //Why??
    
    //Database reference
    var userProfile = database.ref('/users/' + this.user );
    
    //snapshot = data, snapshot.val() = json
    userProfile.on('value', function(snapshot) {
        console.log(snapshot.val().recommendations);

    });

}

getUserData();

