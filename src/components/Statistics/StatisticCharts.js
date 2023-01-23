import * as React from 'react';
import { useState } from 'react';
import { WeeklyStatistic } from './WeeklyReport'
import { MonthlyStatistic } from './MonthlyReport'
import { BackgroundCard } from '../CustomMUIComponents/CustomCards';
import PersistentDrawerLeft from "../NavDrawer/navDrawer";

export default function StatisticCharts() {

    const [show, setShow] = useState(true)

    const StatisticComponent = (
        <React.Fragment style="height: 900px">
            <div style={{ display: show ? 'none' : '' }}>
                {
                    <MonthlyStatistic />
                }
            </div>
            <div style={{ display: !show ? 'none' : '' }}>
                {
                    <WeeklyStatistic />
                }
            </div>
            <button onClick={() => { setShow(true) }}>weekly</button>
            <button onClick={() => { setShow(false) }}>monthly</button>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PersistentDrawerLeft />
            <div style={{ paddingTop: '100px' }}>
                <BackgroundCard width='372px' height='600%' content={StatisticComponent} />
            </div>
        </React.Fragment>
    )

}