import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = () => {
    if (userName === "user" && password === "password") {
      addUser();
      navigate("/");
    }
  };
  return (
    <Box w="40%" m="auto" mt="15rem">
      <Stack>
        <Input
          variant="outline"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          variant="outline"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={loginHandler}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
