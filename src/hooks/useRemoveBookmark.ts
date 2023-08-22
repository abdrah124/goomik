import { config } from "@/lib/config";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useGetMe from "./useGetMe";

export default function useRemoveBookmark(bookmarkId: string) {
  const me = useGetMe();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      axios
        .delete(`${config.baseWebUrl}/api/bookmark/${me?.id}/${bookmarkId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    onSuccess: (data, ctx) => {
      queryClient.invalidateQueries({ queryKey: ["libItems", me?.id] });
    },
  });

  return mutate;
}
