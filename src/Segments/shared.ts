//Utils
import { queryBuilder } from "../Utils/functions";

export const handleFetch = async (
  url: string,
  name: string,
  params: { country?: string; client?: string; clientType?: string }
) => {
  try {
    const query = queryBuilder({
      name: name,
      country: params.country,
      client: params.client,
      clientType: params.clientType
    });

    const response = await fetch(`${url}?${query}`, {
      method: "GET"
    });

    const { segment } = await response.json();
    const show = segment.length > 0;

    return {
      segment,
      show,
      loading: false
    };
  } catch (e) {
    throw e;
  }
};
