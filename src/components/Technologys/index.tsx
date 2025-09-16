import type { ProjectOptions, Technology } from "../../hooks/useForm"

interface TechnologyOption {
  value: Technology
  label: string
  desc: string
  icon: string
}

interface TechnologysProps {
  technology: Technology
  setTechnology: React.Dispatch<React.SetStateAction<Technology>>
  setOptions: React.Dispatch<React.SetStateAction<ProjectOptions>>
}

export const Technologys = ({
  technology,
  setTechnology,
  setOptions,
}: TechnologysProps) => {
  const technologies: TechnologyOption[] = [
    {
      value: "react",
      label: "React",
      desc: "Biblioteca para interfaces",
      icon: "⚛️",
    },
    {
      value: "node",
      label: "Node.js",
      desc: "Runtime JavaScript para servidor",
      icon: "🟢",
    },
    {
      value: "nextjs",
      label: "Next.js",
      desc: "Framework React fullstack",
      icon: "▲",
    },
  ]

  const handleTechnologyChange = (tech: Technology): void => {
    setTechnology(tech)
    setOptions({
      tailwind: false,
      fastify: false,
      shadcn: false,
    })
  }

  return (
    <>
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
    </>
  )
}
