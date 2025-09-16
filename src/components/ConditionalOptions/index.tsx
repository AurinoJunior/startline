import { Settings } from "lucide-react"
import type { ProjectOptions, Technology } from "../../App"

interface AdditionalOption {
  key: keyof ProjectOptions
  label: string
  description: string
}

interface OptionConfig {
  [key: string]: AdditionalOption[]
}

interface ConditionalOptionsProps {
  technology: Technology
  options: ProjectOptions
  setOptions: React.Dispatch<React.SetStateAction<ProjectOptions>>
}

export const ConditionalOptions = ({
  technology,
  options,
  setOptions,
}: ConditionalOptionsProps) => {
  const handleOptionChange = (option: keyof ProjectOptions): void => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

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
