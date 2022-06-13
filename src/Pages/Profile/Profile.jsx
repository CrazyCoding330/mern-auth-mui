import React, { useContext } from 'react';
import { AuthContext } from '../../context/context'

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <h1>
        Profile
      </h1>
    </>
  );
}
