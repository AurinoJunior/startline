import type { ProjectOptions, Technology } from "../hooks/useForm"

export const ZIP_URLS = {
  nextjsShadcn:
    "https://github.com/AurinoJunior/startline-repos/raw/refs/heads/main/.zip/nextjs-shadcn.zip",
  nextjs:
    "https://github.com/AurinoJunior/startline-repos/raw/refs/heads/main/.zip/nextjs.zip",
  reactTailwind:
    "https://github.com/AurinoJunior/startline-repos/raw/refs/heads/main/.zip/react-vite-tailwind.zip",
  nodeFastify:
    "https://github.com/AurinoJunior/startline-repos/raw/refs/heads/main/.zip/node-fastify.zip",
  nodeExpress: "",
}

export const getProjectUrl = (
  technology: Technology,
  options: ProjectOptions
) => {
  if (technology === "react" && options.tailwind) {
    return ZIP_URLS.reactTailwind
  }

  if (technology === "node" && options.fastify) {
    return ZIP_URLS.nodeFastify
  }

  if (technology === "nextjs" && options.shadcn) {
    return ZIP_URLS.nextjsShadcn
  }

  if (technology === "nextjs") {
    return ZIP_URLS.nextjs
  }
}
