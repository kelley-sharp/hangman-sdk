import { AxiosInstance } from 'axios';
import axios from 'axios';

type APIError = {
  status: number;
  title: string;
  message: string;
};

class Hangman {
  public gameId: string;
  private api: AxiosInstance;

  static async init(url: string, gameId: string) {
    const axiosInstance = axios.create({
      baseURL: url,
      timeout: 5000,
    });

    if (gameId) {
      return new Hangman(gameId, axiosInstance);
    } else {
      const response = await axiosInstance.post('/');
      const gameId = response.data.game.id;
      return new Hangman(gameId, axiosInstance);
    }
  }

  constructor(gameId: string, api: AxiosInstance) {
    this.gameId = gameId;
    this.api = api;
  }

  async guessLetter(
    letter: string
  ): Promise<{
    blanks: string[];
    guesses: string[];
    won: boolean;
    lost: boolean;
    word: string;
  }> {
    //make a new guess
    const response = await this.api.put(`/${this.gameId}/${letter}`);

    const { blanks, guesses, word } = response.data.game;

    const { won, lost } = response.data;

    return { blanks, guesses, won, lost, word };
  }
}

export default Hangman;
