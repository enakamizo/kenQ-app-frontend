"use client";

import { useEffect, useState } from "react";

const dummyResearchers = [
  { id: "101", name: "池田 芳和", affiliation: "名古屋大学 医学部附属病院", score: 90 },
  { id: "102", name: "今村 幸治", affiliation: "熊本大学 電子情報工学科", score: 89 },
  { id: "103", name: "三宅 美咲", affiliation: "国立研究開発法人 先端医療研究センター", score: 88 },
];

export default function MatchedResearchers({ projectId }: { projectId: string }) {
  const [researchers, setResearchers] = useState(dummyResearchers);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4">おすすめの研究者リスト</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse table-fixed">
          <thead className="bg-gray-100 text-xs">
            <tr className="border-b">
              <th className="p-2 w-[125px] whitespace-nowrap">名前</th> {/* 名前の幅を固定 */}
              <th className="p-2 min-w-[280px] break-words">所属</th> {/* 所属の幅を調整 */}
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
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td className="p-2 text-center">
                  <button className="text-blue-600 hover:text-blue-800">📩</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}