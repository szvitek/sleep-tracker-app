import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const menuItems = [
    { to: '/', name: 'Home' },
    { to: '/details', name: 'Details' },
  ];

  return (
    <nav className="h-full">
      <ul className="flex justify-center items-center gap-5 h-full">
        {menuItems.map(({ to, name }) => (
          <li
            key={name}
            className="hover:underline text-blue-400 cursor-pointer duration-300 hover:text-blue-600"
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-blue-800 underline' : ''
              }
              to={to}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
