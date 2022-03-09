import client from "./client";

export default {
  findAllUsers: async () => {
    return await client.get('/user');
  },
  findOneUser: async (params) => {
    return await client.get(`/user/${params.id}`);
  },
  createUser: async (body) => {
    return await client.post("/user", body);
  },
  updateUserNickname: async (body) => {
    return await client.put(`/user/`, body);
  },
  deleteUser: async () => {
    return await client.delete(`/user`);
  }
}