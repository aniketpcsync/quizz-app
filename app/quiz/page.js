'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizListPage() {
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

    // Add QuizList here for just quiz 
    useEffect(() => {
        fetch('/api/quiz').then((res) => res.json()).then((data) => {
            setQuizzes(data)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">Choose a Quiz</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {loading ? <div> Loading ... </div> :
                        quizzes.map((value, index) => {
                            return (
                                <Link key={index} href={`quiz/${value.id}`} >
                                    <div className="p-6 w-64 h-32 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
                                        <h2 className="text-xl font-semibold text-gray-700">{value.title}</h2>
                                        <p className="text-sm text-gray-500 mt-2">Begin Your Quiz !</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}