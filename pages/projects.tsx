import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";

const Projects = () => {
  return <></>;
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Projects;
