const db = require("../db");
const filter = require("../utils/filter");
module.exports = {
    register:(app) => {
       
        // 增：加入购物车 : 从详情页或列表页点击添加商品到购物车的insert接口 2018-4-11
        app.get("/addCart", (req, res)=>{
            let userid = req.query.userid; //_id的形式       
            let productid = req.query.productid;//_id的形式
            let qty = Number(req.query.qty);
            let username = req.query.username;

            let cnname = req.query.cnname;
            let enname = req.query.enname;
            let title = req.query.title;
            let price = Number(req.query.price);
            let number = Number(req.query.number);
            let category = req.query.category;
            let weight = req.query.weight;
            let img = req.query.img;
            let imgdetail = req.query.imgdetail;
            let imgindex = req.query.imgindex;
            let hot = Number(req.query.hot);

            var addparams = {
                "userid":userid, 
                "qty":qty, 
                "productid":productid, 
                "username":username,                 
                "cnname":cnname, 
                "enname":enname, 
                "title":title, 
                "price":price, 
                "number":number, 
                "category":category, 
                "weight":weight, 
                "img":img, 
                "imgdetail":imgdetail, 
                "imgindex":imgindex, 
                "hot":hot
            }

            db.mongodb.insert("cart", addparams).then((result)=>{
                res.send({status:true, data:result});
            })
        })

        //改： 1、当qty>0时，修改已经添加到了购物车的qty，用新的qty值覆盖之前的qty的值
        //     2、当qty==0时，删除已经添加到了购物车的那一条产品记录  2018-4-11
        app.get("/updateCartQty", (req, res)=>{
            let userid = req.query.userid;
            let productid = req.query.productid;
            let qty = Number(req.query.qty);

            if(qty > 0){
                db.mongodb.qtyUpdate("cart", {"userid":userid, "productid":productid}, qty).then((result)=>{
                    res.send({data:result});
                })
            }else if(qty == 0){
                db.mongodb.delete("cart", {"userid":userid, "productid":productid}).then((result)=>{
                    res.send({data:result});
                })
            }         
        })

        // 删除：在购物车页面删除不想要的商品   单个删除
        app.get("/removeCart", (req, res)=>{
            let userid = req.query.userid;
            let productid = req.query.productid;
            db.mongodb.delete("cart", {"userid":userid, "productid":productid}).then((result)=>{
                res.send({status:true, data:result});
            })
        })

        
        // 删除：实现点击勾选框删除批量的购物车里面的商品 2018-4-12
        app.get("/removeInArr", (req, res)=>{
            let userid = req.query.userid;
            let productArr = req.query.productArr.split(',');
            //string: "5acecd70d4b48c1b0cbae9b7,5acecdb2d4b48c1b0cbae9b8,5aced5a6d4b48c1b0cbae9b9"
            if(productArr.length > 0){
                for(let i = 0; i<productArr.length; i++){
                    let productid = productArr[i];
                    db.mongodb.delete("cart", {"userid":userid, "productid":productid})
                }
                res.send({status:true});              
            }
        })

        // 查： 根据用户userid对购物车进行查询
        app.get("/userCart", (req, res) => {
            let userid = req.query.userid;
            db.mongodb.select("cart", {"userid":userid}).then((result)=>{
                if(result && result['length']>0){
                    res.send({status:true, count:result.length, data:result})
                }else{
                    res.send({status:false})
                }
            }) 
        })

        // 查： 查询所有购物车信息
        app.get("/selectCart", (req, res) => {
            let page = req.query.page;
            let limit = req.query.limit;
            page1 = page ? (page-1)*limit : 0;
            limit1 = limit ? page*limit : 99999;
            db.mongodb.select("cart", {}).then((data) => {

                if(data && data['length']>0){
                    res.send({status:true, count:data.length, data:data.slice(page1, limit1)});
                }else{
                    res.send({status:false});
                }
                
            })
        })
    }
}