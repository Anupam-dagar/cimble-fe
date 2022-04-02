import HomeLayout from "../layouts/HomeLayout";
import { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";
import {
  invalidateUserAuthentication,
  parseDataFromCookie,
} from "../utils/auth";
import HomeFlexCard from "../components/Cards/HomeFlexCard";

const Home = () => {
  return <HomeFlexCard>Dashboard</HomeFlexCard>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout
      projectId={page.props.projectId}
      projectName={page.props.projectName}
      organisationName={page.props.organisationName}
    >
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken, projectId, projectName, organisationName } =
    parseDataFromCookie(context.req.headers.cookie);

  if (!token) {
    return invalidateUserAuthentication();
  }

  return {
    props: {
      projectId: projectId ?? null,
      projectName: projectName ?? null,
      organisationName: organisationName ?? null,
    },
  };
};

export default Home;
