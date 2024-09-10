import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps } from 'react-brackets';

const SinglesSlotting=()=> {
    const [players,setPlayers]=useState({})
    useEffect(()=>{
        axios.get('http://localhost:4900/singlesslottings').then(response=>{
            console.log(response.status)
            console.log(response.data.result)
            setPlayers(response.data.result)
        }).catch(err=>{console.log(err.response.error)})
    },[])
    const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: RenderSeedProps) => {
      // breakpoint passed to Bracket component
      // to check if mobile view is triggered or not

      // mobileBreakpoint is required to be passed down to a seed
      return (
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
          <SeedItem>
            <div>
              <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
              <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
            </div>
          </SeedItem>
        </Seed>
      );
    };

  return (
    <div>SinglesSlotting
      {/* <Bracket rounds={2} roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
      return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;
    }} /> */}
      {/* {players.map((player,index)=>{
        return (
        <>
      <Card style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>Match {player.matchNumber}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{player.firstPlayerName}</Card.Subtitle>
      </Card.Body>
    </Card>
      </>
      )
  })} */}
    </div>
  )
}

export  {SinglesSlotting}