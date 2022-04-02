import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import routes from "../../routes";
import Separator from "../Separator/separator";
import SidebarButton from "../Sidebar/sidebarButton";

const HamburgerNavbar = ({ projectId }: { projectId: string }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box display={{ base: "block", lg: "none" }}>
      <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton aria-label="Navbar" icon={<HamburgerIcon />} />
        </PopoverTrigger>
        <PopoverContent w="100vw" _focus={{ borderColor: "transparent" }}>
          <PopoverBody>
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
                      responsiveOnClose={onClose}
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
                  responsiveOnClose={onClose}
                />
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default HamburgerNavbar;
