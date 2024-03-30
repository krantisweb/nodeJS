const config=require("../config");
const mongoose=require("mongoose")
const Records=require("../models/records")
const Settings=require("../models/settings")
const axios=require("axios")

//GET Records

exports.getAllRecords=async(req,res)=>{
    console.log("GET ALL RECORDS")
    const data=await Records.find().sort({rid: -1})
    const setting=await Settings.findOne();
    const lat=setting.lat
    const lon=setting.lon

    var final_data=[]
    for(var i=0;i<data.length;i++){
        let violationsk=[]
        for(var j=0;j<data[i].violations.length;j++)
        {
            violationsk.push(data[i].violations[j][0])
        }        
        var currdata={
            "rid":data[i].rid,
            "_id":data[i]._id,
            "type":data[i].plate.type?data[i].plate.type:"None",
            "vehicle_image":data[i].vehicle.image?data[i].vehicle.image:"None",
            "confidence":data[i].vehicle.confidence?data[i].vehicle.confidence:"None",
            "category":data[i].vehicle.category?data[i].vehicle.category:"None",
            "plate_image":data[i].plate.image?data[i].plate.image:"None",
            "confidence":data[i].plate.confidence?data[i].plate.confidence:"None",
            "ocr":data[i].plate.ocr?data[i].plate.ocr:"None",
            "original_image":data[i].original_image?data[i].original_image:"None",
            "plot_image":data[i].plot_image?data[i].plot_image:"None",
            "gif":data[i].gif?data[i].gif:"None",
            "created_at":data[i].created_at,
            "speed":data[i].speed?data[i].speed:"None",
            "distance":data[i].distance?data[i].distance:"None",
            "direction":data[i].direction?data[i].direction:"None",
            "violations":violationsk?violationsk:"None",
            "speedlimit":setting[`${data[i].vehicle.category.toLowerCase()}`]?setting[`${data[i].vehicle.category.toLowerCase()}`]:"None",
            "lat":data[i].lat?data[i].lat:lat,
            "lon":data[i].lon?data[i].lon:lon,
            "edited":data[i].edited,
            "validated":data[i].validated,
        }   
        final_data.push(currdata)
    }
    res.status(200).json({"data":final_data})
}
//GEt Recent Records

exports.getRecentRecords=async(req,res)=>{
    console.log("GET Recent RECORDS")
    const data=await Records.find().sort({created_at: -1}).limit(5)
    const setting=await Settings.findOne();
    const lat=setting.lat
    const lon=setting.lon

    var final_data=[]
    for(var i=0;i<data.length;i++){
        let violationsk=[]
        for(var j=0;j<data[i].violations.length;j++)
        {
            violationsk.push(data[i].violations[j][0])
        }     
        var currdata={
            "rid":data[i].rid,
            "_id":data[i]._id,
            "type":data[i].plate.type?data[i].plate.type:"None",
            "vehicle_image":data[i].vehicle.image?data[i].vehicle.image:"None",
            "confidence":data[i].vehicle.confidence?data[i].vehicle.confidence:"None",
            "category":data[i].vehicle.category?data[i].vehicle.category:"None",
            "plate_image":data[i].plate.image?data[i].plate.image:"None",
            "confidence":data[i].plate.confidence?data[i].plate.confidence:"None",
            "ocr":data[i].plate.ocr?data[i].plate.ocr:"None",
            "original_image":data[i].original_image?data[i].original_image:"None",
            "plot_image":data[i].plot_image?data[i].plot_image:"None",
            "gif":data[i].gif?data[i].gif:"None",
            "created_at":data[i].created_at,
            "speed":data[i].speed?data[i].speed:"None",
            "distance":data[i].distance?data[i].distance:"None",
            "direction":data[i].direction?data[i].direction:"None",
            "violations":violationsk?violationsk:"None",
            "speedlimit":data[i].speedlimit?data[i].speedlimit:"None",
            "lat":data[i].lat?data[i].lat:lat,
            "lon":data[i].lon?data[i].lon:lon,
            "op_name":data[i].op_name,
            "op_id":data[i].op_id,
            "dept":data[i].dept?data[i].dept:"None",
            "location":data[i].location,
            "edited":data[i].edited,
            "validated":data[i].validated,

        }
        final_data.push(currdata)
    }
    res.status(200).json({"data":final_data})
}

//Get Record by id 

exports.getRecordByID=async(req,res)=>{
    console.log("Get Record By ID")
    const recordId=req.params.id
    const data=await Records.findOne({"rid":recordId})

    const setting=await Settings.findOne();
    const lat=setting.lat
    const lon=setting.lon

    let violationsk=[]
        for(var j=0;j<data.violations.length;j++)
        {
            violationsk.push(data.violations[j][0])
        }   
    var currdata={
        "_id":data._id,
        "rid":data.rid,
        "type":data.plate.type?data.plate.type:"None",
        "vehicle_image":data.vehicle.image?data.vehicle.image:"None",
        "confidence":data.vehicle.confidence?data.vehicle.confidence:"None",
        "category":data.vehicle.category?data.vehicle.category:"None",
        "plate_image":data.plate.image?data.plate.image:"None",
        "confidence":data.plate.confidence?data.plate.confidence:"None",
        "ocr":data.plate.ocr?data.plate.ocr:"None",
        "original_image":data.original_image?data.original_image:"None",
        "plot_image":data.plot_image?data.plot_image:"None",
        "gif":data.gif?data.gif:"None",
        "created_at":data.created_at,
        "speed":data.speed?data.speed:"None",
        "distance":data.distance?data.distance:"None",
        "direction":data.direction?data.direction:"None",
        "violations":violationsk?violationsk:"None",
        "speedlimit":data.speedlimit?data.speedlimit:"None",
        "lat":data.lat?data.lat:lat,
        "lon":data.lon?data.lon:lon,
        "op_name":data.op_name,
        "op_id":data.op_id,
        "dept":data.dept,
        "location":data.location,
        "edited":data.edited,
        "validated":data.validated,
    }
     res.status(200).json({"data":currdata})
}
//Create Record
exports.createRecord=async(req,res)=>{
    console.log("Creating Record")
    const record=new Records(req.body)
    record.save((err,record)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Record Not Saved"
            })
        }
        res.json({record})

    })
}

//Update Record by ID

exports.updateRecord=async(req,res)=>{
    console.log("Update Record")
    const record_id=req.params['id']
    const new_ocr=req.body.ocr
    const new_lat=req.body.lat
    const new_lon=req.body.lon
    const new_dist=req.body.distance
    const new_direction=req.body.direction
    let new_violation=req.body.violations
    let new_type=req.body.type
    let data={"violations":new_violation,"distance":new_dist,"plate.ocr":new_ocr,"direction":new_direction,lat:new_lat,lon:new_lon,"plate.type":new_type}
    console.log(data)
    const r_record=await Records.findOneAndUpdate({rid:record_id},{$set:data},{ "new": true, "upsert": true },)
    // let res1=await axios.put(`http://127.0.0.1:7999/watcher/update_plot/${r_record.id}`)
    res.json(r_record)
}


exports.updateEditState=async(req,res)=>{
    console.log("Updating Edit State")
    const record_id=req.params['id']
    const r_record=await Records.findOneAndUpdate({rid:record_id},{$set:{edited:true}},{ "new": true, "upsert": true },)
    res.json(r_record)
}

exports.updateValidatedState=async(req,res)=>{
    console.log("Updating Validated State")
    const record_id=req.params['id']
    const r_record=await Records.findOneAndUpdate({rid:record_id},{$set:{validated:true}},{ "new": true, "upsert": true },)
    res.json(r_record)
}
