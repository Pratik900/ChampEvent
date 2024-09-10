import {Bracket,BracketGame,BracketGenerator} from "react-tournament-bracket";

export function SinglesSlotting() {
  const game2 = {
    id: "2",
    name: "semi-finals",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "12",
          name: "Team oi"
        },
        score: {
          score: 1
        }
      },
      visitor: {
        team: {
          id: "13",
          name: "Team thau"
        },
        score: {
          score: 0
        }
      }
    }
  };
  const game3 = {
    id: "3",
    name: "semi-finals",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "11",
          name: "Team q"
        },
        score: {
          score: 1
        }
      },
      visitor: {
        team: {
          id: "12",
          name: "Team bosta"
        },
        score: {
          score: 0
        }
      }
    }
  };
  const game1 = {
    id: "1",
    name: "semi-finals",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "10",
          name: "Team meu"
        },
        score: {
          score: 2
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {}
        }
      },
      visitor: {
        team: {
          id: "11",
          name: "Team pau"
        },
        score: {
          score: 3
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {}
        }
      }
    }
  };

  const games = [
    {
      id: "1",
      name: "semi-finals",
      scheduled: Number(new Date()),
      sides: {
        home: {
          team: {
            id: "10",
            name: "Team 1"
          },
          score: {
            score: 2
          },
          seed: {
            displayName: "A1",
            rank: 1,
            sourceGame: game2,
            sourcePool: {}
          }
        },
        visitor: {
          team: {
            id: "11",
            name: "Team 2"
          },
          score: {
            score: 3
          },
          seed: {
            displayName: "A2",
            rank: 1,
            sourceGame: game3,
            sourcePool: {}
          }
        }
      }
    },
    {
      id: "1",
      name: "semi-finals",
      scheduled: Number(new Date()),
      sides: {
        home: {
          team: {
            id: "10",
            name: "Team 1"
          },
          score: {
            score: 2
          },
          seed: {
            displayName: "A1",
            rank: 1,
            sourceGame: game2,
            sourcePool: {}
          }
        },
        visitor: {
          team: {
            id: "11",
            name: "Team 2"
          },
          score: {
            score: 3
          },
          seed: {
            displayName: "A2",
            rank: 1,
            sourceGame: game3,
            sourcePool: {}
          }
        }
      }
    }
  ];

  return (
    <>
      <Bracket game={game1} />
      <BracketGame game={game1} />
      <BracketGenerator game={games} />
    </>
  );
}
