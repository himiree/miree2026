"use client";
import { useState } from "react";
import type { FormEvent } from "react";

// Only allow redirects back into this site
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

// Password screen shown before any page of the portfolio (see proxy.ts).
export default function Unlock() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/unlock", { method: "POST", body: new FormData(e.currentTarget) });
      if (res.ok) {
        window.location.assign(safeNext(new URLSearchParams(window.location.search).get("next")));
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setBusy(false);
  };

  return (
    <main className="min-h-svh flex items-center justify-center bg-white px-5 text-[#181818]">
      <form onSubmit={onSubmit} className="w-full max-w-[340px] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.6px]">Damiree Kim</h1>
          <p className="text-[15px] leading-[1.5] tracking-[-0.25px] text-[#576779]">
            This portfolio is password protected. Enter the password you received to continue.
          </p>
        </div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          aria-invalid={error || undefined}
          aria-describedby={error ? "password-error" : undefined}
          className={`h-12 rounded-[10px] border px-4 text-[16px] outline-none transition-colors focus:border-[#1271C4] ${
            error ? "border-[#d9573f]" : "border-[#d4def5]"
          }`}
        />
        {error && (
          <p id="password-error" className="-mt-2 text-[14px] text-[#d9573f]">
            That password didn&apos;t match. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="h-12 rounded-[10px] bg-[#181818] text-[16px] font-semibold tracking-[-0.25px] text-white hover:bg-[#2b3037] disabled:opacity-60 transition-colors"
        >
          {busy ? "Checking…" : "Enter"}
        </button>
        <p className="text-[13px] leading-[1.5] text-[#576779]">
          No password? Write to <span className="text-[#181818]">damiree813@gmail.com</span>
        </p>
      </form>
    </main>
  );
}
