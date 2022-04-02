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
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { refreshLogin, refreshNextLogin } from "../../apicalls/auth";
import { editConfigurationsApi } from "../../apicalls/configurations";
import api from "../../constants/api";
import { ConfigurationsModel } from "../../models/configurations";
import ConfigurationsContext from "../../store/configurationsContext";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import BlurOverlay from "../Overlays/BlurOverlay";

const EditConfigurationModal = ({
  isOpen,
  onOpen,
  onClose,
  configName,
  configInfo,
  id,
}: any) => {
  const [name, setName] = useState(configName);
  const [info, setInfo] = useState(configInfo);
  const configurationsContext = useContext(ConfigurationsContext);
  const toast = useToast();

  const editConfiguration = async (event: any) => {
    const data = {
      name,
      info,
    };
    const notificationId = createNotification(
      toast,
      "Configuration",
      "Updating"
    );
    let result;
    try {
      result = (
        await editConfigurationsApi(
          Cookies.get("projectId") ?? "",
          id,
          data,
          Cookies.get("token") ?? ""
        )
      ).data;
    } catch (err: any) {
      if (err.response.status === 403) {
        try {
          const refreshLoginResult = (await refreshNextLogin()).data;
          result = (
            await editConfigurationsApi(
              Cookies.get("projectId") ?? "",
              id,
              data,
              refreshLoginResult.token
            )
          ).data;
        } catch (err: any) {
          throw err;
        }
      }
    }
    updateNotification(notificationId, toast, "Configuration", "update");
    if (result) {
      configurationsContext.editConfiguration(result);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Edit Configuration</ModalHeader>
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
            onClick={editConfiguration}
            isDisabled={name.length === 0 || info.length === 0}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditConfigurationModal;
