import ProjectDetails from "@/components/ProjectDetails";
import MatchedResearchers from "@/components/MatchedResearchers";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id; // URLから案件IDを取得

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* 上段：案件の詳細 */}
      <ProjectDetails projectId={projectId} />

      {/* 下段：マッチングした研究者リスト */}
      <MatchedResearchers projectId={projectId} />
    </div>
  );
}

