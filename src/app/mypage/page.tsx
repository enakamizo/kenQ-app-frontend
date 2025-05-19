"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 推薦研究者の型
type RecommendedResearcher = {
  researcher: {
    researcher_id: number;
    researcher_name: string;
  };
  matching_reason: string;
};

// プロジェクト情報の型
type ProjectInfo = {
  project_title: string;
  project_content: string;
};

// プロジェクト＋推薦研究者の型
type ProjectWithRecommendations = {
  project_id: number;
  project: ProjectInfo;
  recommendedResearchers: RecommendedResearcher[];
};

export default function MyPage() {
  const [activeProjects, setActiveProjects] = useState<ProjectWithRecommendations[]>([]);
  const [closedProjects, setClosedProjects] = useState<ProjectWithRecommendations[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 1. project_id一覧を取得（ログイン中の会社ユーザーID＝仮で1）
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AZURE_API_URL}/projects-list?company_user_id=1`
        );
        if (!res.ok) throw new Error("プロジェクト一覧の取得に失敗");

        const projectIds: number[] = await res.json();

        // 2. 各 project_id に対して、推薦研究者を取得
        const all = await Promise.all(
          projectIds.map(async (id) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_AZURE_API_URL}/matching-results?project_id=${id}`
            );
            if (!res.ok) return null;
            const data = await res.json();
            return {
              project_id: id,
              project: data.project,
              recommendedResearchers: data.matchings,
            };
          })
        );

        const validProjects = all.filter(
          (p): p is ProjectWithRecommendations => p !== null
        );

        console.log(validProjects);

        // 仮ルール（すべて進行中に分類）
        const active = validProjects;
        const closed: ProjectWithRecommendations[] = [];

        setActiveProjects(active);
        setClosedProjects(closed);
      } catch (err) {
        console.error("案件情報の取得エラー", err);
      }
    };

    fetchProjects();
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
                key={`active-${projectData.project_id}`}
                className="border rounded p-4 flex flex-col justify-between h-[180px]"
              >
                <div>
                  <p className="text-base font-bold">No.{index + 1}</p>
                  <p className="text-base font-semibold mt-1">
                    {projectData.project.project_title}
                  </p>
                  <p className="text-base mt-1">
                    おすすめ研究者数: {projectData.recommendedResearchers.length}名
                  </p>
                </div>
                <div>
                  <button
                    className="mt-4 px-3 py-1 bg-gray-300 text-base rounded"
                    onClick={() =>
                      router.push(`/projects/${projectData.project_id}`)
                    }
                  >
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
                key={`closed-${projectData.project_id}`}
                className="border rounded p-4 flex flex-col justify-between h-[180px]"
              >
                <div>
                  <p className="text-base font-bold">No.{index + 1}</p>
                  <p className="text-base font-semibold mt-1">
                    {projectData.project.project_title}
                  </p>
                  <p className="text-base mt-1">
                    おすすめ研究者数: {projectData.recommendedResearchers.length}名
                  </p>
                </div>
                <div>
                  <button
                    className="mt-4 px-3 py-1 bg-gray-300 text-base rounded"
                    onClick={() =>
                      router.push(`/projects/${projectData.project_id}`)
                    }
                  >
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


