const express = require("express");
const app = express();

app.use(express.json());
app.use(express.text());
app.use(require("./src/routes/routes"));

app.listen(1357, ()=>{
    console.log("Server running on port 1357");
})