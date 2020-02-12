import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../../graphql/mutation';

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [login, { data }] = useMutation(LOGIN);

    const handleLogin = () => {
        const emailVal = emailRef.current.value;
        const passwordVal = passwordRef.current.value;

        login({
            variables: {
                email: emailVal,
                password: passwordVal
            }
        });

    };

    const inputStyle = {
        width: 300,
        border: 'solid grey 2px',
        height: 25,
        margin: '10px 0',
        borderRadius: 5
    };

    const buttonStyle = {
        width: 300,
        border: 'solid black 1px',
        background: 'green',
        height: 35,
        color: 'white',
        borderRadius: 5
    }

    if (data) {
        if (data.login) {
            console.log(data.login.token);
        }
    }


    return (
        <div>
            <div style={{ margin: '0 auto', width: 300 }}>
                <input style={inputStyle} type="text" ref={emailRef} />
                <input style={inputStyle} type="text" ref={passwordRef} />

                <button style={buttonStyle} type='button' onClick={handleLogin}>LOGIN</button>
            </div>
        </div>
    );
};

export default Login;