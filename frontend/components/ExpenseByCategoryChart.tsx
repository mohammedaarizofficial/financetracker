import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useContext } from "react";
import {FinanceContext} from '../../frontend/src/context/FinanceContext';

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

function ExpenseByCategoryChart(){
    const finance = useContext(FinanceContext);
    const expenses = finance?.expenses??[];

    const expenseByCategory = Object.values(
        expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
        acc[expense.category] = {
            name: expense.category,
            value: 0
        };
        }

        acc[expense.category].value += expense.amount;

        return acc;
    }, {} as Record<string, { name: string; value: number }>)
    );
    return(
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-6 text-center tracking-tight">
                Expenses by Category
            </h2>
            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={expenseByCategory}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            innerRadius={60}
                            paddingAngle={3}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                        >
                            {expenseByCategory.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
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
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ExpenseByCategoryChart;