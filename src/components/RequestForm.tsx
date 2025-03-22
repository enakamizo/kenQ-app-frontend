"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";

type FormDataType = {
  category: string;
  title: string;
  background: string;
  industry: string;        // ✅追加
  businessDescription: string; // ✅追加
  university: string;      // ✅追加
  researchField: string;
  researcherLevel: string;
  deadline: string;
};

type RequestFormProps = {
  onSubmit?: (data: FormDataType) => void;
};

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const router = useRouter();
  const { formData, setFormData } = useFormContext();

  const initialData: FormDataType = {
    category: "",
    title: "",
    background: "",
    industry: "",             // ✅追加
    businessDescription: "",  // ✅追加
    university: "",           // ✅追加
    researchField: "",
    researcherLevel: "",
    deadline: "",
  };

  const [localFormData, setLocalFormData] = useState<FormDataType>(formData || initialData);

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
          {["研究分野のヒアリング", "アドバイス・業務改善の相談（壁打ち程度）", "コンサルティング・共同研究の相談"].map((option) => (
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
        <label className="block text-sm font-medium mb-1">案件のタイトル（40文字以内） <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="title"
          value={localFormData.title}
          onChange={handleChange}
          maxLength={40}
          placeholder="タイトルを入力してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 依頼背景 */}
      <div>
        <label className="block text-sm font-medium mb-1">依頼背景 <span className="text-red-500">*</span></label>
        <textarea
          name="background"
          value={localFormData.background}
          onChange={handleChange}
          placeholder="案件の背景を記載してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </div>

      {/* 業種 */}
      <div>
        <label className="block text-sm font-medium mb-1">業種</label>
        <select
          name="industry"
          value={localFormData.industry}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="自動車">自動車</option>
          <option value="精密機械">精密機械</option>
          <option value="機械">機械</option>
          <option value="化学">化学</option>
          <option value="食品">食品</option>
          <option value="建設">建設</option>
          <option value="サービス">サービス</option>
          <option value="その他">その他</option>
        </select>
      </div>

      {/* 事業内容 */}
      <div>
        <label className="block text-sm font-medium mb-1">事業内容</label>
        <input
          type="text"
          name="businessDescription"
          value={localFormData.businessDescription}
          onChange={handleChange}
          placeholder="事業内容を入力してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 大学 */}
      <div>
        <label className="block text-sm font-medium mb-1">大学</label>
        <input
          type="text"
          name="university"
          value={localFormData.university}
          onChange={handleChange}
          placeholder="大学名を入力してください"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 研究分野 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究分野</label>
        <select
          name="researchField"
          value={localFormData.researchField}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="ライフサイエンス">ライフサイエンス</option>
          <option value="情報通信">情報通信</option>
          <option value="環境・農学">環境・農学</option>
          <option value="ナノテク・材料">ナノテク・材料</option>
          <option value="エネルギー">エネルギー</option>
          <option value="ものづくり技術">ものづくり技術</option>
          <option value="社会基盤">社会基盤</option>
          <option value="フロンティア">フロンティア</option>
          <option value="人文・社会">人文・社会</option>
          <option value="自然科学一般">自然科学一般</option>
          <option value="その他">その他</option>
        </select>
      </div>

      {/* 研究者階層 */}
      <div>
        <label className="block text-sm font-medium mb-1">研究者階層</label>
        <select
          name="researcherLevel"
          value={localFormData.researcherLevel}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="教授">教授</option>
          <option value="准教授">准教授</option>
          <option value="助教">助教</option>
          <option value="講師">講師</option>
          <option value="助教授">助教授</option>
          <option value="助手">助手</option>
          <option value="研究員">研究員</option>
          <option value="特任助教">特任助教</option>
          <option value="主任研究員">主任研究員</option>
          <option value="特任教授">特任教授</option>
        </select>
      </div>

      {/* 募集期限 */}
      <div>
        <label className="block text-sm font-medium mb-1">募集期限</label>
        <input
          type="date"
          name="deadline"
          value={localFormData.deadline}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
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


