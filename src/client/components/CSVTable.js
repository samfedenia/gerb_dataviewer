import React from "react";
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '75vw',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 350,
    margin: '1rem'
  },
}));

export default ({ data }) => {
  const classes = useStyles()
  return (
    
    <List className={classes.root} subheader={<li />}>
        {data.map((item, idx) => {
          if (idx <= Math.floor(data.length*0.25)) {
            return (<ListItem key={`item-${idx}`}>
            <ListItemText primary={`${item.data}`} />
          </ListItem>
            )
          }
        })
      }
</List>
  );
};
