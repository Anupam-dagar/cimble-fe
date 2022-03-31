import { Box, Image, Stack, Text } from "@chakra-ui/react";
import Separator from "../Separator/separator";
import SidebarButton from "./sidebarButton";
import routes from "../../routes";

const SidebarContent = ({ projectId }: { projectId: string }) => {
  return (
    <>
      <Box pt={"25px"} mb="12px">
        <Text
          display="flex"
          lineHeight="100%"
          mb="30px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          <Image w="32px" h="32px" me="10px" src="/images/cimbleC.png" />
          <Text fontSize="md" mt="3px">
            CIMBLE
          </Text>
        </Text>
        <Separator />
      </Box>

      <Stack direction="column" mb="40px">
        <Box>
          {routes.map((route, index) => {
            if (route.separator) {
              return (
                <>
                  <Separator />
                  <SidebarButton
                    key={index}
                    title={route.name}
                    path={route.path}
                    projectId={projectId}
                  />
                </>
              );
            }
            return (
              <SidebarButton
                key={index}
                title={route.name}
                path={route.path}
                projectId={projectId}
              />
            );
          })}
        </Box>
      </Stack>
    </>
  );
};

export default SidebarContent;
