import { People, ResponseData } from '../types';
import { parseToNumber } from './numbers';
import { DEFAULT_PERSON, PLAYER_COUNT } from './constants';

export async function fetchPeopleJSON(url: RequestInfo): Promise<ResponseData> {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;

    throw new Error(message);
  }

  return response.json();
}

export const handleWinner = (arr: Array<People>) =>
  arr.reduce((acc, curr) => {
    if (parseToNumber(acc.mass) === parseToNumber(curr.mass)) {
      return DEFAULT_PERSON;
    }

    return parseToNumber(acc.mass) > parseToNumber(curr.mass) ? acc : curr;
  }, DEFAULT_PERSON);

export const getCurrentPlayers = (arr: Array<People>) =>
  arr.sort(() => Math.random() - Math.random()).slice(0, PLAYER_COUNT);
