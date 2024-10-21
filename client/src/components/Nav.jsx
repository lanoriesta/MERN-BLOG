import { Box, Container, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Container maxW={"1080px"} py={5} letterSpacing={5}>
      <Flex alignContent={"center"} justifyContent={"space-between"}>
        <Box>
          <Link to={"/"}>
            <Heading textShadow={"0px 0px 5px #6FFFE9"} color={"#6FFFE9"}>
              BLOG
              <Text as={"span"} color={"white"} fontWeight={"light"}>
                APP
              </Text>
            </Heading>
          </Link>
        </Box>
        <Box>
          <Link to={"/create-blog"}>
            <Button
              leftIcon={<AddIcon />}
              color={"#6FFFE9"}
              letterSpacing={2}
              boxShadow={"md"}
              bg={"#1C2541"}
              _hover={{
                bg: "#3A506B",
              }}
            >
              New Blog
            </Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Nav;
