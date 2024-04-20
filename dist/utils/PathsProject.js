import { fileURLToPath } from 'url';
import path from 'path';
export function PathToOutDir() {
    const filename = fileURLToPath(import.meta.url);
    return path.dirname(path.dirname(filename));
}
export function PathToDirectory() {
    return path.dirname(PathToOutDir());
}
export default function PathToJsonFolder() {
    const directoryPath = PathToDirectory();
    return path.join(directoryPath, 'src', 'json');
}
