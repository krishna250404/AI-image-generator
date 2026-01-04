import styled from "styled-components"
import Button from "./button"
import TextInput from "./textinput"
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { CreatePost, GenerateAIImage } from "../api";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
const Imgform = styled.div`
flex: 1;
display: flex;
padding: 16px 20px;
flex-direction: column;
gap: 20px;
justify-content: flex-start;
`;
const Top = styled.div`

display: flex;
flex-direction: column;
gap: 6px;

`;
const Title = styled.div`

font-size: 28px;
font-weight: 500;
color: ${({theme})=>theme.text_primary};

`;
const Desc = styled.div`
font-size: 17px;
font-weight: 400;
color: ${({theme})=>theme.text_secondary};
`;
const Body = styled.div`
display: flex;
flex-direction: column;
gap: 18px;
font-size: 12px;
font-weight: 400;
color: ${({theme})=>theme.text_secondary};
`;
const Actions = styled.div`
flex: 1;
display: flex;
gap: 8px;
`;

const Form = ({
        post,
        setPost,
        postloading,
        genimageloading,
        setPostloading,
        setGenimageloading,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const genimagefun= async ()=>{
        setGenimageloading(true);
        await GenerateAIImage({
            prompt: post.prompt
        }).then((res)=>{
            setPost({...post, photo: `data:image/jpeg;base64, ${res.data?.photo}`});
            setGenimageloading(false);
        }).catch((error)=>{
            setError(error?.response?.data?.message);
            setGenimageloading(false);
        });

    };
    const createpostfun= async () =>{
        setPostloading(true);
         await CreatePost({
            post
        }).then((res)=>{
            setPost({...post, photo: `data:image/jpeg;base64, ${res.data?.photo}`});
            setPostloading(false);
            navigate("/");
        }).catch((error)=>{
            setError(error?.response?.data?.message);
            setPostloading(false);
        });
    };
    return(
    <Imgform>
    <Top>
        <Title>Generate Image with Prompt</Title>
        <Desc>
            Write your prompt according to the image you want
        </Desc>
    </Top>
    {error && <div style={{color: "red"}}>{error}</div>}
    **You can post the AI generated image to the Community**
    <Body>
        <TextInput
        label="author"
        placeholder="Enter your name..."
        name="author"
        value={post.author}
        handelChange={(e)=>setPost({...post, author: e.target.value})}
        />
        <TextInput
        label="prompt"
        placeholder="Enter your Prompt..."
        name="prompt"
        rows="8"
        textArea
        value={post.prompt}
        handelChange={(e)=>setPost({...post, prompt: e.target.value})}
        />
    </Body> 
    <Actions>
        <Button 
        text = "Generate image"
        flex 
        leftIcon={<AutoAwesome />} 
        isLoading={genimageloading}
        isDisabled={post.prompt ===""}
        onClick={()=>genimagefun()}
        />
        <Button 
        text = "Post" 
        flex
        type="secondary"
        leftIcon={<CreateRounded />} 
        isLoading={postloading}
        isDisabled={post.author==="" 
            || post.prompt ==="" 
            || post.photo ===""}
        onClick={()=>createpostfun()}
        />
    </Actions>
    </Imgform>
);}
export default Form