const db = require("../db");
const filter = require("../utils/filter");
module.exports = {
    register:(app) => {
        // app.get("/insertOrder", filter, (req, res) => {
        // 插入订单
        app.get("/insertOrder", filter, (req, res) => {
            let params = req.query;
            db.mongodb.insert("order", params).then((result) => {
                res.send({status:true, data:result});
            }) 
        })

        // 更新某个用户的商品列表信息   products字段20180413
        app.get("/proUpdate", filter, (req, res)=>{
            let userid = req.query.userid;
            let status = req.query.status;
            let products = req.query.products;
            db.mongodb.productsUpdate("order", {"userid": userid, "status": status}, products).then((result)=>{
                res.send({status:true, data:result});
            })
        })

        //根据用户id,状态对订单进行查询
        app.get("/userOrder", filter, (req, res) => {
            // console.log(req.query);
            let userid = req.query.userid;
            let status = req.query.status;
            db.mongodb.select("order", {userid, status}).then((result) => {
                // res.send({status:true, data:result});
                if(result['length']>0){
                    res.send({status:true, data:result});
                }else{
                    res.send({status:false})
                }
            }) 
        })

        // 模拟结算----传status=0过来  将对应的order的status=1    20180413
        app.get("/payUpdate", filter, (req,res)=>{
            let userid = req.query.userid;
            let status = req.query.status;
            db.mongodb.payUpdate("order", {"userid": userid, "status": status}).then((result)=>{
                res.send({data:result});
            })
        })


        //根据用户id对订单进行查询
        app.get("/useridOrder", filter, (req, res) => {
            let userid = req.query.userid;
            db.mongodb.select("order", {userid}).then((result) => {
                // res.send({status:true, data:result});
                if(result['length']>0){
                    res.send({status:true, data:result});
                }else{
                    res.send({status:false})
                }
            }) 
        })
        

        // 更新用户订单
        app.get("/UpdOrder", filter, (req, res) => {
            let userid = req.query.userid;
            let status = req.query.status;
            let products = req.query.products;
            let condition = req.query.condition;
            db.mongodb.update1("order", {userid:userid, status:condition}, {userid,status,products}).then((result) => {
                res.send({status:true, data:result});
            })  
        })

        // 查询所有订单
        app.get("/selectOrder", filter, (req, res) => {
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