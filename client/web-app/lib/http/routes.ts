const apiRoutes = {
  getAllCategories: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;
  },
  ingredients: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients`;
  },
  deleteIngredient: (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients/${id}`;
  },
  getCurrentUserHouseholdDetails: () => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/households/current`;
  },
};

export default apiRoutes;
