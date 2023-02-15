import React, { Fragment } from 'react';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import LastProducts from './home/LastProducts';
import LastUsers from './home/LastUsers';
import BiggerSubcats from './home/BiggerSubcats';
import TotalOrders from './home/TotalOrders';


const comps = [<LastProducts />, <TotalOrders />,<LastUsers />, 90, <BiggerSubcats />, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainBottom() {
  return (
    <Fragment>
        <Masonry columns={3} spacing={2}>
            {comps.map((item, index) => (
                <Item key={index}>
                    {item}
                </Item>
            ))}
        </Masonry>
    </Fragment>
  )
}
