import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Searchbar from '../components/searchbar'
import Card from '../components/card';
import { CircularProgress } from '@mui/material';
import { GetPosts } from '../api';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const Container = styled.div`

height: 100%;
overflow-y: scroll;
background: ${({theme})=>theme.bg};
padding: 30px 30px;
padding-bottom: 50px;
display : flex;
flex-direction: column;
align-items: center;
gap: 20px;
@meida (max-width: 768px){
    padding 6px 10px;
}
`;
const Headline = styled.div`
font-size: 34px;
font-weight: 500;
color: ${({theme})=>theme.text_primary};
display: flex;
align-items: center
flex-direction: column;
@media(max-widht: 600px){
    font-size: 22px;
}
`;
const Span = styled.div`
font-size: 30px;
font-weight: 800;
color: ${({theme})=>theme.secondary};
@media (max-width: 600px){
    font-size: 20px;
}
`;
const Wrapper = styled.div`
max-width: 1400px;
width: 100%;
padding: 32px 0px;
display: flex;
justify-content: center;
`;
const CardWrapper = styled.div`

display: grid;
gap:20px;
@media(min-width: 1200px){
    grid-template-columns: repeat(4, 1fr);
}
@media(min-width: 640px) and (max-width: 1199px){
    grid-template-columns: repeat(3, 1fr);
}
@media(max-width: 639px){
    grid-template-columns: repeat(2, 1fr);
}
`;
const Home = () =>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [Search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    const getPosts = async () =>{
        setLoading(true);
        await GetPosts().then((res)=>{
            setLoading(false);
            setPosts(res?.data?.data);
            setFilteredPosts(res?.data?.data);
        }).catch((error)=>{
            setError(error?.response?.data?.message);
            setLoading(false);
        });
    };

    useEffect(()=> {
        getPosts();
    },[]);

    //search

    useEffect(()=>{
        if(!Search){
            setFilteredPosts(posts);
        }
        const SearchFilteredPosts = posts.filter((post)=>{
            const promptmatch = post?.prompt?.toLowerCase().includes(
                Search.toString().toLowerCase()
            );
            const authormatch = post?.author?.toLowerCase().includes(
                Search.toString().toLowerCase()
            );
            return promptmatch || authormatch;
        });

        if(Search){
            setFilteredPosts(SearchFilteredPosts);
        }
    }, [posts, Search]);

    return <Container>
        <Headline>
            Explore popular content!
        </Headline>
        <Span>Generated with AI</Span>
        <Searchbar Search = {Search} setSearch={setSearch} />
        <Wrapper>
            {error && <div style={{color: "red"}} >{error}</div>}

            {loading ? (
                
                <CircularProgress />
            
            ):(
            <CardWrapper>
                {filteredPosts.length === 0 ? <div><SearchOffIcon style={{ color: 'blue'}}/> no posts found</div>
                :
                <>
                 {filteredPosts.slice().reverse().map((item, index)=>(
                    <Card key={index} item = {item} />
                 ))}     
                </>
                    }
            </CardWrapper>
            )}

        </Wrapper>
    </Container>;
};
export default Home;