import React from 'react';
import { Link } from 'react-router-dom';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import XicData from '../data/xic-ids.json';
import Sic2007Codes from '../data/sic_2007_condensed_list_en.json';
import RootCategory from '../components/root_category';

const useStyles = makeStyles((theme) => ({
}));

export default function XicCodes() {
    const classes = useStyles();

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

            <List>
                {
                    _.map(roots, (root) => (
                        <RootCategory
                            key={ root.id }
                            root={ root }
                            XicData={ XicData }
                            Sic2007Codes={ Sic2007Codes }
                        />
                    ))
                }
            </List>
        </div>
    );
}
