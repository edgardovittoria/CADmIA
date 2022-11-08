import React from 'react';
import {RedirectLoginOptions} from "@auth0/auth0-react";

interface LoginItemProps {
    loginWithRedirect: (options?: (RedirectLoginOptions | undefined)) => Promise<void>
}

export const LoginItem: React.FC<LoginItemProps> = (
    {
        loginWithRedirect
    }
) => {
    return(
        <div
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-500 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-gray-400 hover:cursor-pointer"
            onClick={() => loginWithRedirect()}
        >
            Sign in
        </div>
    )

}