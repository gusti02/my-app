// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // check if method is POST and then send response
  // if not allowed to access API
  if (req.method === "POST") {
    {
      await signUp(req.body, (result: { status: boolean; message: string }) => {
        if (result.status) {
          res
            .status(200)
            .json({ status: result.status, message: result.message });
        } else {
          res
            .status(400)
            .json({ status: result.status, message: result.message });
        }
      });
    }
  } else {
    res.status(405).json({ status: false, message: "Method Not Allowed" });
  }
}
