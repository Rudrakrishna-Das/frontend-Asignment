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
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { MultiSelect } from "chakra-multiselect";
import { fetchFakeData } from "../../productData";
import { UserContext } from "../store/UserContext";

const SaleOrderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fakeData"],
    queryFn: fetchFakeData,
  });
  const [productData, setProductData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [allProductsData, setAllProductsData] = useState({});
  const [errorSellingPrice, setErrorSellingPrice] = useState(null);
  const [errorQuantity, setErrorQuantity] = useState(null);

  const { user, allProducts, addProducts, addSalesData } =
    useContext(UserContext);

  useEffect(() => {
    if (data && data.length > 0) {
      const productNames = data.map((item) => ({
        label: item.name,
        value: item.name,
      }));

      const p = {};
      for (let i = 0; i < data.length; i++) {
        p[data[i].name] = data[i].sku.map((item) => ({
          ...item,
          prevQuantity: item.quantity_in_inventory,
        }));
      }

      addProducts(p);
      setProductData(productNames);
    }
  }, [data]);
  const handleSelectionChange = (selected) => {
    setSelectedProducts(selected);
    setProductNames(selected.map((item) => item.label));
  };
  const onSellingPriceChange = (id, e) => {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      "(" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ")";
    setErrorSellingPrice(null);
    setAllProductsData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        sellingPrice: e.target.value,
        coustomeName: user,
        lastModified: datetime,
      },
    }));
  };
  const onTotalQuantityChange = (id, e) => {
    setErrorQuantity(null);
    setAllProductsData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        quantity: e.target.value,
        mainProduct: productNames[productNames.length - 1],
      },
    }));
  };

  const submitHandler = () => {
    for (const allprod in allProductsData) {
      const subData = allProductsData[allprod];
      const mainProd = allProducts[subData.mainProduct];
      const correctProd = mainProd.find((p) => +p.id === +allprod);
      if (+correctProd.max_retail_price < +subData.sellingPrice) {
        setErrorSellingPrice(`For sku ${allprod} your selling price is high`);
        return;
      }
      if (+correctProd.quantity_in_inventory < +subData.quantity) {
        setErrorQuantity(`For sku ${allprod} not have that much quantity`);
        return;
      }
      if (!allProductsData[allprod]["done"]) {
        allProductsData[allprod]["prevQty"] = correctProd.quantity_in_inventory;
        allProductsData[allprod]["done"] = true;
        correctProd.quantity_in_inventory -= +subData.quantity;
      }
    }

    // for (const allprod in allProductsData) {
    //   const subData = allProductsData[allprod];
    //   const mainProd = allProducts[subData.mainProduct];
    //   const correctProd = mainProd.find((p) => +p.id === +allprod);

    //   allProductsData[allprod]["prevQty"] = correctProd.quantity_in_inventory;
    //   correctProd.quantity_in_inventory -= +subData.quantity;
    // }
    const orders = [];
    for (const prod in allProductsData) {
      orders.push({
        ...allProductsData[prod],
        paid: "Not paid",
        id: prod,
      });
    }
    addSalesData(orders);
    onClose();
  };
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        + Sale order
      </Button>

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />x
        <ModalContent>
          <ModalHeader>All products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorSellingPrice && (
              <p
                style={{ textAlign: "center", fontWeight: "800", color: "red" }}
              >
                {errorSellingPrice}
              </p>
            )}
            {errorQuantity && (
              <p
                style={{ textAlign: "center", fontWeight: "800", color: "red" }}
              >
                {errorQuantity}
              </p>
            )}
            {productData.length > 0 && (
              <MultiSelect
                options={productData}
                value={selectedProducts}
                onChange={handleSelectionChange}
                placeholder="Select products"
                isMulti
              />
            )}
            {productNames.length > 0 &&
              allProducts[productNames[productNames.length - 1]].map((prod) => (
                <Box
                  border="1px"
                  borderColor="gray.500"
                  borderRadius="lg"
                  key={prod.id}
                  p="8px"
                  m="4px"
                >
                  <Flex justifyContent="space-between">
                    <h1>
                      SKU {prod.id} ({prod.quantity_in_inventory} {prod.unit})
                    </h1>
                    <h1
                      style={{
                        backgroundColor: "gray",
                        padding: "1px 4px",
                        borderRadius: "8px",
                        margin: "2px",
                      }}
                    >
                      Rate:₹{prod.selling_price}
                    </h1>
                  </Flex>
                  <hr />
                  <Flex justifyContent="space-between" gap="5px">
                    <Box flexGrow="1">
                      <h1>Selling Rate (max:{prod.max_retail_price})</h1>
                      <Input
                        onChange={(event) =>
                          onSellingPriceChange(prod.id, event)
                        }
                        placeholder="Enter selling rate"
                        type="number"
                        max={prod.max_retail_price}
                      />
                    </Box>
                    <Box flexGrow="1">
                      <h1>Total Items</h1>
                      <Input
                        placeholder="Enter selling rate"
                        onChange={(e) => onTotalQuantityChange(prod.id, e)}
                        max={prod.quantity_in_inventory}
                      />
                    </Box>
                  </Flex>
                  <Flex justifyContent="flex-end">
                    <p
                      style={{
                        backgroundColor: "green",
                        padding: "2px 6px",
                        marginTop: "-6px",
                        borderRadius: "8px",
                        zIndex: "1",
                      }}
                    >
                      {prod.quantity_in_inventory} item
                      {prod.quantity_in_inventory <= 1 ? "" : "s"} Remaining
                    </p>
                  </Flex>
                </Box>
              ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitHandler}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaleOrderModal;
