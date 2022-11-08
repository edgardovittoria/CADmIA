import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Popover} from "@headlessui/react";
import {FileItem} from "./components/FileItem";
import {ViewItem} from "./components/ViewItem";
import {EditItem} from "./components/EditItem";
import {ComponentsItem} from "./components/ComponentsItem";
import {LoggedInItem} from "./components/LoggedInItem";
import {LoginItem} from "./components/LoginItem";

interface NavbarProps {
    showModalSave: (v: boolean) => void,
    showModalLoading: (v: boolean) => void,
    setViewElementVisibility: (s: string, v: boolean) => void,
    sideBarChecked: boolean,
    setSideBarChecked: (v: boolean) => void,
}


export const Navbar: React.FC<NavbarProps> = (
    {
        showModalSave, showModalLoading, setSideBarChecked, sideBarChecked, setViewElementVisibility
    }
) => {


    const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0();


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
                        <FileItem showModalSave={showModalSave} isAuthenticated={isAuthenticated}
                                  showModalLoading={showModalLoading}/>
                        <ViewItem sideBarChecked={sideBarChecked} setSideBarChecked={setSideBarChecked}
                                  setViewElementVisibility={setViewElementVisibility}/>
                        <EditItem/>
                        <ComponentsItem/>
                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        {isAuthenticated
                            ? <LoggedInItem user={user} logout={logout}/>
                            : <LoginItem loginWithRedirect={loginWithRedirect}/>
                        }
                    </div>
                </div>
            </div>
        </Popover>
    )
}
