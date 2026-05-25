package models

type Answer struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	IsCorrect  bool   `json:"is_correct"`
	QuestionID int    `json:"question_id"`
}
