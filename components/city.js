import styled from "styled-components"
import Image from "next/image"
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const Head = styled.h1`
font-size:1rem;
font-family:'Kanit', sans-serif;
color:var(--black-color);
`

const Main = styled.h2`
font-size:1.25rem;
font-family:'Arimo', sans-serif;
color:var(--black-color);
display:flex;
margin-bottom:-0.25rem;
`


const Sub = styled.h2`
font-size:0.75rem;
font-family:'Arimo', sans-serif;
color:var(--darkgray-color);
`

const Wrapper = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:flex-start;
height:auto;
background-color:var(--blue-color);
border-radius:15px;
padding: 0.75rem 1rem;
`

const Row = styled.div`
display:flex;
flex-direction:row;
width:100%;
`

const Column = styled.div`
display:flex;
flex-direction:column;
`

const Images = styled(Image)`
object-fill:cover;
border-radius:10px 10px 0 0 ;
`

const IconCont = styled.div`

`


export default function City({
    name='Paris',
    temp='20',
    condition='Clear',
}){

    return (
        <Wrapper>
            <Row style={{height:'auto'}}>
            <Head>{name.toUpperCase()}</Head>
            <IconCont>
            <Image src='/icons/arrow.svg'width={30} height={30} />
            </IconCont>
            </Row>

            <Row style={{justifyContent:'space-between', alignItems:'flex-end',height:'1rem', padding:'0'}}>
            <Sub>{condition}</Sub>
            <Main>{temp}°C</Main>
            </Row>
        </Wrapper>
    )
}