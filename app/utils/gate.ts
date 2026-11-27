// Password gate for the whole portfolio.
// Set PORTFOLIO_PASSWORD in the hosting environment to change the password
// without a code change; it falls back to the value below.

export const GATE_COOKIE = "portfolio_gate";
const FALLBACK_PASSWORD = "1234";

export function gatePassword(): string {
  return process.env.PORTFOLIO_PASSWORD || FALLBACK_PASSWORD;
}

/** The cookie holds a hash of the password, so changing the password signs everyone out. */
export async function gateToken(password: string = gatePassword()): Promise<string> {
  const bytes = new TextEncoder().encode(`damiree-portfolio:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}
