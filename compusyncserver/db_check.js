const myschema = require('./compusyncdatabase/modal');

myschema.query("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("DB Error:", err);
    } else {
        console.log("Users in DB:", results);
    }
    process.exit();
});
