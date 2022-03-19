import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <Center
      bgGradient="linear(to-tr, #7AE7C7, #FFD3BA)"
      w="100%"
      maxWidth="100%"
      h="100vh"
    >
      <Box boxShadow="dark-lg" bg="gray.50" w="md">
        <Image src="/images/cimbletemplogo.png" alt="logo" />
        <FormControl p={6}>
          <VStack spacing="2">
            <Container w="full">
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input borderRadius={50} id="email" type="email" />
            </Container>
            <Container w="full">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input borderRadius={50} id="password" type="password" />
            </Container>
            <Container w="full" pt={4}>
              <Button
                w="full"
                borderRadius={50}
                colorScheme="teal"
                variant="solid"
              >
                Login
              </Button>
              <Text fontSize="md" mt={4}>
                Don't have an account?{" "}
                <Button colorScheme="teal" variant="link">
                  Register Now
                </Button>
              </Text>
            </Container>
          </VStack>
        </FormControl>
      </Box>
    </Center>
  );
};

export default LoginPage;
