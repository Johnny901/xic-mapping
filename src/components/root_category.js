import React, { useState } from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import _ from "lodash";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootXic: {
    marginTop: 25,
    cursor: "pointer",
    width: "90%",
    border: "1px solid #ddd",
    color: "#666666",
    borderRadius: "2px",
    margin: "auto",

    "& .MuiTypography-root": {
      fontWeight: "bold",
      color: "#666666",
      fontFamily: "Calibri",
      fontSize: "18px",
    },
  },

  childXic: {
    paddingLeft: theme.spacing(6),
    width: "90%",
    margin: "auto",

    "& .MuiListItemText-root": {
      color: "#666666",
      fontFamily: "Calibri Light",
      borderLeft: "1px solid",
    },
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      marginLeft: "10px",
    },
    "& .MuiListItemText-secondary": {
      fontStyle: "Italic",
      fontWeight: "light",
      fontSize: "14px",
      marginLeft: "10px",
    },
  },
}));

export default function RootCategory(props) {
  const classes = useStyles();

  const { XicData, root } = props;

  const [showChildren, setShowChildren] = useState(false);

  const childrenFor = (parentID) => {
    return _.filter(XicData, (xic) => {
      return _.indexOf(_.get(xic, "parent_ids", []), parentID) > -1;
    });
  };

  const sortedChildren = (parentID) => {
    return _.sortBy(childrenFor(parentID), [
      (xic) => {
        return _.get(xic, "name.en", "abc");
      },
    ]);
  };

  return (
    <React.Fragment className={classes.reactFrag}>
      <ListItem
        button
        className={classes.rootXic}
        onClick={() => {
          setShowChildren(!showChildren);
        }}
      >
        <ListItemText primary={_.get(root, "name.en", "UNKNOWN")} />
        {showChildren ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={showChildren} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {_.map(sortedChildren(root.id), (child) => (
            <ListItem button key={child.id} className={classes.childXic}>
              <ListItemText
                primary={_.get(child, "name.en", "UNKNOWN")}
                secondary={_.join(_.get(child, "sic_codes", []), " , ")}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
