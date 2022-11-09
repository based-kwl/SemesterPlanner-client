import Card from '@mui/material/Card';
import * as React from 'react';
import { BackgroundCard, ColorEventCard, CustomWhiteCard, EventCard } from '../../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from '../../NavDrawer/navDrawer'
import { EditButton} from '../../CustomMUIComponents/CustomButtons'
import { useNavigate } from "react-router";

export default function EventColorDisplay() {
    const navigate = useNavigate();
 
    function editEventColor(e) {
        navigate('/colorselector');
    }

    const ColorCardDisplay = (
        <React.Fragment>
             <div style= {{marginTop: '50px',}}>
              
            </div>
       
<Card width='200px'  style={{
            borderRadius: '15px',
            margin: '30px',}} >
                 
         <ColorEventCard id='card1' style={{ margin: 'auto'}}  backgroundColor='#912338' content='School' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card2' style={{ margin: 'auto'}}  backgroundColor= '#DB0272' content='Work' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card3' style={{ margin: 'auto'}}  backgroundColor= '#DA3A16' content='Appointment' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card4'  style={{ margin: 'auto'}}  backgroundColor='#573996' content='Gym' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard  id='card5'  style={{ margin: 'auto'}}  backgroundColor='#0072A8' content='-' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card6'  style={{ margin: 'auto'}}  backgroundColor='#0072A8' content='-' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard  id='card7' style={{ margin: 'auto'}}  backgroundColor='#0072A8' content='-' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card8'  style={{ margin: 'auto'}}  backgroundColor='#0072A8' content='-' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         <ColorEventCard id='card9'  style={{ margin: 'auto'}}  backgroundColor='#0072A8' content='-' />
         <EditButton style={{ margin: 'auto' }} content="edit" onClick={editEventColor} />
         </Card>
        </React.Fragment>

    )

    const colorPickerDisplay = (
        <React.Fragment>
            {ColorCardDisplay}
        </React.Fragment>

    )
    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '30px' }}>
                <BackgroundCard width='372px' height='auto' content={colorPickerDisplay} />
            </div>
        </React.Fragment>
    );


}

