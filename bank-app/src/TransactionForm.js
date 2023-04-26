import React, { useState } from "react";
import "./TransactionForm.css";

function TransactionForm() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const transaction = {
      date: date,
      amount: amount,
      description: description,
      category: category
    };
    
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
      .then(response => response.json())
      .then(data => {
        setTransactions([...transactions, data]);
        setDate("");
        setAmount("");
        setDescription("");
        setCategory("");
      })
      .catch(error => console.error(error));
  };
  
  return (
    <div className="transaction-form">
      <h1>My Bank Transactions</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={handleDateChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={handleCategoryChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={handleAmountChange} required />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>${transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionForm;
