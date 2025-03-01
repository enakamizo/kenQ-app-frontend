"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type RequestFormProps = {
  onSubmit?: (data: any) => void;
};

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [category, setCategory] = useState("");
  const [researchField, setResearchField] = useState("");
  const [researcherLevel, setResearcherLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  // クエリパラメータがあれば、フォームに反映
  useEffect(() => {
    setTitle(searchParams.get("title") || "");
    setBackground(searchParams.get("background") || "");
    setCategory(searchParams.get("category") || "");
    setResearchField(searchParams.get("researchField") || "");
    setResearcherLevel(searchParams.get("researcherLevel") || "");
    setDeadline(searchParams.get("deadline") || "");
  }, [searchParams]);

  // 「確認する」ボタンを押したときの処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // フォームデータをURLのクエリパラメータに変換
    const formData = {
      title,
      background,
      category,
      researchField,
      researcherLevel,
      deadline,
    };

    if (onSubmit) {
      // `onSubmit` が渡されている場合は、それを実行
      onSubmit(formData);
    }
    else {
      // それ以外の場合は `queryParams` を作成してページ遷移
      const queryParams = new URLSearchParams(formData as any);
      router.push(`/register/confirm?${queryParams}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
      {/* 依頼のカテゴリー */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼のカテゴリー <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" value="ヒアリング" onChange={() => setCategory("ヒアリング")} checked={category === "ヒアリング"} />
            <span>研究分野のヒアリング</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" value="アドバイス" onChange={() => setCategory("アドバイス")} checked={category === "アドバイス"} />
            <span>アドバイス・業務改善の相談（短打ち程度）</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" value="コンサルティング" onChange={() => setCategory("コンサルティング")} checked={category === "コンサルティング"} />
            <span>コンサルティング・共同研究の相談</span>
          </label>
        </div>
      </div>

      {/* 案件のタイトル（40文字制限） */}
      <div>
        <label className="block text-sm font-medium mb-1">案件のタイトル（45文字以内） <span className="text-red-500">*</span></label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 45))} maxLength={45} placeholder="タイトルを入力してください" className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* 依頼背景 */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼背景 <span className="text-red-500">*</span></label>
        <textarea value={background} onChange={(e) => setBackground(e.target.value)} placeholder="案件の背景を記載してください" className="w-full p-2 border border-gray-300 rounded-lg" rows={4} />
      </div>

      {/* 研究分野 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究分野</label>
        <select value={researchField} onChange={(e) => setResearchField(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">選択してください</option>
          <option value="化学">化学</option>
          <option value="物理">物理</option>
          <option value="生物">生物</option>
        </select>
      </div>

      {/* 研究者階層 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究者階層</label>
        <select value={researcherLevel} onChange={(e) => setResearcherLevel(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">選択してください</option>
          <option value="初級">初級</option>
          <option value="中級">中級</option>
          <option value="上級">上級</option>
        </select>
      </div>

      {/* 募集期限 */}
      <div>
        <label className="block text-sm font-medium mb-1">募集期限</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* ボタンの中央配置 */}
      <div className="flex justify-center">
        <button type="button" onClick={handleSubmit} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          確認する
        </button>
      </div>
    </form>
  );
}

