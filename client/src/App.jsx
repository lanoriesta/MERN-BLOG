import { Box } from "@chakra-ui/react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateBlogpage from "./pages/CreateBlogpage";
import Blogpage from "./pages/Blogpage";

function App() {
  return (
    <Box bg={"#0B132B"} minH={"100vh"} color={"#fbfcf8"}>
      <Nav />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/create-blog" element={<CreateBlogpage />} />
        <Route path="/blog/:id" element={<Blogpage />} />
      </Routes>
    </Box>
  );
}

export default App;
