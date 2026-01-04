import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/themes";
import Home from "./pages/home";
import Create from "./pages/create";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/navbar";
const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
backgroung: ${({theme}) => theme.bg};
color: ${({theme})=>theme.text_primary};
overflow-x: hidden;
overflow-y: hidden;
transition: 0.2s ease;
`;
const Wrapper = styled.div`
height: 100%;
postition: relative;
flex-direction: column;
justify-content: space-between;
flex: 3;
`;
function App() {
  return (
    <ThemeProvider theme = {lightTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/post" element={<Create/>} exact />
          </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
