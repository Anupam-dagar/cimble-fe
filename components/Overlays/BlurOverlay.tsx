import { ModalOverlay } from "@chakra-ui/react";

const BlurOverlay = ({ children }: any) => {
  return (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    >
      {children}
    </ModalOverlay>
  );
};

export default BlurOverlay;
