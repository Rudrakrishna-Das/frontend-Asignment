import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";

const ActiveSalesOrderModal = ({ data }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { salesData, allProducts, addSalesData, addPaidData } =
    useContext(UserContext);

  const formChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const curProduct = allProducts[formData.mainProduct].find(
    (item) => item.id === +formData.id
  );
  const correctProdIndex = salesData.findIndex(
    (item) => +item.id === +formData.id
  );

  const dataSubmitHandler = () => {
    if (+curProduct.max_retail_price < formData.sellingPrice) {
      setError("Selling price too high");
      return;
    }
    if (+curProduct.quantity_in_inventory < formData.quantity) {
      setError("Not much in inventory");
      return;
    }
    const updatedSalesData = [...salesData];
    updatedSalesData[correctProdIndex] = {
      ...updatedSalesData[correctProdIndex],
      coustomeName: formData.coustomeName,
      quantity: formData.quantity,
      sellingPrice: formData.sellingPrice,
      paid: formData.paid,
    };

    const indexallProducts = allProducts[formData.mainProduct].findIndex(
      (item) => item.id === +formData.id
    );

    allProducts[formData.mainProduct][indexallProducts].quantity_in_inventory =
      +formData.prevQty - +formData.quantity;
    const paidData = [];
    for (let i = 0; i < updatedSalesData.length; i++) {
      if (updatedSalesData[i].paid.toLowerCase() === "paid") {
        paidData.push(...updatedSalesData.splice(i, 1));
      }
    }
    addPaidData(paidData);
    addSalesData(updatedSalesData);
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="transparent"
        _hover="none"
        fontSize="30px"
        marginTop="-1.2rem"
        onClick={onOpen}
      >
        ...
      </Button>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {error && (
            <p
              style={{
                textAlign: "center",
                fontWeight: "800",
                color: "red",
                marginTop: "5px",
              }}
            >
              {error}
            </p>
          )}
          <ModalHeader>
            {formData.mainProduct} (sku {formData.id})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Flex justifyContent="space-between" gap="5px" marginBottom="4px">
                <Box flexGrow="1">
                  <h1>Coustomer Name</h1>
                  <Input
                    onChange={formChangeHandler}
                    name="coustomeName"
                    value={formData.coustomeName}
                  />
                </Box>
                <Box flexGrow="1">
                  <h1>Selling Price(Max:{curProduct.max_retail_price})</h1>
                  <Input
                    onChange={formChangeHandler}
                    name="sellingPrice"
                    value={formData.sellingPrice}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" gap="5px" marginBottom="4px">
                <Box flexGrow="1">
                  <h1>
                    Quantity(Available:
                    {curProduct.quantity_in_inventory})
                  </h1>
                  <Input
                    onChange={formChangeHandler}
                    name="quantity"
                    value={formData.quantity}
                  />
                </Box>
                <Box flexGrow="1">
                  <h1>Amount Paid</h1>
                  <Input
                    onChange={formChangeHandler}
                    name="paid"
                    value={formData.paid}
                  />
                </Box>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={dataSubmitHandler}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActiveSalesOrderModal;
