import client from "./client";

export default {
  createMember: async (body) => {
    return await client.post('/member', body);
  },
  getOneMember: async (params) => {
    return await client.get(`/member/${params.groupId}`);
  },
  updateMember: async (body) => {
    return await client.put(`/member/`, body);
  },
  updateMemberGrade: async (body) => {
    return await client.put(`/member/grade`, body);
  },
  exitMember: async (params) => {
    return await client.delete(`/member/${params.groupId}`);
  },
}