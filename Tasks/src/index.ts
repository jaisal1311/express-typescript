import express from "express";
import "./db/mongoose";
import { userRouter } from "./routers/users";
import { taskRouter } from "./routers/tasks";

const app = express();

// app.use((req, res, next) => {})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter)
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ rse: "Response" });
});

app.listen(port, () => console.log("Server up on " + port.toString()));
