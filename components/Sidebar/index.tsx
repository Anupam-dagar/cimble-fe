import { Box } from "@chakra-ui/react";
import { parseDataFromCookie } from "../../utils/auth";
import SidebarContent from "./sidebarContent";

const Sidebar = ({ projectId }: { projectId: string }) => {
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";

  return (
    <Box>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg="white"
          transition="0.2s linear"
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
          boxShadow="md"
        >
          <SidebarContent projectId={projectId} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
