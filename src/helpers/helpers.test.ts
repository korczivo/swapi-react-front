import { DEFAULT_PERSON, PLAYER_COUNT } from './constants';
import { getCurrentPlayers, handleWinner } from './helpers';

const person1 = {
  ...DEFAULT_PERSON,
  name: 'Chandler',
  mass: '100',
};
const person2 = {
  ...DEFAULT_PERSON,
  name: 'Ross',
  mass: '200',
};
const person3 = {
  ...DEFAULT_PERSON,
  name: 'Joey',
  mass: 'unknown',
};
const person4 = {
  ...DEFAULT_PERSON,
  name: 'Joey',
  mass: '0',
};

describe('getCurrentPlayers', () => {
  it('should get current players', () => {
    const players = [person3, person2, person1];

    const result = getCurrentPlayers(players);

    expect(result).toHaveLength(PLAYER_COUNT);
  });
});

describe('handleWinner', () => {
  it('should handle winner with players which have mass value', () => {
    const players = [person1, person2];

    const result = handleWinner(players);

    expect(result).toStrictEqual(person2);
  });

  it('should handle winner with players which one of them has unknown mass', () => {
    const players = [person2, person3];

    const result = handleWinner(players);

    expect(result).toStrictEqual(person2);
  });

  it('should handle draw game', () => {
    const players = [person4, person3];

    const result = handleWinner(players);

    expect(result).toStrictEqual(DEFAULT_PERSON);
  });
});
