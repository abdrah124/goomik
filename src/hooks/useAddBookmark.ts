import { config } from "@/lib/config";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useAddBookmark() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: { comicId: string; userId: string }) =>
      axios
        .post(`${config.baseWebUrl}/api/bookmark`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    onSuccess: (data, ctx) => {
      queryClient.invalidateQueries(["libItems", ctx.userId]);
    },
  });

  return mutate;
}
