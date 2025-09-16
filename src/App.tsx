import { Code } from "lucide-react"
import { useState } from "react"
import { ConditionalOptions } from "./components/ConditionalOptions"
import { DefaultItems } from "./components/DefaultItems"
import { Footer } from "./components/Footer"
import { GenerateButton } from "./components/GenerateButton"
import { ProjectName } from "./components/ProjectName"
import { Technologys } from "./components/Technologys"
import { useForm } from "./hooks/useForm"

export const App = () => {
  const {
    errors,
    validateForm,
    projectName,
    setProjectName,
    technology,
    setTechnology,
    options,
    setOptions,
  } = useForm()

  const generateBoilerplate = async (): Promise<void> => {
    if (!validateForm()) return

    alert(`Gerando projeto: ${projectName}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
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
            Crie seu projeto inicial com as melhores práticas e tecnologias
            modernas
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8">
          <div className="space-y-6">
            <ProjectName
              errors={errors}
              projectName={projectName}
              setProjectName={setProjectName}
            />
            <Technologys
              technology={technology}
              setTechnology={setTechnology}
              setOptions={setOptions}
            />
            <ConditionalOptions
              technology={technology}
              options={options}
              setOptions={setOptions}
            />
            <DefaultItems />
            <GenerateButton handleOnClick={generateBoilerplate} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
