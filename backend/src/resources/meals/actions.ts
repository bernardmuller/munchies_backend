import { db } from '../../db/db';
import {
  createNotFoundMessage,
  createSuccessMessage,
  getUuid,
} from '../../shared/utils';
import { MealModel } from '../../../prisma/zod';
import { getIngredients } from '../ingredients/actions';
import { NotFoundError } from '../../shared/errors';
import { Ingredient } from '@prisma/client';

export const createMeal = async (data: { id?: string; createdBy: string }) => {
  const mealData = { ...data, id: data.id || getUuid() };
  const res = await db.meal.create({ data: mealData });
  const newMeal = MealModel.parse(res);
  return newMeal;
};

export const getMeals = async () => {
  const rows = await db.meal.findMany({
    include: { ingredients: true },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return rows;
};

export const getMealsByUserId = async (id: string) => {
  if (!id) throw new Error('No user id provided');
  const rows = await db.meal.findMany({
    where: { createdBy: id },
    include: {
      ingredients: {
        include: { ingredient: true },
      },
    },
  });
  return rows;
};

export const getMeal = async (id: string) => {
  let uniqueMeal = await db.meal.findUnique({
    where: { id },
  });
  if (!uniqueMeal) throw new NotFoundError('Meal not found');

  const mealIngredients = await db.mealIngredient.findMany({
    where: { mealId: id },
    include: { ingredient: true },
  });

  return {
    ...uniqueMeal,
    ingredients: mealIngredients.map((ing) => {
      return { ...ing.ingredient, mealId: uniqueMeal?.id! };
    }),
  };
};

export const updateMeal = async (
  id: string,
  data: {
    name?: string;
    directions?: string;
    cuisine?: string;
    URL?: string;
    image?: string;
    prepTime?: number;
    cookTime?: number;
    readyIn?: number;
    rating?: string;
    notes?: string;
    updatedBy: string;
  },
) => {
  const meal = await getMeal(id);

  if (data.updatedBy !== meal.createdBy)
    throw new Error('You are not authorized to update this meal.');

  if (!meal) {
    throw new NotFoundError();
  }

  const updatedMealData = await db.meal.update({
    where: { id },
    data: {
      ...data,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const updatedMeal = MealModel.parse(updatedMealData);

  return updatedMeal;
};

export const deleteMeal = async (id: string) => {
  const user = await getMeal(id);
  if (!user) throw new Error('Meal not found');

  await db.meal.delete({
    where: {
      id,
    },
  });
  return createSuccessMessage();
};

export const deleteMeals = async () => {
  await db.meal.deleteMany();
};

export const addIngredientToMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const existingMealIngredient = await db.mealIngredient.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });

  // if (existingMealIngredient)

  // throw new Error('Ingredient already exists in meal.');

  await db.mealIngredient.create({
    data: {
      id: getUuid(),
      mealId,
      ingredientId,
    },
  });

  const mealIngredients = await db.mealIngredient.findMany();

  return createSuccessMessage();
};

export const removeIngredientFromMeal = async ({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const mealIngredient = await db.mealIngredient.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });
  await db.mealIngredient.delete({ where: { id: mealIngredient?.id } });

  return createSuccessMessage();
};

export const addQuantityToMealIngredient = async ({
  mealId,
  ingredientId,
  quantity,
}: {
  mealId: string;
  ingredientId: string;
  quantity: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const ingredient = await getIngredients({ filters: { id: ingredientId } });
  if (!ingredient) throw new NotFoundError('Ingredient not found.');

  const mealIngredient = await db.mealIngredient.findFirst({
    where: { AND: [{ mealId }, { ingredientId }] },
  });
  await db.mealIngredient.update({
    where: { id: mealIngredient?.id },
    data: { quantity },
  });

  return createSuccessMessage();
};

export const addDirectionToMeal = async ({
  mealId,
  direction,
}: {
  mealId: string;
  direction: string;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const directions = [...meal.directions, direction];

  await db.meal.update({
    where: { id: mealId },
    data: {
      directions: directions,
    },
  });

  return createSuccessMessage();
};

export const removeDirectionFromMeal = async ({
  mealId,
  directionIndex,
}: {
  mealId: string;
  directionIndex: number;
}) => {
  const meal = await getMeal(mealId);
  if (!meal) throw new NotFoundError('Meal not found.');

  const directions = meal.directions.filter(
    (_, index) => index !== directionIndex,
  );

  await db.meal.update({
    where: { id: mealId },
    data: {
      directions: directions,
    },
  });

  return createSuccessMessage();
};
