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
  matched_date: string;
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
              matched_date: data.matchings?.[0]?.matched_date || "",
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

  const deleteProject = async (projectId: number) => {
    if (!confirm("本当にこの案件を削除しますか？")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AZURE_API_URL}/delete-project/${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }

      // 成功したらUIからも削除
      //setActiveProjects(prev => prev.filter(p => p.project_id !== projectId));
      //setClosedProjects(prev => prev.filter(p => p.project_id !== projectId));

      // 削除対象を除外して再セット
      setActiveProjects((prev) => {
        return prev.filter((project) => project.project_id !== projectId);
      });
      setClosedProjects((prev) => {
        return prev.filter((project) => project.project_id !== projectId);
      });

      alert("案件を削除しました");
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除に失敗しました");
    }
  };

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
  // const hiddenIds = [129, 220, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 231, 232, 233, 234, 235, 236, 237,238,  239, 240, 241, 242, 243, 244, 245,246,247,248,249,250,251,252,253,254,255,256,257,258,262,263];

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
              //.filter(projectData => !hiddenIds.includes(projectData.project_id)) // 強制非表示（仮）
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
                    <p className="text-sm text-gray-500 mt-1">
                      登録日: {new Date(projectData.matched_date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {/* 締切までの日数表示 */}
                    {daysLeft >= 0 && (
                      <p className="text-sm text-red-600 mt-2">
                        締切まであと {daysLeft} 日
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="px-3 py-1 bg-gray-300 text-base rounded"
                      onClick={() => router.push(`/projects/${projectData.project_id}`)}
                    >
                      研究者一覧
                    </button>
                    <button
                      className="text-sm text-gray-600 hover:underline"
                      onClick={() => deleteProject(projectData.project_id)}
                    >
                      削除
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
              //.filter(projectData => !hiddenIds.includes(projectData.project_id)) // ← これを追加
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
                    <p className="text-sm text-gray-500 mt-1">
                      登録日: {new Date(projectData.matched_date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {/* 追加部分：終了日（募集期限）を表示 */}
                    <p className="text-sm text-gray-500 mt-2">募集期限: {formattedDeadline}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="px-3 py-1 bg-gray-300 text-base rounded"
                      onClick={() => router.push(`/projects/${projectData.project_id}`)}
                    >
                      研究者一覧
                    </button>
                    <button
                      className="text-sm text-gray-600 hover:underline"
                      onClick={() => deleteProject(projectData.project_id)}
                    >
                      削除
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



