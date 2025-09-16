import { Code } from "lucide-react"
import { useState } from "react"
import { ConditionalOptions } from "./components/ConditionalOptions"
import { DefaultItems } from "./components/DefaultItems"
import { Footer } from "./components/Footer"
import { GenerateButton } from "./components/GenerateButton"

// Types
interface FormErrors {
  projectName?: string
  technology?: string
}

export type Technology = "react" | "node" | "nextjs"

interface TechnologyOption {
  value: Technology
  label: string
  desc: string
  icon: string
}

export interface ProjectOptions {
  tailwind: boolean
  fastify: boolean
  shadcn: boolean
}

export const App = () => {
  const [projectName, setProjectName] = useState<string>("")
  const [technology, setTechnology] = useState<Technology>("react")
  const [options, setOptions] = useState<ProjectOptions>({
    tailwind: false,
    fastify: false,
    shadcn: false,
  })
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!projectName.trim()) {
      newErrors.projectName = "Nome do projeto é obrigatório"
    } else if (!/^[a-zA-Z0-9-_]+$/.test(projectName.trim())) {
      newErrors.projectName = "Use apenas letras, números, hífens e underscores"
    }

    if (!technology) {
      newErrors.technology = "Selecione uma tecnologia"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTechnologyChange = (tech: Technology): void => {
    setTechnology(tech)
    // Reset options when technology changes
    setOptions({
      tailwind: false,
      fastify: false,
      shadcn: false,
    })
  }

  const generateBoilerplate = async (): Promise<void> => {
    if (!validateForm()) return

    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Build the repository path based on selections
      const selectedOptions: string[] = []

      if (technology === "react" && options.tailwind) {
        selectedOptions.push("tailwind")
      }
      if (technology === "node" && options.fastify) {
        selectedOptions.push("fastify")
      }
      if (technology === "nextjs" && options.shadcn) {
        selectedOptions.push("shadcn")
      }

      // Here you would integrate with your backend
      const downloadUrl = `https://api.yoursite.com/download?project=${projectName}&tech=${technology}&options=${selectedOptions.join(",")}`

      // For demonstration, we'll show an alert
      const optionsText =
        selectedOptions.length > 0 ? selectedOptions.join(", ") : "Nenhuma"
      alert(
        `Gerando projeto: ${projectName}\nTecnologia: ${technology}\nOpções: ${optionsText}\nTypeScript: Incluído`
      )
    } catch (error) {
      console.error("Erro ao gerar boilerplate:", error)
      alert("Erro ao gerar o boilerplate. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const technologies: TechnologyOption[] = [
    {
      value: "react",
      label: "React",
      desc: "Biblioteca para interfaces",
      icon: "⚛️",
    },
    { value: "node", label: "Node.js", desc: "Runtime JavaScript", icon: "🟢" },
    {
      value: "nextjs",
      label: "Next.js",
      desc: "Framework React fullstack",
      icon: "▲",
    },
  ]

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

        {/* Form */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="projectName"
              >
                Nome do Projeto *
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectName(e.target.value)
                }
                placeholder="meu-projeto-incrivel"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.projectName ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.projectName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projectName}
                </p>
              )}
            </div>

            {/* Technology Selection */}
            <div>
              <h2 className="block text-sm font-medium text-gray-300 mb-4">
                Tecnologia Principal *
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {technologies.map((tech: TechnologyOption) => (
                  <label key={tech.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="technology"
                      value={tech.value}
                      checked={technology === tech.value}
                      onChange={() => handleTechnologyChange(tech.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 border-2 rounded-lg transition-all ${
                        technology === tech.value
                          ? "border-blue-500 bg-blue-900/50"
                          : "border-gray-600 hover:border-gray-500 bg-gray-700/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{tech.icon}</div>
                      <div className="font-medium text-white">{tech.label}</div>
                      <div className="text-sm text-gray-300">{tech.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.technology && (
                <p className="mt-2 text-sm text-red-600">{errors.technology}</p>
              )}
            </div>

            <ConditionalOptions
              technology={technology}
              options={options}
              setOptions={setOptions}
            />

            <DefaultItems />
            <GenerateButton
              isLoading={isGenerating}
              handleOnClick={generateBoilerplate}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
