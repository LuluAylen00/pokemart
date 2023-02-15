import React, { Fragment , useState, useEffect } from 'react';
import blitzcrank from '../../modules/blitzcrank';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { /*Button,*/ CardActionArea/*, CardActions*/ } from '@mui/material';
import { Link } from "react-router-dom"

const TotalOrders = () => {

    const [orders, setOrders] = useState(0)

    useEffect(() => {
        blitzcrank("orders").then((d) => setOrders(d.meta.trades))
    },[])

    return (
        <Fragment>
            <Paper elevation={3} square>
                <Link to="/sales" className="main-link" exact="true">
                    <Card >
                        <CardActionArea>
                            <CardContent >
                                <Typography sx={{ marginBottom: 0 }} gutterBottom variant="h3" component="div">
                                    {orders}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary">
                                    Ordenes finalizadas
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </Paper>
        </Fragment>
    )
}

export default TotalOrders;