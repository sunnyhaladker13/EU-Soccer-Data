import { Badge, Card, Group, Stack, Text } from '@mantine/core';

export interface Player {
  player_name: string;
  player_api_id: number;
  best_rating: number;
  age_at_rating: number;
  birthday: string;
}

interface PlayerCardProps {
  player: Player;
  onClick?: (player: Player) => void;
  isSelected?: boolean;
}

const formatDate = (dateString: string) => {
  console.log('Raw birthday value', dateString, typeof dateString)
  if (!dateString) return 'N/A';

  const datePart = dateString.split(' ')[0];
  const date = new Date(datePart);

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export function PlayerCard({ player, onClick, isSelected }: PlayerCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(player);
    } else {
      console.log('Clicked player:', player);
    }
  };
  return (
    <Card
      shadow="sm"
      padding="xs"
      radius="md"
      withBorder
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        backgroundColor: isSelected ? '#20293A' : '#090F1F',
        borderColor: isSelected ? '#487CE2' : '#090F1F',
      }}
    >
      {/* <Card.Section></Card.Section> */}
      <Group justify="space-between">
        <Stack gap={0}>
          <Text fw={800} c='#6FA5F4'>{player.player_name} </Text>
          <Text fz={14} fw={300}>
            {/* {player.age_at_rating} */}
            {formatDate(player.birthday)}
          </Text>
        </Stack>
        <Badge variant="light" color="pink" fz={14} size="lg">
          {player.best_rating}
        </Badge>
      </Group>
    </Card>
  );
}
