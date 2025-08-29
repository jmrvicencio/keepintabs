import { useNavigate } from 'react-router-dom';

import ProfileIcon from './ProfileIcon';
import logo from '/logo-spaced.svg';

function Header({ onProfileClicked: handleProfileClicked = () => {} }: { onProfileClicked: () => any }) {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/app');
  };

  return (
    <header className="flex flex-row justify-between">
      <div className="flex cursor-pointer items-center" onClick={handleLogoClick}>
        <img src={logo} className="h-9" />
        <p className="font-outfit text-xl">Keepin' Tabs</p>
      </div>
      <ProfileIcon handleClick={handleProfileClicked} />
    </header>
  );
}

export default Header;
