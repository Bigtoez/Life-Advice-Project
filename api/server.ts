import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Anthropic } from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Initialize Anthropic client
const client = new Anthropic();

// CORS configuration
app.use(cors());
app.use(express.json());

// Types
interface Session {
  id: string;
  type: "pattern-break" | "after-fight" | "breakup" | "group";
  userId: string;
  startTime: Date;
  endTime?: Date;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  systemPrompt: string;
  status: "active" | "completed";
}

// In-memory session storage (for MVP - replace with DB later)
const sessions: Map<string, Session> = new Map();

// Load system prompt
function loadSystemPrompt(sessionType: string): string {
  const krishnamurti = fs.readFileSync(
    path.join(__dirname, "prompts/krishnamurti-system.md"),
    "utf-8"
  );
  const sessionTypes = fs.readFileSync(
    path.join(__dirname, "prompts/session-types.md"),
    "utf-8"
  );

  let typeSpecificPrompt = "";

  switch (sessionType) {
    case "pattern-break":
      typeSpecificPrompt =
        "## SESSION TYPE 1: Pattern Break\n" +
        sessionTypes.split("## SESSION TYPE 1: Pattern Break")[1].split("---")[0];
      break;
    case "after-fight":
      typeSpecificPrompt =
        "## SESSION TYPE 2: After the Fight\n" +
        sessionTypes.split("## SESSION TYPE 2: After the Fight")[1].split("---")[0];
      break;
    case "breakup":
      typeSpecificPrompt =
        "## SESSION TYPE 3: Break Up / Transition\n" +
        sessionTypes
          .split("## SESSION TYPE 3: Break Up / Transition")[1]
          .split("---")[0];
      break;
    case "group":
      typeSpecificPrompt =
        "## SESSION TYPE 4: Group Dialogues\n" +
        sessionTypes.split("## SESSION TYPE 4: Group Dialogues")[1].split("---")[0];
      break;
  }

  return `${krishnamurti}\n\n${typeSpecificPrompt}`;
}

// Routes

// 1. Start a new session
app.post("/api/sessions/start", (req: Request, res: Response) => {
  try {
    const { userId, sessionType } = req.body;

    if (!userId || !sessionType) {
      return res
        .status(400)
        .json({ error: "userId and sessionType are required" });
    }

    const validTypes = ["pattern-break", "after-fight", "breakup", "group"];
    if (!validTypes.includes(sessionType)) {
      return res.status(400).json({ error: "Invalid session type" });
    }

    const systemPrompt = loadSystemPrompt(sessionType);

    const sessionId = uuidv4();
    const session: Session = {
      id: sessionId,
      type: sessionType as any,
      userId,
      startTime: new Date(),
      messages: [],
      systemPrompt,
      status: "active",
    };

    sessions.set(sessionId, session);

    res.json({
      sessionId,
      message: "Session started successfully",
      sessionType,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
});

// 2. Send message and get response
app.post("/api/sessions/:sessionId/message", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.status !== "active") {
      return res.status(400).json({ error: "Session is not active" });
    }

    // Add user message to history
    session.messages.push({ role: "user", content: message });

    // Call Claude Haiku
    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: session.systemPrompt,
      messages: session.messages,
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Add assistant response to history
    session.messages.push({ role: "assistant", content: assistantMessage });

    res.json({
      sessionId,
      message: assistantMessage,
      messageCount: session.messages.length,
    });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// 3. Get session history
app.get("/api/sessions/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({
      id: session.id,
      type: session.type,
      userId: session.userId,
      startTime: session.startTime,
      endTime: session.endTime,
      status: session.status,
      messageCount: session.messages.length,
      messages: session.messages,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// 4. End session
app.post("/api/sessions/:sessionId/end", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.status = "completed";
    session.endTime = new Date();

    res.json({
      sessionId,
      message: "Session ended successfully",
      duration: session.endTime!.getTime() - session.startTime.getTime(),
      messageCount: session.messages.length,
    });
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ error: "Failed to end session" });
  }
});

// 5. Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🧠 Krishnamurti Advisor Agent running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
