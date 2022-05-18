import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import useToken from '../Hooks/useToken';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user)
    if (token) {
        
    }
    const [lErr, setLErr] = useState('')
    const onSubmit = data => {
        console.log(data);
        if (data.password === data.cpassword) {
            createUserWithEmailAndPassword(data.email, data.password)
        } else {
            setLErr("Password doesn't match confirm password")
        }
    }
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <Form className="mx-auto w-50 my-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center mb-3">Register</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Control type="password" {...register("password",
                    {
                        required: {
                            value: true,
                            message: "Password is Required"
                        },
                        minLength: {
                            value: 6,
                            message: 'Must Be 6 Characters or Longer'
                        }
                    })} placeholder="Password" />
                {errors.password?.type === 'required' && <span className="text-danger">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" {...register("cpassword", { required: true })} placeholder="Confirm Password" />
            </Form.Group>
            {lErr && <p className="text-danger">{lErr}</p>}
            <p>Already Have a account? <Link to="/login">Login</Link></p>
            <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default Register;