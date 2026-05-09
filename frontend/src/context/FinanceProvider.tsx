import { FinanceContext } from "./FinanceContext";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ExpenseType } from "../../types/expense";
import type { IncomeType } from "../../types/income";

export function FinanceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // FETCH WITH RETRY
  const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 5,
    delay = 3000
  ): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);

        // STOP retrying for auth errors
        if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }

        // Retry only for server errors
        if (
          response.status === 404 ||
          response.status >= 500
        ) {
          throw new Error("SERVER_ERROR");
        }

        return response;

      } catch (err: any) {

        // STOP retries for unauthorized
        if (err.message === "UNAUTHORIZED") {
          throw err;
        }

        // LAST RETRY FAILED
        if (i === retries - 1) {
          throw err;
        }

        console.log(`Retrying ${url}... Attempt ${i + 1}`);

        // WAIT BEFORE RETRY
        await new Promise((res) =>
          setTimeout(res, delay)
        );
      }
    }

    throw new Error("Failed after retries");
  };

  // FETCH FINANCIAL DATA
  const fetchFinancialData = async () => {

    const token = localStorage.getItem("token");

    // STOP if token not available
    if (!token) {
      console.log("No token found");
      setLoading(false);
      return;
    }

    try {

      setLoading(true);

      // FETCH BOTH IN PARALLEL
      const [incomeRes, expenseRes] = await Promise.all([
        fetchWithRetry(
          `${API_URL}/income`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetchWithRetry(
          `${API_URL}/expense`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      // HANDLE UNAUTHORIZED
      if (
        incomeRes.status === 401 ||
        expenseRes.status === 401
      ) {

        console.log("Unauthorized");

        localStorage.removeItem("token");

        setIncomes([]);
        setExpenses([]);

        setLoading(false);

        return;
      }

      // CONVERT TO JSON
      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();

      // SAFETY CHECKS
      setIncomes(
        Array.isArray(incomeData)
          ? incomeData
          : []
      );

      setExpenses(
        Array.isArray(expenseData)
          ? expenseData
          : []
      );

    } catch (err) {

      console.log(
        "Finance fetch error:",
        err
      );

      // PREVENT CRASHES
      setIncomes([]);
      setExpenses([]);

    } finally {

      setLoading(false);
    }
  };

  // INITIAL FETCH
  useEffect(() => {

    const token = localStorage.getItem("token");

    // WAIT FOR TOKEN
    if (token) {
      fetchFinancialData();
    } else {
      setLoading(false);
    }

  }, []);

  return (
    <FinanceContext.Provider
      value={{
        incomes,
        expenses,
        setIncomes,
        setExpenses,
        fetchFinancialData,
        loading,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}