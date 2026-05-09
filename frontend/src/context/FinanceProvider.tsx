import { FinanceContext } from "./FinanceContext";
import { useState, useEffect } from 'react';
import type { ReactNode } from "react";
import type { ExpenseType } from "../../types/expense";
import type { IncomeType } from "../../types/income";

export function FinanceProvider({ children }: { children: ReactNode }) {

    const [incomes, setIncomes] = useState<IncomeType[]>([]);
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const API_URL = import.meta.env.VITE_API_URL;

    // RETRY FUNCTION
    const fetchWithRetry = async (
        url: string,
        options: RequestInit,
        retries = 5,
        delay = 3000
    ): Promise<Response> => {

        for (let i = 0; i < retries; i++) {

            try {

                const response = await fetch(url, options);

                // Retry if backend still waking up
                if (
                    response.status === 401 ||
                    response.status === 404 ||
                    response.status >= 500
                ) {
                    throw new Error("Backend waking up...");
                }

                return response;

            } catch (err) {

                if (i === retries - 1) {
                    throw err;
                }

                // wait before retrying
                await new Promise(res => setTimeout(res, delay));
            }
        }

        throw new Error("Failed after retries");
    };

    const fetchFinancialData = async () => {

        try {

            const token = localStorage.getItem("token");

            // Don't fetch without token
            if (!token) {
                setLoading(false);
                return;
            }

            const incomeRes = await fetchWithRetry(
                `${API_URL}/income`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const expenseRes = await fetchWithRetry(
                `${API_URL}/expense`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const incomeData = await incomeRes.json();
            const expenseData = await expenseRes.json();

            // SAFETY CHECKS
            setIncomes(Array.isArray(incomeData) ? incomeData : []);
            setExpenses(Array.isArray(expenseData) ? expenseData : []);

        } catch (err) {

            console.log("Finance fetch error:", err);

            // Prevent crashes
            setIncomes([]);
            setExpenses([]);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchFinancialData();

    }, []);

    return (
        <FinanceContext.Provider
            value={{
                incomes,
                expenses,
                setIncomes,
                setExpenses,
                fetchFinancialData,
                loading
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}