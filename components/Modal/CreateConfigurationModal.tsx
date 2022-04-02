import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import ConfigurationsContext from "../../store/configurationsContext";
import BlurOverlay from "../Overlays/BlurOverlay";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import { createConfigurationsApi } from "../../apicalls/configurations";
import { refreshLogin, refreshNextLogin } from "../../apicalls/auth";

const CreateConfigurationModal = ({ isOpen, onOpen, onClose }: any) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const configurationsContext = useContext(ConfigurationsContext);
  const toast = useToast();

  const createConfiguration = async (event: any) => {
    const data = {
      name,
      info,
    };
    const notificationId = createNotification(
      toast,
      "Configuration",
      "Creating"
    );
    let result;
    try {
      result = (
        await createConfigurationsApi(
          Cookies.get("projectId") ?? "",
          data,
          Cookies.get("token") ?? ""
        )
      ).data;
    } catch (err: any) {
      if (err.response.status === 403) {
        try {
          const refreshLoginResult = (await refreshNextLogin()).data;
          result = (
            await createConfigurationsApi(
              Cookies.get("projectId") ?? "",
              data,
              refreshLoginResult.token
            )
          ).data;
        } catch (err: any) {
          throw err;
        }
      }
    }
    updateNotification(notificationId, toast, "Configuration", "create");
    if (result) {
      configurationsContext.addConfiguration(result);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Create a configuration</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={name.length === 0}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name of the configuration key"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel htmlFor="name">Data</FormLabel>
            <Input
              id="data"
              type="text"
              placeholder="Data of the configuration"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={createConfiguration}
            isDisabled={name.length === 0 || info.length === 0}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateConfigurationModal;
