import { ConditionalOptions } from "./components/ConditionalOptions"
import { DefaultItems } from "./components/DefaultItems"
import { Footer } from "./components/Footer"
import { GenerateButton } from "./components/GenerateButton"
import { Header } from "./components/Header"
import { Technologys } from "./components/Technologys"
import { useForm } from "./hooks/useForm"
import { getProjectUrl } from "./utils/getProjectUrl"

export const App = () => {
  const { validateForm, technology, setTechnology, options, setOptions } =
    useForm()

  const generateBoilerplate = async (): Promise<void> => {
    if (!validateForm()) return

    const fileUrl = getProjectUrl(technology, options)
    if (!fileUrl) {
      alert(
        "Desculpe, não há um boilerplate disponível para essa configuração."
      )
      return
    }

    const a = document.createElement("a")
    a.href = fileUrl
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <Header />
      <div className="w-[800px] bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 space-y-6">
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
