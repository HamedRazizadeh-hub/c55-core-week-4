const transactions = require('./data');

// Add new transaction
function addTransaction(transaction) {
  transactions.push({ ...transaction });
}

// Total income
function getTotalIncome() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') total += transaction.amount;
  }
  return total;
}

// Total expenses
function getTotalExpenses() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') total += transaction.amount;
  }
  return total;
}

// Current balance
function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Filter transactions by category
function getTransactionsByCategory(category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category.includes(category)) result.push(transaction);
  }
  return result;
}

// Find largest expense
function getLargestExpense() {
  let largest = null;
  for (const transaction of transactions) {
    if (
      transaction.type === 'expense' &&
      (!largest || transaction.amount > largest.amount)
    ) {
      largest = transaction;
    }
  }
  return largest;
}

// Search by date range
function getTransactionsByDateRange(start, end) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.date >= start && transaction.date <= end)
      result.push(transaction);
  }
  return result;
}

// Average expense per category
function averageExpensePerCategory() {
  const totals = {};
  const counts = {};
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      totals[transaction.category] =
        (totals[transaction.category] || 0) + transaction.amount;
      counts[transaction.category] = (counts[transaction.category] || 0) + 1;
    }
  }
  const averages = {};
  for (const category in totals) {
    averages[category] = totals[category] / counts[category];
  }
  return averages;
}

module.exports = {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  getTransactionsByDateRange,
  averageExpensePerCategory,
};
