export type AppConfigType = typeof appConfig;

export const appConfig = Object.freeze({
  name: 'Hearthstone',
  routing: {
    home: '',
    login: 'login',
    registration: 'register',
    card: 'card',
    deckBuilder: 'build',
    deck: 'deck'
  }
});
