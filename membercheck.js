import firebase from './javascripts/firebaseConfig';

// ...

const checkUserInfo = () => {
    const user = firebase.auth().currentUser;

    if (user) {
        console.log('User is signed in:', user);
        console.log('User UID:', user.uid);
        console.log('User email:', user.email);
        console.log('User display name:', user.displayName);
        console.log('User photo URL:', user.photoURL);
        // 기타 사용자 정보도 이곳에서 확인할 수 있습니다.
    } else {
        console.log('No user is signed in.');
    }
};

// 호출하여 사용자 정보 확인
checkUserInfo();
