const axios = require('axios');

const baseURL = 'https://hangman-icvkxzslem.now.sh';

async function main() {
  if (process.argv[2]) {
    try {
      const response = await axios.put(
        `${baseURL}/${process.argv[2]}/${process.argv[3]}`
      );
      const { blanks, guesses } = response.data.game;
      console.log('BLANK SPACES LEFT:', blanks);
      console.log('HERE ARE YOUR GUESSES:', guesses);
    } catch (error) {
      console.log({ error });
    }
  } else {
    try {
      const response = await axios.post(baseURL);
      console.log('HERE IS YOUR GAME ID:', response.data.game.id);
    } catch (error) {
      console.log({ error });
    }
  }
}

main();
