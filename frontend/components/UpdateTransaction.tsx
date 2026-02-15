

interface ExpenseProps{
    id:string,
    type:string,
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId:React.Dispatch<React.SetStateAction<string>>;
    setTransactionType:React.Dispatch<React.SetStateAction<string>>;
}

function UpdateTransaction({ id,type, setIsModalOpen,setSelectedId,setTransactionType }: ExpenseProps) {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary"
      onClick={() => {
        setSelectedId(id);
        setIsModalOpen(true);
        setTransactionType(type);
      }}
    >
      <i className="bi bi-pencil-fill"></i>
    </button>
  );
}

export default UpdateTransaction;
