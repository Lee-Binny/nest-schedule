import client from "./client";

export default {
  login: async (body) => {
    return await client.post('/auth', body);
  },
}