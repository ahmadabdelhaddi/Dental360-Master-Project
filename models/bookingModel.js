const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    service: { type: String, require: true },
    selectedDate: { type: String, require: true },
    selectedHour: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    //   status: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", bookingSchema);



/* 





user regitster : 
email
password 
role : user 
appointments : [
{
fullname :{type:String , require:true },

//حجز واستشارة
service :{type:String ,enum:["استشارة","حجز"], require:true 
default :"حجز"
}

 selectedDate: {
    type: Date,
    required: true,
    default: Date.now // Set the default value to the current date and time
  }
  
  selectedHour: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    status: { type: String, require: true ,default:"false"},

}

]


*/