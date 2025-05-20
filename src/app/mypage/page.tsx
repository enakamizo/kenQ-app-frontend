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
  matching_status: number; // ← これを追加
};

// プロジェクト情報の型
type ProjectInfo = {
  project_title: string;
  project_content: string;
  application_deadline: string; // ← 追加（Date でも OK）
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

      const now = new Date();
      const active: ProjectWithRecommendations[] = [];
      const closed: ProjectWithRecommendations[] = [];

      validProjects.forEach((project) => {
        const deadline = new Date(project.project.application_deadline);
        if (deadline >= now) {
          active.push(project);
        } else {
          closed.push(project);
        }
      });

        setActiveProjects(active);
        setClosedProjects(closed);
      } catch (err) {
        console.error("案件情報の取得エラー", err);
      }
    };

    fetchProjects();
  }, []);

  const countStatuses = (researchers: RecommendedResearcher[]) => {
    const statusCount = {
      1: 0, // オファー中
      2: 0, // マッチング中
      3: 0, // マッチング不成立
      4: 0, // 逆オファー中
    };
    for (const r of researchers) {
      if (r.matching_status >= 1) {
        statusCount[r.matching_status as 1 | 2 | 3 | 4]++;
      }
    }
    return statusCount;
  };

  // 案件の強制非表示（仮）
  const hiddenIds = [129, 220, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225];

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">

        {/* ① 見出し */}
        <h1 className="text-2xl font-bold mb-10 text-left">マイページ</h1>

        {/* ② 進行中案件 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            進行中案件
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeProjects
              .filter(projectData => !hiddenIds.includes(projectData.project_id)) // 強制非表示（仮）
              .map((projectData, index) => {
              const statusCount = countStatuses(projectData.recommendedResearchers);

              // 締切日までの日数を計算
              const today = new Date();
              const deadline = new Date(projectData.project.application_deadline);
              const diffTime = deadline.getTime() - today.getTime();
              const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <div
                  key={`active-${projectData.project_id}`}
                  className="border rounded p-4 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-base font-bold">No.{index + 1}</p>
                    <p className="text-base font-semibold mt-1">
                      {projectData.project.project_title}
                    </p>
                    <p className="text-base mt-1 mb-2">
                      おすすめ研究者数: {projectData.recommendedResearchers.length}名
                    </p>
                    {statusCount[1] > 0 && <p className="text-sm text-gray-600">オファー中: {statusCount[1]}名</p>}
                    {statusCount[2] > 0 && <p className="text-sm text-gray-600">マッチング中: {statusCount[2]}名</p>}
                    {statusCount[3] > 0 && <p className="text-sm text-gray-600">マッチング不成立: {statusCount[3]}名</p>}
                    {statusCount[4] > 0 && <p className="text-sm text-gray-600">逆オファー中: {statusCount[4]}名</p>}
                    {/* 締切までの日数表示 */}
                    {daysLeft >= 0 && (
                      <p className="text-sm text-red-600 mt-2">
                        締切まであと {daysLeft} 日
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      className="mt-4 px-3 py-1 bg-gray-300 text-base rounded"
                      onClick={() => router.push(`/projects/${projectData.project_id}`)}
                    >
                      研究者一覧
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ③ 終了案件 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            終了案件
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {closedProjects
              .filter(projectData => !hiddenIds.includes(projectData.project_id)) // ← これを追加
              .map((projectData, index) => {
              const statusCount = countStatuses(projectData.recommendedResearchers);

              // 募集期限をフォーマット
              const deadline = new Date(projectData.project.application_deadline);
              const formattedDeadline = deadline.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={`closed-${projectData.project_id}`}
                  className="border rounded p-4 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-base font-bold">No.{index + 1}</p>
                    <p className="text-base font-semibold mt-1">
                      {projectData.project.project_title}
                    </p>
                    <p className="text-base mt-1 mb-2">
                      おすすめ研究者数: {projectData.recommendedResearchers.length}名
                    </p>
                    {statusCount[1] > 0 && <p className="text-sm text-gray-600">オファー中: {statusCount[1]}名</p>}
                    {statusCount[2] > 0 && <p className="text-sm text-gray-600">マッチング中: {statusCount[2]}名</p>}
                    {statusCount[3] > 0 && <p className="text-sm text-gray-600">マッチング不成立: {statusCount[3]}名</p>}
                    {statusCount[4] > 0 && <p className="text-sm text-gray-600">逆オファー中: {statusCount[4]}名</p>}

                    {/* 追加部分：終了日（募集期限）を表示 */}
                    <p className="text-sm text-gray-500 mt-2">募集期限: {formattedDeadline}</p>
                  </div>
                  <div>
                    <button
                      className="mt-4 px-3 py-1 bg-gray-300 text-base rounded"
                      onClick={() => router.push(`/projects/${projectData.project_id}`)}
                    >
                      研究者一覧
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}



