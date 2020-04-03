import unfetch from "isomorphic-unfetch";
import qs from "qs";

export async function search(params: any): Promise<any> {
  const { apiKey = process.env.UCSB_API_KEY, ...other } = params;

  const queryParams = qs.stringify(other);
  const baseUrl =
    "https://api.ucsb.edu/academics/curriculums/v1/classes/search";
  const url = `${baseUrl}?${queryParams}`;

  const response = await unfetch(url, {
    headers: {
      "ucsb-api-key": apiKey,
    },
  });

  return response.json();
}
