// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retriveData } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

{
  /* Typescript must define the type of the response */
}
type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await retriveData("products"); // this calling the retriveData function
  res.status(200).json({ status: true, statusCode: 200, data: data }); // this sending the data
}
