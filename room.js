const firebaseConfig = {
    apiKey: "AIzaSyA5x4U75DTZbx-OOgp6qz6FlrKgqgP87A8",
    authDomain: "let-s-converse-69e27.firebaseapp.com",
    databaseURL: "https://let-s-converse-69e27-default-rtdb.firebaseio.com",
    projectId: "let-s-converse-69e27",
    storageBucket: "let-s-converse-69e27.appspot.com",
    messagingSenderId: "961505166314",
    appId: "1:961505166314:web:a1c150d3d4ac0e8c7ae893"
};

firebase.initializeApp(firebaseConfig);

roomName = localStorage.getItem("nameOfTheRoom")
userName = localStorage.getItem("userName")

function send() {
    text = document.getElementById("message").value
    firebase.database().ref(roomName).push({
        Usuário: userName,
        Mensagem: text,
        Likes: 0
    })
    document.getElementById("message").value = ""
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("conversation").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "propósito") {
                firebaseMessageId = childKey;
                messageData = childData;
                console.log(firebaseMessageId)
                console.log(messageData)
                message = messageData['Mensagem']
                like = messageData['Likes']
                user = messageData['Usuário']
                person = "<h4> " + user + " <img class='user_tick' src='tick.png'> </h4>"
                messageText = "<h4 class='message_h4'> " + message + " </h4>"
                buttonAndLike = "<button id='" + firebaseMessageId + "' class='btn btn-warning' value='" + like + "' onclick='updateLike(this.id)'> <span class='glyphicon glyphicon-thumbs-up'></span>&nbsp; " + like + " </button>"

                row = person + messageText + buttonAndLike
                document.getElementById("conversation").innerHTML += row
            }
        });
    });
}

getData();

function updateLike(e) {
    buttonId = e
    actualLikes = document.getElementById(buttonId).value
    newLikes = Number(actualLikes) + 1
    firebase.database().ref(roomName).child(e).update({
        Likes: newLikes
    })

}

function logout() {
    localStorage.removeItem("username")
    localStorage.removeItem("roomName")
    window.location = "index.html"
}