/**
 * Central WhatsApp link builder.
 * Put your real business number in E.164 (no + or spaces).
 */
export const WAPP_NUMBER = "917338949071"; // TODO: <— replace with YOUR number

export function waLink(message) {
  const text = encodeURIComponent(message ?? "Hi! I’m interested.");
  return `https://wa.me/${WAPP_NUMBER}?text=${text}`;
}
