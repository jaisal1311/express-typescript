import { model, Schema } from "mongoose";

interface Task {
  description: string;
  complete?: boolean;
}

const taskSchema = new Schema<Task>({
  description: { type: String, trim: true, required: true },
  complete: { type: Boolean, default: false },
});

export const Tasks = model("tasks", taskSchema);
