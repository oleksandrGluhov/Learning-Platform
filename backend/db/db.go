package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	connStr := "host=localhost port=5432 user=postgres password=password dbname=quiz_app sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	DB = db
}

// migrate -path migrations -database "postgres://postgres:password@localhost:5432/quiz_app?sslmode=disable" up
// migrate create -ext sql -dir migrations -seq create_questions
