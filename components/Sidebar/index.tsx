import { Box } from "@chakra-ui/react";
import SidebarContent from "./sidebarContent";

const Sidebar = () => {
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";

  return (
    <Box>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg="gray.50"
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
        >
          <SidebarContent />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
