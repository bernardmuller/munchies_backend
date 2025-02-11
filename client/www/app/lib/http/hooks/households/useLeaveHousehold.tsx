import {InvalidateQueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import { leaveHousehold } from "../../client/households/leaveHousehold";

export default function useLeaveHousehold() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ["leave-household"],
    mutationFn: async () => {
      const token = await getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) =>
        t?.toString(),
      );
      return leaveHousehold({ accessToken: token! });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        ...keys.currentUserHouseholdDetails,
        ...keys.latestGrocerylistByUserId,
        ...keys.latestGrocerylistByHouseholdId,
      ] as InvalidateQueryFilters);
    },
  });
}
