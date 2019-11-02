import { APIGatewayEvent } from "aws-lambda"

import { search } from "../api/curriculums"

export async function handler(event: APIGatewayEvent) {
  const response = await search(event.queryStringParameters)

  return {
    body: JSON.stringify(response)
  }
}
