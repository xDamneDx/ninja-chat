const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const chatRooms = document.querySelector(".chat-rooms");
const username = localStorage.ninjaChatName
  ? localStorage.ninjaChatName
  : "Anon";

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.id);
    chatroom.getChats((data) => chatUI.render(data));
  }
});

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

chatroom.getChats((data) => chatUI.render(data));
