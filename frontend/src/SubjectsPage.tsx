import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Subject = {
  id: number
  title: string
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  async function loadSubjects() {
    const res = await fetch(
      'http://localhost:8080/subjects'
    )

    const data = await res.json()

    setSubjects(data)
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  return (
    <div className="app-container">
      <h1 className="title">Предмети</h1>

      <div className="subjects-list">
        {subjects.map((subject) => (
            <Link key={subject.id} to={`/subjects/${subject.id}`} className="subject-link">
              {subject.title}
            </Link>
        ))}
      </div>
    </div>
  )
}
