import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function getJournals() {
  return requestHandler(AxiosInstance.get(`/journals`));
}

export async function getJournal(journal_id) {
  return requestHandler(
    AxiosInstance.get(`/journals/journal`, { params: { journal_id } })
  );
}

export async function putJournal({ title }) {
  return requestHandler(AxiosInstance.put(`/journals/journal`, { title }));
}

export async function patchJournal({ journal_id, title, contents }) {
  return requestHandler(
    AxiosInstance.patch(`/journals/journal`, { journal_id, title, contents })
  );
}

export async function deleteJournal(journal_id) {
  return requestHandler(
    AxiosInstance.delete(`/journals/journal`, { journal_id })
  );
}
