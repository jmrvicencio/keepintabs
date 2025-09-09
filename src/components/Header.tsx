import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import { showSidebarAtom } from './sidebar/Sidebar';
import ProfileIcon from './ProfileIcon';
import logo from '/logo-spaced.svg';
import { ROUTES } from '../app/routes';

const Header = memo(function Header() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const ProfileIconMemo = memo(() => <ProfileIcon handleClick={() => setShowSidebar(true)} />);

  const handleLogoClick = () => {
    navigate(ROUTES.APP);
  };

  return (
    <header className="flex flex-row justify-between p-3">
      <div className="flex cursor-pointer items-center" onClick={handleLogoClick}>
        <img src={logo} className="h-9" />
        <p className="font-outfit text-xl">Keepin' Tabs</p>
      </div>
      <ProfileIconMemo />
    </header>
  );
});

export default Header;
