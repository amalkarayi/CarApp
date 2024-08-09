import React from "react";
import { VStack, Text, Icon, Flex } from "@chakra-ui/react";
import { FaCar, FaSearch, FaInfoCircle } from "react-icons/fa";
import ExploreCarGallery from "@/components/Gallery/exploreCarGallery";
import withBackground from "@/components/HOC/withBackground";
import SearchBar from "@/components/search/search";

const CustomTypography = () => (
  <Flex justify="center" mt={20} wrap="wrap" letterSpacing={10}>
    <VStack spacing={4} align="center">
      <Icon as={FaCar} boxSize={12} />
      <Text fontSize="xl">Wide Range of Cars</Text>
    </VStack>
    <VStack spacing={4} align="center">
      <Icon as={FaInfoCircle} boxSize={12} />
      <Text fontSize="xl">Detailed Information</Text>
    </VStack>
    <VStack spacing={4} align="center">
      <Icon as={FaSearch} boxSize={12} />
      <Text fontSize="xl">Easy Search</Text>
    </VStack>
  </Flex>
);

const Home: React.FC = () => {
  const handleSearch = (text: string) => {
    console.log(text);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <CustomTypography />
    </>
  );
};

const HomeWithBackground = withBackground(Home);

export default () => <HomeWithBackground gallery={<ExploreCarGallery />} />;
