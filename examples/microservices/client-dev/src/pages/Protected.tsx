// import React from 'react';
// import { ReactNode } from "react";
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppContext } from '../context/appContext';
// import Loading from '../components/Loading';

// type Props = {
//   children: ReactNode;
// };

// const Protected = ({ children }: Props) => {
//   const { user, isLoading } = useAppContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     }
//     // eslint-disable-next-line
//   }, [user]);

//   if (isLoading) {
//     return (
//       <>
//         <Loading />
//         {children}
//       </>
//     );
//   }

//   return children;
// };

// export default Protected;
import React, { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import Loading from "../components/Loading.js";

type Props = {
  children: ReactNode;
};

const Protected: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div> {/* Ensure a valid JSX element is returned */}
        <Loading />
        {children}
      </div>
    );
  }

  return <div>{children}</div>; // ✅ Always wrap `children` in a JSX element
};

export default Protected;
