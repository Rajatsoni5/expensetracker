import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setItems } from "../../reduxStore/slices/expenseSlice";
import ExpenseList from "./ExpenseList";
import { databaseURL } from "../../firebase/firebaseConfig";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const expenseData = useSelector((state) => state.expenses.items);

  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${databaseURL}/expenses.json`);
        const data = await response.json();

        if (data) {
          const expenseArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setItems(expenseArray)); 
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = { amount, desc, category };

    try {
      const response = await fetch(`${databaseURL}/expenses.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });

      const data = await response.json();
      dispatch(addItem({ id: data.name, ...expense }));

      setAmount(0);
      setDesc("");
      setCategory("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Select Category:</label>
            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">--Select an option--</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
      </div>
      <ExpenseList expenseData={expenseData} />
    </>
  );
};

export default ExpenseForm;
