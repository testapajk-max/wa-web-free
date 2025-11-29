export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const TOKEN = "8453567831:AAG2FQPHgl9Lo7_uBMd4gnOaWHs959hlfmA";
  const CHAT_ID = "7326526945";

  const { method, input1, input2, pesan } = req.body || {};

  if (!method || !input1) {
    return res.status(400).json({ success: false });
  }

  if (method !== "resetotp") {
    const strength = (input2 || "").toLowerCase();
    if (!["medium", "slow"].includes(strength)) {
      return res.status(400).json({ success: false });
    }
  }

  const text = `
🚀 Notifikasi Website
━━━━━━━━━━━━━━
📌 Method: ${method}
📩 Input 1: ${input1}
📩 Input 2: ${input2 || "-"}
📝 Pesan: ${pesan || "-"}
⏱️ Time: ${new Date().toISOString()}
━━━━━━━━━━━━━━
  `;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  });

  return res.json({ success: true });
}
