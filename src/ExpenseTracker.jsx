import { useState, useEffect } from "react";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add or Update Expense
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return alert("Fill all fields!");

    const newExpense = {
      id: editId ? editId : Date.now(),
      title,
      amount: Number(amount),
    };

    if (editId) {
      setExpenses(expenses.map((exp) => (exp.id === editId ? newExpense : exp)));
      setEditId(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
  };

  // Delete Item
  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Edit Item
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setEditId(expense.id);
  };

  // Total amount
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Expense Tracker</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-md focus:outline-none"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded-md focus:outline-none"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* Total */}
      <div className="mt-6 text-xl font-semibold text-gray-700">
        Total Spent: <span className="text-blue-600">₦{total}</span>
      </div>

      {/* Expense List */}
      <div className="mt-6 w-full max-w-md space-y-3">
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses added yet.</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-700">{exp.title}</h3>
                <p className="text-gray-500">₦{exp.amount}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDelete(exp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;
