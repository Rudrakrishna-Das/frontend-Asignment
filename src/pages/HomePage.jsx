import { Button, Flex } from "@chakra-ui/react";
import SaleOrderModal from "../components/SaleOrderModal";
import ActiveSalesData from "../components/ActiveSalesData";
import { useState } from "react";

const HomePage = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <>
      <Flex justifyContent="space-between" m="2rem">
        <Flex gap="2rem">
          <Button
            onClick={() => setOrderOpen((prevState) => !prevState)}
            colorScheme="blue"
          >
            Active Sale Order
          </Button>
          <Button colorScheme="blue">Completed Sale Order</Button>
        </Flex>
        <SaleOrderModal />
      </Flex>
      {orderOpen && <ActiveSalesData />}
    </>
  );
};

export default HomePage;
