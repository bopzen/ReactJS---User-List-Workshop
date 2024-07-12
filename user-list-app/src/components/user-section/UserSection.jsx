import Search from './search/Search.jsx';
import Pagination from './pagination/Pagination.jsx';
import UserTable from './user-table/UserTable.jsx';
import UserCreate from './user-create/UserCreate.jsx';

import { useState, useEffect } from 'react';


const BASE_URL = 'http://localhost:3030/jsonstore';

export default function UserSection() {
    const [users, setUsers] = useState([]);
    const [showCreateUser, setShowCreateUser] = useState(false)

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


    return (
        <section className="card users-container">
            <Search />
            <UserTable users={users} />

            {showCreateUser && 
                <UserCreate 
                closeHandler={CreateUserCloseHandler}
                saveHandler={CreateUserSaveHandler}
                />}

            <button className="btn-add btn" onClick={CreateUserClickHandler}>Add new user</button>
            <Pagination />
        </section>
    )
}