import { CircularProgress } from "@mui/material";
import styled from "styled-components";
const Container = styled.div`
flex: 1;
display: flex;
gap:16px;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 16px;
border: 2px dashed ${({theme})=>theme.yellow};
color: ${({theme})=>theme.arrow + 80};
border-radius:20px;
`;
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 24px;
background: ${({theme})=>theme.grey + 50};
`;
const Generatedimagecard = ({src, loading}) =>{
    return (
    <Container>
        {
            loading ? (
            <>
                <CircularProgress style={{color: "inherit", width: "24px", height: "24px" }} />
                <>Generating the Image....</>
            </>
            ) : (<>{
            
                src ? <Image src={src} /> : <>Write a prompt to generate</>

            }</>)
        }
    </Container>
    );
}
export default Generatedimagecard