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
import Router from "next/router";
import React, { useContext, useState } from "react";
import { refreshLogin, refreshNextLogin } from "../../apicalls/auth";
import { editOrganisationApi } from "../../apicalls/organisations";
import api from "../../constants/api";
import { OrganisationModel } from "../../models/organisation";
import OrganisationsContext from "../../store/organisationsContext";
import { clearCookies } from "../../utils/auth";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import BlurOverlay from "../Overlays/BlurOverlay";

const EditOrganisationModal = ({
  isOpen,
  onOpen,
  onClose,
  organisationName,
  id,
}: any) => {
  const [name, setName] = useState(organisationName);
  const organisationContext = useContext(OrganisationsContext);
  const toast = useToast();

  const editOrganisation = async (event: any) => {
    const data = {
      name,
    };
    const notificationId = createNotification(
      toast,
      "Organisation",
      "Updating"
    );
    let result;
    try {
      result = (await editOrganisationApi(id, data, Cookies.get("token") ?? ""))
        .data;
    } catch (err: any) {
      if (err.response.status === 403) {
        try {
          let refreshLoginResult;
          try {
            refreshLoginResult = (await refreshNextLogin()).data;
          } catch (err: any) {
            clearCookies();
            Router.replace("/login");
            return;
          }
          result = (
            await editOrganisationApi(id, data, refreshLoginResult.token)
          ).data;
        } catch (err: any) {
          throw err;
        }
      }
    }
    updateNotification(notificationId, toast, "Organisation", "update");
    if (result) {
      organisationContext.editOrganisation(result);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <BlurOverlay />
      <ModalContent>
        <ModalHeader>Edit Organisation</ModalHeader>
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
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={editOrganisation} isDisabled={name.length === 0}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOrganisationModal;
