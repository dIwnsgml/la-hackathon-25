import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function postAIJournal(journal) {
  return requestHandler(AxiosInstance.post(`/ai/journal`, { journal }));
}
