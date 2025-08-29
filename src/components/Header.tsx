import { useAtom } from 'jotai';

import { showSidebarAtom } from './sidebar/Sidebar';
import ProfileIcon from './ProfileIcon';
import logo from '/logo-spaced.svg';

function Header() {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header className="flex flex-row justify-between">
      <div className="flex items-center">
        <img src={logo} className="h-9" />
        <p className="font-outfit text-xl">Keepin' Tabs</p>
      </div>
      <ProfileIcon handleClick={handleProfileClick} />
    </header>
  );
}

export default Header;
