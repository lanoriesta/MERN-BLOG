import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useBlogStore from "../store/blog.js";
import { useToast } from "@chakra-ui/react";

const CreateBlogpage = () => {
  const toast = useToast();

  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { createBlog } = useBlogStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await createBlog(newBlog);

    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "left-accent",
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "left-accent",
      });
    }

    console.log(success);
    console.log(message);
    setNewBlog({ title: "", description: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"} py={10}>
      <Heading
        as={"h1"}
        fontWeight={"light"}
        textAlign={"center"}
        letterSpacing={5}
        textTransform={"uppercase"}
        fontSize={30}
      >
        Create <span style={{ color: "#6FFFE9" }}>Blog</span>
      </Heading>
      <Box py={10}>
        <form onSubmit={handleFormSubmit}>
          <FormControl isRequired>
            <FormLabel
              textTransform={"uppercase"}
              letterSpacing={3}
              mt={5}
              fontWeight={"light"}
            >
              Title
            </FormLabel>
            <Input
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              name="title"
              focusBorderColor="#5BC0BE"
              variant={"flushed"}
            />

            <FormLabel
              textTransform={"uppercase"}
              letterSpacing={3}
              mt={5}
              fontWeight={"light"}
            >
              Description
            </FormLabel>
            <Textarea
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              name="description"
              focusBorderColor="#5BC0BE"
              variant={"flushed"}
              size="sm"
            />
            <FormLabel
              textTransform={"uppercase"}
              letterSpacing={3}
              mt={5}
              fontWeight={"light"}
            >
              Image URL
            </FormLabel>
            <Input
              value={newBlog.image}
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.value })
              }
              name="image"
              focusBorderColor="#5BC0BE"
              variant={"flushed"}
            />
            <Button
              type="submit"
              size={"lg"}
              w={"full"}
              my={10}
              variant={"solid"}
              bg={"#5BC0BE"}
            >
              Add
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlogpage;
