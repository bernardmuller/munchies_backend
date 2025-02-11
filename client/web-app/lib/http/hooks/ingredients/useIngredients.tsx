import { useQuery } from "@tanstack/react-query";
import {
  getAllIngredients,
  type Ingredient,
} from "@/lib/http/client/ingredients/getAllIngredients";
import { keys } from "@/lib/http/keys";
import { useAuth } from "@clerk/nextjs";

type Props = {
  initialData: Ingredient[];
};

export default function useIngredients({ initialData }: Props) {
  const { getToken } = useAuth();
  const token = getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) => t?.toString());
  return useQuery({
    queryKey: keys.ingredients,
    queryFn: async () => {
      const response = await getAllIngredients((await token) as string);
      if (!response.data) return initialData;
      return response.data;
    },
    initialData,
    enabled: !!token,
  });
}
