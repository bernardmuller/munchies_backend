// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: users.sql

package postgres

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users(id, clerk_id, email, firstname, lastname, role_id, image, status, updatedat)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())
RETURNING id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id
`

type CreateUserParams struct {
	ID        uuid.UUID
	ClerkID   string
	Email     string
	Firstname sql.NullString
	Lastname  sql.NullString
	RoleID    uuid.UUID
	Image     sql.NullString
	Status    sql.NullString
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.ID,
		arg.ClerkID,
		arg.Email,
		arg.Firstname,
		arg.Lastname,
		arg.RoleID,
		arg.Image,
		arg.Status,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}

const getAllUsers = `-- name: GetAllUsers :many
SELECT id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id FROM users
`

func (q *Queries) GetAllUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.ClerkID,
			&i.Email,
			&i.Firstname,
			&i.Lastname,
			&i.RoleID,
			&i.Image,
			&i.Status,
			&i.Createdat,
			&i.Updatedat,
			&i.HouseholdID,
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

const getUserByClerkId = `-- name: GetUserByClerkId :one
SELECT id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id FROM users
WHERE clerk_id = $1
`

func (q *Queries) GetUserByClerkId(ctx context.Context, clerkID string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByClerkId, clerkID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id FROM users 
WHERE email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id FROM users 
WHERE id = $1
`

func (q *Queries) GetUserById(ctx context.Context, id uuid.UUID) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}

const updateUser = `-- name: UpdateUser :one
UPDATE users
SET id = $1, clerk_id = $2, email = $3, firstname = $4, lastname = $5, role_id = $6, image = $7, status = $8, updatedat = now()
WHERE id = $1
RETURNING id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id
`

type UpdateUserParams struct {
	ID        uuid.UUID
	ClerkID   string
	Email     string
	Firstname sql.NullString
	Lastname  sql.NullString
	RoleID    uuid.UUID
	Image     sql.NullString
	Status    sql.NullString
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.ID,
		arg.ClerkID,
		arg.Email,
		arg.Firstname,
		arg.Lastname,
		arg.RoleID,
		arg.Image,
		arg.Status,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}

const updateUserHouseholdId = `-- name: UpdateUserHouseholdId :one
UPDATE users
SET household_id = $2
WHERE id = $1
RETURNING id, clerk_id, email, firstname, lastname, role_id, image, status, createdat, updatedat, household_id
`

type UpdateUserHouseholdIdParams struct {
	ID          uuid.UUID
	HouseholdID uuid.NullUUID
}

func (q *Queries) UpdateUserHouseholdId(ctx context.Context, arg UpdateUserHouseholdIdParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUserHouseholdId, arg.ID, arg.HouseholdID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.ClerkID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.RoleID,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.HouseholdID,
	)
	return i, err
}
