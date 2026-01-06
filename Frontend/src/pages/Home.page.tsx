import { PlayerOverviewCard } from '@/components/PlayerOverviewCard';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { TopMenu } from '@/components/AppShell';

export function HomePage() {
  return (
    <>
      <TopMenu title='EU Soccer Data'>
      <PlayerOverviewCard />
      </TopMenu>
    </>
  );
}
