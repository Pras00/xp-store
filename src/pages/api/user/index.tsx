import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveData } from "@/lib/firebase/service";
import { User } from "@/types/user";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users") as User[];
    const data = users.map((user: User) => {
      delete user.password;
      return user;
    });
    res.status(200).json({status: true, statusCode: 200, message: "Success", data});
  } else {
    res.status(405).json({status: false, statusCode: 405, message: "Method not allowed"});
  }
}
