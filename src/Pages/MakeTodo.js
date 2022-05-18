import React from 'react';
import { Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const MakeTodo = () => {
    const { register, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth)

    const onSubmit = data => {
        const todo = {
            todoName: data.todoName,
            email: data.email,
            desc: data.desc
        }
        console.log(todo)
        fetch("https://safe-castle-97148.herokuapp.com/todo", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(todo)

        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success("Todo Added")
                    reset()
                } else {
                    toast.error("Failed to Add Todo")
                }
            })
    }
    return (
        <div className="container">
            <h2 className="text-center">Make a Todo</h2>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)} >
                <Form.Group className="mb-3" >
                    <Form.Label>Todo Name</Form.Label>
                    <Form.Control type="text" required {...register("todoName")} placeholder="The Name of your Todo" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" readOnly value={user?.email} placeholder="name@example.com" required {...register("email")} />
                </Form.Group>
                <Form.Group className="mb-3" required >
                    <Form.Label>Your Todo</Form.Label>
                    <Form.Control as="textarea"  {...register("desc")} rows={3} />
                </Form.Group>
                <button className="btn btn-primary text-center" type="submit">Make Todo</button>
            </Form>
        </div>
    );
};

export default MakeTodo;