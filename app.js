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

whoDidTheLogin = localStorage.getItem("userName")
document.getElementById("userName").innerHTML = "Bem-Vindo - " + whoDidTheLogin

function addRoom() {
  nameOfTheRoom = document.getElementById("roomName").value
  firebase.database().ref("/").child(nameOfTheRoom).update({
    propósito: "adicionar sala"
  })

  localStorage.setItem("nameOfTheRoom", nameOfTheRoom)

  window.location = "room.html"
}

function getData() {
  firebase.database().ref("/").on('value',
    function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        roomNames = childKey;
        console.log("Nome da Sala - " + roomNames);
        row = "<div class='roomName' id='" + roomNames + "' onclick='redirectToRoomName(this.id)'>" + roomNames + "</div> <hr>"
        document.getElementById("output").innerHTML += row
      });
    });
}

getData();

function redirectToRoomName(name) {
  localStorage.setItem("nameOfTheRoom", name)
  window.location = "room.html"
}

function logout() {
  localStorage.removeItem("username")
  localStorage.removeItem("roomName")
  window.location = "index.html"
}