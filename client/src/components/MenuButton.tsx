import hamburgerMenu from '@/assets/icons/icons8-hamburger-menu.svg';

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <a className="menu-btn" onClick={onClick}>
      <img src={hamburgerMenu} title="Toggle sidebar" />
    </a>
  );
};

export default MenuButton;
