"use client";

import { useState } from "react";

export default function RequestForm() {
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [category, setCategory] = useState("");
  const [researchField, setResearchField] = useState("");
  const [researcherLevel, setResearcherLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, background, category, researchField, researcherLevel, deadline });
    alert("案件を登録しました！");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
      {/* 依頼のカテゴリー */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼のカテゴリー <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" value="ヒアリング" onChange={() => setCategory("ヒアリング")} checked={category === "ヒアリング"} className="form-radio" />
            <span>研究分野のヒアリング</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" value="アドバイス" onChange={() => setCategory("アドバイス")} checked={category === "アドバイス"} className="form-radio" />
            <span>アドバイス・業務改善の相談（短打ち程度）</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" value="コンサルティング" onChange={() => setCategory("コンサルティング")} checked={category === "コンサルティング"} className="form-radio" />
            <span>コンサルティング・共同研究の相談</span>
          </label>
        </div>
      </div>

      {/* 案件のタイトル */}
      <div>
        <label className="block text-sm font-medium mb-1">案件のタイトル（40文字以内） <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 依頼背景 */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼背景 <span className="text-red-500">*</span></label>
        <textarea
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="案件の背景を記載してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </div>

      {/* 研究分野 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究分野</label>
        <select
          value={researchField}
          onChange={(e) => setResearchField(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="化学">化学</option>
          <option value="物理">物理</option>
          <option value="生物">生物</option>
        </select>
      </div>

      {/* 研究者階層 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究者階層</label>
        <select
          value={researcherLevel}
          onChange={(e) => setResearcherLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="初級">初級</option>
          <option value="中級">中級</option>
          <option value="上級">上級</option>
        </select>
      </div>

      {/* 募集期限 */}
      <div>
        <label className="block text-sm font-medium mb-1">募集期限</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* ボタン */}
      <button
        type="submit"
        className="w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-800 mx-auto block"
      >
        依頼内容を確認する
    　</button>

    　<div className="text-center mt-4">
    　  <a href="/" className="text-sm text-gray-300 hover:underline">ホームに戻る</a>
    　</div>

    </form>
  );
}

