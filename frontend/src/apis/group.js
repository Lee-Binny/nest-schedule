import client from "./client";

export default {
  createGroup: async (body) => {
    return await client.post('/group', body);
  },
  getMyGroups: async () => {
    return await client.get('/group');
  },
  searchGroup: async (params) => {
    return await client.get(`/group/${params.name}`);
  },
  getSchedules: async (params) => {
    return await client.get(`/group/schedule/${params.groupId}`);
  },
  getMembers: async (params) => {
    return await client.get(`/group/members/${params.groupId}`);
  },
  updateGroup: async (params, body) => {
    return await client.put(`/group/${params.groupId}`, body);
  },
  deleteGroup: async (params) => {
    return await client.post(`/group/${params.groupId}`);
  },
}