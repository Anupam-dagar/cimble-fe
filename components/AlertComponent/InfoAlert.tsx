import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
  Code,
  Flex,
  Input,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import React from "react";
import BlurOverlay from "../Overlays/BlurOverlay";

const InfoAlert = ({
  isOpen,
  onClose,
  apiKey,
}: {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const { hasCopied, onCopy } = useClipboard(apiKey);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="3xl"
    >
      <BlurOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Your Api Key
          </AlertDialogHeader>

          <AlertDialogBody>
            <Alert status="info">
              <AlertIcon />
              Please save the api key now. You won't be able to see this later.
            </Alert>
            <br />
            <Flex mb={2}>
              <Input
                variant="filled"
                isReadOnly
                placeholder="api key"
                value={apiKey}
              />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </BlurOverlay>
    </AlertDialog>
  );
};

export default InfoAlert;
