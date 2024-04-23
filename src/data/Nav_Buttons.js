import {
    ChatCircleDots,
    Gear,
    GearSix,
    Phone,
    SignOut,
    User,
    Users,
  } from "phosphor-react";
  import { FaUser as User, FaGear as Gear, FaSignOutAlt as SignOut } from 'react-icons/fa';
    

  const Profile_Menu = [
    {
      title: "Profile",
      icon: <User />,
    },
    {
      title: "Settings",
      icon: <Gear />,
    },
    {
      title: "Profile",
      icon: <SignOut />,
    },
  ];

  const Nav_Buttons = [
    {
      index: 0,
      icon: <ChatCircleDots />,
    },
    {
      index: 1,
      icon: <Users />,
    },
    {
      index: 2,
      icon: <Phone />,
    },
  ];

  const Nav_Setting = [
    {
      index: 3,
      icon: <GearSix />,
    },
  ];

  export {
    Profile_Menu,
    Nav_Setting,
    Nav_Buttons,
  };