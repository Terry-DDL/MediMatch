export async function talk(message: string): Promise<string> {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not set');
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || 'Request failed');
  }

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) {
    throw new Error('No response from model.');
  }

  return reply;
}
