import type { FormErrors } from "../../hooks/useForm"

interface ProjectNameProps {
  errors: FormErrors
  projectName: string
  setProjectName: React.Dispatch<React.SetStateAction<string>>
}

export const ProjectName = ({
  errors,
  projectName,
  setProjectName,
}: ProjectNameProps) => {
  return (
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
        <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>
      )}
    </div>
  )
}
