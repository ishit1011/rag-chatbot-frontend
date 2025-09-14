import { useEffect, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import {
  getSessionMessages,
  getSessionId,
  saveSessionMessages,
  deleteSessionMessages,
  getGeminiResponse,
} from "../services/api";

import { useNavigate } from "react-router-dom";


const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const local_email = localStorage.getItem("userEmail");
  const local_isToken = localStorage.getItem("isToken");

  const [geminiLoading, setGeminiLoading] = useState(false);

  const navigate = useNavigate();

  // get answer by calling backend ---> calls gemini
  const getGeminiAnswer = async (query, idToken) => {
    setGeminiLoading(true);
    try {
      const geminiResponse = await getGeminiResponse(query, idToken);

      if (geminiResponse && geminiResponse.response) {
        // add Gemini response into chat ---> character by character (typed-out reply)
        const fullText = geminiResponse.response;
        let index = 0;

        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: "bot", content: "" },
        ]);

        const interval = setInterval(() => {
          index++;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].content = fullText.slice(0, index);
            return updated;
          });

          if (index >= fullText.length) {
            clearInterval(interval);
          }
        }, 10); // speed of typing (ms per char)

        await saveSessionMessages(
          sessionId,
          "bot",
          geminiResponse.response,
          local_isToken
        );
      }
    } catch (error) {
      console.error("Gemini error:", error);
    } finally {
      setGeminiLoading(false);
    }
  };

  // fetch session & messages
  useEffect(() => {
    const initChat = async () => {
      if (!local_email || !local_isToken) {
        console.warn("⚠️ No email or token in localStorage");
        setLoading(false);
        return;
      }

      try {
        const sessionRes = await getSessionId(local_email, local_isToken);
        if (sessionRes?.sessionId) {
          setSessionId(sessionRes.sessionId);

          const msgsRes = await getSessionMessages(
            sessionRes.sessionId,
            local_isToken
          );
          if (msgsRes?.messages) {
            setMessages(msgsRes.messages);
          }
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [local_email, local_isToken]);

  // send a new message
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, newMsg]);

    if (sessionId && local_isToken) {
      await saveSessionMessages(sessionId, "user", text, local_isToken);
    }

    // call Gemini after user sends
    await getGeminiAnswer(text, local_isToken);
  };

  // clear session messages
  const clearMessages = async () => {
    if (!sessionId || !local_isToken) return;

    setMessages([]);

    try {
      // 2. Call backend to clear messages in Redis
      await deleteSessionMessages(sessionId, local_isToken);
    } catch (err) {
      console.error("Error clearing session:", err);
      // (optional) rollback UI if backend fails
      const msgsRes = await getSessionMessages(sessionId, local_isToken);
      if (msgsRes?.messages) {
        setMessages(msgsRes.messages);
      }
    }
  };

  const handleLogout = async()=>{
    localStorage.clear();
    navigate('/');
  }

  if (loading) return <p className="text-center">Loading chat...</p>;

  return (
    <div className="chat-window flex flex-col h-full border rounded-lg shadow-md">
      <div className="messages flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Message key={msg.id} role={msg.role} content={msg.content} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}

        {/* Loader when Gemini is thinking */}
        {geminiLoading && (
          <div className="message assistant">
            <div className="bubble loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="thinking-text">Thinking…</span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-footer">
        <ChatInput onSend={sendMessage} disabled={geminiLoading} />

        <button onClick={clearMessages} className="clear-btn">
          Clear
        </button>

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default ChatWindow;
