import React, { useState } from 'react';
import { HStack, Input, Button, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <HStack spacing={8} mt={10} align="center">
      <Input
        placeholder="Search for cars..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        size="lg"
        width="50%"
        height={40}
        borderRadius={10}
        bg="white"
        color="black"
        alignContent={"center"}
        marginLeft={"18%"}
      />
      <Button colorScheme="blue" size="lg" onClick={handleSearch}>
        <Icon as={FaSearch} mr={2} />
        Search
      </Button>
    </HStack>
  );
};

export default SearchBar;