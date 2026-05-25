package models

type Test struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	SubjectID int    `json:"subject_id"`
}
