import firebase from '/javascripts/firebaseConfig';


const checkUserInfo = () => {
    const user = firebase.auth().currentUser;

    if (user) {
        console.log('User is signed in:', user);
        console.log('User name:', user.name);
    } else {
        console.log('No user is signed in.');
    }
};

// 호출하여 사용자 정보 확인
checkUserInfo();
