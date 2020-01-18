import * as firebase from "firebase";
import "firebase/firestore";
import {firebaseConfig} from "../../firebase.config";
import * as Facebook from "expo-facebook";
import {appId} from "../../facebook.config";

class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    createUserWithEmail = async user => {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);
            let db = this.firestore.collection("users").doc(this.uid);
            db.set({
                uid: this.uid,
                username: user.username,
                email: user.email,
                avatar: null
            });
        } catch (error) {
            alert("Error: ", error);
        }
    };

    createUserWithFacebook = async () => {
        try {
            await Facebook.initializeAsync(appId);
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().signInAndRetrieveDataWithCredential(credential).then(data => {
                    let db = this.firestore.collection("users").doc(this.uid);
                    db.set({
                        uid: this.uid,
                        username: data.user.displayName,
                        email: data.user.email,
                        avatar: null
                    });
                }).catch(err => console.log(err));
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    };

    getPostsFromLocation(location) {
        return firebase
            .firestore()
            .collection('posts').where("location", "==", location)
            .get()
            .then(function (querySnapshot) {
                let posts = querySnapshot.docs.map(doc => doc.data());
                return posts.sort((a,b)=> b.timestamp-a.timestamp);
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
    };

    addPost = async ({description, location, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);
        const user = await this.getUserById();
        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    creatorPhoto:user.avatar,
                    creatorUsername:user.username,
                    creatorUid:user.uid,
                    description,
                    location,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                }).then(ref => {
                res(ref);
            }).catch(error => {
                rej(error);
            });
        });
    };

    uploadPhotoAsync = (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(filename).put(file);
            upload.on(
                "state_changed",
                snapshot => {
                },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    getUserById(){
        const fireUser= firebase.auth().currentUser;
        return firebase
            .firestore()
            .collection('users').where("uid", "==", fireUser.uid)
            .get()
            .then(function (querySnapshot) {
                let user = querySnapshot.docs.map(doc => doc.data());
                // debugger
                return user[0]
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
    }


    loginWithEmail = async(user)=>{
      return  firebase.auth().signInWithEmailAndPassword(user.email,user.password);
    };

    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
