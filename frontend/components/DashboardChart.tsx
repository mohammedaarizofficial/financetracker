import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

function DashboardChart({ totalIncome, totalExpense }: Props) {
  // Create data points for line chart - showing comparison
  const data = [
    { name: "Income", Income: totalIncome, Expense: 0 },
    { name: "Expense", Income: totalIncome, Expense: totalExpense }
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6 text-center tracking-tight">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis 
            dataKey="name" 
            stroke="#a1a1aa"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#a1a1aa"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '0.5rem',
              color: '#fafafa'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Legend 
            iconType="circle" 
            iconSize={8}
            wrapperStyle={{ color: '#fafafa', fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="Income" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 5 }}
            activeDot={{ r: 7 }}
            name="Income"
          />
          <Line 
            type="monotone" 
            dataKey="Expense" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', r: 5 }}
            activeDot={{ r: 7 }}
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
