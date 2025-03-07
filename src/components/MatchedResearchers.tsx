"use client";

import { useState } from "react";

const dummyResearchers = [
  { id: "101", name: "池田 芳和", affiliation: "名古屋大学 医学部附属病院", score: 90 },
  { id: "102", name: "今村 幸治", affiliation: "熊本大学 電子情報工学科", score: 89 },
  { id: "103", name: "三宅 美咲", affiliation: "国立研究開発法人 先端医療研究センター", score: 88 },
  { id: "104", name: "三宅 美咲", affiliation: "国立研究開発法人 先端医療研究センター", score: 88 },
];

export default function MatchedResearchers({ projectId }: { projectId: string }) {
  const [researchers, setResearchers] = useState(dummyResearchers);
  const [selectedResearchers, setSelectedResearchers] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ 研究者のオファーチェック変更時の処理
  const handleCheckboxChange = (researcherId: string) => {
    setSelectedResearchers((prev) =>
      prev.includes(researcherId)
        ? prev.filter((id) => id !== researcherId) // すでにチェックされていたら削除
        : [...prev, researcherId] // チェックされたら追加
    );
  };

  // ✅「オファーする」ボタンの処理
  const handleOffer = () => {
    if (selectedResearchers.length === 0) return; // チェックがない場合は何もしない
    setShowPopup(true);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4">おすすめの研究者リスト</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse table-fixed">
          <thead className="bg-gray-100 text-xs">
            <tr className="border-b">
              <th className="p-2 w-[125px] whitespace-nowrap">名前</th>
              <th className="p-2 min-w-[280px] break-words">所属</th>
              <th className="p-2 w-[70px] text-center whitespace-nowrap">研究者情報</th>
              <th className="p-2 w-[70px] text-center">スコア</th>
              <th className="p-2 w-[70px] text-center">気になる</th>
              <th className="p-2 w-[70px] text-center">オファー</th>
              <th className="p-2 w-[70px] text-center">辞退連絡</th>
              <th className="p-2 w-[70px] text-center">
                <img src="/Gmail Logo.png" alt="チャット" className="h-5 w-5 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {researchers.map((researcher) => (
              <tr key={researcher.id} className="border-b">
                <td className="p-2 whitespace-nowrap">{researcher.name}</td>
                <td className="p-2 break-words">{researcher.affiliation}</td>
                <td className="p-2 text-center">
                  <button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">
                    info
                  </button>
                </td>
                <td className="p-2 text-center">{researcher.score}</td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-300 accent-gray-500 rounded focus:ring-gray-400"/>
                </td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 border-gray-300 accent-gray-500 rounded focus:ring-gray-400"
                    onChange={() => handleCheckboxChange(researcher.id)}
                    checked={selectedResearchers.includes(researcher.id)}
                  />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-300 accent-gray-500 rounded focus:ring-gray-400" />
                </td>
                <td className="p-2 text-center">
                  <button className="text-gray-600 hover:text-gray-800">📩</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ オファーするボタン */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleOffer}
          disabled={selectedResearchers.length === 0} // ✅ チェックがないと無効化
          className={`px-6 py-2 rounded-lg shadow-md transition duration-200 text-lg font-semibold ${
            selectedResearchers.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          オファーする
        </button>
      </div>

      {/* ✅ オファー完了ポップアップ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
            <h2 className="text-xl font-bold mb-4">オファーしました！</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
