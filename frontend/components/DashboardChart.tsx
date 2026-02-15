import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { useContext } from "react";
import { FinanceContext } from "../src/context/FinanceContext";
import { formatCurrency } from "../src/lib/utils";

function DashboardChart() {
  const finance = useContext(FinanceContext);
  const income = finance?.incomes ?? [];
  const expense = finance?.expenses ?? [];

  // Combine and sort all transactions by date
  const allTransactions = [
    ...income.map(i => ({
      date: new Date(i.date).toISOString().split('T')[0],
      income: i.amount,
      expense: 0,
      type: 'income' as const
    })),
    ...expense.map(e => ({
      date: new Date(e.date).toISOString().split('T')[0],
      income: 0,
      expense: e.amount,
      type: 'expense' as const
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group by date and sum amounts
  const groupedByDate = allTransactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }
    acc[date].income += transaction.income;
    acc[date].expense += transaction.expense;
    return acc;
  }, {} as Record<string, { date: string; income: number; expense: number }>);

  // Convert to array and calculate cumulative values
  let cumulativeIncome = 0;
  let cumulativeExpense = 0;
  const data = Object.values(groupedByDate).map(item => {
    cumulativeIncome += item.income;
    cumulativeExpense += item.expense;
    return {
      date: new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      Income: cumulativeIncome,
      Expense: cumulativeExpense,
      fullDate: item.date
    };
  });

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6 text-center tracking-tight font-futuristic">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis 
            dataKey="date" 
            stroke="#a1a1aa"
            tick={{ fill: '#a1a1aa', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#a1a1aa"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => {
              if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
              if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
              if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
              return `₹${value}`;
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fafafa',
              border: '1px solid #3f3f46',
              borderRadius: '0.5rem',
              color: '#18181b',
              fontWeight: '600'
            }}
            itemStyle={{
              color: '#18181b'
            }}
            labelStyle={{
              color: '#18181b',
              fontWeight: '700'
            }}
            formatter={(value: number) => [formatCurrency(value), undefined]}
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
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Income"
          />
          <Line 
            type="monotone" 
            dataKey="Expense" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
