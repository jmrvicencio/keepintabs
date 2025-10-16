import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import { showSidebarAtom } from './sidebar/Sidebar';
import ProfileIcon from './ProfileIcon';
import logo from '/logo-spaced-white.svg';
import { ROUTES } from '../app/routes';

const Header = memo(function Header() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const ProfileIconMemo = memo(() => <ProfileIcon className="md:hidden" handleClick={() => setShowSidebar(true)} />);

  const handleLogoClick = () => {
    navigate(ROUTES.APP);
  };

  return (
    <header className="flex flex-row justify-between px-3 py-4">
      <div id="header" className="flex cursor-pointer items-center" onClick={handleLogoClick}>
        {/* Logo in SVG */}
        <svg className="fill-accent-600 h-9" viewBox="0 0 120 141" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 37.2C30 33.2236 33.2235 30 37.2 30H46.8C50.7764 30 54 33.2236 54 37.2V103.8C54 107.776 50.7764 111 46.8 111H37.2C33.2235 111 30 107.776 30 103.8V37.2Z" />
          <path d="M60 96C60 87.7157 66.7157 81 75 81C83.2843 81 90 87.7157 90 96V108.333C90 109.806 88.8061 111 87.3333 111H75C66.7157 111 60 104.284 60 96Z" />
          <path d="M72 54C78.6274 54 84 59.3726 84 66C84 72.6274 78.6274 78 72 78H62.1333C60.9551 78 60 77.0449 60 75.8667V66C60 59.3726 65.3726 54 72 54Z" />
        </svg>

        <p className="font-outfit text-xl">Keepin' Tabs</p>
      </div>
      <ProfileIconMemo />
    </header>
  );
});

export default Header;
