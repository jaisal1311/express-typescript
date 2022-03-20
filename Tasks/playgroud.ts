import "./src/db/mongoose";
import { Task } from "./src/models/task";

// Task.findByIdAndDelete("622da31ec563537201bfbfcb")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ complete: false });
//   })
//   .then((count) => console.log(count))
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id: string) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ complete: false });
  return count;
};

deleteTaskAndCount("622f72bc50533ce4ce5af956").then((count) =>
  console.log(count)
);
