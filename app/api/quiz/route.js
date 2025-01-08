import { NextResponse } from "next/server";
import { readQuizzes } from "@/utils/quizUtils";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const quizzes = readQuizzes()

    if (id) {
        const quiz = quizzes.find((quiz) => quiz.id === parseInt(id))

        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
        }
        const { id: QuizId, title, questions } = quiz
        const quizData = { QuizId, title, questions }
        return NextResponse.json(quizData)
    }

    const quizList = quizzes.map(({ id, title }) => ({ id, title }))

    return NextResponse.json(quizList)
}


export async function POST(request) {

    try {
        const { quizId, answers } = await request.json()
        const quizzes = readQuizzes()

        const quiz = quizzes.find((quiz) => (parseInt(quizId)) === parseInt(quiz.id))

        if (!quiz) {
            return NextResponse.json({ error: "Quiz Not Found" }, { status: 404 })
        }

        let score = 0;

        Object.keys(answers).forEach((questionIndex) => {
            if (answers[questionIndex] == quiz.answers[questionIndex]) {
                score += 10
            }
        })

        return NextResponse.json({ score })

    } catch (error) {
        console.error("Error processing quiz submissions", error)
        return NextResponse.json({ error: "An error occured", status: 500 })
    }

}