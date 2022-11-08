import React, {Fragment} from 'react';
import {Popover, Transition} from "@headlessui/react";
import {ArrowRightOnRectangleIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {LogoutOptions, User} from "@auth0/auth0-react";

interface LoggedInItemProps {
    user: User | undefined
    logout: (options?: (LogoutOptions | undefined)) => void
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const LoggedInItem: React.FC<LoggedInItemProps> = (
    {
        user, logout
    }
) => {
    return(
        <div className="flex">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={classNames(
                                open ? 'text-gray-900' : 'text-gray-500',
                                'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                            )}
                        >
                            <span>{user?.name}</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-gray-600' : 'text-gray-400',
                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                                )}
                                aria-hidden="true"
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                <div
                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        <div
                                            className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50 hover:cursor-pointer"
                                            onClick={() => logout({returnTo: window.location.origin})}
                                        >
                                            <ArrowRightOnRectangleIcon className="text-gray-900 mr-5 h-5 w-5"/>
                                            <span className="text-gray-900 text-base font-medium">Log out</span>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )

}