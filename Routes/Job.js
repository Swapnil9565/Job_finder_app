const express=require("express");
const jobModel=require("../models/jobModel");
const authUser=require("../middlewares/authenticate");
const router=express.Router();

// Create request for creating job
router.post("/create",authUser,async (req,res)=>{
    const {companyName,position,salary,jobType,workMode}=req.body;
    const user=req.user;  //This will contain the user object from the decoded JWT token
    try {
      await jobModel.create({
         companyName,
         position,
         salary,
         jobType,
         workMode,
         createdBy:user.id  //Storing id of user who created job
       })
       res.status(200).json({message:"Job created Successfully"});
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Something went wrong while creating job"})
    }
})

//Delete Request for deleting job
router.delete("/delete/:jobId",authUser,async (req,res)=>{
  // Check job is exist or not
  const isJobExist=await jobModel.findById({_id:req.params.jobId});
  if(!isJobExist){
       return res.status(404).json({message:"Job not found"});
  }
  // Getting user id who created job
  const userID=req.user.id;
  
  //Check if the person who created the job is the same person
  if(userID!==isJobExist.createdBy.toString()){
     return res.status(401).json({message:"You are not authorized to delete these job"})
  }
  await jobModel.deleteOne({_id:req.params.jobId});
  return res.status(200).json({ message: "Job deleted successfully" });
})

//Put request for Updating job
router.put("/update/:jobId",authUser,async(req,res)=>{
    const {companyName,position,salary,jobType,workMode}=req.body;
    const job=await jobModel.findById({_id:req.params.jobId});
    if(!job){
      return res.status(404).json({message:"Job not found"});
    }
    const userID=req.user.id;
    if(userID!==job.createdBy.toString()){
      return res.status(403).json({message:"You are not authorized to update these job"})
    }
    await jobModel.findByIdAndUpdate({_id:req.params.jobId},{
      companyName,
      position,
      salary,
      jobType,
      workMode
    })
    res.status(200).json({message:"Job Updated Successfully"});
})
module.exports=router;