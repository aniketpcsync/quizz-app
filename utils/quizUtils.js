import fs, { read } from 'fs';
import path from 'path';

const quizFilePath = path.join(process.cwd(), 'data', 'quiz.json'); // New path to quiz.json


export function readQuizzes() {
    const data = fs.readFileSync(quizFilePath, 'utf-8')
    return JSON.parse(data)
}

export function writeQuizzes(newQuiz) {
    const quizzes = readQuizzes();
    quizzes.push(newQuiz)
    fs.writeFileSync(quizFilePath, JSON.stringify(quizzes, null, 2))
}