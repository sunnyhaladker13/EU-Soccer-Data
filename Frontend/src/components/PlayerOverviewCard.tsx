import { ArrowUpRight } from 'react-feather';
import { Badge, Box, Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import SimpleRadarChart from './RadarChart';

export interface PlayerInfo {
  player_name: string;
  age: number;
  height_ft: number;
  weight_kg: number;
  overall_rating: number;
  potential: number;
  preferred_foot: string;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
}

interface PlayerInfoProps {
  PlayerInfo: PlayerInfo;
}

export function PlayerOverviewCard({ PlayerInfo }: PlayerInfoProps) {
  if (!PlayerInfo) {
    return <Text>Loading player data...</Text>
  }
  
  return (
    <>
      <Group gap={0} align="stretch" justify="center">
        <Card
          shadow="sm"
          padding="lg"
          radius="12px 0 0 12px"
          withBorder
          style={{ maxWidth: '500px', minWidth: '500px' }}
        >
          <Group mt="md" mb="xs" style={{ height: '100%' }}>
            <Stack justify="space-between" style={{ height: '100%' }}>
              <Stack>
                <Badge color="pink" variant="light">
                  FC Barcelona
                </Badge>
                <Text fz={45} fw={800} lh={1}>
                  {PlayerInfo.player_name}
                </Text>
              </Stack>
              <Group>
                <Stack gap={1}>
                  <Text fz="sm" fw={400} c="#677489">
                    AGE
                  </Text>
                  <Text fw={800}>{PlayerInfo.age}</Text>
                </Stack>
                <Stack gap={1}>
                  <Text fz="sm" fw={400} c="#677489">
                    HIGHT
                  </Text>
                  <Text fw={800}>{PlayerInfo.height_ft}ft</Text>
                </Stack>
                <Stack gap={1}>
                  <Text fz="sm" fw={400} c="#677489">
                    WEIGHT
                  </Text>
                  <Text fw={800}>{PlayerInfo.weight_kg}kg</Text>
                </Stack>
                <Stack gap={1}>
                  <Text fz="sm" fw={400} c="#677489">
                    FOOT
                  </Text>
                  <Text fw={800}>{PlayerInfo.preferred_foot}</Text>
                </Stack>
              </Group>
            </Stack>
          </Group>
        </Card>
        <Card withBorder padding="lg" radius="0 0 0 0" >
          <Stack gap="md" align="center" mt="md" mb="xs">
            <Text>OVERALL RATING</Text>
            <Box
              style={{
                backgroundColor: '#101729',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'fit-content',
                borderRadius: '12px',
              }}
            >
              <Text fz={45} fw={800}>
                {PlayerInfo.overall_rating}
              </Text>
            </Box>
            <Group gap={8} align="center">
              <Text>Potential</Text>
              <Text fz={18} fw={800}>
                {PlayerInfo.potential}
                <ArrowUpRight size={16} />
              </Text>
            </Group>
          </Stack>
        </Card>
        <Card
          withBorder
          padding="lg"
          radius="0 12px 12px 0"
          style={{ minHeight: '150px', minWidth: '300px' }}
        >
          <SimpleRadarChart />
        </Card>
      </Group>
    </>
  );
}
