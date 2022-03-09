import client from "./client";

export default {
  createSchedule: async (body) => {
    return await client.post('/schedule', body);
  },
  updateSchedule: async (params, body) => {
    return await client.put(`/schedule/${params.groupId}`, body);
  },
  deleteSchedule: async (params) => {
    return await client.delete(`/schedule/${params.scheduleId}`);
  },
}