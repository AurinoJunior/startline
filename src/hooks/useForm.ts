import { useState } from "react"

export interface FormErrors {
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
  const [technology, setTechnology] = useState<Technology>("react")
  const [options, setOptions] = useState<ProjectOptions>({
    tailwind: false,
    fastify: false,
    shadcn: false,
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!technology) {
      newErrors.technology = "Selecione uma tecnologia"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    errors,
    validateForm,
    technology,
    setTechnology,
    options,
    setOptions,
  }
}
