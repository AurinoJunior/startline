import { Download } from "lucide-react"

interface GenerateButtonProps {
  isLoading: boolean
  handleOnClick: () => void
}

export const GenerateButton = ({
  handleOnClick,
  isLoading,
}: GenerateButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleOnClick}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
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
  )
}
