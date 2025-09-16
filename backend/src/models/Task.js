import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
        completedAt: {
            type: Date,
            default: null,
        },

    },
    {
        timestamps: true,
    }
);
const Task = mongoose.model('Task', taskSchema);
export default Task;