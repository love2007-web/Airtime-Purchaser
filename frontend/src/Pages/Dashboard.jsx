import React from 'react'
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Airtime from '../Components/Airtime';
import Data from '../Components/Data';

const Dashboard = () => {
  return (
    <Container maxW="100%" centerContent>
      <Box
        w={"100%"}
        bg={"white"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        mt={4}
      >
        <Tabs variant="soft-rounded" colorScheme="orange">
          <TabList>
            <Tab w={"50%"}>Airtime</Tab>
            <Tab w={"50%"}>Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Airtime/>
            </TabPanel>
            <TabPanel>
              <Data/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Dashboard