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

export default function LastProducts() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        blitzcrank("products", "last").then((d) => {
            setProducts(d.data);
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
                    <h3><strong>Últimos productos</strong></h3>
                </ListSubheader>
            }
            >
            { products.map((product, index) => 
                <ListItem sx={{ width: "100%", padding: 0 }} className="last-list-item" key={index}>
                    <Link to={"/products/"+product.id} className="main-link" exact="true">
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={product.picture} alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={product.category.name}
                            />
                            <IconButton edge="end" aria-label="">
                                <div>
                                    <i><strong>ID:</strong>{product.id}</i>
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
