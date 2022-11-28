import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './App.css';
import classes from './app.module.scss';
import HomePage from './HomPage';

// const AppHeader = (): JSX.Element => {
//   const [checked, setChecked] = useState(false);

//   return (
//     <Box variant="div" id="h" className={classes.app_header_footer}>
//       <Box
//         float="left"
//         padding={{ left: 'm', top: 'xxs', bottom: 'm' }}
//         color="inherit"
//       >
//         <Link href="/">
//           <img
//             src="https://icones.pro/wp-content/uploads/2021/08/logo-amazon-orange.png"
//             height="20"
//             width="25"
//             alt="header"
//           />
//         </Link>
//       </Box>
//       <Box
//         float="right"
//         padding={{ right: 's', top: 'xxs' }}
//         textAlign="right"
//         color="inherit"
//       >
//         <Toggle
//           onChange={({ detail }) => {
//             setChecked(detail.checked);
//             applyMode(detail.checked ? Mode.Dark : Mode.Light);
//           }}
//           checked={checked}
//           className={classes.app_header_footer}
//         >
//           Dark Mode
//         </Toggle>
//       </Box>
//     </Box>
//   );
// };

// const AppFooter = (): JSX.Element => {
//   return (
//     <Box variant="div" id="f" className={classes.app_header_footer}>
//       <Box
//         variant="div"
//         float="right"
//         padding={{ left: 'm' }}
//         color="inherit"
//         fontWeight="light"
//       >
//         <span>Help</span>
//       </Box>
//     </Box>
//   );
// };

const App = (): JSX.Element => {
  const location = useLocation();
  const [homePage, setHomePage] = useState<boolean>();

  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <>
      <HomePage />
    </>
  );
};

export default App;
