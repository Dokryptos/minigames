import Menu from '@/components/menu';

const AcountMenu = () => {
  return (
    <Menu>
      <Menu.Item to="/settings">Paramètres</Menu.Item>

      <Menu.Item to="https://www.facebook.com/groups/1336056806836086" target="_blank">
        Aide
      </Menu.Item>

      <Menu.Item
        to="https://app1.detectivebox.fr/politique-de-confidentialite.html"
        target="_blank"
      >
        Mentions Légales
      </Menu.Item>

      <Menu.Item to="/credits" target="_blank">
        Crédits
      </Menu.Item>
    </Menu>
  );
};

export default AcountMenu;
