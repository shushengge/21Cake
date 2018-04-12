const mongo = require("mongodb");
const client = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

let db;

client.connect("mongodb://127.0.0.1:27017/projectAngular", function(_error, _db){
    if(_error){
        return false;
    }
    db = _db;
});

module.exports = {

    // 查询
    select:(_collection, _condition) => {
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_collection).find(_condition).toArray((_error, _data) => {
                if(_error){
                    reject(_error);
                }else{
                    resolve(_data);
                }
            })
        })
    },

    // 更新
    update:(_collection, id, _condition) => {
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_collection).update({_id:id}, _condition).then((result, error) => {
                resolve(result);
            })
        })
    },

// 特殊情况
    update1:(_collection, id, _condition) => {console.log(id)
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_collection).update(id, _condition).then((result, error) => {
                resolve(result);
            })
        })
    },

    // 修改特定字段的值    _condition: {_userid, _productid}
    qtyUpdate:(_collection, _condition, _qty) =>{
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_collection).update(_condition, {"$set":{"qty": _qty}}).then((result, error)=>{
                resolve(result);
            })
        })
    },

    // 插入
    insert:(_colletion, _condition) => {
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_colletion).insert(_condition).then((result,error) => {
                resolve(result);
                // console.log(result);
            })
        })
    },

    // 删除
    delete:(_collection, _condition) => {
        return new Promise((resolve, reject) => {
            db.db("projectAngular").collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },

    // 对objectid进行转换
    objectid:(_id) => {
        return _id ? new ObjectID(_id) : new objectid();
    }
}