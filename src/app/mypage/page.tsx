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
  application_deadline: string;
  registration_date: string;
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
  const [isLoading, setIsLoading] = useState(true); // しばらくお待ちください。表示のため追加
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 案件削除時のモーダル表示
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetProject, setTargetProject] = useState<{
    project: ProjectWithRecommendations;
    index: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // 描画完了後に fetchProjects を呼び出す
    setTimeout(() => {
    const fetchProjects = async () => {
      console.log("🔄 プロジェクト取得中...");

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
          setError("データの取得に失敗しました。");
        } finally {
          setIsLoading(false); // ← 読み込み完了
        }
      };

      fetchProjects();
    }, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <p className="text-lg font-medium mb-4">しばらくお待ちください。</p>
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
          <p className="text-center text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!targetProject) return;
    setIsDeleting(true);

    try {
      const projectId = targetProject.project.project_id;
      console.log("🔍 削除対象のID:", projectId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AZURE_API_URL}/delete-project/${projectId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ 削除エラー詳細:", errorText);
        throw new Error("削除に失敗しました");
      }

      setActiveProjects(prev => prev.filter(p => p.project_id !== projectId));
      setClosedProjects(prev => prev.filter(p => p.project_id !== projectId));

      //alert("案件を削除しました");
      setShowSuccessModal(true);
    } catch (err) {
      console.error("❗ 削除時の例外:", err);
      alert("削除に失敗しました");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setTargetProject(null);
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
                      登録日: {projectData.project.registration_date
                        ? new Date(projectData.project.registration_date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "なし"}
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
                      onClick={() => {
                        setTargetProject({ project: projectData, index });
                        setShowDeleteModal(true);
                      }}
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
                      登録日: {projectData.project.registration_date
                        ? new Date(projectData.project.registration_date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "なし"}
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
                      onClick={() => {
                        setTargetProject({ project: projectData, index });
                        setShowDeleteModal(true);
                      }}
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

      {showDeleteModal && targetProject && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {isDeleting ? (
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium mb-4">しばらくお待ちください。</p>
                <svg
                  className="animate-spin h-10 w-10 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">案件の削除確認</h2>
                <p className="mb-4">
                  <strong>
                    No.{targetProject.index + 1} {targetProject.project.project.project_title}
                  </strong>{" "}
                  を削除しますか？
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    キャンセル
                  </button>
                  <button
                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                    onClick={handleDelete}
                  >
                    削除する
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">削除完了</h2>
            <p className="mb-6">案件を削除しました。</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}



