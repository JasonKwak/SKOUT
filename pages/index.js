import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useRef, use } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import SideColumn from '@/components/sideColumn';
import styled from 'styled-components';

const ToggleButton = styled.button`
  --toggle-width: 80px;
  --toggle-height: 38px;
  --toggle-padding: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  line-height: 1;
  width: var(--toggle-width);
  height: var(--toggle-height);
  padding: var(--toggle-padding);
  border: 0;
  border-radius: calc(var(--toggle-width) / 2);
  cursor: pointer;
  background: var(--yellow-color);
  transition: background 0.25s ease-in-out;
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: var(--toggle-padding);
  left: var(--toggle-padding);
  width: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  height: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  border-radius: 50%;
  background: white;
  transition: transform 0.25s ease-in-out;
  transform: ${(p) =>
    p.activeMetric === "Farenheit"
      ? "translate3d(calc(var(--toggle-width) - var(--toggle-height)), 0, 0)"
      : "none"};
`;

 
const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100vh;
width:100%;
overflow:hidden;
padding:2rem 2rem;

`

const City = styled.h1`
  font-family:'Kanit', sans-serif;
  font-weight: 500; 
  font-size:1rem;
  color:var(--yellow-color);
  padding:0.25rem 1rem;
`

const Desc = styled.div`
display:flex;
flex-direction:column;
`

const MainDesc = styled.h1`
font-family: 'Kanit', sans-serif;
`

const Subheader = styled.h1`
font-family: 'Arimo', sans-serif;
font-size:0.75rem;
color:var(--gray-color);
margin-bottom:0.3rem;

`

const ForecastCont = styled.div`
  display:flex;
  width:6rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin: 1rem 0;
  padding: 1rem 1.5rem;
  background-color: var(--black-color);
  border-radius:20px;
  z-index:2;
  color:var(--lightgray-color);
`

const Column = styled.div`
display:flex;
flex-direction:column;

`

const Row = styled.div`
display:flex;
flex-direction:row;

