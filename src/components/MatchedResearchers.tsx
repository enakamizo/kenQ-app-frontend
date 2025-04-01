"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // ✅ 追加

export default function MatchedResearchers({ projectId }: { projectId: string }) {
  const [researchers, setResearchers] = useState([]);
  const [selectedResearchers, setSelectedResearchers] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedResearcher, setSelectedResearcher] = useState<any | null>(null); // ✅追加
  const [showInfoModal, setShowInfoModal] = useState(false); // ✅追加

  const router = useRouter();  // ✅ 追加
  

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/matching-results?project_id=${projectId}`; //ローカル用
        // const apiUrl = `${process.env.NEXT_PUBLIC_AZURE_API_URL}/matching-results?project_id=${projectId}`; //本番環境用
        console.log("Fetching researchers from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          }
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🔍 researchers data:", data); // 👈 マッチング理由を取得できているか確認
        setResearchers(data);
      } catch (error) {
        console.error("研究者データの取得エラー:", error);
      }
    };
    console.log("Fetching researchers from:", `https://app-advanced3-1-cgghbjavdyhdbfeb.canadacentral-01.azurewebsites.net/matching-results?project_id=${projectId}`);
    fetchResearchers();
  }, [projectId]);

  // const handleInfoClick = (researcherId: string) => {
    // router.push(`/researcher/${researcherId}`);  // ✅ 研究者詳細ページへ遷移
  const handleInfoClick = (researcher: any) => {
    setSelectedResearcher(researcher); // ✅変更 研究者情報のモーダルウィンドウ
    setShowInfoModal(true);            // ✅変更 研究者情報のモーダルウィンドウ
  };

  const handleCheckboxChange = (researcherId: string) => {
    setSelectedResearchers((prev) =>
      prev.includes(researcherId)
        ? prev.filter((id) => id !== researcherId)
        : [...prev, researcherId]
    );
  };

  const handleShowMatchingReason = (reason: string) => {
    setSelectedReason(reason);
    setShowReasonModal(true);
  };

  const handleOffer = () => {
    if (selectedResearchers.length === 0) return;
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
              <th className="p-2 w-[70px] text-center">研究者情報</th>
              <th className="p-2 w-[70px] text-center">マッチング理由</th>
              <th className="p-2 w-[70px] text-center">気になる</th>
              <th className="p-2 w-[70px] text-center">オファー</th>
              <th className="p-2 w-[70px] text-center">辞退連絡</th>
              <th className="p-2 w-[70px] text-center">
                <img src="/Gmail Logo.png" alt="チャット" className="h-5 w-5 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {researchers.map((researcher: any) => (
              <tr key={researcher.id} className="border-b">
                <td className="p-2 whitespace-nowrap">{researcher.name}</td>
                <td className="p-2 break-words">{researcher.affiliation}</td>
                <td className="p-2 text-center">
                  <button 
                    // onClick={() => handleInfoClick(researcher.id)}  // ✅ 修正
                    onClick={() => handleInfoClick(researcher)} // ✅変更 研究者情報：モーダルウィンドウ
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
                  >
                    info
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button 
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={() => handleShowMatchingReason(researcher.matching_reason)}
                  >
                    why
                  </button>
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-400 accent-gray-600 rounded focus:ring-gray-500" />
                </td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 border-gray-400 accent-gray-600 rounded focus:ring-gray-500"
                    onChange={() => handleCheckboxChange(researcher.id)}
                    checked={selectedResearchers.includes(researcher.id)}
                  />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-400 accent-gray-600 rounded focus:ring-gray-500" />
                </td>
                <td className="p-2 text-center">
                  <button className="text-blue-600 hover:text-blue-800">📩</button>
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
          disabled={selectedResearchers.length === 0}
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

      {/* ✅ モーダル表示：マッチング理由 */}
      {showReasonModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg text-gray-800">
            <h2 className="text-xl font-semibold mb-4">マッチング理由</h2>
            <p className="mb-6 whitespace-pre-wrap">{selectedReason}</p>
            <button
              onClick={() => setShowReasonModal(false)}
              className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

            {/* ✅ モーダル表示：研究者情報 */}
            {showInfoModal && selectedResearcher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-lg text-gray-800 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">研究者情報</h2>
            <div className="space-y-2 text-sm whitespace-pre-wrap">
              <p><strong>氏名：</strong>{selectedResearcher.researcher_name}（{selectedResearcher.researcher_name_kana}）</p>
              <p><strong>所属：</strong>{selectedResearcher.researcher_affiliation_current}</p>
              <p><strong>部署：</strong>{selectedResearcher.researcher_department_current}</p>
              <p><strong>職位：</strong>{selectedResearcher.researcher_position_current || "―"}</p>
              <p><strong>専門分野：</strong>{selectedResearcher.research_field_pi}</p>
              <p><strong>キーワード：</strong>{selectedResearcher.keywords_pi}</p>
              <p><strong>過去の所属歴：</strong>{selectedResearcher.researcher_affiliations_past}</p>
            </div>
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-6 w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
