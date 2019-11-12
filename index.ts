import axios from 'axios';
import Hangman from './hangman';

const BASE_URL = 'https://hangman-icvkxzslem.now.sh';

async function start() {
  try {
    const gameId = process.argv[2] || null;
    const guess = process.argv[3];
    const hangman = await Hangman.init(BASE_URL, gameId);

    console.log('GAME ID: ', hangman.gameId);

    if (!guess) {
      console.log(
        '\nTip: guess a letter by passing in another argument to the script.'
      );
      process.exit(0);
    }

    const { blanks, guesses, won, lost, word } = await hangman.guessLetter(
      guess
    );

    if (won === true) {
      console.log('You have won! The word was: ' + word + '\n');
      process.exit(0);
    } else if (lost === true) {
      console.log('Oh no, you  lost. The word was: ' + word + '\n');
      process.exit(0);
    }

    console.log('\nWORD SO FAR:', blanks);
    console.log('GUESSES SO FAR:', guesses);

    //if all letters are guessed within 6 tries, set "won" to true.
  } catch (error) {
    if (error.response.data.error) {
      console.log(error.response.data.error);
    } else {
      console.log(error);
    }
  }
}

// main();

start();
