import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const port=3000;
const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const response= await axios.get("https://api.adviceslip.com/advice");
        const adviceSlip = response.data.slip;
        const adviceContent = adviceSlip.advice;
        res.render("index.ejs",{
            content: adviceContent,
        });
        }catch (error) {
            console.log(error);
            res.status(500);
          }
})
// app.get("/",(req,res)=>{
//     res.render("index.ejs");
// })
app.post("/search",async(req,res)=>{
     const searchItem= req.body["searchbar"];
    try{
        const response = await axios.get("https://api.adviceslip.com/advice/search/"+searchItem);
        const adviceSlips = response.data.slips;
        
        // Render the index.ejs view with a randomly selected advice slip
        res.render("index.ejs",
         { content:adviceSlips[Math.floor(Math.random() * adviceSlips.length)].advice});
    }catch (error) {
        console.log(error);
        res.status(500);
      }
})

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})