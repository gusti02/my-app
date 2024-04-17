{
  /* This is Incremental Static Regeneration (ISR) and will trigger revalidation 
if the end point is changed */
}
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.token !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res
      .status(401)
      .json({ revalidated: false, message: "Invalid token" });
  }
  if (req.query.data === "product") {
    try {
      await res.revalidate("/product/static");
      return res.json({ revalidated: true });
    } catch (error) {
      return res.status(500).send({ revalidated: false });
    }
  }
  return res.json({
    revalidated: false,
    message: "Select Your Data First",
  });
}
