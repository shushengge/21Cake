const db = require("../db");
const filter = require("../utils/filter");
module.exports = {
    register:(app) => {

        // 插入订单
        app.get("/insertOrder", filter, (req, res) => {
            let params = req.query;
            db.mongodb.insert("order", params).then((result) => {
                res.send({status:true, data:result});
            }) 
        })

        //根据用户id,状态对订单进行查询
        app.get("/userOrder", filter , (req, res) => {
            console.log(req.query);
            let userid = req.query.userid;
            let status = req.query.status;
            db.mongodb.select("order", {userid, status}).then((result) => {
                res.send({status:true, data:result});
            }) 
        })

        //根据用户id对订单进行查询
        app.get("/useridOrder", filter, (req, res) => {
            let userid = req.query.userid;
            db.mongodb.select("order", {userid}).then((result) => {
                res.send({status:true, data:result});
            }) 
        })
        

        // 更新用户订单
        app.get("/UpdOrder", filter , (req, res) => {
            let userid = req.query.userid;
            let status = req.query.status;
            let products = req.query.products;
            let condition = req.query.condition;
            db.mongodb.update1("order", {userid:userid, status:condition}, {userid,status,products}).then((result) => {
                res.send({status:true, data:result});
            })  
        })

        // 查询所有订单
        app.get("/selectOrder" ,filter, (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("order", {}).then((result) => {
                res.send({status:true, count:result.length, data:result.slice(page1, limit1)});
            })  
        })

    }
}