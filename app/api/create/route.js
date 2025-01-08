import { readQuizzes, writeQuizzes } from '@/utils/quizUtils';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {

        const quizzes = readQuizzes()

        const newQuiz = await request.json();
        console.log(newQuiz)
        if (!newQuiz.title || !newQuiz.questions || !newQuiz.answers) {
            return NextResponse.json({ error: "Invalid quiz data" }, { status: 400 });
        }

        newQuiz.id = quizzes.length;
        quizzes.push(newQuiz);

        writeQuizzes(newQuiz)
        return NextResponse.json({ message: "Quiz created successfully", quiz: newQuiz });

    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}