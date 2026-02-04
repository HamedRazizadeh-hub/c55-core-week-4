// This is the entrypoint for your application
// node app.js
const chalk = require('chalk');
const transactions = require('./data');
const {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  getTransactionsByDateRange,
  averageExpensePerCategory,
} = require('./finance');

// Display all transactions
function printAllTransactions() {
  console.log(chalk.bold('\n💰 PERSONAL FINANCE TRACKER 💰\n'));
  console.log('All Transactions:');

  transactions.forEach((t, i) => {
    const label =
      t.type === 'income' ? chalk.green('[INCOME]') : chalk.red('[EXPENSE]');
    const amountColor =
      t.type === 'income'
        ? chalk.green(`€${t.amount}`)
        : chalk.red(`€${t.amount}`);
    console.log(
      `${i + 1}. ${label} ${t.description} - ${amountColor} (${chalk.yellow(t.category)})`
    );
  });
}

// Display transactions by date range
function printTransactionsByDateRange(start, end) {
  const results = getTransactionsByDateRange(start, end);
  console.log(chalk.bold(`\nTransactions from ${start} to ${end}:`));

  results.forEach((t, i) => {
    const label =
      t.type === 'income' ? chalk.green('[INCOME]') : chalk.red('[EXPENSE]');
    const amountColor =
      t.type === 'income'
        ? chalk.green(`€${t.amount}`)
        : chalk.red(`€${t.amount}`);
    console.log(
      `${i + 1}. ${label} ${t.description} - ${amountColor} (${chalk.yellow(t.category)})`
    );
  });
}

// Display summary
function printSummary() {
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();

  console.log(chalk.bold('\n📊 FINANCIAL SUMMARY 📊'));
  console.log(chalk.bold(`Total Income: €${income}`));
  console.log(chalk.bold(`Total Expenses: €${expenses}`));

  const balanceText =
    balance >= 0 ? chalk.cyan(`€${balance}`) : chalk.red(`€${balance}`);
  console.log(chalk.bold('Current Balance: '), balanceText);

  if (largestExpense) {
    console.log(
      `\nLargest Expense: ${largestExpense.description} (€${largestExpense.amount})`
    );
  }

  console.log(`Total Transactions: ${transactions.length}`);

  const averages = averageExpensePerCategory();
  console.log(chalk.bold('\nAverage Expense per Category:'));
  for (const category in averages) {
    console.log(`${chalk.yellow(category)}: €${averages[category].toFixed(2)}`);
  }
}

printAllTransactions();
printSummary();
printTransactionsByDateRange('2025-01-01', '2025-01-25');
