import * as fs from 'node:fs/promises';
export class JsonReader {
    static async readFileAsync(filePath) {
        return JSON.parse(await fs.readFile(filePath, 'utf8'));
    }
    async readFile(filePath) {
        this._data = JSON.parse(await fs.readFile(filePath, 'utf8'));
        return this._data;
    }
    get data() {
        return this._data;
    }
    async start(filePath) {
        const response = await JsonReader.readFileAsync(filePath);
        this._data = response;
    }
    async getAllKeys(filePath) {
        try {
            const jsonData = await JsonReader.readFileAsync(filePath);
            const keys = [];
            // Função recursiva para percorrer o JSON e pegar as chaves
            const extractKeys = async (obj) => {
                for (const key in obj) {
                    keys.push(key);
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        await extractKeys(obj[key]);
                    }
                }
            };
            await extractKeys(jsonData);
            return keys;
        }
        catch (error) {
            console.error('Error to read JSON archive:', error);
            return [];
        }
    }
}
