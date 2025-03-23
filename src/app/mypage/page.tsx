export default function MyPage() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-10">マイページ</h1>

            <section className="ml-6 mb-6">
            <h2 className="text-xl font-semibold">進行中案件</h2>
            {/* TODO: 進行中案件をここに表示 */}
            </section>

            <section className="ml-6">
            <h2 className="text-xl font-semibold">終了案件</h2>
            {/* TODO: 終了案件をここに表示 */}
            </section>
        </div>
        );
    }
