export default function RightPanel() {
  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 xl:block">
      <div className="space-y-6 p-4">

        <section>
          <h3 className="mb-2 font-semibold">
            Statistics
          </h3>

          <div className="rounded-xl border p-4">
            <p>Reports: 0</p>
            <p>Entities: 0</p>
            <p>Responses: 0</p>
          </div>
        </section>

        <section>
          <h3 className="mb-2 font-semibold">
            Trending Categories
          </h3>

          <div className="rounded-xl border p-4">
            <ul className="space-y-2">
              <li>Korupsi</li>
              <li>Pungli</li>
              <li>Dana Desa</li>
            </ul>
          </div>
        </section>

      </div>
    </aside>
  )
}