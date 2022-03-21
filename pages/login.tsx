import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import api from "../constants/api";
import { LoginResponse } from "../models/loginResponse";

const LoginPage: NextPage = () => {
  const [errorMessage, setError] = useState<string | null>(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    const data = {
      email,
      password,
    };

    let loginResponse;
    try {
      ({ data: loginResponse } = await axios.post<LoginResponse>(
        api.LOGIN_URL,
        data
      ));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? `Something went wrong.`;
      console.log(`error logging in user: ${error}`);
      setError(errorMessage);

      return;
    }

    localStorage.setItem("token", loginResponse.token);
    localStorage.setItem("refreshToken", loginResponse.refreshToken);

    Router.replace("/");
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailInvalid(e.target.value === "");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordInvalid(e.target.value === "");
  };

  return (
    <Center
      bgGradient="linear(to-tr, #7AE7C7, #FFD3BA)"
      w="100%"
      maxWidth="100%"
      h="100vh"
    >
      <Box boxShadow="dark-lg" bg="gray.50" w="md">
        <Image src="/images/cimbletemplogo.png" alt="logo" />
        <FormControl
          p={6}
          isRequired
          isInvalid={isEmailInvalid || isPasswordInvalid}
        >
          <VStack spacing="2">
            <Container w="full">
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                borderRadius={50}
                id="email"
                type="email"
                onChange={onEmailChange}
                isInvalid={isEmailInvalid}
              />
              {isEmailInvalid && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderRadius={50}
                id="password"
                type="password"
                onChange={onPasswordChange}
                isInvalid={isPasswordInvalid}
              />
              {isPasswordInvalid && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full" pt={4}>
              <Button
                w="full"
                borderRadius={50}
                colorScheme="teal"
                variant="solid"
                onClick={login}
              >
                Login
              </Button>
              <Text fontSize="md" mt={4}>
                Don&apos;t have an account?{" "}
                <Link href="/signup">
                  <Button colorScheme="teal" variant="link">
                    Register Now
                  </Button>
                </Link>
              </Text>
            </Container>
          </VStack>
        </FormControl>
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </Box>
    </Center>
  );
};

export default LoginPage;
