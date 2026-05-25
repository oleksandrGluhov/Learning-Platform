package models

type Question struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	TestID int    `json:"test_id"`
}
