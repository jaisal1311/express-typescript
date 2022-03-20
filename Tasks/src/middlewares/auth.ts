import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User, UserType } from "../models/user";

export interface IRequest extends Request {
  user?: UserType;
  token?: string;
}

export const auth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("auth middleware");
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const decode = jwt.verify(
      token!,
      "thisismytaskmanagerapi"
    ) as jwt.JwtPayload;
    console.log(decode);
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.token = token
    req.user = user;
    next();
  } catch (error) {
    return res.send(401).send({ error: "401 | Authentication Error" });
  }
};
