import react from 'react'
import styled from 'styled-components';
import Form from "../components/form";
import Generatedimagecard from "../components/generatedimagecard"
import { useState } from 'react';
const Container = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  background: ${({theme})=>theme.bg};
  padding: 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding-top: 50px;
  @media (max-width: 768px){
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
width: 100%;
max-width: 1200px;
height: fit-content;
gap: 8px;
display: flex;
justify-content: center;
@media (max-width: 768px){
    flex-direction: column;
}
`;

const Create = () =>{
    const[genimageloading, setGenimageloading]=useState(false);
    const[postloading, setPostloading]=useState(false);    
    const [post, setPost]=useState({
        author: "",
        prompt: "",
        photo: "",
    });
    return (
    <Container>
        <Wrapper>
            <Form 
            post={post} 
            setPost={setPost} 
            postloading = {postloading} 
            genimageloading={genimageloading}
            setPostloading={setPostloading}
            setGenimageloading={setGenimageloading}
            />
            <br />
            <br />
            <Generatedimagecard src={post?.photo} loading={genimageloading} />
        </Wrapper>
    </Container>
);};
export default Create;