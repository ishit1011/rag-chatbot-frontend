import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import "../assets/styles/chat.scss";

const Chat = () => {
  return (
    <div className="chat-page">
      {/* <Sidebar /> */}
      <ChatWindow />
    </div>
  );
};

export default Chat;
