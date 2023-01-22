import React from 'react';
import {Popover} from "@headlessui/react";
import {FileItem} from "./components/fileItem/FileItem";
import {ViewItem} from "./components/ViewItem";
import {EditItem} from "./components/editItem/EditItem";
import {ComponentsItem} from "./components/ComponentsItem";
import { LoginLogout } from './components/loginLogout';

interface NavbarProps {
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export const Navbar: React.FC<NavbarProps> = () => {

    return (
        <Popover className="relative bg-white max-h-[100px]">
            <div className="mx-auto w-full px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-1">
                    <div className="flex justify-start w-0 flex-1">
                        <span className="text-2xl">
                            CADmIA
                        </span>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        <FileItem/>
                        <ViewItem/>
                        <EditItem/>
                        <ComponentsItem/>
                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <LoginLogout />
                    </div>
                </div>
            </div>
        </Popover>
    )
}
