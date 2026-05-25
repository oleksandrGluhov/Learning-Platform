package handlers

import (
	"net/http"

	"quiz-backend/models"

	"github.com/gin-gonic/gin"

	"quiz-backend/db"
)

func GetSubjects(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, title FROM subjects")

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	defer rows.Close()

	var subjects []models.Subject

	for rows.Next() {
		var subject models.Subject

		rows.Scan(&subject.ID, &subject.Title)

		subjects = append(subjects, subject)
	}

	c.JSON(200, subjects)
}

func GetTests(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, title FROM tests")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	defer rows.Close()

	var tests []models.Test

	for rows.Next() {
		var test models.Test

		rows.Scan(&test.ID, &test.Title)

		tests = append(tests, test)
	}

	c.JSON(http.StatusOK, tests)
}

func CreateTest(c *gin.Context) {
	var test models.Test

	if err := c.BindJSON(&test); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := db.DB.QueryRow(
		"INSERT INTO tests(title) VALUES($1) RETURNING id",
		test.Title,
	).Scan(&test.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, test)
}

func GetTestsBySubject(c *gin.Context) {
	subjectID := c.Param("id")

	rows, err := db.DB.Query(
		"SELECT id, title, subject_id FROM tests WHERE subject_id = $1",
		subjectID,
	)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	defer rows.Close()

	var tests []models.Test

	for rows.Next() {
		var test models.Test

		rows.Scan(
			&test.ID,
			&test.Title,
			&test.SubjectID,
		)

		tests = append(tests, test)
	}

	c.JSON(200, tests)
}

func GetTest(c *gin.Context) {
	id := c.Param("id")

	var test models.TestResponse

	err := db.DB.QueryRow(
		"SELECT id, title FROM tests WHERE id = $1",
		id,
	).Scan(
		&test.ID,
		&test.Title,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Test not found",
		})
		return
	}

	questionRows, err := db.DB.Query(
		"SELECT id, title FROM questions WHERE test_id = $1",
		id,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	defer questionRows.Close()

	questions := make([]models.QuestionResponse, 0)

	for questionRows.Next() {
		var question models.QuestionResponse

		questionRows.Scan(
			&question.ID,
			&question.Title,
		)

		answerRows, err := db.DB.Query(
			"SELECT id, title, is_correct, question_id FROM answers WHERE question_id = $1",
			question.ID,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		answers := make([]models.Answer, 0)

		for answerRows.Next() {
			var answer models.Answer

			answerRows.Scan(
				&answer.ID,
				&answer.Title,
				&answer.IsCorrect,
				&answer.QuestionID,
			)

			answers = append(answers, answer)
		}

		answerRows.Close()

		question.Answers = answers
		questions = append(questions, question)
	}

	test.Questions = questions

	c.JSON(http.StatusOK, test)
}
