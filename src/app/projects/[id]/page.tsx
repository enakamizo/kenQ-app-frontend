"use client";

import { useEffect, useState } from "react";
import ProjectDetails from "@/components/ProjectDetails";
import MatchedResearchers from "@/components/MatchedResearchers";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const projectId = params.id;
    const [projectData, setProjectData] = useState<any>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("projectData");
        if (storedData) {
            setProjectData(JSON.parse(storedData));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {/* 上段：案件の詳細 */}
            {projectData ? (
                <ProjectDetails projectId={projectId} />
            ) : (
                <p>Loading...</p>
            )}

            {/* 下段：おすすめの研究者リスト */}
            <MatchedResearchers projectId={projectId} />
        </div>
    );
}
