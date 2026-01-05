import { ReactNode, useEffect, useState } from 'react';
import { AppShell, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Player, PlayerCard } from './PlayerCard';

interface TopMenuProps {
  title?: string;
  children: ReactNode;
}

export function TopMenu({ title = 'Default Title', children }: TopMenuProps) {
  const [opened, { toggle }] = useDisclosure();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/top-players')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched players:', data);
        setPlayers(data);
      })
      .catch((err) => console.error('Error fetching players:', err));
  }, []);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <p>{title}</p>
        <p>{title}</p>
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          padding: '12px',
          borderRight: 'none',
        }}
      >
        <Stack gap={6}>
          <p>TOP 10 PLAYERS</p>
          {players.map((player) => (
            <PlayerCard
              key={player.player_api_id}
              player={player}
              isSelected={selectedPlayer?.player_api_id === player.player_api_id}
              onClick={(selectedPlayer) => {
                setSelectedPlayer(player);
                console.log('Selected player:', selectedPlayer);
                //todo: navigate to player dashboard using react router
              }}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
