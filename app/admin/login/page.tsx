"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@dycpaper.art");
  const [password, setPassword] = useState("dycpaper-admin");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F6F6] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[480px] border border-[#E6E6E6] bg-white p-8">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">管理者専用ページ</p>
        <h1 className="mt-3 text-3xl font-light tracking-[-0.06em]">管理者ログイン</h1>

        <div className="mt-6 space-y-5">
          <label className="block text-sm text-[#0D0D0D]">
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]"
            />
          </label>

          <label className="block text-sm text-[#0D0D0D]">
            パスワード
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]"
            />
          </label>

          {error && <p className="text-sm text-[#A40000]">{error}</p>}

          <button type="submit" className="w-full rounded-full bg-[#0D0D0D] px-6 py-3 text-sm font-medium text-white">
            ログイン
          </button>
        </div>
      </form>
    </main>
  );
}
