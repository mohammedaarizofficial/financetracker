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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

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
        <>
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                <Pie
                    data={expenseByCategory}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    label
                >
                    {expenseByCategory.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
        </>
    )
}

export default ExpenseByCategoryChart;