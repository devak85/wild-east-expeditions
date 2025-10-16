/**
 * Central WhatsApp link builder.
 * Use your business number in E.164 format (no "+" or spaces).
 * Example: +91 9876543210  ->  919876543210
 */
export const WAPP_NUMBER = "919975171538"; // TODO: replace with YOUR number

export function waLink(message) {
  const text = encodeURIComponent(message ?? "Hi! I’m interested.");
  return `https://wa.me/${WAPP_NUMBER}?text=${text}`;
}
