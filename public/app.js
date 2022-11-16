const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

//Access to manage users within the app
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

//Stream of changes 

auth.onAuthStateChanged(user => {
    if(user)
 {
    //signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden  = true;   
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
     
 }else {
    //not signed in 
    whenSignedIn.hidden = true
    whenSignedOut.hidden = false;
    userDetails.innerHTML ='';
    
 }

});

 
const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

const db = firebase.firestore();
//Reference to the database location
let thingsRef;
//turn off the realtime stream
let unsubscribe;

auth.onAuthStateChanged(user => {
    if(user) {
        thingsRef = db.collection('things'); 

        createThing.onclick = () => {
            //create a new document
            thingsRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()
            });
        }

        unsubscribe = thingsRef
        .where('uid',  '==', user.uid)
        .onSnapshot(querySnapshot => {
            const items = querySnapshot.doc.map(doc => {
                return`<li>${doc.data().name} </li>`
            });
             
            thingsList = innerHTML = items.join('');
        


        });
         


    }
})
 
 



 
















