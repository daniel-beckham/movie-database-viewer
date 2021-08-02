import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Image,
  Keyboard,
  ResponsiveContext,
  Spinner,
  Text,
  TextInput,
} from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import * as urlUtils from 'utils/url';

const Search = () => {
  const history = useHistory();

  const size = useContext(ResponsiveContext);

  const [count, setCount] = useState(0);
  const [icon, setIcon] = useState(<SearchIcon />);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const boxRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const formatSuggestions = (suggestions: any) => {
    return suggestions.map((result: any, index: number) => ({
      label: (
        <Box
          align="center"
          border={
            index < suggestions.length - 1
              ? { color: 'light-4', side: 'bottom' }
              : undefined
          }
          direction="row"
          gap="medium"
          pad="small"
        >
          <Image src={result.value.image} width="64px" />
          <Text size="large" weight={500}>
            {result.label}
          </Text>
        </Box>
      ),
      value: result.value,
    }));
  };

  const getSuggestions = async (text: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 250));

      if (text !== valueRef.current) {
        return;
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      };

      setIcon(<Spinner />);

      const response = await fetch(
        urlUtils.searchSuggestionsApiUrl,
        requestOptions
      );
      const data: any = await response.json();

      setIcon(<SearchIcon />);
      setSuggestions(formatSuggestions(data));
    } catch (e: any) {
      setSuggestions([]);
    }
  };

  const resetSearch = () => {
    setCount((count) => count + 1);

    setSuggestions([]);
    setValue('');
  };

  const onEnter = () => {
    if (valueRef.current) {
      resetSearch();
      history.push(urlUtils.searchUrl + '?q=' + valueRef.current);
    }
  };

  const onChange = (event: any) => {
    const { value: newValue } = event.target;
    setValue(newValue);

    if (!newValue.trim()) {
      setSuggestions([]);
    } else {
      getSuggestions(newValue);
    }
  };

  const onSuggestionSelect = (event: any) => {
    resetSearch();

    const suggestionValue = event.suggestion.value;
    history.push(
      urlUtils.getMediaDetailedUrl(suggestionValue.type, suggestionValue.id)
    );
  };

  return (
    <Box pad={{ bottom: 'xsmall' }} margin={{ bottom: 'medium' }} ref={boxRef}>
      <Box elevation="small">
        <Keyboard onEnter={onEnter}>
          <TextInput
            dropTarget={boxRef.current || undefined}
            icon={icon}
            key={count}
            placeholder={
              size !== 'small'
                ? 'Search for movies, TV shows, and people...'
                : 'Search...'
            }
            plain
            suggestions={suggestions}
            onChange={onChange}
            onSuggestionSelect={onSuggestionSelect}
            value={value}
          ></TextInput>
        </Keyboard>
      </Box>
    </Box>
  );
};

export default Search;
