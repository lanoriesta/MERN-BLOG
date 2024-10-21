import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useBlogStore from "../store/blog.js";
import BlogCard from "../components/BlogCard.jsx";

const Homepage = () => {
  const { fetchBlogs, blogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  console.log(blogs);

  return (
    <Container maxW={"1080px"} py={10}>
      <Heading
        as={"h1"}
        fontWeight={"light"}
        textAlign={"center"}
        letterSpacing={5}
        textTransform={"uppercase"}
        fontSize={30}
      >
        Current {""}
        <span style={{ color: "#6FFFE9" }}>Blog</span>
      </Heading>
      <Box py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={"20px"}>
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Homepage;
