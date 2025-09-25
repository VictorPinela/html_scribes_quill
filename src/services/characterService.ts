import { api } from "./api";
import { type Character } from "../types";

export const characterService = {
  async getCharacters(): Promise<Character[]> {
    const response = await api.get("/characters");
    return response.data;
  },

  async getCharacter(id: string): Promise<Character> {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  },

  async createCharacter(characterData: Partial<Character>): Promise<Character> {
    const response = await api.post("/characters", characterData);
    return response.data;
  },

  async updateCharacter(
    id: string,
    characterData: Partial<Character>
  ): Promise<Character> {
    const response = await api.put(`/characters/${id}`, characterData);
    return response.data;
  },

  async deleteCharacter(id: string): Promise<void> {
    await api.delete(`/characters/${id}`);
  },
};
