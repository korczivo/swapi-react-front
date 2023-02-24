import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useDebouncedCallback } from 'use-debounce';
import Grid from '@mui/material/Grid';

import { People } from '../../types';
import { fetchPeopleJSON } from '../../helpers/helpers';
import { useGameManagement } from '../../contexts/GameContext/hook';
import { useLoadingStatus } from '../../contexts/FetchStatus';

export function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<People>>([]);
  const [currentPerson, setCurrentPerson] = useState<People | null>(null);

  const { people, setPeople } = useGameManagement();

  const { isLoading } = useLoadingStatus();

  const isSearchDisabled = isLoading || people.length >= 2;

  const isButtonDisabled =
    isSearchDisabled ||
    !!people.find((person) => person.name === currentPerson?.name) ||
    !currentPerson?.name;

  const debouncedChange = useDebouncedCallback(
    async ({ target }: ChangeEvent<HTMLInputElement>) => {
      setIsSearchLoading(true);
      fetchPeopleJSON(
        `https://swapi.dev/api/people/?search=${target.value}`
      ).then((res) => {
        setOptions(res.results);
        setIsSearchLoading(false);
      });
    },
    400
  );
  const getPeople = useCallback(() => {
    setIsSearchLoading(true);
    fetchPeopleJSON(`https://swapi.dev/api/people/`).then((res) => {
      setOptions(res.results);
      setIsSearchLoading(false);
    });
  }, []);

  const handleAddPlayer = () => {
    if (currentPerson) {
      setPeople([...people, currentPerson]);
    }
    setCurrentPerson(null);
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <Grid container justifyContent="center" mb={2} alignItems="center">
      <Grid item>
        <Autocomplete
          style={{ width: '300px' }}
          open={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => setIsSearchOpen(false)}
          getOptionLabel={(option) => option.name}
          options={options}
          value={currentPerson}
          disabled={isSearchDisabled}
          onChange={(e, obj) => setCurrentPerson(obj as People)}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={debouncedChange}
              label="Search player"
              placeholder="Type player name"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isSearchLoading && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
                style: {
                  color: '#fff',
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item pl={2}>
        <Button
          variant="contained"
          onClick={handleAddPlayer}
          disabled={isButtonDisabled}
          type="button"
          color="secondary"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
