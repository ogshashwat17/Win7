import React, { useState } from "react";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("email", email);

    try {
      const res = await fetch("https://formspree.io/f/xyzpwdde", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">Send a Message</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="message"
          placeholder="Type your message here..."
          required
          className="w-full h-28 border border-gray-300 p-2 rounded resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Your email (optional)"
          className="w-full border border-gray-300 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Submit
        </button>

        {status === "success" && (
          <div className="text-green-600">✅ Message sent successfully!</div>
        )}
        {status === "error" && (
          <div className="text-red-600">❌ Failed to send. Try again.</div>
        )}
      </form>
    </div>
  );
}
