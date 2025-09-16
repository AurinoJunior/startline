import { ConditionalOptions } from "./components/ConditionalOptions"
import { DefaultItems } from "./components/DefaultItems"
import { Footer } from "./components/Footer"
import { GenerateButton } from "./components/GenerateButton"
import { Header } from "./components/Header"
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
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <Header />
      <div className="w-[800px] bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 space-y-6">
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
      <Footer />
    </div>
  )
}
