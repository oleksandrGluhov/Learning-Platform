# 📚 Learning Space

Освітня платформа для проходження тестів з різних предметів. Пет-проект з адмін панеллю.

> 🚧 **Demo — coming soon**

---

## 🛠 Технології

**Backend**
- Go + Gin
- PostgreSQL
- JWT авторизація
- golang-migrate

**Frontend**
- React + TypeScript
- React Router
- Vite

---

## ⚙️ Запуск локально

### Вимоги
- Go 1.21+
- Node.js 18+
- PostgreSQL

### Backend

```bash
cd backend
cp .env.example .env   # заповни змінні
go mod tidy
go run main.go
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Міграції

```bash
migrate -path backend/migrations -database "postgres://USER:PASSWORD@localhost:5432/DB?sslmode=disable" up
```

---

## 📁 Структура проекту

```
learning-space/
  backend/
    db/           # підключення до БД
    handlers/     # обробники запитів
    middleware/   # JWT middleware
    models/       # структури даних
    migrations/   # міграції БД
    main.go
  frontend/
    src/
      pages/      # сторінки
      context/    # AuthContext
```

---

## 🔌 API

| Метод | Ендпоінт | Опис |
|-------|----------|------|
| POST | `/auth/register` | Реєстрація |
| POST | `/auth/login` | Вхід |
| GET | `/auth/me` | Поточний юзер |
| GET | `/subjects` | Список предметів |
| GET | `/subjects/:id/tests` | Тести предмету |
| GET | `/tests/:id` | Тест з питаннями |

---

## 🔐 Ролі

| Роль | Доступ |
|------|--------|
| `user` | Проходження тестів |
| `admin` | Адмін панель, керування контентом |

---

## 📬 Контакт

Є питання або пропозиції — створюй [Issue](../../issues) або пиши в PR.