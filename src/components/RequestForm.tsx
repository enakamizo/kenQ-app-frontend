"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";

type RequestFormProps = {
  onSubmit?: (data: any) => void;
};

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const router = useRouter();
  const { formData, setFormData } = useFormContext();

  // `formData` が `undefined` の場合、デフォルト値を設定
  const initialData = {
    category: "",
    title: "",
    background: "",
    researchField: "",
    researcherLevel: "",
    deadline: "",
  };

  const [localFormData, setLocalFormData] = useState(formData || initialData);

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(localFormData);
    } else {
      router.push("/register/confirm");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
      {/* 依頼のカテゴリー */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼のカテゴリー <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {["ヒアリング", "アドバイス", "コンサルティング"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={option}
                onChange={handleChange}
                checked={localFormData.category === option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 案件のタイトル */}
      <div>
        <label className="block text-sm font-medium mb-1">案件のタイトル（45文字以内） <span className="text-red-500">*</span></label>
        <input type="text" name="title" value={localFormData.title} onChange={handleChange} maxLength={45} placeholder="タイトルを入力してください" className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* 依頼背景 */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼背景 <span className="text-red-500">*</span></label>
        <textarea name="background" value={localFormData.background} onChange={handleChange} placeholder="案件の背景を記載してください" className="w-full p-2 border border-gray-300 rounded-lg" rows={4} />
      </div>

      {/* 研究分野 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究分野</label>
        <select name="researchField" value={localFormData.researchField} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">選択してください</option>
          <option value="化学">化学</option>
          <option value="物理">物理</option>
          <option value="生物">生物</option>
        </select>
      </div>

      {/* 研究者階層（追加） */}
      <div>
        <label className="block text-sm font-medium mb-1">研究者階層</label>
        <select name="researcherLevel" value={localFormData.researcherLevel} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">選択してください</option>
          <option value="初級">初級</option>
          <option value="中級">中級</option>
          <option value="上級">上級</option>
        </select>
      </div>

      {/* 募集期限（追加） */}
      <div>
        <label className="block text-sm font-medium mb-1">募集期限</label>
        <input type="date" name="deadline" value={localFormData.deadline} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* ボタン */}
      <div className="flex justify-center">
        <button type="submit" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          確認する
        </button>
      </div>
    </form>
  );
}


