import React from 'react';
import { Link } from 'react-router-dom';
import {  } from '@material-ui/core';
import _ from 'lodash';

import XicData from '../data/xic-ids.json'

export default function XicCodes() {

    const roots = _.filter(XicData, (xic) => {
        return _.isEmpty(_.get(xic, 'parent_ids', []));
    });

    return (
        <div>
            <h1>
                XIC Codes
            </h1>

            <Link to='/'>
                Home page
            </Link>

            <ul>
                {
                    _.map(roots, (root) => {
                        return (
                            <li>
                                { _.get(root, 'name.en', 'UNKNOWN') }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
