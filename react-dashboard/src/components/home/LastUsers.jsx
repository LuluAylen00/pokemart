import React, { useState, useEffect, Fragment } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import blitzcrank from '../../modules/blitzcrank';

import { Link } from "react-router-dom";

export default function LastUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        blitzcrank("users", "last").then((d) => {
            setUsers(d.data);
        })
        .catch((e) => { console.log(e);})
    },[]);

  return (
    <Fragment>
            
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader sx={{ lineHeight: "15px" }} component="div" id="nested-list-subheader">
                        <h3><strong>Últimos Registros</strong></h3>
                    </ListSubheader>
                }
                >
                { users.map((user, index) => 
                    <ListItem sx={{ width: "100%", padding: 0 }} className="last-list-item" key={index}>
                        <Link to={"/users/"+user.id} className="main-link" exact="true">
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={user.avatar.filename} alt="avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.username}
                                    secondary={user.email}
                                />
                                <IconButton edge="end" aria-label="">
                                    <div>
                                        <i><strong>ID:</strong>{user.id}</i>
                                    </div>
                                </IconButton>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
            </List>
    </Fragment>
  )
}
