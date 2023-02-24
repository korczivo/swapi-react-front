import { useCallback, useContext, useEffect } from 'react';

import { GameContext } from './context';
import {
  fetchPeopleJSON,
  handleWinner,
  getCurrentPlayers,
} from '../../helpers/helpers';
import { useLoadingStatus } from '../FetchStatus';
import { DEFAULT_COUNTER, PLAYER_COUNT } from '../../helpers/constants';
import { getRandomInt } from '../../helpers/numbers';

export const useGameManagement = () => {
  const [people, setPeople, winner, setWinner, score, setScore] =
    useContext(GameContext);

  const { handleLoadingStatus, handleErrorMessage } = useLoadingStatus();

  const handleRoll = async () => {
    handleLoadingStatus(true);
    await fetchPeopleJSON(
      `https://swapi.dev/api/people/?page=${getRandomInt(1, 8)}`
    )
      .then((res) => {
        const players = getCurrentPlayers(res.results);

        setPeople(players);
        setWinner(handleWinner(players));
        handleLoadingStatus(false);
      })
      .catch((err) => {
        handleLoadingStatus(false);
        handleErrorMessage(err.message);
      });
  };

  const handleClearPlayers = useCallback(() => {
    setPeople([]);
    setWinner(null);
  }, []);

  const handleClearGame = useCallback(() => {
    setPeople([]);
    handleErrorMessage('');
    setWinner(null);
    setScore(DEFAULT_COUNTER);
  }, []);

  useEffect(() => {
    const index = people?.findIndex((person) => person.name === winner?.name);

    if (index === 0) {
      setScore({
        ...score,
        left: score.left + 1,
      });
    }

    if (index === 1) {
      setScore({
        ...score,
        right: score.right + 1,
      });
    }
  }, [winner]);

  useEffect(() => {
    if (people?.length === PLAYER_COUNT) {
      setWinner(handleWinner(people));
    }
  }, [people]);

  return {
    handleClearGame,
    handleClearPlayers,
    handleRoll,
    people,
    score,
    setPeople,
    winner,
  };
};
