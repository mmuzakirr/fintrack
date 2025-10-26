const SQL = await initSqlJs({ locateFile: f => `./assets/${f}` });
const db = new SQL.Database();
db.run("CREATE TABLE test (id, name);");
db.run("INSERT INTO test VALUES (1, 'Halo FinTrack');");
const result = db.exec("SELECT * FROM test");
console.log(result[0].values);
