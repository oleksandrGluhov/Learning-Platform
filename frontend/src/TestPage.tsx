import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Answer = {
  id: number
  title: string
  is_correct: boolean
}

type Question = {
  id: number
  title: string
  answers: Answer[]
}

type Test = {
  id: number
  title: string
  questions: Question[]
}

export default function TestPage() {
  const { id } = useParams()

  const [test, setTest] = useState<Test | null>(null)

  const [selectedAnswers, setSelectedAnswers] =
    useState<Record<number, number>>({})

  async function loadTest() {
    const res = await fetch(
      `http://localhost:8080/tests/${id}`
    )
    const data = await res.json()
    console.log(data)

    setTest(data)
  }

  useEffect(() => {
    loadTest()
  }, [id])

  function selectAnswer(
    questionId: number,
    answerId: number,
  ) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  if (!test) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{test.title}</h1>

      {test.questions.map((question) => (
        <div
          key={question.id}
          style={{
            marginBottom: 30,
          }}
        >
          <h3>{question.title}</h3>

          {question.answers.map((answer) => {
            const selected =
              selectedAnswers[question.id] === answer.id

            let background = ''

            if (selected) {
              background = answer.is_correct
                ? 'lightgreen'
                : '#ffb3b3'
            }

            return (
              <div
                key={answer.id}
                style={{
                  marginBottom: 10,
                }}
              >
                <button
                  onClick={() =>
                    selectAnswer(
                      question.id,
                      answer.id,
                    )
                  }
                  style={{
                    padding: '10px 15px',
                    background,
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                >
                  {answer.title}
                </button>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}