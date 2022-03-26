import { SunIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import api from "../../constants/api";

const SidebarButton = (props: { title: string; path: string }) => {
  const router = useRouter();
  const activeBg = useColorModeValue("gray.200", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");

  const activeRoute = (routeName: string) => {
    return router.pathname === routeName ? true : false;
  };

  const handleSidebarButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string
  ) => {
    switch (path) {
      case "/logout": {
        e.preventDefault();
        await axios.post(api.NEXT_LOGOUT_URL);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        Router.replace("/login");
      }
      default: {
        console.log("default");
      }
    }
  };

  return (
    <Link href={props.path}>
      <Button
        boxSize="initial"
        justifyContent="flex-start"
        alignItems="center"
        bg={activeRoute(props.path) ? activeBg : "transparent"}
        mb={{
          xl: "12px",
        }}
        mx={{
          xl: "auto",
        }}
        ps={{
          sm: "10px",
          xl: "16px",
        }}
        py="12px"
        borderRadius="15px"
        w="100%"
        _hover={{}}
        _active={{
          bg: "inherit",
          transform: "none",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: "rgb(0 0 0 / 4%) 0px 7px 11px",
        }}
        onClick={(e) => handleSidebarButtonClick(e, props.path)}
      >
        <Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"12px"}
            bg="teal.300"
            color="white"
            h="30px"
            w="30px"
            me="12px"
          >
            <SunIcon color="inherit" />
          </Flex>
          <Text color={activeColor} my="auto" fontSize="sm">
            {props.title}
          </Text>
        </Flex>
      </Button>
    </Link>
  );
};

export default SidebarButton;
