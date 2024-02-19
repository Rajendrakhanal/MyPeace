import React, { useState } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/v1/users/bot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            responses: { messages },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(prevMessages => [...prevMessages, data.message]);
        } else {
          console.error("Error sending message to the backend");
        }
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }

      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-blue-100">
      <div className="min-w-md w-1/2 mx-4 p-6 bg-white rounded-md shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            Joyful Chats, Endless Smiles – Chat Anytime, Feel the Vibes!
          </h1>
        </div>
        <div className="max-h-[300px] overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-end">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
