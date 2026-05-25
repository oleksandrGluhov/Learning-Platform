package models

type QuestionResponse struct {
	ID      int      `json:"id"`
	Title   string   `json:"title"`
	Answers []Answer `json:"answers"`
}

type TestResponse struct {
	ID        int                `json:"id"`
	Title     string             `json:"title"`
	Questions []QuestionResponse `json:"questions"`
}
