const db = require("../db");
const filter = require("../utils/filter");

module.exports = {
    register:(app) => {

        // 商品的模糊查询，可以传一个title关键字，不传title代表查询所有，也可以传page和limit来进行分页查询
        app.get("/frontProducts", (req, res) => {
            let title = req.query.title;
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            let pramas = new RegExp(title);
            db.mongodb.select("products",{$or:[{title:pramas},{cnname:pramas},{enname:pramas}, {category:pramas}]}).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })
        
        //商品分类查询,2018-4-10
        //参数：category类别，page页码，limit返回数据数量
        app.get("/category", (req, res)=>{
            let page = req.query.page;
            let limit = req.query.limit;
            let category = req.query.category;

            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("products", {"category":category}).then((data)=>{
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })

        app.post("/cate", (req, res)=>{
            let page = req.body.page;
            let limit = req.body.limit;
            let category = req.body.category;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("products", {"category":category}).then((data)=>{
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })


        // 对商品的指定字段进行查询
        app.get("/frontApoproducts", (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("products", req.query).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })


        //根据id对商品进行查询
        app.get("/frontIdproduct", (req, res) => {
            let id = req.query.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.select("products", {"_id":oid}).then((result) => {
                res.send({status:true, data:result});
            })  
        })


        // 商品的价格范围查询, 可以传一个start代表价格大于start的商品，可以传一个end代表价格小于end的商品，传入end和start代表价格在start和end之间，不传参数代表查询所有
        app.get("/frontrangeproducts", (req, res) => {
            let start = req.query.start;
            let end = req.query.end;
            if(start == undefined && end == undefined){
                start = "0";
                end = "999999999999";
            }  else
            if(start == undefined){
                start = "0";
            }
            if(end == undefined){
                end = "999999999999";
            }
            db.mongodb.select("products", {price:{$gte: start, $lte: end}}).then((data) => {
                res.send({status:true, count:data.length, data:data});
            })
        })
    }
}