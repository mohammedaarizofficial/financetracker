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
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h5 className="card-title mb-4">
          Recent Transactions
        </h5>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>

          {sorted.map((t) => (
            <div
              key={t.id}
              className="d-flex justify-content-between align-items-center py-3 border-bottom"
            >

              {/* LEFT SECTION */}
              <div className="d-flex align-items-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor:
                      t.type === "income"
                        ? "rgba(25,135,84,0.1)"
                        : "rgba(220,53,69,0.1)"
                  }}
                >
                  {t.type === "income" ? (
                    <i className="bi bi-arrow-up-circle-fill text-success"></i>
                  ) : (
                    <i className="bi bi-arrow-down-circle-fill text-danger"></i>
                  )}
                </div>

                <div>
                  <div className="fw-semibold">
                    {t.description}
                  </div>
                  <small className="text-muted">
                    {t.category} ·{" "}
                    {new Date(t.date).toLocaleDateString()}
                  </small>
                </div>

              </div>

              {/* RIGHT SECTION */}
              <div className="d-flex align-items-center gap-3">

                <span
                  className={`fw-bold ${
                    t.type === "income"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}$
                  {t.amount.toFixed(2)}
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
    </div>
  );
}

export default TransactionList;
