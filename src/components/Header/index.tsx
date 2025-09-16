import { Code } from "lucide-react"

export const Header = () => {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-800 p-3 rounded-full shadow-lg border border-gray-700">
          <Code className="w-8 h-8 text-blue-400" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">
        Startline Boilerplate Generator
      </h1>
      <p className="text-gray-300">
        Crie seu projeto inicial com as melhores práticas e tecnologias modernas
      </p>
    </div>
  )
}
