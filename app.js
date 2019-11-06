const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const request = require('request');

app.get("/", async function (req, res) {
    // res.send("it works!");

    let parseData = await getImages("otters", 'h');

    //console.log("parseData: " + parseData);
    //console.dir("parseData: " + parseData); //displays content of object
    res.render("index", {"image": parseData});


});

app.get("/results", async function (req, res) {
    console.dir(req);

    let keyword = req.query.keyword; //gets the value the user typed using GET method
    let orient = req.query.orient;

    let parseData = await getImages(keyword, orient);
    res.render("results", {"images": parseData});

    // request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e', function (error, response, body) {
    //     if(!error && response.statusCode == 200){
    //         parseData = JSON.parse(body);
    //         let randomIndex = Math.floor(Math.random() * parseData.hits.length);
    //         // res.send(`<img src='${parseData.hits[randomIndex].largeImageURL}'>`);
    //         res.render("results", {"images": parseData});
    //     }
    //     else {
    //         console.log(response.statusCode);
    //         console.log(error);
    //     }
    // });
    // res.render("results");
});

function getImages(keyword, orient){
    return new Promise(function (resolve, reject) {
        if(orient == "h"){
            request(`https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${keyword}&orientation=horizontal`, function (error, response, body) {
                // console.log('error:', error);
                // console.log('statusCode:', response && response.statusCode);
                // console.log('body:', body);

                if(!error && response.statusCode == 200){
                    let parseData = JSON.parse(body);
                    resolve(parseData);
                    //let randomIndex = Math.floor(Math.random() * parseData.hits.length);
                    // res.send(`<img src='${parseData.hits[randomIndex].largeImageURL}'>`);
                    //res.render("index", {"image": parseData.hits[randomIndex].largeImageURL});
                }
                else {
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }

                // console.log(response.statusCode);
            });
        }
        else{
            request(`https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${keyword}&orientation=vertical`, function (error, response, body) {
                if(!error && response.statusCode == 200){
                    let parseData = JSON.parse(body);
                    resolve(parseData);
                }
                else {
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }
            });
        }
    });
}


// app.listen("8081", "0.0.0.0", function () {
//     console.log("Express Server is Running...")
// });

//starting server
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Express server is running...");
})