import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function getChatJournal(journal_id) {
  return requestHandler(
    AxiosInstance.get(`/chat/journal`, { params: { journal_id } })
  );
}
