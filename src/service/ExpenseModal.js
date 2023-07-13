// DESCRIPTION: This file contains all the functions related to the expenses table
// AUTHOR: Dipesh Chouhan
import {expenseTable, expenseDb } from "./ExpensesDb";
function insert(title, invoice, amount, date, category, stamp,  onSuccess, onError) {
	expenseDb.transaction((tx) => {
		try {
			tx.executeSql(
				`INSERT INTO ${expenseTable} (title, invoice, amount, date, category, stamp) VALUES(?, ?, ?, ?, ?, ?)`,
				[title, invoice, amount, date, category, stamp],
				(tx, rs) => {
					console.log("Data Inserted Successfully");
					onSuccess(rs.insertId);
				},
				(tx, err) => {
					console.log("Error", err.message);
					onError(err);
				},
			);
		} catch (e) {
			console.log(e);
		}
	});
}

function update(id, title, invoice, amount, date, category, stamp, onSuccess, onError) {
  expenseDb.transaction((tx) => {
    console.log("Update", id, title, invoice, amount, date, category, stamp);
    tx.executeSql(
      `UPDATE ${expenseTable} SET title = ?, invoice = ?, amount = ?, date = ?, category = ?, stamp = ? WHERE id = ?`,
      [title, invoice, amount, date, category, stamp, id],
      (tx, rs) => {
        console.log("Data Updated Successfully");
        onSuccess(rs);
      },
      (tx, err) => {
        console.log("Error", err.message);
        onError(err);
      },
    );
  });
}

function deleteById(id, onSuccess, onError) {
  expenseDb.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM ${expenseTable} WHERE id = ?`,
      [id],
      (tx, rs) => {
        console.log("Data Deleted Successfully");
        onSuccess(rs);
      },
      (tx, err) => {
        console.log("Error", err.message);
        onError(err);
      },
    );
  });
}



function deleteAll(onSuccess, onError) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`DELETE FROM ${expenseTable}`,
			[],
			(tx, rs) => {
				console.log("Data Deleted Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}
function getAll(onSuccess, onError, limit = 20) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`SELECT * FROM ${expenseTable} ORDER BY stamp DESC LIMIT ${limit}`,
			[],
			(tx, rs) => {
				console.log("Data Fetched Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}

function getByDate(date, onSuccess, onError) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`SELECT * FROM ${expenseTable} WHERE date = ? ORDER BY id DESC LIMIT 4`,
			[date],
			(tx, rs) => {
				console.log("Data Fetched Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}

function getByMonth(month, onSuccess, onError) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`SELECT * FROM ${expenseTable} WHERE date LIKE ? ORDER BY id DESC LIMIT 4`,
			[`${month}%`],
			(tx, rs) => {
				console.log("Data Fetched Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}

function getByYear(year, onSuccess, onError) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`SELECT * FROM ${expenseTable} WHERE date LIKE ? ORDER BY id DESC LIMIT 4`,
			[`${year}%`],
			(tx, rs) => {
				console.log("Data Fetched Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}

function deleteTable(onSuccess, onError) {
	expenseDb.transaction((tx) => {
		tx.executeSql(
			`DROP TABLE ${expenseTable}`,
			[],
			(tx, rs) => {
				console.log("Table Deleted Successfully");
				onSuccess(rs);
			},
			(tx, err) => {
				console.log("Error", err.message);
				onError(err);
			},
		);
	});
}

// TODO: add getByWeek function
export {
	getByYear,
	getByMonth,
	getByDate,
	getAll,
	deleteAll,
	insert,
  update,
	deleteTable,
  deleteById,
};
