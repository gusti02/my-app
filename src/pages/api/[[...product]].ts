// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retriveData, retriveDataById } from "@/utils/db/service";
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
  {
    /* this calling the retriveDataById function will get product detauls by id */
  }
  if (req.query.product![1]) {
    const data = await retriveDataById("products", req.query.product![1]); // this calling the retriveDataById function
    res.status(200).json({ status: true, statusCode: 200, data: data });
  }

  const data = await retriveData("products"); // this calling the retriveData function
  res.status(200).json({ status: true, statusCode: 200, data: data }); // this sending the data
}
