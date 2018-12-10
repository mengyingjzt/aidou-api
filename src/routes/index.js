var express = require('express');
var router = express.Router();

var query = require("../mysql");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//接口
router.get('/api/get/list', function(req, res, next) {
    var type = req.query.type, //类型
        page = req.query.page, //第几页数据
        page_size = req.query.page_size; //每页显示多少数据
    var start = page_size * (page - 1);
    var sqlStr = `select * from exam where type=? limit ${start},${page_size}`;
    var sqlCount = `select count(*) from exam where type=?`;

    query(sqlCount, [type], function(error, results) {
        if (error) {
            res.json({ code: 0, msg: error })
        } else {
            //总共的页数
            var total = Math.ceil(results[0]['count(*)'] / page_size);
            query(sqlStr, [type], function(error, results) {
                if (error) {
                    res.json({ code: 0, msg: error })
                } else {
                    res.json({ code: 1, data: results, total: total })
                }
            })
        }
    })
})
module.exports = router;