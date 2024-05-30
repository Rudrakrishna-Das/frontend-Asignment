import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { MultiSelectTheme } from "chakra-multiselect";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "gray.800")(props),
    },
  }),
};

const theme = extendTheme({
  components: { MultiSelect: MultiSelectTheme },
  config,
  styles,
});

export default theme;
