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
    return (
      <div className="p-10">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
          <p className="text-center text-gray-500 text-lg">しばらくお待ちください。</p>
        </div>
      </div>
    );
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
          <p className="text-gray-600 text-sm">案件内容</p>
          <p className="font-medium whitespace-pre-wrap">{project.project_content}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究分野</p>
          <p className="font-medium">{project.research_field}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究者階層</p>
          <p className="font-medium">
            {Array.isArray(project.preferred_researcher_level)
              ? project.preferred_researcher_level.join(" / ")
              : project.preferred_researcher_level?.split(",").map((level: string) => level.trim()).join(" / ")}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">募集期限</p>
          <p className="font-medium text-base">
            {project.application_deadline?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

