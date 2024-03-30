var express=require("express")
var router=express.Router();

const {getAllRecords,getRecentRecords, createRecord, updateRecord, getRecordByID,updateEditState,updateValidatedState}=require('../controller/records')

router.get("/records",getAllRecords)
router.get("/recent",getRecentRecords)


router.post("/record",createRecord)

router.get("/record/:id",getRecordByID)
router.post("/record/:id",updateRecord)
router.put("/record/:id",updateRecord)

router.put("/record/:id/edit",updateEditState)
router.put("/record/:id/validate",updateValidatedState)

module.exports=router;