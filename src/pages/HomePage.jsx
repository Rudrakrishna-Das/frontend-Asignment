import { Button, Flex } from "@chakra-ui/react";
import SaleOrderModal from "../components/SaleOrderModal";
import ActiveSalesData from "../components/ActiveSalesData";
import { useState } from "react";
import CompletedOrders from "../components/CompletedOrders";

const HomePage = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [completedOrderOpen, setCompletedOrderOpen] = useState(false);
  const orderOpenHandler = () => {
    setOrderOpen((prevState) => !prevState);
    setCompletedOrderOpen(false);
  };
  const completedOrderOpenHandler = () => {
    setCompletedOrderOpen((prevState) => !prevState);
    setOrderOpen(false);
  };
  return (
    <>
      <Flex justifyContent="space-between" m="2rem">
        <Flex gap="2rem">
          <Button onClick={orderOpenHandler} colorScheme="blue">
            Active Sale Order
          </Button>
          <Button colorScheme="blue" onClick={completedOrderOpenHandler}>
            Completed Sale Order
          </Button>
        </Flex>
        <SaleOrderModal />
      </Flex>
      {orderOpen && <ActiveSalesData />}
      {completedOrderOpen && <CompletedOrders />}
    </>
  );
};

export default HomePage;
