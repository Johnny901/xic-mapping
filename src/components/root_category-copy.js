import React, { useState } from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import _ from "lodash";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

const TextOnlyTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "transparent",
  },
})(Tooltip);

const useStyles = makeStyles((theme) => ({
  reactFrag: {
    border: "1px solid #ddd",
  },

  rootXic: {
    marginTop: 5,
    cursor: "pointer",
    width: "75%",
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
    width: "75%",
    margin: "auto",

    "& .MuiListItemText-root": {
      fontFamily: "Calibri",
      borderLeft: "1px solid",
    },
    "& .MuiListItemText-primary": {
      fontSize: "15px",
      marginLeft: "10px",
    },
    "& .MuiListItemText-secondary": {
      fontStyle: "Italic",
      fontWeight: "light",
      fontSize: "14px",
      marginLeft: "10px",
    },
  },

  childSic2007: {
    paddingLeft: theme.spacing(8),
    width: "75%",
    margin: "auto",
    cursor: "default",
    padding: "0px",

    "& .MuiListItemText-primary": {
      fontWeight: "bold",
      color: "#666666",
      fontFamily: "Calibri",
    },
    "& .MuiListItemText-secondary": {
      fontStyle: "italic",
      color: "#666666",
      fontFamily: "Calibri",
    },
  },
}));

export default function RootCategory(props) {
  const classes = useStyles();

  const { root, XicData, Sic2007Codes } = props;

  const [showChildren, setShowChildren] = useState(false);

  const childrenFor = (parentID) => {
    return _.filter(XicData, (xic) => {
      return _.indexOf(_.get(xic, "parent_ids", []), parentID) > -1;
    });
  };

  const matchingParent = _.filter(XicData, (xic) => {
    return _.get(xic.id === XicData.parent_ids);
  });

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
            <React.Fragment key={child.id}>
              <ListItem className={classes.childXic}>
                <ListItemText
                  primary={_.get(child, "name.en", "UNKNOWN")}
                  secondary={`${
                    _.get(child, "sic_codes", []).length
                  } SIC codes`}
                />
              </ListItem>

              <List>
                {_.map(_.get(child, "sic_codes", []), (sic) => {
                  const name = Sic2007Codes[sic];
                  const sicCode = _.padStart(sic, 5, "0");

                  return (
                    <ListItem button className={classes.childSic2007}>
                      <ListItemText primary={name} secondary={sicCode} />
                      <TextOnlyTooltip title="parents">
                        <Button>{matchingParent}</Button>
                      </TextOnlyTooltip>
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
