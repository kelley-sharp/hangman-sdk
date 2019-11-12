# Hangman

A simple server that hosts a hangman game! Applicants can write a program that plays hangman against the computer.

[Running example](https://hangman-icvkxzslem.now.sh) - This is a deployed version on Zeit V1. Keep in mind that cold starts can be quite slow, so you may want to poke it a few minutes before the interview.

## API

### `POST /`

Create a new game. Returns a game object that includes an id, and a key that contains the number of blanks.

### `GET /:id`

Returns the current state of the game.

### `PUT /:id/:letter`

Makes a new guess! `:letter` is case insensitve, but must be a single letter. Duplicate guesses will error, but don't count against you. Every successful request should return a `200` status.

#### Response object

| key                      | type                | description                                                        |
| ------------------------ | ------------------- | ------------------------------------------------------------------ |
| `game.id`                | `string`            | Game ID                                                            |
| `game.blanks`            | `(string\|null)[]`  | Array of letters that make up the word. Null indexes are blank     |
| `game.guesses`           | `string[]`          | An array of letters that have already been guessed                 |
| `game.incorrect_guesses` | `string[]`          | An array of incorrect letters that have been guessed               |
| `game.word`              | `string`            | The solution! Only included if the game is lost or won already     |
| `lost`                   | `boolean`           | You made too many incorrect guesses and lost.                      |
| `won`                    | `boolean`           | You won!                                                           |
| `error`                  | `string`            | If the response is not successful, this includes the error details |

When you make a successful guess, the `game.blanks` key will include an updated array with the correctly guessed letter in the right place of the array.

### `GET /words`

Returns the array of words we use. Also found in the [an-array-of-english-words repo](https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json).
