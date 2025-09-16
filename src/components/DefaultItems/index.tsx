import { CheckCircle } from "lucide-react"

export const DefaultItems = () => {
  const items: string[] = [
    "TypeScript configurado",
    "ESLint e Prettier",
    "Estrutura de pastas organizada",
    "Scripts de desenvolvimento e build",
  ]

  return (
    <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
      <h3 className="font-medium text-green-300 flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5" />
        Sempre Incluído
      </h3>
      <ul className="text-sm text-green-200">
        {items.map((item: string, i: number) => (
          <li key={String(i)}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}
