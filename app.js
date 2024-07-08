const express = require("express");
const app = express();
const port = 8080;

// app.use((req, res, next) => {
//     console.log("I am a middleware 1");
//     next();
// });

const checkToken = ("/api", (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    else {
        res.send("Access Denied");
    }
})

app.get("/api", checkToken, (req, res) => {
    res.send("You are on the API site");
})

// app.use("/api", (req, res, next) => {
//     let { token } = req.query;
//     if (token === "giveaccess") {
//         next();
//     }
//     else {
//         res.send("Access Denied");
//     }
// })

// app.get("/api", (req, res) => {
//     res.send("You are on the API site");
// })

app.use("/random", (req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    console.log("I am a middleware 2");
    next();
});

app.get("/", (req, res) => {
    console.log("Root User");
    res.send("I am a root");
});

app.get("/random", (req, res) => {
    console.log("I am random");
    res.send("Random");
});

app.use("/", (req, res) => {
    res.send("Page not available");
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});