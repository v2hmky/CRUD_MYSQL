// const Users = require("../model/user.model.js");
const { connection, table } = require("../configuration/db.config.js");

const Users = function (user) {
    this.first_name = user.first_name,
    this.last_name = user.last_name
}

exports.deleteuser = async (req, res) => {
  const id = req.body.id;

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM ${table} WHERE id=?`,
        [id],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    if (result.affectedRows === 0) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting user", error: error.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  if (!req.body) throw error("request not received");
  try {
    const query = `TRUNCATE TABLE ${table};`;
    await new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(res.status(404).send({ message: err.sqlMessage }));
        }
        if (result.affectedRows == 0) {
          resolve(
            res.status(200).send({ message: "All Users deleted successfully" })
          );
        }
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createuser = async (req, res) => {
  const user = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  try {
    await new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, [user], (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.status(200).send({ message: "user added" }));
      });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id, first_name, last_name } = req.body;

  try {
    await new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${table} SET first_name = ?, last_name = ? WHERE id = ?`,
        [first_name, last_name, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return reject(res.status(404).send({ message: "not_found" }));
             
            }
            if (res.affectedRows == 0) {
                return reject(res.status(404).send({ message: "not_found" }));
                
            }
            return resolve(res.status(200).send({ id: id, first_name, last_name }));
        }
      );
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


exports.getallusers = async(req, res) => {
    try{
        await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table}`, (err, result) => {
                if(err){
                    return reject(res.status(404).send({message:err.sqlMessage}));
                }
                if(result.length){
                    return resolve(res.status(200).send(result));
                }
            })
        })

    }catch(error){
        res.status(500).send({message:error.message});
    }
}


exports.finduser = async(req, res) => {
    const {first_name} = req.body;
    try{
        const result = await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} WHERE first_name = ?`, [first_name], (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            });
          });
      
          if (result.length === 0) {
            return res.status(404).send({ message: "User Not Found" });
          }
      
          res.status(200).send({ result });

    }catch(error){
        return res.status(500).send({message:error.message});
    }
}