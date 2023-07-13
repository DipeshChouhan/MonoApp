import SQLite from "react-native-sqlite-storage";
let expenseDb;
let expenseTable;
// Purpose: Database connection and creation
const openDb = () => {
  console.log(
    "Called2"
  )
  return SQLite.openDatabase("expenses.db", "0.1");
};

const createTable = (tableName, onTableCreated) => {
  const db = openDb();

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, invoice TEXT, amount TEXT, date TEXT, category INTEGER, stamp INTEGER)`,
      [],
      (_tx, _rs) => {
        console.log("Table Created Successfully");
        onTableCreated();
      },
      (_, err) => {
        console.log("Error", err.message);
      },
    );
  });
  return db;
};


const configDb =(tableName="expenses", onTableCreated) => {
  expenseTable = tableName;
  expenseDb = createTable(tableName, onTableCreated);
  // create a condition of there is a table
  // if there is a table, then do not create a table
  // if there is no table, then create a table


}
export { expenseDb, configDb, expenseTable };
