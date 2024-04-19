import { fileURLToPath } from 'url'
import path from 'path'

export function PathToOutDir (): string {
  const filename = fileURLToPath(import.meta.url)
  return path.dirname(path.dirname(filename))
}

export function PathToDirectory (): string {
  return path.dirname(PathToOutDir())
}

export default function PathToJsonFolder (): string {
  const directoryPath = PathToDirectory()
  return path.join(directoryPath, 'src', 'json')
}
