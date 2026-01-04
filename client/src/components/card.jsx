import styled from "styled-components";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Avatar from "@mui/material/Avatar";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver"
const ImageCard = styled.div`
position: relative;
display: flex;
border-radius: 20px;
box-shadow: 1px 2px 40px 8px ${({theme})=>theme.white + 60};
cursor: pointer;
transition: all 0.3s ease;
&:hover{
    boxshadow: px 2px 40px 8px ${({theme})=>theme.white + 80};
    transform: scale(1.05);
  }
&:nth-child(7n+1){
    grid-column: auto/span 2;
    grid-row: auto/span 2;
}
`;
const HoverOverlay = styled.div`
opacity: 0;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 10px;
backdrop-filter: blur(2px);
background: rgba(255, 255, 255, 0.4);
color: ${({theme})=>theme.black};
transition: opacity 0.3s ease;
justify-content: end;
padding: 16px;
${ImageCard}: hover & {
opacity: 1;
border-radius: 6px;
}
`;
const Prompt = styled.div`
font-weight: 400px;
font-size: 15px;
color: ${({theme})=>theme.black};
`;
const Author = styled.div`
font-weight: 600px;
font-size: 14px;
display: flex;
align-items: center;
gap: 8px;
color: ${({theme})=>theme.black};
`;
const Card =({item})=>{
    return( 
    <ImageCard>
        <LazyLoadImage 
        alt={item?.prompt}
        style={{ borderRadius:"12px" }} 
        width="100%" 
        src={item?.photo} />
        <HoverOverlay>
            <Prompt>{item?.prompt}</Prompt>
            <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
            <Author>
                <Avatar sx={{width: "32px", height: "32px"}}>{item?.author[0]}</Avatar>
                {item?.author}
            </Author>
            <DownloadRounded onClick={()=>FileSaver.saveAs(item?.photo, "download.jpg")} />
            </div>
        </HoverOverlay>
    </ImageCard>
    );
}
export default Card