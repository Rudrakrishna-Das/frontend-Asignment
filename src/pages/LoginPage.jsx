import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginPage = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (userName === "user" && password === "password") {
      addUser();
      navigate("/");
    }
  };
  const passwordShowHandler = () => {
    setShowPassword(true);
  };
  const passwordHideHandler = () => {
    setShowPassword(false);
  };
  return (
    <Box w="40%" m="auto" mt="15rem">
      <form
        onSubmit={loginHandler}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <Input
          variant="outline"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          variant="outline"
          placeholder="Password"
          type={`${showPassword ? "text" : "password"}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ViewIcon
          position="absolute"
          fontSize="1.5rem"
          top="20.8rem"
          right="27rem"
          cursor="pointer"
          zIndex="10"
          display={`${showPassword ? "none" : "block"}`}
          onClick={passwordShowHandler}
        />
        <ViewOffIcon
          position="absolute"
          fontSize="1.5rem"
          top="20.8rem"
          right="27rem"
          cursor="pointer"
          zIndex="10"
          display={`${!showPassword ? "none" : "block"}`}
          onClick={passwordHideHandler}
        />
        <Button colorScheme="blue">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
