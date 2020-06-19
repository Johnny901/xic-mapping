import React from 'react';
import { Link } from 'react-router-dom';
import {  } from '@material-ui/core';

export default function Home() {
    return (
        <div>
            <h1>
                Home page
            </h1>

            <Link to='/xic-codes'>
                XIC codes
            </Link>
        </div>
    );
}
