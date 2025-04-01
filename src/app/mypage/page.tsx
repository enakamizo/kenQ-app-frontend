export default function MyPage() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-10 text-left">マイページ</h1>

        {/* 進行中案件 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">進行中案件　3</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                no: "No.1",
                title: "AIを用いた画像診断に関する最新の知見",
                date: "2025/02/02",
              },
              { no: "No.2", title: "xxxxx", date: "yyyy/mm/dd" },
              { no: "No.3", title: "xxxxx", date: "yyyy/mm/dd" },
            ].map((item) => (
              <div key={item.no} className="border rounded p-4 flex flex-col justify-between h-[220px]">
                <div>
                  <p className="font-bold">{item.no}</p>
                  <p className="mt-2">「{item.title}」</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mt-4 whitespace-nowrap">
                    案件登録日: {item.date}
                  </p>
                  <button className="mt-2 px-3 py-1 bg-gray-300 text-sm rounded">研究者一覧</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 終了案件 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-left">終了案件　3</h2>
          <div className="grid grid-cols-3 gap-4">
            {["No.1", "No.2", "No.3"].map((no) => (
              <div key={no} className="border rounded p-4 flex flex-col justify-between h-[220px]">
                <div>
                  <p className="font-bold">{no}</p>
                  <p className="mt-2">「xxxxx」</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mt-4 whitespace-nowrap">案件登録日: yyyy/mm/dd</p>
                  <button className="mt-2 px-3 py-1 bg-gray-300 text-sm rounded">研究者一覧</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

