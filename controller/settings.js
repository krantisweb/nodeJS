const mongoose=require("mongoose")
const Settings=require("../models/settings")
const axios=require("axios")
var FormData = require('form-data');


exports.testSetting=async(req,res)=>{
    const settingData={
        "rstp_url": "rstp://",
        "lidar_url": "",
        "mode": "auto",
        "twowheeler": "55",
        "auto": "110",
        "car": "65",
        "truck": "70",
        "bus": "105",
        "mgv": "140",
        "lat":"0",
        "lon":"0",
        "__v": 0
      }
    const setting=new Settings(settingData)
    setting.save((err,setting)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Record Not Saved"
            })
        }
        res.json({setting})

    })
}

exports.getRstpSetting=async (req,res)=> {
    console.log("GET RSTP")
    const setting=await Settings.findOne();
    res.status(200).json({"rstp_url":setting.rstp_url})    
}

exports.saveRstpSetting=async (req,res)=> {
    console.log("POST RSTP")
    const newrstpurl=req.body.rstp_url
    const setting=await Settings.findOne();
    const dataid=setting._id
    const updatedsetting=await Settings.findOneAndUpdate({_id:dataid},{$set:{ rstp_url:newrstpurl}})
    res.status(200).json({"data":updatedsetting})
}

exports.getLidarSetting=async (req,res)=> {
    console.log("GET Lidar")
    const setting=await Settings.findOne();
    res.status(200).json({"lidar_url":setting.lidar_url,"mode":setting.mode})    
}

exports.saveLidarSetting=async (req,res)=> {
    console.log("POST Lidar")
    const newlidarurl=req.body.lidar_url
    const newmode=req.body.mode
    const setting=await Settings.findOne();
    const dataid=setting._id
    const updatedsetting=await Settings.findOneAndUpdate({_id:dataid},{$set:{ lidar_url:newlidarurl,mode:newmode}})
    const form = new FormData();
    form.append('mode', newmode)
    // const response = await axios.post('http://127.0.0.1:8000/update_mode',form)
    res.status(200).json({"data":updatedsetting})    
}

exports.getSpeedSettings=async (req,res)=>{
    const v_type=req.params.v_type
    const setting=await Settings.findOne();
    res.status(200).json({"speed":setting[v_type]})
}

exports.getProfileSettings=async (req,res)=>{
    const setting=await Settings.findOne();
    res.status(200).json(
        {
            "op_name":setting.op_name,
            "op_id":setting.op_id,
            "dept":setting.dept,
            "location":setting.location,
            "logo":setting.logo 
    })
}

exports.SaveProfileSettings=async (req,res)=>{
    const setting=await Settings.findOne();
    const dataid=setting._id
    var data=req.body
    console.log(data)
    const updatedsetting=await Settings.findOneAndUpdate({_id:dataid},{$set:data},{new: true})
    res.status(200).json(
        {
            "op_name":setting.op_name,
            "op_id":setting.op_id,
            "dept":setting.dept,
            "location":setting.location,
            "logo":setting.logo 
    })
}

exports.postSpeedSettings=async (req,res)=>{
    const v_type=req.params.v_type
    const newspeed=req.body.speed
    const kkey=v_type.toString()

    const setting=await Settings.findOne();
    const dataid=setting._id
    const updatedsetting=await Settings.findOneAndUpdate({_id:dataid},{$set:{[v_type]:newspeed}},{new: true})
    console.log(updatedsetting)
    // let ress=await axios.post("http://127.0.0.1:8000/update_speed_limit",{updatedsetting})

    res.status(200).json({"speed":updatedsetting[v_type]})
}