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
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import api from "../constants/api";

const SignupPage: NextPage = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performFieldValidation = (includeNull: boolean) => {
    const value =
      [firstName, lastName, email, password, confirmPassword].some((data) => {
        const result = data === "";
        return result || (includeNull ? data === null : result);
      }) || password !== confirmPassword;
    return value;
  };

  const register = async () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      await axios.post(api.SIGNUP_URL, data);
    } catch (error: any) {
      let errorMessage = `There was an error while registering user.`;
      errorMessage = error?.response?.data?.message ?? errorMessage;
      console.log(`Error registering user: ${errorMessage}`);
      setErrorMessage(errorMessage);

      return;
    }

    Router.push("/login");
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
        <FormControl p={6} isRequired isInvalid={performFieldValidation(false)}>
          <VStack spacing="2">
            <Container w="full">
              <FormLabel htmlFor="first_name">First Name</FormLabel>
              <Input
                borderRadius={50}
                id="first_name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                isInvalid={firstName === ""}
              />
              {firstName === "" && (
                <FormErrorMessage>First Name is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full">
              <FormLabel htmlFor="last_name">Last Name</FormLabel>
              <Input
                borderRadius={50}
                id="last_name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                isInvalid={lastName === ""}
              />
              {lastName === "" && (
                <FormErrorMessage>Last Name is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                borderRadius={50}
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={email === ""}
              />
              {email === "" && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderRadius={50}
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={password === ""}
              />
              {password === "" && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </Container>
            <Container w="full">
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <Input
                borderRadius={50}
                id="password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={
                  confirmPassword === "" || confirmPassword !== password
                }
              />
              {confirmPassword === "" ? (
                <FormErrorMessage>
                  Confirm Password is required.
                </FormErrorMessage>
              ) : confirmPassword !== password ? (
                <FormErrorMessage>
                  Passwords didn&apos;t match.
                </FormErrorMessage>
              ) : null}
            </Container>
            <Container w="full" pt={4}>
              <Button
                w="full"
                borderRadius={50}
                colorScheme="teal"
                variant="solid"
                onClick={register}
                isDisabled={performFieldValidation(true)}
              >
                Register
              </Button>
              <Text fontSize="md" mt={4}>
                Already have an account?{" "}
                <Link href="/login">
                  <Button colorScheme="teal" variant="link">
                    Login Now
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

export default SignupPage;
