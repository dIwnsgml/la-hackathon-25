import { getJournal } from "@/apis/journalApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

function useJournal(journal_id) {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: ["useJournal", journal_id],
    queryFn: () => getJournal(journal_id),
    staleTime: 1000 * 60 * 10,
    enabled: !!journal_id,
    select: (response) => response?.data?.journal || false,
  });

  const {
    data: journalData,
    refetch: journalRefetch,
    isLoading: journalIsLoading,
    error: journalError,
  } = queryResult;

  const clearJournalData = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["useJournal", journal_id] });
  }, [queryClient, journal_id]);

  return {
    journalData,
    journalRefetch,
    journalError,
    journalIsLoading,
    clearJournalData,
    ...queryResult,
  };
}

export default useJournal;