`

const CurrentCont = styled.div`
background-color:var(--black-color);
width:100%;
display:flex;
align-items:flex-start;
flex-direction:column;
padding:3rem 5rem;
border-radius:50px;
gap:2rem;
z-index:2;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 50px;
`

export default function Home() {
    
  const [location, setLocation] = useState('Miami');

  const [info, setInfo] = useState({});
  const [currentWeather, setCurrentWeather] = useState();
  const [currentData, setCurrentData] = useState({});


  const [weather, setWeather] = useState();

  // const activeMetric = require('../components/sideColumn');

  var apiKey =process.env.NEXT_PUBLIC_API_KEY;
  var apiKey2 =process.env.NEXT_PUBLIC_API_KEY_2;
  
  const [units , setUnits] = useState('metric');

  const [isSearched, setIsSearched] = useState(false);

  // if (activeMetric === "Celcius") {
  //   units = "metric";
  // } else if (activeMetric === "Fahrenheit") {
  //   units = "imperial";
  // }


  // if (activeMetric === "Celcius"){
  //   units = "metric"
  // }else if (activeMetric === "Fahrenheit"){
  //   units = "imperial"
  // }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey2}`;

  const [data, setData] = useState([]);
  const [city, setCity] = useState('Miami');

  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);

    const response2 = await axios.get(url2);


    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10));
      let num = parseInt(weather.dt_txt.substr(8, 2), 10);

      setIsSearched(true);

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("here");
        console.log(response.data.list[index]);
        var month = ''
        var icon = ''

        if (response.data.list[index].dt_txt.substr(5, 2) == 1) {
          month = 'January'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 2) {
          month = 'February'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 3) {
          month = 'March'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 4) {
          month = 'April'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 5) {
          month = 'May'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 6) {
          month = 'June'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 7) {
          month = 'July'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 8) {
          month = 'August'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 9) {
          month = 'September'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 10) {
          month = 'October'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 11) {
          month = 'November'
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 12) {
          month = 'December'
        } 

        if(weather.weather[0].main == 'Clouds'){
          icon = '/icons/clouds.svg'
        } else if(weather.weather[0].main == 'Clear'){
          icon = '/icons/clear.svg'
        } else if(weather.weather[0].main == 'Rain'){
          icon = '/icons/rain.svg'
        } else if(weather.weather[0].main == 'Snow'){
          icon = '/icons/snow.svg'
        } else if(weather.weather[0].main == 'Thunderstorm'){
          icon = '/icons/thunderstorm.svg'
        } else if(weather.weather[0].main == 'Drizzle'){
          icon = '/icons/drizzle.svg'
        } else if(weather.weather[0].main == 'Atmostphere'){
          icon = '/icons/mist.svg'
        }

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const shortenDays = days.map(day => day.slice(0, 3));
        var dayIndex = now.getDay(); // get the day of the week index (0-6)
        var day = shortenDays[dayIndex];

        return isSearched ? (
          <ForecastCont key={index} style={{gap:'0.5rem'}}>
            <p style={{ fontSize:'0.75rem',marginBottom:'0.5rem'}}>{day}</p>
            <Image
              src={icon}
              alt={icon}
              width={35}
              height={35}
              priority
            />
            <Row>
              <div style={{fontSize:'1.25rem'}}>{weather.main.temp.toFixed(1)}</div> <div>°C</div>
            </Row>
            <div style={{fontSize:'0.75rem'}}>{weather.weather[0].main}</div>
          </ForecastCont>
        ) : 
            (
          <ForecastCont key={index} style={{gap:'0.5rem'}}>
          <p style={{ fontSize:'0.75rem',marginBottom:'0.5rem'}}>{day}</p>
          <Image
            src={icon}
            alt={icon}
            width={35}
            height={35}
            priority
          />
          <Row>
            <div style={{fontSize:'1.25rem'}}>{weather.main.temp.toFixed(1)}</div> <div>°C</div>
          </Row>
          <div style={{fontSize:'0.75rem'}}>{weather.weather[0].main}</div>
        </ForecastCont>
          )
      }
      
    });



    setData(weatherData);

    setCity(response.data.city.name);
    setWeather(response.data.weather);
    
    setInfo(response2.currentdata);

    setCurrentWeather(response2.data.weather);
    setCurrentData(response2.data);
  };

  const [activeMetric, setActiveMetric] = useState("Celcius");
  const inactiveMetric = activeMetric === "Celcius" ? "Farenheit" : "Celcius";

  const updateUnits = () => {
    if (activeMetric === "Celcius") {
      setUnits("metric");
      
    } else {
      setUnits("imperial");
    }
  }

  const [miamiData, setMiamiData] = useState();
  const [miamiWeather, setMiamiWeather] = useState(null);

  const [miamiForecastData, setMiamiForecastData] = useState();

  useEffect(() => {
    fetchWeather();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const miami = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Miami&units=metric&appid=${apiKey2}`);
        const miamiforecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Miami&units=metric&appid=${apiKey}`);
        setMiamiData(miami.data);
        setMiamiWeather(miami.data.weather);
        
        let miamiForecast = miamiforecast.data.list;
        console.log(miamiForecast);

      } catch (err2) {
        console.log(err2);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
      console.log(units)
      updateUnits();
    }, [units]);

  useEffect(() => {
    if (grabWeather.current=== true) {
      fetchWeather()
    }
    return () => {
      grabWeather.current = true;
    }
  }, []);

  

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`


  return (
    <>
      <Head>
        <title>SKOUT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;500;700&family=Kanit:wght@500&family=Lexend:wght@200;300;500;600&display=swap" rel="stylesheet"/>
      </Head>

      <main className={styles.main}>
        <SideColumn
        onClick={fetchWeather}
        onChange={event => setLocation(event.target.value)}
        value = {location}/>

        <Wrapper>

        <CurrentCont>
          <Row style={{justifyContent:'space-between', width:'100%'}}>

            { currentWeather ? currentWeather.map((w, index) => {
              return (
                <Desc style={{gap:'0rem', border:'3px solid var(--yellow-color)', borderRadius:'15px', flexDirection:'row', alignItems:'center'}} >
              <City>{city.toUpperCase()}</City>
              <h2 style={{padding:'0.25rem 1rem 0.25rem 0',fontSize:'0.75rem', color:'var(--lightgray-color)'}}>{currentData.sys.country}</h2>
              </Desc>

              )
            }) : 
              miamiData && (
                <Desc style={{gap:'0rem', border:'3px solid var(--yellow-color)', borderRadius:'15px', flexDirection:'row', alignItems:'center'}} >
              <City>{miamiData.name.toUpperCase()}</City>
              <h2 style={{padding:'0.25rem 1rem 0.25rem 0',fontSize:'0.75rem', color:'var(--lightgray-color)'}}>{miamiData.sys.country}</h2>
              </Desc>
                )
              }

              <ToggleButton
            type="button"
            onClick={() => setActiveMetric(inactiveMetric)}>
            <ToggleThumb activeMetric={activeMetric} />
            <span>
                <Image src='icons/farenheit.svg'
                alt='farenheit'
                width={18}
                height={18}
                />
            </span>
            
            <span>
                <Image src='icons/celcius.svg'
                alt='celcius'
                width={18}
                height={18}
                />
            </span>

            </ToggleButton>
            </Row>

            {
          currentWeather ? currentWeather.map((w, index) => {
            return (
              <div key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
               
                <Row style={{gap:'7rem'}}>
                
                <Desc style={{flexDirection:'column', alignItems:'flex-start'}}>
                <Subheader>CURRENT TEMPURATURE:</Subheader>
                <Row>
                <h1 style={{fontSize:'5rem', color:'var(--white-color)'}}>{currentData.main.temp}</h1>
                <h2 style={{color:'var(--white-color)'}}>°C</h2>
                </Row>
                </Desc>
                
                <Grid> 
                <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
                  <Subheader>FEELS LIKE:</Subheader>
                  <Row>
                  <h1 style={{fontSize:'1.5rem'}}>{currentData.main.feels_like}</h1>
                  <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
                  </Row>
                </Desc>

                <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
                  <Subheader>HUMIDITY:</Subheader>
                  <Row>
                  <h1 style={{fontSize:'1.5rem'}}>{currentData.main.humidity}</h1>
                  <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>%</h2>
                  </Row>
                </Desc>

                <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
                  <Subheader>MIN. TEMP:</Subheader>
                  <Row>
                  <h1 style={{fontSize:'1.5rem'}}>{currentData.main.temp_min}</h1>
                  <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
                  </Row>
                </Desc>

                <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
                  <Subheader>MAX. TEMP:</Subheader>
                  <Row>
                  <h1 style={{fontSize:'1.5rem'}}>{currentData.main.temp_max}</h1>
                  <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
                  </Row>
                </Desc>
                </Grid>
                </Row>

                <Column style={{justifyContent:'center', alignItems:'center'}}>
                <Player
                  autoplay
                  loop
                  speed={1}
                  style={{ height: '200px', width: '200px'}}
                src={`/animations/${w.main.toLowerCase()}.json`}/>
                <h1 style={{fontSize:'1.5rem',color:'var(--white-color)'}}>{w.main}</h1>
                </Column>
              </div>
            )
          }
          ) :
          miamiData &&
          miamiWeather.map((w, index) => {
            return (
            <div key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
               
            <Row style={{gap:'7rem'}}>
            
            <Desc style={{flexDirection:'column', alignItems:'flex-start'}}>
            <Subheader>CURRENT TEMPURATURE:</Subheader>
            <Row>
            <h1 style={{fontSize:'5rem', color:'var(--white-color)'}}>{miamiData.main.temp}</h1>
            <h2 style={{color:'var(--white-color)'}}>°C</h2>
            </Row>
            </Desc>
            
            <Grid> 
            <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
              <Subheader>FEELS LIKE:</Subheader>
              <Row>
              <h1 style={{fontSize:'1.5rem'}}>{miamiData.main.feels_like}</h1>
              <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
              </Row>
            </Desc>

            <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
              <Subheader>HUMIDITY:</Subheader>
              <Row>
              <h1 style={{fontSize:'1.5rem'}}>{miamiData.main.humidity}</h1>
              <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>%</h2>
              </Row>
            </Desc>

            <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
              <Subheader>MIN. TEMP:</Subheader>
              <Row>
              <h1 style={{fontSize:'1.5rem'}}>{miamiData.main.temp_min}</h1>
              <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
              </Row>
            </Desc>

            <Desc style={{flexDirection:'column', color:'var(--white-color)', alignItems:'flex-start'}}>
              <Subheader>MAX. TEMP:</Subheader>
              <Row>
              <h1 style={{fontSize:'1.5rem'}}>{miamiData.main.temp_max}</h1>
              <h2 style={{color:'var(--white-color)', fontSize:'1rem'}}>°C</h2>
              </Row>
            </Desc>
            </Grid>
            </Row>

            <Column style={{justifyContent:'center', alignItems:'center'}}>
            <Player
              autoplay
              loop
              speed={1}
              style={{ height: '200px', width: '200px'}}
            src={`/animations/${w.main.toLowerCase()}.json`}/>
            <h1 style={{fontSize:'1.5rem',color:'var(--white-color)'}}>{w.main}</h1>
            </Column>
          </div>
          )

        } )}
        </CurrentCont>
        
        <Column style={{justifyContent:'flex-start' ,width:'100%'}}>
        <div style={{padding:'2rem 0 0 0', fontSize:'1.5rem',color:'var(--sand-color)', fontFamily:'Kanit'}} >7 Day Forecast:</div>

        <Row style={{justifyContent:'space-between', width:'100%'}}>
          {data}
        </Row>

        </Column>

        <Subheader style={{width:"100%", textAlign:'right', color:'var(--gray-color)', padding:'2rem 2rem'}}>
          Last Updated: {date}
        </Subheader>

        <Player 
        src='animations/slime.json'
        style={{height:'200px', width:'200px', position:'absolute', right:'10%' ,top:'60%', zIndex:'1'}}
        autoplay
        loop
        speed={1}
        />

        <Player 
        src='animations/slime.json'
        style={{height:'280px', width:'280px', position:'absolute', right:'50%' ,top:'70%', zIndex:'1'}}
        autoplay
        loop
        speed={1}
        />



        <Player 
        src='animations/circles.json'
        style={{height:'800px', width:'800px', position:'absolute', right:'-10%' ,top:'0%', opacity:'0.6'}}
        autoplay
        loop
        speed={0.6}
        />

        <Player 
        src='animations/circles.json'
        style={{height:'600px', width:'600px', position:'absolute', left:'5%' ,bottom:'20%'}}
        autoplay
        loop
        speed={0.6}
        />

        <Player 
        src='animations/circles.json'
        style={{height:'600px', width:'600px', position:'absolute', left:'35%' ,top:'10%'}}
        autoplay
        loop
        speed={0.6}
        />

        </Wrapper>
      </main>
    </>
  )
}
