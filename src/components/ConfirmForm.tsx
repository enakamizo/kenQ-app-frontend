"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext"; // useContextを利用

export default function ConfirmForm() {
  const router = useRouter();
  const { formData } = useFormContext(); // `useSearchParams()` の代わりに `context` からデータ取得

  // 「登録を確定する」ボタン
  const handleConfirm = () => {
    alert("案件を登録しました！");
    router.push("/"); // 登録後の遷移先（トップページ）
  };

  // 「修正する」ボタンで register に戻る（クエリパラメータを削除）
  const handleBack = () => {
    router.push("/register");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">下記の内容にて案件を作成しました</h1>
      <div className="bg-gray-100 p-6 rounded-md shadow-sm">

        {/* 依頼のカテゴリー */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">依頼のカテゴリー</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.category}</p>
        </div>

        {/* 案件のタイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">案件のタイトル（40文字以内）</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.title}</p>
        </div>

        {/* 依頼背景 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">依頼背景</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.background}</p>
        </div>

        {/* 研究分野 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">研究分野</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.researchField || "未選択"}</p>
        </div>

        {/* 研究者階層 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">研究者階層</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.researcherLevel || "未選択"}</p>
        </div>

        {/* 募集期限 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">募集期限</label>
          <p className="bg-white p-2 border border-gray-300 rounded-md">{formData.deadline || "未設定"}</p>
        </div>
      </div>

      {/* ボタン配置 */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleConfirm}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700"
        >
          登録を確定する
        </button>
        <button
          onClick={handleBack} // 修正ボタンで register に戻る（クエリパラメータを削除）
          className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600"
        >
          修正する
        </button>
      </div>
    </div>
  );
}

