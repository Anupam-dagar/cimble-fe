import { Divider, Text, VStack } from "@chakra-ui/react";

const OrganisationGridBox = ({
  organisationName,
  numProjects,
}: {
  organisationName: string;
  numProjects: number;
}) => {
  return (
    <VStack justify="center" h="100%">
      <Text fontSize="2xl">{organisationName}</Text>
      <Divider width={"50%"} />
      <Text fontSize="xl">{numProjects} Projects</Text>
    </VStack>
  );
};

export default OrganisationGridBox;
