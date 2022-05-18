import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const MyTodos = () => {
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    if (loading) {
        return <p>Loading...</p>
    }
    if (user) {
        fetch(`https://safe-castle-97148.herokuapp.com/myTodo?email=${user.email}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth)
                    localStorage.removeItem("accessToken")
                    navigate("/login")
                }
                return res.json()
            })
            .then(data => {
                setTodos(data)
            })
    }
    const handleDelete = (_id) => {
        fetch(`https://safe-castle-97148.herokuapp.com/myTodo/${_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    toast.success("Successfully Deleted")
                }
            })
    }
    return (
        <div className="ms-0 me-auto" >
            <h2 className="text-center">Your Have {todos.length} Todos to finish</h2>
            <div className="row mx-auto">
                {
                    todos.map(todo =>
                        <div key={todo._id} className="col-md-3 ">
                            <Card className="d-flex justify-content-center text-center">
                                <Card.Body>
                                    <Card.Title>{todo?.todoName}</Card.Title>
                                    <Card.Text>
                                        {todo?.desc}
                                    </Card.Text>
                                    <Card.Link className="btn btn-danger text-center" onClick={() => handleDelete(todo?._id)}>Delete</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyTodos;