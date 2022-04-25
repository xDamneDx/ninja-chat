class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    const response = await this.chats.add(chat);

    return response;
  }
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update ui
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
  }
  updateRoom(room) {
    this.room = room;
    console.log("Room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

const chatroom = new Chatroom("gaming", "DamN");

chatroom.getChats((data) => {
  console.log(data);
});

setTimeout(() => {
  chatroom.updateRoom("gaming");
  chatroom.updateName("chris");
  chatroom.getChats((data) => {
    console.log(data);
  });
  chatroom.addChat("Hello there.");
}, 3000);
