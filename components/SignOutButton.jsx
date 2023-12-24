import React from 'react'
import { IoExit } from 'react-icons/io5';

const SignOutButton = () => {
  return (
    <div className="flex cursor-pointer items-center gap-1 rounded-full bg-black/20 py-2 px-6 text-base text-white">
      <IoExit />
      <div>Sign out</div>
    </div>
  );
}

export default SignOutButton