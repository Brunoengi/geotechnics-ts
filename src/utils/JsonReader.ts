import { promises as fs } from 'fs';

export class JsonReader {

  _filePath: string
  _data: object

  static async readFileAsync(filePath: string) {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  }

  async readFile(filePath: string) {
    this._data = JSON.parse(await fs.readFile(filePath, 'utf8')) 
    return this._data
  }

  get data() {
    return this._data
  }

  async start(filePath: string) {
    const response = await JsonReader.readFileAsync(filePath)
    this._data = response
  }

  async getAllKeys(filePath: string): Promise<string[]> {
    try {
      const jsonData = await JsonReader.readFileAsync(filePath);
      const keys: string[] = [];
      
      // Função recursiva para percorrer o JSON e pegar as chaves
      const extractKeys = async (obj: any) => {
        for (const key in obj) {
          keys.push(key);
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            await extractKeys(obj[key]);
          }
        }
      };

      await extractKeys(jsonData);
      
      return keys;
    } catch (error) {
      console.error('Error to read JSON archive:', error);
      return [];
    }
  }
}