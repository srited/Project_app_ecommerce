import * as React from 'react';
//Material UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import propTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';

//Components
import homelogo from '../Images/hom24.png'
import Filter from '../LeftFilters/Filters'
 
 

type Anchor =   'left'  ;
//Usestate - allows to add state to the functional components
const TemporaryDrawer = (props:any) => {
    const [state, setState] = React.useState({
        
        left: false,
    
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    //Left Navigation SideBar
    const list = (anchor: Anchor) => (
        <Box sx={{ width:200}} role="presentation" onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}>
           
        <Divider />
           
        </Box>
    );
    return (
        <div>
            {(['left' ] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                       <p onClick={toggleDrawer(anchor, true)} className='{categorydisplay}' style={{ color: "white", cursor: "pointer", fontSize:"large" }}>
                        <MenuIcon sx={{ float: "left"}}/>
                            Kategorien</p>
                        <Divider />  
                        <Filter />  

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {props.categories.length ? (
                            <List className={'Navlist'}>
                                <img src={homelogo} alt="Logo" />
                                {props.categories[0].childrenCategories.map(({ name, urlPath }: { name: any, urlPath: any }) => {
                                    return (
                                        <ListItem key={name}>
                                            <ListItemButton component="a" href={`/${urlPath}`}>
                                                <ListItemText primary={name} className={'Navtext'} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                                'Loading...'
                            )}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

/*
 * *PropTypes exports a range of validators that can be used to make sure the data you receive is valid. 
 * */
TemporaryDrawer.propTypes = {
    categories: propTypes.array
}
export default TemporaryDrawer;