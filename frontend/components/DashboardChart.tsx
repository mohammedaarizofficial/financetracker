import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

function DashboardChart({ totalIncome, totalExpense }: Props) {

  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  return (
    <div className="card p-3 mt-4">
      <h5 className="text-center">Income vs Expense</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
