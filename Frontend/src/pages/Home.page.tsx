import { useCallback, useEffect, useState } from 'react';
import { Text } from '@mantine/core';
import { TopMenu } from '@/components/AppShell';
import { PlayerInfo, PlayerOverviewCard } from '@/components/PlayerOverviewCard';

interface Player {
  player_api_id: number;
  player_name: string;
  best_rating: number;
}

export function HomePage() {
  const [playerData, setPlayerData] = useState<PlayerInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlayerSelect = useCallback((player: Player) => {
    console.log('Selected player:', player.player_api_id);
    console.log('Fetching player ID:', player.player_api_id);
    setError(null);
    setPlayerData(null);

    fetch(`http://localhost:3000/api/player/${player.player_api_id}`)
      .then((res) => {
        console.log('Getch response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetch response data', data);
        if (data && data.length > 0) {
          console.log('Settings playerData to:', data[0]);
          setPlayerData(data[0]);
        } else {
          console.log('No data found in response');
          setError('No player data found');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch player details ' + err.message);
      });
  }, []);
  return (
    <>
      <TopMenu title="EU Soccer Data" onPlayerSelect={handlePlayerSelect}>
        {error && <Text c="red">{error}</Text>}
        {playerData ? (
          <PlayerOverviewCard PlayerInfo={playerData} />
        ) : (
          <Text>Select a player to view details</Text>
        )}
      </TopMenu>
    </>
  );
}
