"use client";

import { useEffect, useState } from "react";

export default function ResearcherPage({ params }: { params: { id: string } }) {
    const researcherId = params.id;
    const [researcher, setResearcher] = useState(null);

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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold">{researcher.name}</h1>
            <p className="text-gray-600">{researcher.affiliation}</p>
            <p className="mt-4">{researcher.description}</p>
        </div>
    );
}
