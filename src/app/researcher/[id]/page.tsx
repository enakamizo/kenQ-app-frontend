"use client";

import { useEffect, useState } from "react";

interface Researcher {
    name: string;
    affiliation: string;
    description: string;
}

export default function ResearcherPage({ params }: { params: { id: string } }) {
    const researcherId = params.id;
    const [researcher, setResearcher] = useState<Researcher | null>(null);

    useEffect(() => {
        if (researcherId) {
            const apiUrl = `${process.env.NEXT_PUBLIC_AZURE_API_URL}researchers/${researcherId}`;
            console.log("Fetching researcher from:", apiUrl); // ✅ デバッグ用

            fetch(apiUrl)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`API Error: ${res.status} ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(data => setResearcher(data))
                .catch(err => console.error("Error fetching researcher:", err));
        }
    }, [researcherId]);

    if (!researcher) return <p>Loading...</p>;

    const handleShowMatchingReason = (researcherId: string) => {
        console.log(`Matching reason requested for researcher ID: ${researcherId}`);
        // ここにモーダルを開く処理を追加予定
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold">{researcher.name}</h1>
            <p className="text-gray-600">{researcher.affiliation}</p>
            <p className="mt-4">{researcher.description}</p>
        </div>
    );
}
