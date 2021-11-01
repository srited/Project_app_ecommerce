import * as React from 'react';
/*
 * Add filters for the items shown based on brand,color and price
 */
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Filter = () => {
         
    return (
        <div>
            <label style={{ color: "white" }}><h4>Apply Filters</h4></label>

            <List>
                <ListItem key="Brand">
                    <ListItemText primary="Brand" sx={{ color: "white" }}  />
                </ListItem>
                <ListItem key="Branditems">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Kinx" className={'Filterslist'}   />
                        <FormControlLabel control={<Checkbox />} label="Latina" className={'Filterslist'} />
                    </FormGroup>
                </ListItem>
                <Divider   />
                <ListItem key="Fabric">
                    <ListItemText primary="Fabric Color" sx={{ color: "white" }} />
                </ListItem>
                <ListItem key="Fabricitems">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Blue" className={'Filterslist'} />
                        <FormControlLabel control={<Checkbox />} label="Pink" className={'Filterslist'} />
                    </FormGroup>
                </ListItem>
                <Divider />
            </List>  
            </div>
    );
}
export default Filter;
 