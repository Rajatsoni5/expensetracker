import React, { useState } from 'react';
import "../../styles/expenseList.css";
import { databaseURL } from "../../firebase/firebaseConfig";

const ExpenseList = ({ expenseData, setExpenseData }) => {
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleDelete = async (id) => {
    try {
      await fetch(`${databaseURL}/expenses/${id}.json`, {
        method: "DELETE",
      });

      setExpenseData(expenseData.filter((item) => item.id !== id));
      console.log("Expense successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
    
  

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditAmount(item.amount);
    setEditDesc(item.desc);
    setEditCategory(item.category);
  };

  const handleSave = async () => {
    const updatedExpense = {
      amount: editAmount,
      desc: editDesc,
      category: editCategory,
    };

    try {
      await fetch(`${databaseURL}/expenses/${editingId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });

      setExpenseData(
        expenseData.map((item) =>
          item.id === editingId ? { id: editingId, ...updatedExpense } : item
        )
      );

      setEditingId(null); 
      console.log("Expense successfully updated");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className='expense-container'>
      {expenseData?.map((item) => (
        <div key={item.id} className='expense-item'>
          {editingId === item.id ? (
            <>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="food">Food</option>
                <option value="petrol">Petrol</option>
                <option value="salary">Salary</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
              </select>
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p>Amount: {item.amount}</p>
              <p>Description: {item.desc}</p>
              <p>Category: {item.category}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleEdit(item)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
