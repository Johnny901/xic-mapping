import React from 'react';
import { Link } from 'react-router-dom';
import {  } from '@material-ui/core';
import _ from 'lodash';

import XicData from '../data/xic-ids.json'

export default function XicCodes() {

    const roots = _.filter(XicData, (xic) => {
        return _.isEmpty(_.get(xic, 'parent_ids', []));
    });

    const childrenFor = (parentID) => {
        return _.filter(XicData, (xic) => {
            return _.indexOf(_.get(xic, 'parent_ids', []), parentID) > 0;
        });
    }

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
                            <li key={root.id}>
                                { _.get(root, 'name.en', 'UNKNOWN') }

                                <ul>
                                    {
                                        _.map(childrenFor(root.id), (child) => (
                                                <li>
                                                    { _.get(child, 'name.en', 'UNKNOWN') }
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
