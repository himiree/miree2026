import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE, gatePassword, gateToken } from "../../utils/gate";

// Checks the password from the unlock page and sets the gate cookie.
// The page itself handles the redirect, so the response never needs this server's host name.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = form.get("password");

  if (typeof password !== "string" || password !== gatePassword()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: GATE_COOKIE,
    value: await gateToken(password),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
