import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../../constants/api";

export const useTransactions = (userId) => {
  const [transactions, setTransaction] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.log("Error in fetching the transactions of the user", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error in fetching the summary of the user", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      await Promise.all([fetchSummary(), fetchTransactions()]);
    } catch (error) {
      console.log("Error in loading the data", error);
    } finally {
      setLoading(false);
    }
  }, [fetchSummary, fetchTransactions, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete the transaction");
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.log("Error in deleting the transaction", error);
      Alert.alert("Error", error.message);
    }
  };

  return { loadData, transactions, summary, deleteTransaction, loading };
};
