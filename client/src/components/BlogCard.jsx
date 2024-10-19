import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <Box bg={"#1C2541"} rounded={"md"} boxShadow={"md"}>
      <Box overflow={"hidden"} roundedTop={"md"}>
        <Link to={`/blog/${blog._id}`}>
          <Image
            roundedTop={"md"}
            transition={"all .2s ease-in-out"}
            src={blog.image}
            w={"full"}
            h={40}
            objectFit={"cover"}
            _hover={{ transform: "scale(1.1, 1.1)" }}
          />
        </Link>
      </Box>
      <Box p={5}>
        <Heading fontWeight={"light"} letterSpacing={5} fontSize={30}>
          {blog.title}
        </Heading>
        <Text noOfLines={2} mt={3} opacity={0.5}>
          {blog.description}
        </Text>
        <Link to={`/blog/${blog._id}`}>
          <Text color={"#6FFFE9"}>read more...</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default BlogCard;
