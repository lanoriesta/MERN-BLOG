import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Heading,
  ModalContent,
  ModalBody,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useBlogStore from "../store/blog";

const UpdateBlogModal = ({ isOpen, onClose, blog }) => {
  const { updateBlog } = useBlogStore();
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const toast = useToast();

  const handleSubmitUpdateBlog = async (id, blog) => {
    const { success, message } = await updateBlog(blog, id);

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
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
      <ModalOverlay backdropFilter={"blur(5px)"} />
      <ModalContent bg={"#1C2541"} color={"#FFFFFF"}>
        <ModalHeader>
          <Heading
            as={"h1"}
            fontWeight={"light"}
            textAlign={"left"}
            letterSpacing={5}
            textTransform={"uppercase"}
            fontSize={30}
          >
            Edit <span style={{ color: "#6FFFE9" }}>BLOG</span>
          </Heading>
        </ModalHeader>
        <ModalBody>
          <form>
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
                value={updatedBlog.title}
                name="title"
                onChange={(e) =>
                  setUpdatedBlog({ ...updatedBlog, title: e.target.value })
                }
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
                value={updatedBlog.description}
                onChange={(e) =>
                  setUpdatedBlog({
                    ...updatedBlog,
                    description: e.target.value,
                  })
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
                value={updatedBlog.image}
                onChange={(e) =>
                  setUpdatedBlog({ ...updatedBlog, image: e.target.value })
                }
                name="image"
                focusBorderColor="#5BC0BE"
                variant={"flushed"}
              />

              <ModalFooter pt={10}>
                <HStack spacing={3}>
                  <Button
                    onClick={() => {
                      handleSubmitUpdateBlog(blog._id, updatedBlog);
                      onClose();
                    }}
                    boxShadow={"lg"}
                    bg={"#5BC0BE"}
                  >
                    Update
                  </Button>
                  <Button boxShadow={"lg"} onClick={onClose} variant={"ghost"}>
                    Cancel
                  </Button>
                </HStack>
              </ModalFooter>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateBlogModal;
