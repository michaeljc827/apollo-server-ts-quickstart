import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../../../graphql/query';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {

    const userToken = localStorage.getItem('userToken');

    const { loading, data, error } = useQuery(ME, {
        variables: {
            token: userToken ? userToken : ""
        }
    });

    const me = data ? data.me : null;

    if (loading) {
        return <div><p>Loading...</p></div>
    }

    if (!me) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <p>
                Hello, {me.name}
            </p>
        </div>
    );
};

export default Dashboard;