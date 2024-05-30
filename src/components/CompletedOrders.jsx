import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

const CompletedOrders = () => {
  const { paidData } = useContext(UserContext);

  return (
    <>
      <Box w="95%" margin="20px auto" padding="5px">
        {paidData && paidData.length > 0 ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Coustome Name</Th>
                  <Th>Product Name</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price per piece(₹)</Th>
                  <Th isNumeric>Total Price(₹)</Th>
                  <Th>Last Modified</Th>
                  <Th>Amount Paid</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paidData.map((data) => (
                  <Tr key={data.id}>
                    <Td>{data.id}</Td>
                    <Td>{data.coustomeName}</Td>
                    <Td>{data.mainProduct}</Td>
                    <Td isNumeric>{data.quantity}</Td>
                    <Td isNumeric>{data.sellingPrice}</Td>
                    <Td isNumeric>{data.quantity * data.sellingPrice}</Td>
                    <Td>{data.lastModified}</Td>
                    <Td>{data.paid}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <p>No one Paid</p>
        )}
      </Box>
    </>
  );
};

export default CompletedOrders;
