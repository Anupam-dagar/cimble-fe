import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const AlertComponent = ({
  title,
  link,
  linkText,
}: {
  title: string;
  link: string;
  linkText: string;
}) => {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      position={"absolute"}
      boxShadow="md"
      borderColor="transparent"
      borderWidth="1.5px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      borderRadius="16px"
      display="flex"
      minH="65px"
      lineHeight="25.6px"
      mx="auto"
      pb="8px"
      right={{
        lg: "30px",
      }}
      px={{
        sm: "15px",
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt={{
        sm: "16px",
        xl: "8px",
      }}
      top="120px"
      w={{ base: "100%", lg: "calc(100vw - 75px - 275px)" }}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Link href={link}>
          <Button colorScheme={"teal"} mt={2}>
            {linkText}
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
