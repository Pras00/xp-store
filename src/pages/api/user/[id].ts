/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteData, updateData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { id } = req.query;
  const { data } = req.body;

  if (req.method === "PUT") {
    const token = req.headers.authorization?.split(' ')[1] || "";
    jwt.verify(token, process.env.NEXTAUTH_SECRET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await updateData("users", id as string, data, (result: boolean) => {
          if (result) {
            res.status(200).json({status: true, statusCode: 200, message: "Success"});
          } else {
            res.status(400).json({status: false, statusCode: 400, message: "Failed"});
          }
        });
      } else {
        res.status(401).json({status: false, statusCode: 401, message: "Unauthorized"});
      }
    });
  } else if (req.method === "DELETE") {
    const token = req.headers.authorization?.split(' ')[1] || "";
    jwt.verify(token, process.env.NEXTAUTH_SECRET || "", async (err: any, decoded: any) => {
      if (decoded && decoded.role === "admin") {
        await deleteData("users", id as string, (result: boolean) => {
          if (result) {
            res.status(200).json({status: true, statusCode: 200, message: "Success"});
          } else {
            res.status(400).json({status: false, statusCode: 400, message: "Failed"});
          }
        });
      } else {
        res.status(401).json({status: false, statusCode: 401, message: "Unauthorized"});
      }
    });
  } else {
    res.status(405).json({status: false, statusCode: 405, message: "Method not allowed"});
  }
} 