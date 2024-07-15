import Search from './search/Search.jsx';
import Pagination from './pagination/Pagination.jsx';
import UserTable from './user-table/UserTable.jsx';
import UserCreate from './user-create/UserCreate.jsx';

import { useState, useEffect } from 'react';
import UserDetails from './user-details/UserDetails.jsx';
import UserDelete from './user-delete/UserDelete.jsx';
import UserEdit from './user-edit/UserEdit.jsx';


const BASE_URL = 'http://localhost:3030/jsonstore';

export default function UserSection() {
    const [users, setUsers] = useState([]);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showDetailsUser, setShowDetailsUser] = useState(null);
    const [showEditUser, setShowEditUser] = useState(null);
    const [showDeleteUser, setShowDeleteUser] = useState(null)


    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(`${BASE_URL}/users`);
                const result = await response.json();
                const userResult = Object.values(result);
                setUsers(userResult);
            } catch (error) {
                alert(error.message)
            }
        }
        getUsers();
    }, []);


    const CreateUserClickHandler = () => {
        setShowCreateUser(true);
    }

    const CreateUserCloseHandler = () => {
        setShowCreateUser(false);
    }

    const CreateUserSaveHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
  
        const userData = {
            ...Object.fromEntries(formData),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const createUser = await response.json()

        setUsers(oldUsers => [...oldUsers, createUser]);

        setShowCreateUser(false);
    }

    const userDetailsClickHandler = (userId) => {
        setShowDetailsUser(userId);
    }

    const userDetailsCloseHandler = () => {
        setShowDetailsUser(null);
    }

    const userEditClickHandler = (userId) => {
        setShowEditUser(userId)
    }

    const userEditCloseHandler = () => {
        setShowEditUser(null);
    }

    const userDeleteClickHandler = (userId) => {
        setShowDeleteUser(userId);
    }

    const userDeleteCloseHandler = () => {
        setShowDeleteUser(null);
    }

    const userDeleteHandler = async (userId) => {
        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        })

        setUsers(oldUsers => oldUsers.filter(user => user._id !== userId));
        setShowDeleteUser(null);
    }

    return (
        <section className="card users-container">
            <Search />
            <UserTable 
                users={users} 
                userDetailsClickHandler={userDetailsClickHandler}
                userEditClickHandler={userEditClickHandler}
                userDeleteClickHandler={userDeleteClickHandler}
            />

            {showCreateUser && (
                <UserCreate 
                    closeHandler={CreateUserCloseHandler}
                    saveHandler={CreateUserSaveHandler}
                />
            )}

            {showDetailsUser && (
                <UserDetails 
                    user={users.find(user => user._id === showDetailsUser)}
                    userDetailsCloseHandler={userDetailsCloseHandler}
                />
            )}

            {showEditUser && (
                <UserEdit
                    user={users.find(user => user._id === showEditUser)}
                    userEditCloseHandler={userEditCloseHandler}
                />
            )}


            {showDeleteUser && (
                <UserDelete
                user={users.find(user => user._id === showDeleteUser)}
                userDeleteHandler={() => userDeleteHandler(showDeleteUser)}
                userDeleteCloseHandler={userDeleteCloseHandler}
                />
            )}

            <button className="btn-add btn" onClick={CreateUserClickHandler}>Add new user</button>
            <Pagination />
        </section>
    )
}