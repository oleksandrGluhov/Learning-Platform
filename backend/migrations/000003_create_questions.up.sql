CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    test_id INTEGER REFERENCES tests(id)
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    question_id INTEGER REFERENCES questions(id)
);