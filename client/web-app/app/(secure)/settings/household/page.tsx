import HouseholdManagement from "./Household";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentUserHouseholdDetails } from "@/lib/http/client/households/getCurrentUserHouseholdDetails";

export default async function HouseholdPage() {
  const { getToken } = auth();
  const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE ?? "default" }).then((t) =>
    t?.toString(),
  );

  if (!token) {
    redirect(`/sign-in`);
  }

  const household = await getCurrentUserHouseholdDetails(token!);

  if (!household.ok && household.status >= 500) {
    redirect("/something-went-wrong");
  }

  return <HouseholdManagement household={household.data} />;
}
