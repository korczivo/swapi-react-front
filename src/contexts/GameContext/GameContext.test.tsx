import { renderHook, act } from '@testing-library/react';
import { useGameManagement } from './hook';
import { DEFAULT_PERSON } from '../../helpers/constants';
import { GameProvider } from './provider';

describe('useGameManagement', () => {
  const setupHook = () => {
    const wrapper = ({ children }: any) => (
      <GameProvider>{children}</GameProvider>
    );
    const { result } = renderHook(() => useGameManagement(), { wrapper });

    return result;
  };

  it('should clear players', () => {
    const result = setupHook();

    result.current.people = [DEFAULT_PERSON, DEFAULT_PERSON];
    result.current.winner = DEFAULT_PERSON;

    act(() => {
      result.current.handleClearPlayers();
    });
    expect(result.current.winner).toBeNull();
    expect(result.current.people).toEqual([]);
  });

  it('should clear game', () => {
    const result = setupHook();

    result.current.winner = DEFAULT_PERSON;
    result.current.people = [DEFAULT_PERSON, DEFAULT_PERSON];
    result.current.score = { left: 10, right: 10 };

    act(() => {
      result.current.handleClearGame();
    });

    expect(result.current.winner).toBeNull();
    expect(result.current.people).toEqual([]);
    expect(result.current.score).toStrictEqual({ left: 0, right: 0 });
  });
});
