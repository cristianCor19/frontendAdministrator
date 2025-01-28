import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {SnackbarProvider} from 'notistack'
import Sidebar from '../components/Sidebar'
import RegisterUser from "../components/RegisterUser";

function UsersPage() {
    const { getUsers, users } = useUser();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsers();
    }, []);
    
    if (users.length === 0) return (<h1>No users</h1>);

    return (
        
        <div>

            <Sidebar/>
            <div className="margin-all-page">
                
                <div className="p-5 mt-10 bg-gray-100">
                    <div className="overflow-auto rounded-lg shadow ">
                        <div className="flex mb-4">

                            <h1 className="ml-auto text-3xl font-bold text-blue-700">Listado de usuarios</h1>
                            <button className="ml-auto items-center p-2  bg-blue-500 text-cyan-50 rounded-md" onClick={() => {
                                setOpen(true)
                            }}>Agregar usuario</button>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Apellido</th>
                                    
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr className="bg-white" key={user._id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{user.id_user}</a>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
                                            {user.name}
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-3 text-xs font-medium capitalize tracking-wider  ">{user.lastname}</span>
                                        </td>
                                        
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap capitalize">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
            </div>
            <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            
            />
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 mb-6 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                
                                
                                </div>
                                
                            </div>
                        <RegisterUser
                        onSuccess={() => setOpen(false)}
                        onClose={() => setOpen(false)}/>
                        </div>
                        
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
                                
        </div>
    );
}

export default UsersPage;
