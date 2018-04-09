const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(path.resolve(__dirname, "../"), "temp")
const upload = multer({dest:uploadPath});

// 文件上传
module.exports = {
    register: (app) => {
        app.post("/updatefile", upload.single("file"), (req, res) => {
            fs.rename(req.file.path, path.join(uploadPath, req.file.filename+"."+req.file.originalname.split(".")[1]), (res) => {
                console.log(res);
            });
            res.send("上传成功");
        })
    }
}
