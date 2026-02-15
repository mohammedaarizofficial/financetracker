import DeleteTransaction from './DeleteTransaction';
import UpdateTransaction from './UpdateTransaction';

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: Date;
}

interface TransactionListProps {
  transactions: Transaction[],
  setSelectedId:React.Dispatch<React.SetStateAction<string>>,
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionType:React.Dispatch<React.SetStateAction<string>>;
}

function TransactionList({ transactions,setSelectedId, setIsModalOpen,setTransactionType }: TransactionListProps) {
  
  const sorted = [...transactions].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">
        Recent Transactions
      </h2>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {sorted.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between py-4 px-4 rounded-lg border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors duration-200 last:border-0"
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                  t.type === "income"
                    ? "bg-emerald-500/10"
                    : "bg-red-500/10"
                }`}
              >
                {t.type === "income" ? (
                  <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" />
                  </svg>
                )}
              </div>

              <div>
                <div className="font-medium text-white text-sm">
                  {t.description}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t.category} · {new Date(t.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-3">
              <span
                className={`font-semibold text-sm ${
                  t.type === "income"
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
              </span>

              {/* UPDATE BUTTON */}
              <UpdateTransaction id={t.id} type={t.type} setIsModalOpen={setIsModalOpen} setSelectedId={setSelectedId} setTransactionType={setTransactionType}/>

              {/* DELETE BUTTON */}
              <DeleteTransaction id={t.id} type={t.type}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
