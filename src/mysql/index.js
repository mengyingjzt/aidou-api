var mysql = require("mysql");

var config = {
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'zk2',
    connectionLimit: 100
}

var pool = mysql.createPool(config);

module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query || [];
    pool.getConnection(function(error, con) {

        if (error) {
            fn(error)
        } else {
            con.query(sql, query, function(err, results) {
                con.release();
                queryCallback(err, results);
            })
        }
    })

    function queryCallback(err, results) {
        if (err) {
            fn(err)
        } else {
            fn(null, results)
        }
    }
}