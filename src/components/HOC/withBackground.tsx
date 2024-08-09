import React from "react";
import { Box, Flex, Heading, HStack, Button } from "@chakra-ui/react";
import image from "@/assets/bg.jpg";
import pattern from "@/assets/pattern.jpg";
import { useNavigate } from "react-router-dom";

const withBackground = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { gallery } = props;
    const navigate = useNavigate();
    return (
      <Box bgImage={pattern} bgSize="cover">
        <Box
          bgImage={image}
          bgSize="cover"
          minH={"95vh"}
          bgPosition="center"
          color="beige"
          width="100%"
          margin="0"
          padding="0"
        >
          <Box bg="rgba(0, 0, 0, 0.6)" p={4}>
            <Flex justify="space-between" align="center">
              <Heading as="h1" size="xl">
                CarFinder
              </Heading>
              <HStack spacing={4}>
                <Button
                  variant="link"
                  colorScheme="whiteAlpha"
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button variant="link" colorScheme="whiteAlpha">
                  About
                </Button>
                <Button variant="link" colorScheme="whiteAlpha">
                  Contact
                </Button>
              </HStack>
            </Flex>
          </Box>
          <Heading as="h2" size="2xl">
            Find Your Dream Car
          </Heading>
          <WrappedComponent {...props} />
        </Box>
        {gallery}
      </Box>
    );
  };
};

export default withBackground;
