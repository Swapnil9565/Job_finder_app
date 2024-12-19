const mongoose = require("mongoose");

const jobSchema =mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoUrl:{
    type:String
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum:["Full Time","Part Time","Internship","Freelance"]
  },
  workMode: {
    type: String,
    required: true,
    enum:["Remote","On-Site","Hybrid"]
  },
  location: {
    type: String,
    required: true
  },
  jobDesc: {
    type: String,
    required: true
  },
  aboutCompany: {
    type: String,
    required: true
  },
  skills:{
    type:Array,
    required:true
  },
  information: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'users',
    required:true
    }
});


const jobModel=mongoose.model("jobs",jobSchema);

module.exports=jobModel;
