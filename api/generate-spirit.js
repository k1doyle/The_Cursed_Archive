export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fear } = req.body;
  if (!fear || !fear.trim()) {
    return res.status(400).json({ error: 'Fear is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a Jujutsu Kaisen cursed spirit designer. Given a fear, create an original cursed spirit profile. Be creative, dark, and cool — like something Gege Akutami would design. The spirit should feel like it belongs in the JJK universe.

Fear: "${fear.trim()}"

Respond with ONLY valid JSON, no markdown, no backticks, no other text:
{
  "name": "A Japanese-inspired name that sounds menacing (use romaji, not kanji)",
  "grade": "One of: Special Grade, Grade 1, Grade 2, Grade 3, Grade 4 (pick based on how universal/powerful the fear is)",
  "cursedTechnique": "A unique cursed technique name and brief description (1-2 sentences, make it creative and terrifying)",
  "domainExpansion": "A dramatic domain expansion name that reflects the fear (like Malevolent Shrine or Infinite Void)"
}`
        }],
      }),
    });

    const data = await response.json();
    const text = data.content.map(i => i.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    parsed.fear = fear.trim();

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Spirit generation error:", err);
    return res.status(500).json({ error: "The cursed energy was unstable. Try again!" });
  }
}
