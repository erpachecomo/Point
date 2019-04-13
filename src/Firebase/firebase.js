import app from "firebase/app";

const config = {
  apiKey: "AIzaSyCYlPfgm4od-FgZBODRWLqbjeabFCyGhO8",
  authDomain: "point-6bf04.firebaseapp.com",
  databaseURL: "https://point-6bf04.firebaseio.com",
  projectId: "point-6bf04",
  storageBucket: "",
  messagingSenderId: "577586055541"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
