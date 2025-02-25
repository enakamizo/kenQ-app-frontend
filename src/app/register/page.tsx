import RequestForm from "@/components/RequestForm";

export default function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">新規案件を登録する</h1>
      <RequestForm />
    </div>
  );
}
