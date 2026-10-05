import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SESSION_TITLES: Record<string, string> = {
  "pattern-break": "🔄 The Pattern",
  "after-fight": "💔 After the Fight",
  breakup: "💔 Breakup Breakdown",
  group: "👥 Group Session",
};

const SESSION_INTROS: Record<string, string> = {
  "pattern-break": "You've had this fight 3 times with different people. Let's see why.",
  "after-fight": "That fight wasn't actually about what you think. Let's unpack it.",
  breakup: "Breakups hurt. But understanding helps. Let's process it.",
  group: "You're not alone. Your friends have the same patterns too.",
};

export default function SessionPage() {
  const router = useRouter();
  const { type } = router.query;
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!type) return;

    const initSession = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const userId = `user-${Date.now()}`;

        const response = await axios.post(`${apiUrl}/api/sessions/start`, {
          userId,
          sessionType: type,
        });

        setSessionId(response.data.sessionId);
        setSystemPrompt(response.data.systemPrompt);
        const intro = SESSION_INTROS[type as string] || "Welcome. Let's explore together.";
        setMessages([
          {
            role: "assistant",
            content: intro,
          },
        ]);

        timerRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 0) {
              if (timerRef.current) clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initSession();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [type]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId || !systemPrompt || loading) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.post(
        `${apiUrl}/api/sessions/${sessionId}/message`,
        { 
          message: userMessage,
          systemPrompt: systemPrompt
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!type) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 backdrop-blur">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <span className="text-sm text-purple-400 hover:text-purple-300 transition cursor-pointer mb-1 block">
                â† Back to It's Complicated
              </span>
            </Link>
            <h2 className="text-2xl font-black text-white">
              {SESSION_TITLES[type as string]}
            </h2>
          </div>
          <div className="text-4xl font-black text-purple-400">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl rounded-lg px-6 py-4 ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-slate-100"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Share what's on your mind..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
            disabled={loading || timeRemaining === 0}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || timeRemaining === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
