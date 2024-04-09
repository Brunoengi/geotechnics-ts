import * as ts from 'typescript';
class PathsConfig {
    static tsConfigContent() {
        return ts.readConfigFile(PathsConfig.tsConfigFilePath, ts.sys.readFile).config;
    }
    static baseURL() {
        return PathsConfig.tsConfigContent().compilerOptions.baseURL;
    }
}
PathsConfig.tsConfigFilePath = '../../tsconfig.json';
export default PathsConfig;
console.log(PathsConfig.tsConfigFilePath);
console.log(PathsConfig.baseURL());
