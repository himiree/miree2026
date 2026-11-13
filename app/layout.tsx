import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/language";

export const metadata: Metadata = {
  title: "Damiree Kim",
  description: "Visual and Product Designer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
          <LanguageProvider>{children}</LanguageProvider>
        </body>
    </html>
  );
}
