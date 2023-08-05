import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  courseId:{
    type:String,
    required:true,
  },
  img:{
    type:String,
    required:false,
  },
  title:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  tutorId:{
    type:String,
    required:true,
  },
  studentId:{
    type:String,
    required:true,
  },
  isCompleted:{
    type:Boolean,
    required:false,
  },
  payment_intent:{
    type:String,
    required:true,
  },
  isFinished:{
    type:Boolean,
  }
  
},{
    timestamps:true
});

export default mongoose.model("Order",orderSchema)