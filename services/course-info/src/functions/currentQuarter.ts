import { APIGatewayEvent } from "aws-lambda"

import { currentQuarter } from "../api/quartercalendar"

export async function handler(event: APIGatewayEvent) {
  const response = await currentQuarter()

  return {
    body: JSON.stringify(response),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
}
