import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FaSignOutAlt,
} from 'react-icons/fa';
import tw from 'twin.macro';

import useIdentity, { logout } from '../services/userService';
import { handleError, handlePromise } from '../utils/handlers';
import { LoginAreaButton } from './LoginArea';


export const WalletAreaButton = tw.div`flex items-center gap-2 px-4 py-2 border-2 text-lg rounded-full cursor-pointer select-none bg-[#fff8] hover:bg-gray-100`;

export default function WalletArea() {
  const user = useIdentity();

  return (
    <>
      {!!user && (
        <>
          <div tw="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div tw="flex-1 text-xl text-gray-600">
              Internet Computer principal:
              <div tw="text-xs sm:text-sm font-bold mt-1">
                {user.client.getIdentity().getPrincipal().toString()}
              </div>
            </div>
            <div tw="flex flex-col items-center mt-3 sm:mt-0">
              <LoginAreaButton
                tw="flex gap-1 items-center text-base px-4"
                onClick={() =>
                  handlePromise(logout(), undefined, 'Error while signing out!')
                }
              >
                <FaSignOutAlt />
                <span tw="font-semibold select-none ml-1">Sign out</span>
              </LoginAreaButton>
            </div>
          </div>
          <hr tw="my-5" />
        </>
      )}
    </>
  )
}