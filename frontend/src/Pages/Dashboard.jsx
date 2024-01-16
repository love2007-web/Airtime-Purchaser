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

const Dashboard = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        w={"100%"}
        bg={"white"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded" colorScheme="orange">
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Login
            </TabPanel>
            <TabPanel>
              Rgister
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Dashboard