import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Initialize the client with explicit types where possible
const client: any = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    handleSIGINT: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr: string) => {
  console.log("Scan the QR code below with your WhatsApp:");
  qrcode.generate(qr, { small: true });
});

export default client;
