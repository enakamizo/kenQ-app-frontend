"use client";

import { useEffect, useState } from "react";

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_AZURE_API_URL}/matching-results?project_id=${projectId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("プロジェクト情報の取得に失敗しました");
        }

        const data = await response.json();
        setProject(data.project);  // ← プロジェクト部分だけ使う
      } catch (error) {
        console.error("プロジェクト情報取得エラー:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <p className="text-center text-gray-500">しばらくお待ちください。</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{project.project_title}</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-gray-600 text-sm">カテゴリ</p>
          <p className="font-medium">{project.consultation_category}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">背景</p>
          <p className="text-gray-800 whitespace-pre-wrap">{project.project_content}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究分野</p>
          <p className="font-medium">{project.research_field}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究者階層</p>
          <p className="font-medium">{project.researcher_level}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">募集期限</p>
          <p className="font-medium">{project.application_deadline}</p>
        </div>
      </div>
    </div>
  );
}

