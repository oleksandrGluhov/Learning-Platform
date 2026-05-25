package main

import (
	"quiz-backend/db"
	"quiz-backend/handlers"
	"quiz-backend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.ConnectDB()

	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/tests", handlers.GetTests)
	r.POST("/tests", handlers.CreateTest)
	r.GET("/subjects", handlers.GetSubjects)
	r.GET("/subjects/:id/tests", handlers.GetTestsBySubject)
	r.GET("/tests/:id", handlers.GetTest)

	auth := r.Group("/auth")
	auth.POST("/register", handlers.Register)
	auth.POST("/login", handlers.Login)
	auth.GET("/me", middleware.AuthMiddleware(), handlers.Me)

	r.Run(":8080")
}
