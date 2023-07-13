import {getAll, insert, deleteAll, deleteById, getByMonth, getByDate, getByYear, update} from "./ExpenseModal";
// Purpose: ExpenseRepository for CRUD operations on Expense table

function insertExpense(expense, onSuccess, onError) {
	insert(
    expense.title,
		expense.invoice,
		expense.amount,
		expense.date,
		expense.category,
    expense.stamp || Date.now(),
		onSuccess,
		onError,
	);
}

function updateExpense(expense, onSuccess, onError) {
  update(
    expense.id,
    expense.title,
    expense.invoice,
    expense.amount,
    expense.date,
    expense.category,
    expense.stamp || Date.now(),
    onSuccess,
    onError,
  );
}

function getAllExpenses(onSuccess, onError) {
	getAll((expenes) => {
    const items = [];
    for (let i = 0; i < expenes.rows.length; i++) {
      console.log(expenes.rows.item(i));
      items.push(expenes.rows.item(i));
    }
    onSuccess(items);
  }, onError);
}

function getExpensesByMonth(month, onSuccess, onError) {
	getByMonth(month, onSuccess, onError);
}
function getExpensesByDate(date, onSuccess, onError) {
	getByDate(date, onSuccess, onError);
}

function getExpensesByYear(year, onSuccess, onError) {
	getByYear(year, onSuccess, onError);
}

function deleteAllExpenses(onSuccess, onError) {
	deleteAll(onSuccess, onError);
}
function deleteExpenseById(id, onSuccess, onError) {
  deleteById(id, onSuccess, onError);
}


export {
	insertExpense,
	getAllExpenses,
	getExpensesByMonth,
	getExpensesByDate,
	getExpensesByYear,
	deleteAllExpenses,
  updateExpense,
  deleteExpenseById
};
