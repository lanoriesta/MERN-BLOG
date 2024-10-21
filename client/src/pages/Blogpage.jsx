import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  useDisclosure,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBlogStore from "../store/blog";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import UpdateBlogModal from "../components/UpdateBlogModal.jsx";

const Blogpage = () => {
  const { id } = useParams();
  const { blogs, fetchBlogs, deleteBlog } = useBlogStore();
  const blog = blogs.filter((blog) => blog._id === id);
  const toast = useToast();
  const navigate = useNavigate();

  const dateFormat = (dateTime) => {
    const date = new Date(dateTime);

    let hours = date.getHours();
    hours = ("0" + hours).slice(-2);
    const mins = date.getMinutes();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const dateNum = date.getDate();

    return `${day}, ${month} ${dateNum}, ${year} at ${hours}:${mins}`;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const hanldeDeleteBlog = async (id) => {
    const { success, message } = await deleteBlog(id);

    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
        variant: "left-accent",
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
        variant: "left-accent",
      });
    }
    navigate("/");
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <Container maxW={"1080px"} h={"full"}>
      <Link to={"/"}>
        <ChevronLeftIcon ml={"-10px"} boxSize={5} fontWeight={"light"} /> back
      </Link>
      {!blog || blog.length === 0 ? null : (
        <>
          <Box
            mt={5}
            h={250}
            boxShadow={"dark-lg"}
            transition={"all .5s ease-in-out"}
            _hover={{ height: "400px" }}
          >
            <Image
              rounded={"md"}
              src={blog[0].image}
              w={"full"}
              h={"full"}
              objectFit={"cover"}
            />
          </Box>

          <Box
            py={5}
            px={5}
            my={5}
            h={"full"}
            w={"full"}
            flex={1}
            bg={"#1E263C"}
            rounded={"md"}
            boxShadow={"dark-lg"}
          >
            <Heading
              color={"#6FFFE9"}
              as={"h1"}
              fontWeight={"light"}
              textAlign={"left"}
              letterSpacing={5}
              textTransform={"uppercase"}
              fontSize={30}
            >
              {blog[0].title}
            </Heading>
            <Text
              fontSize={12}
              opacity={0.5}
              fontStyle={"italic"}
              letterSpacing={1}
              pb={3}
            >
              {dateFormat(blog[0].createdAt)}
            </Text>
            <Text
              letterSpacing={1}
              fontWeight={"light"}
              whiteSpace={"pre-wrap"}
            >
              {blog[0].description}
            </Text>
          </Box>
          <HStack>
            <Button bg={"#5BC0BE"} color={"white"} onClick={onOpen} w={"150px"}>
              Edit
            </Button>
            <Button
              bg={"#1C2541"}
              onClick={() => hanldeDeleteBlog(blog[0]._id)}
              w={"150px"}
            >
              Delete
            </Button>
          </HStack>

          <UpdateBlogModal isOpen={isOpen} onClose={onClose} blog={blog[0]} />
        </>
      )}
    </Container>
  );
};

export default Blogpage;
