import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { TopMenu } from '@/components/AppShell';

export function HomePage() {
  return (
    <>
      <TopMenu title='EU Soccer Data'>
      <Welcome />
      <ColorSchemeToggle />
      </TopMenu>
    </>
  );
}
