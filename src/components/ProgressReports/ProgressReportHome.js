import {BackgroundCard, StudyRoomChatCard} from "../CustomMUIComponents/CustomCards";
import NavDrawer from "../NavDrawer/navDrawer";
import * as React from "react";
import Typography from "@mui/material/Typography";
import BottomDrawer from "../StudyRoom/BottomDrawer";
import AssessmentIcon from '@mui/icons-material/Assessment';


export default function ProgressReportHome(){

    const studyEstimator = (
        <React.Fragment>
            <NavDrawer/>
            <StudyRoomChatCard width='92vw' height='8vh' marginTop='70px' topLeftRadius='10px' topRightRadius='10px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={<div style={{fontSize:'22px', fontWeight:'bold'}} ><Typography variant="1">Study Estimator</Typography></div>}/>
            <StudyRoomChatCard width='92vw' height='65vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                               bottomLeftRadius='0px' bottomRightRadius='0px' content={
                <div style={{overflow: 'auto', height: '60vh'}}>
                   list of courses taken by students
                </div>
            }/>

            {/*drawers for future features*/}
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1.8vw', marginRight: '1.8vw'}}>
                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='10px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Feature 1'} content={"feature 1"}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Feature 2'} content={"feature 2"}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='0px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Feature 3'} content={"feature 3"}/></div>}/>

                <StudyRoomChatCard width='23vw' height='7vh' marginTop='2px' topLeftRadius='0px' topRightRadius='0px'
                                   bottomLeftRadius='0px' bottomRightRadius='10px' content={<div
                    style={{width: '100%', height: '100%', background: 'none', border: 'none'}}
                ><BottomDrawer icon={<AssessmentIcon style={{color: '#912338', height: '5vh', width: '5vh'}}/>}
                               title={'Feature 4'} content={"feature 4"}/></div>}/>

            </div>
        </React.Fragment>
    )

    return(<BackgroundCard width='96vw' height='99vh' content={studyEstimator}/>)
}