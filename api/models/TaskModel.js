import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", taskSchema);
