import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";

const Projects = () => {
  return (
    <>
      <Flex
        bg={"white"}
        position={"absolute"}
        boxShadow="md"
        borderColor="transparent"
        borderWidth="1.5px"
        transitionDelay="0s, 0s, 0s, 0s"
        transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
        transition-property="box-shadow, background-color, filter, border"
        transitionTimingFunction="linear, linear, linear, linear"
        alignItems={{ xl: "center" }}
        borderRadius="16px"
        display="flex"
        minH="65px"
        justifyContent={{ xl: "left" }}
        lineHeight="25.6px"
        mx="auto"
        pb="8px"
        right={{
          sm: "20px",
          xl: "30px",
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
        w={{ sm: "calc(100vw - 50px)", xl: "calc(100vw - 75px - 275px)" }}
      >
        <Table variant="unstyled" size={"lg"}>
          <TableCaption>X Configurations in Y Projects</TableCaption>
          <Thead>
            <Tr>
              <Th>S. No.</Th>
              <Th>Name</Th>
              <Th isNumeric>Configurations</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Project 1</Td>
              <Td isNumeric>0</Td>
              <Td>Actions</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Project 2</Td>
              <Td isNumeric>2</Td>
              <Td>Actions</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Project 3</Td>
              <Td isNumeric>10</Td>
              <Td>Actions</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Projects;
