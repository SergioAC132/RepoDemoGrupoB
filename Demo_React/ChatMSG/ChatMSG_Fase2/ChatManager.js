class ChatManager {
  constructor() {
    this.messages = [];
    this.maxMessages = 100;
  }

  addMessage(user, text) {
    const message = {
      id: Date.now(),
      user,
      text,
      time: new Date().toLocaleTimeString()
    };
    this.messages.push(message);

    if (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
    return message;
  }

  getHistory() {
    return this.messages;
  }
}

export default ChatManager;
