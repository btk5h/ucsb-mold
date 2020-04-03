import { NextApiHandler } from "next";
import { search } from "utils/curriculums";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await search(req.query);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  }

  res.statusCode = 405;
  res.end();
};

export default handler;
