import { ReactElement } from "react";
import AlertComponent from "../../components/AlertComponent";
import HomeLayout from "../../layouts/HomeLayout";
import {
  invalidateUserAuthentication,
  parseDataFromCookie,
} from "../../utils/auth";

const Configurations = () => {
  return (
    <AlertComponent
      title="No project selected!"
      link="/projects"
      linkText="Select a project to continue"
    />
  );
};

Configurations.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout projectId={page.props.projectId}>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, projectId } = parseDataFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  if (projectId) {
    return {
      redirect: {
        destination: `/configurations/${projectId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Configurations;
