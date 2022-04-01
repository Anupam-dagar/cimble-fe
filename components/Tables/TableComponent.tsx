// import {
//   Table,
//   TableCaption,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";
// import { useContext, useEffect, useState } from "react";
// import { TableType } from "../../constants/enum";
// import { ConfigurationsModel } from "../../models/configurations";
// import {
//   ConfigurationContextModel,
//   OrganisationContextModel,
//   ProjectContextModel,
// } from "../../models/contextModel";
// import { OrganisationModel } from "../../models/organisation";
// import { ProjectModel } from "../../models/project";
// import ConfigurationsContext from "../../store/configurationsContext";
// import OrganisationsContext from "../../store/organisationsContext";
// import ProjectsContext from "../../store/projectsContext";

// const TableComponent = <
//   T extends ProjectModel[] | OrganisationModel[] | ConfigurationsModel[]
// >({
//   data,
//   onClick,
//   type,
// }: {
//   data: T;
//   onClick: () => {};
//   type: TableType;
// }) => {
//   const [stateData, setStateData] = useState<T>(data);

//   let context:
//     | OrganisationContextModel
//     | ProjectContextModel
//     | ConfigurationContextModel;
//   const total = stateData.length;
//   let subTotal = 0;
//   let subType: TableType | null = null;

//   switch (type) {
//     case TableType.ORGANISATIONS: {
//       context = useContext(OrganisationsContext);
//       subTotal = (data as OrganisationModel[]).reduce(
//         (subTotal, curr) => subTotal + curr.projectsCount,
//         0
//       );
//       subType = TableType.PROJECTS;
//       break;
//     }
//     case TableType.PROJECTS: {
//       context = useContext(ProjectsContext);
//       subTotal = (data as ProjectModel[]).reduce(
//         (subTotal, curr) => subTotal + curr.configurationsCount,
//         0
//       );
//       subType = TableType.CONFIGURATIONS;
//       break;
//     }
//     case TableType.CONFIGURATIONS: {
//       context = useContext(ConfigurationsContext);
//       break;
//     }
//   }

//   useEffect(() => {
//     switch (type) {
//       case TableType.ORGANISATIONS: {
//         (context as OrganisationContextModel).setOrganisations(
//           data as OrganisationModel[]
//         );
//         break;
//       }
//       case TableType.PROJECTS: {
//         (context as ProjectContextModel).setProjects(data as ProjectModel[]);
//         break;
//       }
//       case TableType.CONFIGURATIONS: {
//         (context as ConfigurationContextModel).setConfigurations(
//           data as ConfigurationsModel[]
//         );
//         break;
//       }
//     }
//   }, []);

//   useEffect(() => {
//     switch (type) {
//       case TableType.ORGANISATIONS: {
//         setStateData((context as OrganisationContextModel).organisations as T);
//         break;
//       }
//       case TableType.PROJECTS: {
//         setStateData((context as ProjectContextModel).projects as T);
//         break;
//       }
//       case TableType.CONFIGURATIONS: {
//         setStateData(
//           (context as ConfigurationContextModel).configurations as T
//         );
//         break;
//       }
//     }
//   }, [context]);

//   const parseTableHeadRow = (data: T) => {
//     switch (type) {
//       case TableType.ORGANISATIONS: {
//         setStateData((context as OrganisationContextModel).organisations as T);
//         break;
//       }
//       case TableType.PROJECTS: {
//         setStateData((context as ProjectContextModel).projects as T);
//         break;
//       }
//       case TableType.CONFIGURATIONS: {
//         setStateData(
//           (context as ConfigurationContextModel).configurations as T
//         );
//         break;
//       }
//     }
//   };

//   return (
//     <Table variant="unstyled" size={"lg"}>
//       <TableCaption>
//         Total {subType && `${subTotal} ${subType} in`} {total} {type}
//       </TableCaption>
//       <Thead>
//         <Tr>
//           <Th>S. No.</Th>
//           <Th>Name</Th>
//           <Th isNumeric>{type}</Th>
//           <Th>Date of Creation</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {stateData.map((project, index) => {
//           return (
//             <Tr
//               _hover={{ bg: "gray.100", cursor: "pointer" }}
//               onClick={() => selectProject(project.id)}
//             >
//               <Td>{index + 1}</Td>
//               <Td>{project.name}</Td>
//               <Td isNumeric>{project.configurationsCount ?? 0}</Td>
//               <Td>{new Date(project.createdAt).toDateString()}</Td>
//             </Tr>
//           );
//         })}
//         <Tr>
//           <Td
//             bg={"teal.200"}
//             borderRadius={16}
//             colSpan={4}
//             _hover={{ bg: "teal.300", cursor: "pointer" }}
//             textAlign="center"
//             onClick={onClick}
//           >
//             Create Project
//           </Td>
//         </Tr>
//       </Tbody>
//     </Table>
//   );
// };

// export default TableComponent;
