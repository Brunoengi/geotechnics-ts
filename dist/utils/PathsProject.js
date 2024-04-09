import { fileURLToPath } from 'url';
import path from 'path';
export default class PathsProject {
    static PathToOutDir() {
        const __filename = fileURLToPath(import.meta.url);
        return path.dirname(path.dirname(__filename));
    }
    static PathToDirectory() {
        return path.dirname(PathsProject.PathToOutDir());
    }
    static PathToJsonFolder() {
        const directoryPath = PathsProject.PathToDirectory();
        return path.join(directoryPath, 'src', 'json');
    }
}
