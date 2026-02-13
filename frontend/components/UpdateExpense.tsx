

interface ExpenseProps{
    id:string,
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId:React.Dispatch<React.SetStateAction<string>>;

}

function UpdateExpense({ id,setIsModalOpen,setSelectedId }: ExpenseProps) {
  return (
    <button
      type="button"
      className="btn btn-secondary mt-2"
      onClick={() => {
        setSelectedId(id);
        setIsModalOpen(true)}}
    >
      Update
    </button>
  );
}

export default UpdateExpense;
