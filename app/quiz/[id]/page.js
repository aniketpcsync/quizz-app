"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Quiz() {

    const { id } = useParams()
    const [quiz, setQuiz] = useState(null)
    const [selectedOption, setSelectedOption] = useState({})

    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    async function getQuiz() {
        try {
            const res = await fetch(`/api/quiz?id=${id}`)
            if (!res.ok) throw new Error("Failed to fetch quiz Data")
            const data = await res.json()
            console.log(data)
            setQuiz(data)
        } catch (error) {
            console.error("Error Fetching Quiz:", error)
        }
    }
    useEffect(() => {
        getQuiz()
    }, [id])


    function selectOption(id, selected) {
        setSelectedOption({ ...selectedOption, [id]: selected })
    }

    async function submitQuiz() {

        try {
            const res = await fetch(`/api/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quizId: id,
                    answers: selectedOption
                })
            })

            if (!res.ok) throw new Error("Failed to submit Quiz")

            const result = await res.json()
            setScore(result.score)
            setSubmitted(true)

            setTimeout(() => {
                setQuiz(null)
                setSelectedOption({})
                setScore(null)
                setSubmitted(false)
                getQuiz()
            }, 10000)
        } catch (error) {
            throw new Error("Error Occured")
        }

        console.log(selectedOption)
    }


    if (!quiz) return <p className="text-center mt-10">Loading ... !</p>

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black py-4">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">
                    {quiz.title}
                </h1>

                {
                    submitted ? (
                        <div className="text-center py-8 bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-500 rounded-lg shadow-lg mb-8">
                            <h2 className="text-4xl font-extrabold text-green-800 mb-4">🎉 Success!</h2>
                            <p className="text-xl text-green-700 font-medium">You have successfully submitted the quiz.</p>
                            <p className="mt-4 text-2xl font-bold">
                                Your Score: <span className="text-green-900 text-4xl font-extrabold underline">{score}</span>
                            </p>
                        </div>
                    ) : (
                        quiz.questions.map((question, Qindex) => {
                            return (
                                <div key={Qindex} className="mb-6 bg-white p-4 shadow-md border rounded-md">
                                    <div className="text-lg font-medium mb-4">{Qindex + 1}. {question.question}</div>
                                    <ul>
                                        {question.options.map((option, Oindex) => {
                                            return (
                                                <li key={Oindex} className="mb-2" >
                                                    <label className={`flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-100 ${selectedOption[Qindex] === Oindex ? 'bg-gray-100' : ''}`}>
                                                        <input type="radio"
                                                            name={`option-${Qindex}`} value={Oindex}
                                                            onChange={() => { selectOption(Qindex, Oindex) }}
                                                            className="mr-3 h-5 w-5 text-blue-500"
                                                        />
                                                        <span className="ml-2">{option}</span>
                                                    </label>
                                                </li>)
                                        })}
                                    </ul>
                                </div>
                            )
                        })
                    )
                }

                {!submitted && (

                    <button onClick={submitQuiz} className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"> Submit </button>

                )}
                <Link href="/quiz/">
                    <button className="w-full py-2 mt-4 hover:bg-gray-300 focus:outline-none border rounded-lg">
                        Back to Quiz List
                    </button>
                </Link>
            </div>

        </div>
    )
}