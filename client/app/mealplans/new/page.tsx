"use client";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddMealList from "./AddMealList";
import { useMealsData } from "@/hooks/mealsHooks";
import Ingredients from "./Ingredients";
import { Meal, Ingredient } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateMealplan } from "@/hooks/menusHooks";
import { Loader2 } from "lucide-react";

type AMeal = Meal & {
	ingredients: AIngredient[];
};

type AIngredient = Ingredient & {
	ingredient: {
		id: string;
		name: string;
		categoryId: number;
		createdAt: string;
		createdBy: string;
		mealId: string;
	};
};

function NewMealplan() {
	const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
	const [error, setError] = useState<string>("");
	const meals = useMealsData();
	const createMealplan = useCreateMealplan();

	const handleAddMeal = (meal: Meal) => {
		setError("");
		setSelectedMeals([...selectedMeals, meal]);
	};

	const handleRemoveMeal = (meal: Meal) => {
		setError("");
		setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
	};

	const ingredientsList = useMemo(() => {
		// noooo idea how to fix this
		return selectedMeals.reduce((acc, meal: AMeal) => {
			return [...acc, ...meal.ingredients.map((i) => i.ingredient)];
		}, []);
	}, [selectedMeals]);

	if (!meals.data)
		return (
			<div className="w-full flex flex-row gap-6 justify-evenly min-h-[50vh]">
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.3] w-full h-28 rounded-md" />
				<Skeleton className="flex-[0.4] w-full h-[40vh] rounded-md" />
			</div>
		);

	const onSubmit = async () => {
		if (selectedMeals.length === 0) {
			setError("You need to select at least one meal");
			return;
		}
		await createMealplan.mutateAsync({
			meals: selectedMeals,
		});
	};

	return (
		<div>
			<div className="flex flex-col lg:flex-row gap-8  w-full min-h-[50vh]">
				<div className="w-full h-full xl:flex-[0.6] ">
					<AddMealList
						meals={meals?.data}
						onAddMeal={handleAddMeal}
						onRemoveMeal={handleRemoveMeal}
						selectedMeals={selectedMeals}
					/>
				</div>

				<div className="w-full h-full lg:flex-[0.4] lg:pl-4 sm:pt-7 lg:pt-0 pb-10 lg:pb-0">
					<Ingredients heading={true} ingredients={ingredientsList} />
				</div>
			</div>
			<div className="w-full flex justify-end">
				<div className="flex flex-col gap-2">
					{error && (
						<span className="text-red-400 text-sm">{error}</span>
					)}
					<div className="w-full flex justify-end gap-4">
						<a href="/home">
							<Button variant="secondary">Cancel</Button>
						</a>
						<Button
							disabled={createMealplan.isLoading}
							onClick={() => {
								onSubmit();
							}}
						>
							{createMealplan.isLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Mealplan
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewMealplan;
