

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
      className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors duration-200"
      onClick={() => {
        setSelectedId(id);
        setIsModalOpen(true);
        setTransactionType(type);
      }}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  );
}

export default UpdateTransaction;
