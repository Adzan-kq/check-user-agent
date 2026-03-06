"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [userAgent, setUserAgent] = useState("Loading...");

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserAgent(navigator.userAgent);
  }, []);

  async function sendEmail() {
    setLoading(true);
    await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSent(true);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">User Agent Checker</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl break-all">
        {userAgent}
      </div>

      <div className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex">
          <button
            onClick={sendEmail}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Kirim Link ke Email
          </button>

          {loading && <p className="text-gray-500 ml-2">Mengirim...</p>}
        </div>

        {sent && (
          <p className="text-green-600 text-sm">
            Link sudah dikirim ke email anda
          </p>
        )}
      </div>
    </main>
  );
}
