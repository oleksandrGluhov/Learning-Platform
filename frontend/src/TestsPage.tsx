import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Test = {
  id: number
  title: string
}

export default function TestsPage() {
  const { id } = useParams()

  const [tests, setTests] = useState<Test[]>([])

  async function loadTests() {
    const res = await fetch(
      `http://localhost:8080/subjects/${id}/tests`
    )

    const data = await res.json()

    setTests(data)
  }

  useEffect(() => {
    loadTests()
  }, [id])

  return (
    <div style={{ padding: 20 }}>
      <h1>Tests</h1>

      <ul>
        {tests.map((test) => (
            <Link key={test.id} to={`/tests/${test.id}`}>
              {test.title}
            </Link>
        ))}
      </ul>
    </div>
  )
}