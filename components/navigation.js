import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";

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
  margin-left:3rem;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    height: 8rem;
    width:100vw;
`

const LinkCont = styled.div`
    text-decoration:none;
    display:flex;
    flex-direction:row;
    align-items:center;
`

const Links = styled(Link)`
font-family: 'Lexend', sans-serif;
&:hover {
    color: var(--yellow-color);
    padding-bottom: 1rem;
    transition:0.4s ease;
}
`

export default function Navigation(){

    const [activeMetric, setActiveMetric] = useState("Celcius");
    const inactiveMetric = activeMetric === "Celcius" ? "Farenheit" : "Celcius";

    useEffect(() => {
        console.log(activeMetric)
      }, [activeMetric]);

    return (
        <Wrapper>
            <Image src='/logo.png'
            alt='logo'
            width={120}
            height={40}
            />
            <LinkCont>
                <Links href='https://jasonkwak.ca/'>Portfolio</Links>

                <ToggleButton
                type="button"
                onClick={() => setActiveMetric(inactiveMetric)}>
                <ToggleThumb activeMetric={activeMetric} />


                <span>
                    <Image src='icons/farenheit.svg'
                    alt='farenheit'
                    width={20}
                    height={20}
                    />
                </span>
                
                <span>
                    <Image src='icons/celcius.svg'
                    alt='celcius'
                    width={20}
                    height={20}
                    />
                </span>

                </ToggleButton>
                <div>
                </div>

            </LinkCont>
        </Wrapper>
    )
}