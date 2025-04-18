"use client";

import { useEffect, useState } from "react";

// マッチング結果の型定義
type MatchingResult = {
  researcher: {
    researcher_id: number;
    researcher_name: string;
    // 必要なら他の項目も追加OK
  };
  matching_reason: string;
};

type ProjectInfo = {
  project_title: string;
  project_content: string;
};

type ProjectMatchingResult = {
  project: ProjectInfo;
  matchings: MatchingResult[];
};

export default function MyPage() {
  const [activeProjects, setActiveProjects] = useState<ProjectMatchingResult[]>([]);
  const [closedProjects, setClosedProjects] = useState<ProjectMatchingResult[]>([]);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      const activeIds = [80, 60, 125]; // 実験用に同じID
      const closedIds = [65, 85, 95];

      try {
        const active = await Promise.all(
          activeIds.map(async (id) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_AZURE_API_URL}/matching-results?project_id=${id}`
            );
            return res.ok ? await res.json() : null;
          })
        );

        const closed = await Promise.all(
          closedIds.map(async (id) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_AZURE_API_URL}/matching-results?project_id=${id}`
            );
            return res.ok ? await res.json() : null;
          })
        );

        setActiveProjects(active.filter((item) => item !== null));
        setClosedProjects(closed.filter((item) => item !== null));
      } catch (err) {
        console.error("マッチング結果取得エラー", err);
      }
    };

    fetchMatchingResults();
  }, []);

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-10 text-left">マイページ</h1>

        {/* 進行中案件 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            進行中案件 {activeProjects.length}
          </h2>
          <div className="grid grid-cols-3 gap-4">
          {activeProjects.map((projectData, index) => (
              <div
                key={`active-${index}`}
                className="border rounded p-4 flex flex-col justify-between h-[180px]"
              >
                <div>
                  <p className="text-base font-bold">No.{index + 1}</p>
                  <p className="text-base font-semibold mt-1">
                    {projectData.project.project_title}
                  </p>
                  <p className="text-base mt-1">
                    おすすめ研究者数: {projectData.matchings.length}名
                  </p>
                </div>
                <div>
                  <button className="mt-4 px-3 py-1 bg-gray-300 text-base rounded">
                    研究者一覧
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 終了案件 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-left">
            終了案件 {closedProjects.length}
          </h2>
          <div className="grid grid-cols-3 gap-4">
          {closedProjects.map((projectData, index) => (
              <div
                key={`closed-${index}`}
                className="border rounded p-4 flex flex-col justify-between h-[180px]"
              >
                <div>
                  <p className="text-base font-bold">No.{index + 1}</p>
                  <p className="text-base font-semibold mt-1">
                    {projectData.project.project_title}
                  </p>
                  <p className="text-base mt-1">
                    おすすめ研究者数: {projectData.matchings.length}名
                  </p>
                </div>
                <div>
                  <button className="mt-4 px-3 py-1 bg-gray-300 text-base rounded">
                    研究者一覧
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

