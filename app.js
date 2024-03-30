require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
var path = require('path')
const config=require("./config");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const PORT=config.PORT;
const MongoDB_URI=config.MONGODB_URI;

const record_router=require("./routes/records")
const settings_router=require("./routes/settings")
const AxiosDigestAuth=require('@mhoc/axios-digest-auth').default;

mongoose.connect(MongoDB_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() =>{
        console.log("DB Connected")
    })

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api",record_router);
app.use("/api",settings_router);
app.get('/',(req,res)=>{
    res.json({"Message":"Up"})

})

const digestAuth = new AxiosDigestAuth({
    username: 'admin',
    password: 'vinayan@123',
  });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const baseaddress='http://192.168.1.108'

app.get('/ZoomIn',async (req,res)=>{
    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=start&channel=1&code=ZoomTele&arg1=0&arg2=0&arg3=0`
          });
          await sleep(500)
          const response_next = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=stop&channel=1&code=ZoomTele&arg1=0&arg2=0&arg3=0`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }
})
app.get('/ZoomOut',async (req,res)=>{

    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=start&channel=1&code=ZoomWide&arg1=0&arg2=0&arg3=0`
          });
          await sleep(500)
          const response_next = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=stop&channel=1&code=ZoomWide&arg1=0&arg2=0&arg3=0`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }
})

app.get('/FocusIn',async (req,res)=>{

    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=start&channel=1&code=FocusFar&arg1=0&arg2=0&arg3=0`
          });
          await sleep(500)
          const response_next = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=stop&channel=1&code=FocusFar&arg1=0&arg2=0&arg3=0`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }

})
app.get('/FocusOut',async (req,res)=>{

    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=start&channel=1&code=FocusNear&arg1=0&arg2=0&arg3=0`
          });
          await sleep(500)
          const response_next = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/ptz.cgi?action=stop&channel=1&code=FocusNear&arg1=0&arg2=0&arg3=0`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }
})

app.get('/NightMode',async (req,res)=>{

    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/configManager.cgi?action=setConfig&VideoInMode[0].Config[0]=2`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }
})
app.get('/DayMode',async (req,res)=>{

    try{
        const response = await digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `${baseaddress}/cgi-bin/configManager.cgi?action=setConfig&VideoInMode[0].Config[0]=1`
          });
          res.sendStatus(200)

    }
    catch(e){
        res.sendStatus(200)
    }
})

app.listen(process.env.PORT || 8001,()=>{
    console.log(`Server Started at PORT ${PORT}`)
})
