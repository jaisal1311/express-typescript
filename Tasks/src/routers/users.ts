import { Router } from "express";
import { User, UserType, UserModel } from "../models/user";
import { auth, IRequest } from "../middlewares/auth";

export const userRouter = Router();

userRouter.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send("404");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/user/me", auth, async (req: IRequest, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    res.send(500).send(error);
  }
});

userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post("/users/logout", auth, async (req: IRequest, res) => {
  try {
    req.user!.tokens = req.user!.tokens.filter((token) => token.token !== req.token!);
    req.user!.save();
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  const update: Array<keyof UserType> = Object.keys(req.body) as Array<
    keyof UserType
  >;
  //  as Array<keyof typeof User>;
  const allowedFields: string[] = ["password", "name", "email", "age"];

  const isValid = update.every((field: string) =>
    allowedFields.includes(field)
  );
  if (!isValid) {
    return res.status(400);
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("404");
    }
    update.forEach((field) => {
      user[field] = req.body[field] as never;
    });
    await user.save();

    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("404");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
