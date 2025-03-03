"use client";

import { useEffect, useState } from "react";

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<any>(null);

useEffect(() => {
  const storedData = localStorage.getItem("projectData");
  if (storedData) {
    setProject(JSON.parse(storedData));
  }
}, []);

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

      </div>
    </div>
  );
}


