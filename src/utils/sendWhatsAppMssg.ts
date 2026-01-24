import client from "./whatsapp.client";

/**
 * Formats Egyptian mobile numbers for WhatsApp
 * @param number - String like "010..." or "2010..."
 */
function formatEgyptNumber(number: string): string {
  let cleaned = number.replace(/\D/g, "");
  if (cleaned.startsWith("01")) {
    cleaned = "20" + cleaned.substring(1);
  } else if (cleaned.startsWith("1")) {
    cleaned = "20" + cleaned;
  }
  return `${cleaned}@c.us`;
}

/**
 * Sends a message using the shared client instance
 */
export async function sendWhatsapp(
  number: string,
  text: string,
): Promise<void> {
  const chatId = formatEgyptNumber(number);
  try {
    // We use { sendSeen: false } to bypass the current 'markedUnread' bug
    await client.sendMessage(chatId, text, { sendSeen: false });
    console.log(`✅ Message sent to ${chatId}`);
  } catch (err) {
    console.error(`❌ Failed to send message to ${chatId}:`, err);
  }
}
