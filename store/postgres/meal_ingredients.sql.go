// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: meal_ingredients.sql

package postgres

import (
	"context"

	"github.com/google/uuid"
)

const createMealIngredient = `-- name: CreateMealIngredient :exec
INSERT INTO meal_ingredients (meal_id, ingredient_id)
VALUES ($1, $2)
RETURNING id, meal_id, ingredient_id, createdat, createdby
`

type CreateMealIngredientParams struct {
	MealID       uuid.UUID
	IngredientID uuid.UUID
}

func (q *Queries) CreateMealIngredient(ctx context.Context, arg CreateMealIngredientParams) error {
	_, err := q.db.ExecContext(ctx, createMealIngredient, arg.MealID, arg.IngredientID)
	return err
}

const deleteMealIngredient = `-- name: DeleteMealIngredient :exec
DELETE FROM meal_ingredients
WHERE meal_id = $1 AND ingredient_id = $2
`

type DeleteMealIngredientParams struct {
	MealID       uuid.UUID
	IngredientID uuid.UUID
}

func (q *Queries) DeleteMealIngredient(ctx context.Context, arg DeleteMealIngredientParams) error {
	_, err := q.db.ExecContext(ctx, deleteMealIngredient, arg.MealID, arg.IngredientID)
	return err
}

const getMealIngredient = `-- name: GetMealIngredient :one

SELECT id, meal_id, ingredient_id, createdat, createdby FROM meal_ingredients
WHERE meal_id = $1 AND ingredient_id = $2
`

type GetMealIngredientParams struct {
	MealID       uuid.UUID
	IngredientID uuid.UUID
}

// -- name: GetMealIngredientsByUserId :many
// SELECT * FROM meal_ingredients
// WHERE meal_id IN (
//
//	SELECT meal_id FROM meals WHERE createdby = $1
//
// );
func (q *Queries) GetMealIngredient(ctx context.Context, arg GetMealIngredientParams) (MealIngredient, error) {
	row := q.db.QueryRowContext(ctx, getMealIngredient, arg.MealID, arg.IngredientID)
	var i MealIngredient
	err := row.Scan(
		&i.ID,
		&i.MealID,
		&i.IngredientID,
		&i.Createdat,
		&i.Createdby,
	)
	return i, err
}

const getMealIngredients = `-- name: GetMealIngredients :many
SELECT id, meal_id, ingredient_id, createdat, createdby FROM meal_ingredients
WHERE meal_id = $1
`

func (q *Queries) GetMealIngredients(ctx context.Context, mealID uuid.UUID) ([]MealIngredient, error) {
	rows, err := q.db.QueryContext(ctx, getMealIngredients, mealID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []MealIngredient
	for rows.Next() {
		var i MealIngredient
		if err := rows.Scan(
			&i.ID,
			&i.MealID,
			&i.IngredientID,
			&i.Createdat,
			&i.Createdby,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getMealIngredientsByIngredientId = `-- name: GetMealIngredientsByIngredientId :many
SELECT id, meal_id, ingredient_id, createdat, createdby FROM meal_ingredients
WHERE ingredient_id = $1
`

func (q *Queries) GetMealIngredientsByIngredientId(ctx context.Context, ingredientID uuid.UUID) ([]MealIngredient, error) {
	rows, err := q.db.QueryContext(ctx, getMealIngredientsByIngredientId, ingredientID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []MealIngredient
	for rows.Next() {
		var i MealIngredient
		if err := rows.Scan(
			&i.ID,
			&i.MealID,
			&i.IngredientID,
			&i.Createdat,
			&i.Createdby,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getMealIngredientsByMealId = `-- name: GetMealIngredientsByMealId :many
SELECT id, meal_id, ingredient_id, createdat, createdby FROM meal_ingredients
WHERE meal_id = $1
`

func (q *Queries) GetMealIngredientsByMealId(ctx context.Context, mealID uuid.UUID) ([]MealIngredient, error) {
	rows, err := q.db.QueryContext(ctx, getMealIngredientsByMealId, mealID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []MealIngredient
	for rows.Next() {
		var i MealIngredient
		if err := rows.Scan(
			&i.ID,
			&i.MealID,
			&i.IngredientID,
			&i.Createdat,
			&i.Createdby,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
