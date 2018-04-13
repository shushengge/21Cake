const db = require("../db");
const filter = require("../utils/filter");

module.exports = {
    register:(app) => {
        
        // 商品的模糊查询，可以传一个title，不传title代表查询所有，也可以传page和limit来进行分页查询
        // app.get("/backproducts", filter, (req, res) => {
        
        
        app.get("/backproducts", filter, (req, res) => {
            let title = req.query.title;
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            let pramas = new RegExp(title);
            db.mongodb.select("products",{$or:[{title:pramas},{cnname:pramas},{enname:pramas},{category:pramas}]}).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })

        // 查找所有管理员信息,及分页
        app.get("/backAdmin", filter, (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("admin",{}).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })

        // 查找所有用户信息,及分页
        app.get("/backUsers", filter, (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("users",{}).then((data) => {
                res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
            })
        })


        // 商品的价格范围查询, 可以传一个start代表价格大于start的商品，可以传一个end代表价格小于end的商品，传入end和start代表价格在start和end之间，不传参数代表查询所有
        app.get("/rangeproducts", filter, (req, res) => {
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
            db.mongodb.select("products",{price:{$gte: start, $lte: end}}).then((data) => {
                res.send({status:true, count:data.length, data:data});
            })
        })

        // 添加商品路由
        app.get("/backAddproduct", filter, (req, res) => {
            let pramas = req.query;
            let objMarge = Object.assign({cnname:"芒果奶油", enname:"Mango Cream Cake", title:"21cake配方芒果百香果慕斯夹心", price:198, number:12, category:"cake", weight: 2.0, img: "2.jpg", hot:0}, pramas);
            db.mongodb.insert("products", objMarge).then((result) => {
                res.send({status:true});
            })
        })

        // 删除商品路由
        app.get("/backDelproduct", filter, (req, res) => {
            let id = req.query.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete("products", {"_id":oid}).then((result) => {
                res.send({status:true, data:result});
            })  
        })

        // 更新商品路由
        app.get("/backUpdproduct", filter, (req, res) => {
            let id = req.query._id;
            let cnname = req.query.cnname;
            let enname = req.query.enname;
            let title = req.query.title;
            let price = Number(req.query.price);
            let number = Number(req.query.number);
            let category = req.query.category;
            let img = req.query.img;        
            let hot = Number(req.query.hot);
            let oid = db.mongodb.objectid(id);
            db.mongodb.update("products", oid, {cnname, enname, title, price, number, category, img, hot}).then((result) => {
                res.send({status:true, data:result});
            })  
        })
    }
}