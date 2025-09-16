import { CheckCircle, Code, Download, Settings } from "lucide-react"
import { type ReactNode, useState } from "react"

// Types
interface FormErrors {
  projectName?: string
  technology?: string
}

interface ProjectOptions {
  tailwind: boolean
  fastify: boolean
  shadcn: boolean
}

type Technology = "react" | "node" | "nextjs" | ""

interface TechnologyOption {
  value: Technology
  label: string
  desc: string
  icon: string
}

interface AdditionalOption {
  key: keyof ProjectOptions
  label: string
  description: string
}

interface OptionConfig {
  [key: string]: AdditionalOption[]
}

export const App = () => {
  const [projectName, setProjectName] = useState<string>("")
  const [technology, setTechnology] = useState<Technology>("")
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

  const handleOptionChange = (option: keyof ProjectOptions): void => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }))
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

  const renderOptions = (): ReactNode | null => {
    if (!technology) return null

    const optionConfigs: OptionConfig = {
      react: [
        {
          key: "tailwind",
          label: "Tailwind CSS",
          description: "Framework CSS utilitário",
        },
      ],
      node: [
        {
          key: "fastify",
          label: "Fastify",
          description: "Framework web rápido e eficiente",
        },
      ],
      nextjs: [
        {
          key: "shadcn",
          label: "shadcn/ui",
          description: "Componentes UI modernos",
        },
      ],
    }

    const currentOptions = optionConfigs[technology]
    if (!currentOptions) return null

    return (
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Opções Adicionais
        </h3>
        {currentOptions.map((option: AdditionalOption) => (
          <label
            key={option.key}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={options[option.key]}
              onChange={() => handleOptionChange(option.key)}
              className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div>
              <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                {option.label}
              </div>
              <div className="text-sm text-gray-400">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    )
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

  const defaultIncludes: string[] = [
    "TypeScript configurado",
    "ESLint e Prettier",
    "Estrutura de pastas organizada",
    "Scripts de desenvolvimento e build",
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

            {/* Conditional Options */}
            {renderOptions()}

            {/* Default Includes */}
            <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
              <h3 className="font-medium text-green-300 flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                Sempre Incluído
              </h3>
              <ul className="text-sm text-green-200">
                {defaultIncludes.map((item: string, i: number) => (
                  <li key={String(i)}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={generateBoilerplate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Gerar e Baixar Boilerplate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Desenvolvido com ❤️ para acelerar seu desenvolvimento</p>
        </div>
      </div>
    </div>
  )
}
