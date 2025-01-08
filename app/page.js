import Link from "next/link";


export default function Home() {

  return (
    <div>
      <main>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Welcome to the Quiz App !</h1>
          <p className="text-lg text-gray-600 mb-10">Test your knowledge with fun quizzes!</p>
          <Link className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300" href="/quiz">
            Take Quiz 
          </Link>
        </div>
      </main>
    </div>
  );
}
