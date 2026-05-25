package handlers

import (
	"net/http"
	"os"
	"time"

	"quiz-backend/db"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

type RegisterInput struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type User struct {
	ID           int    `json:"id"`
	Login        string `json:"login"`
	Role         string `json:"role"`
	PasswordHash string `json:"-"` // не повертати в JSON
}

func Register(c *gin.Context) {
	var input RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "login і password обовязкові"})
		return
	}

	// хешуємо пароль
	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "помилка сервера"})
		return
	}

	var user User

	err = db.DB.QueryRow(
		"INSERT INTO users (login, password_hash, role) VALUES ($1, $2, 'user') RETURNING id, login, role",
		input.Login,
		string(hash),
	).Scan(&user.ID, &user.Login, &user.Role)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "логін вже зайнятий"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

func Login(c *gin.Context) {
	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "login і password обовязкові"})
		return
	}

	var user User

	err := db.DB.QueryRow(
		"SELECT id, login, role, password_hash FROM users WHERE login = $1",
		input.Login,
	).Scan(&user.ID, &user.Login, &user.Role, &user.PasswordHash)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "невірний логін або пароль"})
		return
	}

	// перевіряємо пароль
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "невірний логін або пароль"})
		return
	}

	// генеруємо JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "помилка сервера"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user":  user,
	})
}

func Me(c *gin.Context) {
	userID, _ := c.Get("user_id")
	role, _ := c.Get("role")

	c.JSON(http.StatusOK, gin.H{
		"user_id": userID,
		"role":    role,
	})
}
