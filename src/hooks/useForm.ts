import { useState } from "react"

export interface FormErrors {
  projectName?: string
  technology?: string
}

export interface ProjectOptions {
  tailwind: boolean
  fastify: boolean
  shadcn: boolean
}

export type Technology = "react" | "node" | "nextjs"

export const useForm = () => {
  const [errors, setErrors] = useState<FormErrors>({})
  const [projectName, setProjectName] = useState<string>("")
  const [technology, setTechnology] = useState<Technology>("react")
  const [options, setOptions] = useState<ProjectOptions>({
    tailwind: false,
    fastify: false,
    shadcn: false,
  })

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

  return {
    errors,
    validateForm,
    projectName,
    setProjectName,
    technology,
    setTechnology,
    options,
    setOptions,
  }
}
