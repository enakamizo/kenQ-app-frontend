//import RequestForm from "@/components/RequestForm";

//export default function RegisterPage() {
//  return (
//    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//      <h1 className="text-2xl font-bold mb-4">新規案件を登録する</h1>
//      <RequestForm />
//    </div>
//  );
//}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequestForm from "@/components/RequestForm";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    background: "",
    researchField: "",
    researcherLevel: "",
    deadline: "",
  });

  // 子コンポーネント（RequestForm）からデータを受け取る
  const handleFormSubmit = (data: any) => {
    setFormData(data);
    const queryParams = new URLSearchParams(data).toString();
    router.push(`/register/confirm?${queryParams}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">新規案件を登録する</h1>
      <RequestForm onSubmit={handleFormSubmit} />
    </div>
  );
}

