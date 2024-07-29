module.exports = app => {
    const Users = require('../controller/users.sql.js');

    var router = require('express').Router();

    router.post("/adduser", Users.createuser);
    router.put("/updateuser", Users.updateUser);
    router.get("/finduser", Users.finduser);
    router.get("/getallusers", Users.getallusers);
    router.delete("/deleteuser", Users.deleteuser);
    router.delete("/deleteallusers", Users.deleteAllUsers);
    app.use('/api/users', router);
}