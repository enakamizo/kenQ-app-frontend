"use client";

import { useEffect, useState } from "react";

const dummyProjects = [
  {
    id: "1",
    title: "AIを用いた画像診断に関する最新の知見",
    category: "研究分野のヒアリング",
    background: "AIを用いた医療診断技術について、課題と方向性を決めるため、最新の事例を調査しています。",
    researchField: "ライフサイエンス",
    researcherLevel: "教授",
    deadline: "2025年2月25日",
    registrationDate: "2025年2月20日",
  },
];

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const foundProject = dummyProjects.find((p) => p.id === projectId);
    setProject(foundProject || null);
  }, [projectId]);

  if (!project) {
    return <p className="text-center text-gray-500">案件が見つかりませんでした。</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{project.title}</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-gray-600 text-sm">カテゴリ</p>
          <p className="font-medium">{project.category}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">背景</p>
          <p className="text-gray-800">{project.background}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究分野</p>
          <p className="font-medium">{project.researchField}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">研究者階層</p>
          <p className="font-medium">{project.researcherLevel}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">募集期限</p>
          <p className="font-medium">{project.deadline}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">登録日</p>
          <p className="font-medium">{project.registrationDate}</p>
        </div>
      </div>
    </div>
  );
}


