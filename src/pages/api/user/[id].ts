import type { NextApiRequest, NextApiResponse } from "next";
import { deleteData } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { id } = req.query;
  
  if (req.method === "DELETE") {
    await deleteData("users", id as string, (result: boolean) => {
      if (result) {
        res.status(200).json({status: true, statusCode: 200, message: "Success"});
      } else {
        res.status(400).json({status: false, statusCode: 400, message: "Failed"});
      }
    });
  } else {
    res.status(405).json({status: false, statusCode: 405, message: "Method not allowed"});
  }
} 