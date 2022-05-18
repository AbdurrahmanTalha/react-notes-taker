
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import useToken from '../Hooks/useToken';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInErr, setSignInErr] = useState("")
    const [token] = useToken(user)
    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    }
    const navigate = useNavigate("")
    if (loading) {
        return <p>Loading...</p>
    }
    if(error) {
        setSignInErr(error)
    }
    if (token) {
        
    }
    if (user) {
        console.log(user)
        
    }
    return (
        <Form className="mx-auto w-50 my-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center mb-3">Login</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" {...register("email",
                    {
                        required: {
                            value: true,
                            message: "Email is Required"
                        },
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Provide A Valid Email'
                        }
                    })} placeholder="Enter email" />
                {errors.email?.type === 'required' && <span className="text-danger">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password",
                    {
                        required: {
                            value: true,
                            message: "Password is Required"
                        },
                        minLength: {
                            value: 6,
                            message: 'Must Be 6 Characters or Longer'
                        }
                    })} />
                {errors.password?.type === 'required' && <span className="text-danger">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="text-danger">{errors.password.message}</span>}
                <p className="text-danger">{signInErr}</p>
            </Form.Group>
            <p>Dont Have a account? <Link to="/register">Register Now!</Link></p>
            <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>

        </Form>
    );
};

export default Login;