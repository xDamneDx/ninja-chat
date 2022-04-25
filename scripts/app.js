const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "DamN");

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

chatroom.getChats((data) => chatUI.render(data));
