var express=require("express")
var router=express.Router();
const {getRstpSetting,saveRstpSetting,getProfileSettings,SaveProfileSettings,getLidarSetting, saveLidarSetting, getSpeedSettings, testSetting, postSpeedSettings}=require("../controller/settings") 

router.get("/rstpconfig",getRstpSetting)
router.post("/rstpconfig",saveRstpSetting)

router.get("/lidarconfig",getLidarSetting)
router.post("/lidarconfig",saveLidarSetting)

router.get("/speed/:v_type",getSpeedSettings)
router.post("/speed/:v_type",postSpeedSettings)

router.get("/profile",getProfileSettings)
router.post("/profile",SaveProfileSettings)


router.get("/setsetting",testSetting)
module.exports=router;