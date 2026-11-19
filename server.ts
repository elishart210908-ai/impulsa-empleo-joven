import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes for Gemini AI features in TalentoJoven
app.post("/api/gemini/analyze-cv", async (req, res) => {
  try {
    const { cvText, targetRole } = req.body;
    const prompt = `Analiza el siguiente CV o perfil de un estudiante/joven buscando empleo para el puesto o área "${targetRole || 'Primer Empleo'}":
    
    "${cvText}"
    
    Devuelve un JSON con la siguiente estructura exacta:
    {
      "score": number (de 0 a 100),
      "strengths": [string],
      "improvements": [string],
      "suggestedSkills": [string],
      "summary": string (evaluación constructiva y motivadora en español)
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error analyzing CV:", error);
    res.status(500).json({ error: error.message || "Error al analizar el CV con IA" });
  }
});

app.post("/api/gemini/interview", async (req, res) => {
  try {
    const { role, history, candidateAnswer } = req.body;
    
    const systemInstruction = `Eres un reclutador amable pero exigente especializado en conectar a jóvenes con su primer empleo o prácticas en el área de "${role}". 
    Tu objetivo es hacer una simulación de entrevista laboral breve, realista y constructiva. 
    Evalúa la respuesta del candidato anterior y hazle UNA nueva pregunta de entrevista relevante (técnica, comportamental o situacional).
    Responde en formato JSON:
    {
      "feedback": "Breve comentario constructivo sobre la respuesta anterior (si es la primera pregunta, da la bienvenida y plantea la primera pregunta)",
      "nextQuestion": "La siguiente pregunta para el candidato",
      "score": number (evaluación de 0 a 100 de la respuesta dada, o 0 si es la primera pregunta)
    }`;

    const chatHistory = [
      { role: "user", parts: [{ text: `Iniciemos simulacro de entrevista para ${role}.` }] }
    ];

    if (history && Array.isArray(history)) {
      for (const h of history) {
        chatHistory.push({ role: h.role, parts: [{ text: h.text }] });
      }
    }

    if (candidateAnswer) {
      chatHistory.push({ role: "user", parts: [{ text: `Mi respuesta es: ${candidateAnswer}` }] });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in AI interview:", error);
    res.status(500).json({ error: error.message || "Error en el simulador de entrevista" });
  }
});

app.post("/api/gemini/roadmap", async (req, res) => {
  try {
    const { careerGoal } = req.body;
    const prompt = `Diseña una ruta de aprendizaje y empleabilidad (Roadmap) paso a paso para un joven estudiante que desea convertirse en "${careerGoal}".
    
    Devuelve un JSON con la siguiente estructura:
    {
      "title": string,
      "description": string,
      "estimatedDuration": string,
      "phases": [
        {
          "phaseNumber": number,
          "title": string,
          "description": string,
          "keySkills": [string],
          "recommendedAction": string
        }
      ],
      "recommendedProjects": [string]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({ error: error.message || "Error al generar la ruta de carrera" });
  }
});

app.post("/api/gemini/personalized-opportunities", async (req, res) => {
  try {
    const { profile } = req.body;
    const prompt = `REGLA OBLIGATORIA E INQUEBRANTABLE DEL SISTEMA:
    Cada usuario debe recibir EXCLUSIVAMENTE oportunidades relacionadas directamente con su carrera universitaria.
    
    Datos del usuario:
    - Carrera / Especialidad exacta: ${profile.career}
    - Universidad: ${profile.university}
    - Habilidades: ${profile.skills.join(', ')}
    - Intereses / Bio: ${profile.bio}

    REGLAS DE ORO:
    1. La carrera "${profile.career}" es el ÚNICO campo profesional permitido. No mezcles carreras ni recomiendes empleos de otras áreas profesionales bajo ninguna circunstancia.
    2. Las prácticas, becas, empleos junior y programas para estudiantes deben estar directamente vinculados a la formación académica de "${profile.career}".
    3. Si las habilidades o intereses del usuario no coinciden con su carrera, ignóralos para el campo profesional y céntrate 100% en la carrera registrada.
    4. Cada oportunidad debe incluir requisitos claros, ubicación, modalidad y una explicación ("matchReason") de por qué está directamente relacionada con la carrera de "${profile.career}".
    5. Preséntalas claramente como ejemplos y recomendaciones de orientación profesional adaptadas a su carrera.

    Devuelve un JSON con un array de objetos con esta estructura exacta:
    [
      {
        "id": "gen-1",
        "title": "...",
        "company": "...",
        "type": "empleo",
        "modality": "hibrido",
        "field": "Tecnología",
        "location": "...",
        "stipendOrSalary": "...",
        "description": "...",
        "requirements": ["..."],
        "benefits": ["..."],
        "postedDate": "Hace un momento",
        "deadline": "30 de Diciembre, 2026",
        "featured": true,
        "applicantsCount": 15,
        "lat": 19.4326,
        "lng": -99.1332,
        "matchReason": "..."
      }
    ]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "[]");
    res.json(result);
  } catch (error: any) {
    console.error("Error generating personalized opportunities:", error);
    res.status(500).json({ error: error.message || "Error al generar oportunidades personalizadas con IA" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`TalentoJoven server running on http://localhost:${PORT}`);
  });
}

startServer();
