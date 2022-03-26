import { ModalOverlay } from "@chakra-ui/react";

const BlurOverlay = () => {
  return (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
};

export default BlurOverlay;
