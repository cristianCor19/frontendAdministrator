import { useEffect } from "react";
import { useUser } from '../context/UserContext';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'

function UsersPage() {
    const { getUsers, users } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    if (users.length === 0) return (<h1>No users</h1>);

    return (
        
        <div>

            <Sidebar/>
            <div className="margin-all-page">
                <button className="m-0 items-center p-2  bg-blue-500 text-cyan-50 button-register-product"><Link to={'/registerUsers'}>Agregar usuario</Link></button>
                <div className="p-5 bg-gray-100">
                    <div className="overflow-auto rounded-lg shadow ">
                        <h1 className="text-xl mb-2">Listado de usuarios</h1>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Apellido</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Correo</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr className="bg-white" key={user._id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{user.id_user}</a>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-3 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{user.lastname}</span>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{user.email}</td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
