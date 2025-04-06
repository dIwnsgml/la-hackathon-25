import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function getJournal(journal_id) {
  return requestHandler(
    AxiosInstance.get(`/journals/journal`, { params: { journal_id } })
  );
}

export async function putJournal({ title }) {
  return requestHandler(AxiosInstance.put(`/journals/journal`, { title }));
}
