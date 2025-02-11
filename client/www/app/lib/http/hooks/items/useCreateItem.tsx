import {InvalidateQueryFilters, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/tanstack-start";
import {CreateItem, createItem} from "@/lib/http/client/items/createItem";
import {useToast} from "@/components/ui/use-toast";
import { GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

interface CreateItemWithIngredientDetails extends CreateItem {
  id: string;
  name: string;
  categoryId: string;
}

export default function useCreateItem(grocerylistId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: keys.createItem as string[],
    mutationFn: async (data: CreateItem) => {
      if(!grocerylistId) return;
      const token = await getToken({ template: import.meta.env.VITE_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
      return createItem({
        data,
        grocerylistId,
        accessToken: token!
      });
    },
    onMutate: async (item: CreateItemWithIngredientDetails) => {
      await queryClient.cancelQueries([
        ...keys.latestGrocerylistByUserId,
        ...keys.latestGrocerylistByHouseholdId,
        ...keys.getGrocerylistById(grocerylistId)
      ] as QueryFilters);

      const prev = queryClient.getQueryData(keys.getGrocerylistById(grocerylistId)) as GroceryList;
      if (prev && prev.items) {
        queryClient.setQueryData(keys.getGrocerylistById(grocerylistId), {
          ...prev,
          items: prev.items.concat({
            item_id: Math.random().toString(),
            check: false,
            name: item.name,
            ingredient_id: item.ingredientId,
            category_id: item.categoryId,
          }),
        });
      }

      return { prev };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        ...keys.latestGrocerylistByUserId,
        ...keys.latestGrocerylistByHouseholdId,
       ...keys.getGrocerylistById(grocerylistId)
      ] as InvalidateQueryFilters);
    },
  });
}
