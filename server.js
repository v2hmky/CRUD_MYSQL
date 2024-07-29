const express = require("express");
// const cors = require('cors');

const app = express();

// var corsOptions = {
//     origin: "http://localhost:9545"
// }

// app.use(cors(corsOptions));


app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({message:"Welcome to Mayekars test API"});
});

const PORT = process.env.PORT || 6745;
require("./app/routes/users.routes")(app);


app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});

