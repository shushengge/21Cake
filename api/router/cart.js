const db = require("../db");
const filter = require("../utils/filter");
module.exports = {
    register:(app) => {

        //根据用户id对购物车进行查询
        app.get("/userCart", filter, (req, res) => {
            let id = req.query.id;
            db.mongodb.select("cart", {"userid":id}).then((result) => {
                res.send({status:true, data:result});
            }) 
        })

        // 加入购物车
        app.get("/insertCart", filter, (req, res) => {
            let params = req.query;
            db.mongodb.insert("cart", params).then((result) => {
                res.send({status:true, data:result});
            }) 
        })

        // 查询所有购物车信息
        app.get("/selectCart",filter, (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("cart", {}).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })
    }
}