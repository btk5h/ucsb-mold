import { NextApiHandler } from "next";
import { search } from "utils/curriculums";

type UserQuery = {
  quarter: string;
  subjectArea: string;
};

function userQueryToAPIQuery(query: UserQuery) {
  return {
    quarter: query.quarter,
    subjectCode: query.subjectArea,
  };
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await search(userQueryToAPIQuery(req.query as UserQuery));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  }

  res.statusCode = 405;
  res.end();
};

export default handler;
