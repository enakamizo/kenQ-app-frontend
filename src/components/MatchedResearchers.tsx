"use client";

import { useEffect, useState } from "react";

const dummyResearchers = [
  { id: "101", name: "池田 芳和", affiliation: "名古屋大学 医学部附属病院", score: 90, created: 1 },
  { id: "102", name: "今村 幸治", affiliation: "熊本大学 電子情報工学科", score: 89, created: 1 },
  { id: "103", name: "三宅 美咲", affiliation: "国立研究開発法人 先端医療研究センター", score: 88, created: 1 },
];

export default function MatchedResearchers({ projectId }: { projectId: string }) {
  const [researchers, setResearchers] = useState(dummyResearchers);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4">おすすめの研究者リスト</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="p-2">名前</th>
              <th className="p-2">所属</th>
              <th className="p-2">スコア</th>
              <th className="p-2">件数</th>
              <th className="p-2 text-center">気になる</th>
              <th className="p-2 text-center">オファー</th>
              <th className="p-2 text-center">辞退連絡</th>
              <th className="p-2 text-center">チャット</th>
            </tr>
          </thead>
          <tbody>
            {researchers.map((researcher) => (
              <tr key={researcher.id} className="border-b">
                <td className="p-2">{researcher.name}</td>
                <td className="p-2">{researcher.affiliation}</td>
                <td className="p-2">{researcher.score}</td>
                <td className="p-2">{researcher.created}</td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    📩
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


