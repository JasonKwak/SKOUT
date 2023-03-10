import styled from "styled-components"
import styles from '@/styles/Home.module.css'
import Image from "next/image"
import Link from "next/link"
import City from "./city"
import axios from "axios"
import { useState, useEffect, useRef } from 'react'

const Wrapper = styled.div`
width: 25%;
min-width:15rem;
height:100vh;
display:flex;
flex-direction:column;
padding:2rem 3rem 2rem 3rem;
background-color:var(--sand-color);
border-radius: 0 50px 50px 0;
z-index:2;
justify-content:space-between;
`

const InputCont = styled.div`
width:100%;
display:flex;
flex-direction:row;
align-items:flex-start;
`

const Input = styled.input`
border-radius:5px;
font-family: 'Arimo', sans-serif;
color:var(--black-color);
background-color:transparent;
border: none;
outline:none;
font-size:1rem;
margin-right:0.5rem;
padding:0.5rem 0.5rem;
width:100%;

&:focus {
    border-bottom:3px solid var(--darkgray-color);
    border-radius: 0px;
    transition:0.6s ease;
  }
`

const Links = styled(Link)`
font-family: 'Lexend', sans-serif;
color:var(--black-color);
font-size:0.8rem;
&:hover {
    color: var(--blue-color);
    padding-bottom: 1rem;
    transition:0.3s ease;
}
`

const Row = styled.div`
display:flex;
flex-direction:row;
height:3rem;
align-items:flex-end;
`

const Column = styled.div`
display:flex;
flex-direction:column;
width:100%;
gap:1rem;
`

const Popular = styled.h1`
font-size:1rem;
font-family:'Kanit', sans-serif;
var(--darkgray-color);
`

const LogoCont = styled.div`
width:100%;
`


export default function SideColumn({
    value = "",
    onChange = () => {},
    onClick = () => {},
}){

    const [weatherData, setWeatherData] = useState([]);
    const [currentWeather, setCurrentWeather] = useState();

    useEffect(() => {
    var apiKey2 =process.env.NEXT_PUBLIC_API_KEY_2;
    const location = [
        "2988507", // Paris
        "2147714", // Sydney
        "1835848", // Seoul
        "1850147"  // Tokyo
      ];

    const url2 = `https://api.openweathermap.org/data/2.5/group?id=${location.join(",")}&units=metric&appid=${apiKey2}`;
    
    axios.get(url2)
      .then(response => {
        setWeatherData(response.data.list);
        setCurrentWeather(response.data.weather);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

    const [activeMetric, setActiveMetric] = useState("Celcius");
    const inactiveMetric = activeMetric === "Celcius" ? "Farenheit" : "Celcius";

    useEffect(() => {
        console.log(activeMetric)
      }, [activeMetric]);

    return (
        <Wrapper>
            <InputCont>
                <Row style={{alignItems:'center'}}>
                <Image src='/icons/search.svg' width={20} height={20} alt='search icon' style={{marginRight:'0.5rem'}}/>
                <Input
                type="text"
                value = {value}
                onChange= {onChange}
                placeholder = "Enter Location"/>

                <Image src='/icons/locationarrow.svg' width={25} height={25} onClick={onClick}/>
                </Row>
            </InputCont>

            <Column>
            <Popular>Popular Cities</Popular>
            {weatherData.map((weather, index) => (
                <City key={index}
                name={weather.name}
                temp={weather.main.temp}
                condition={weather.weather[0].main}
                src={`/icons/${weather.weather[0].main.toLowerCase()}.svg`}
                />
            ))}
            </Column>

                <div style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                <LogoCont>
                <Image src='/logo.png'
                alt='logo'
                width={120}
                height={40}
                style={{marginTop:'5rem'}}
                />
                </LogoCont>
                <Links href='https://jasonkwak.ca'>By Jason Kwak</Links>
                </div>



        </Wrapper>
    )
}