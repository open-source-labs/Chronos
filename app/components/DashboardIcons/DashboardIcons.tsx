import { CommsContext } from "../../context/CommsContext"
import { DashboardContext } from "../../context/DashboardContext"
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';
import React, { useContext,useState } from "react"
import './styles.scss'

const DashboardIcons = (props) => {

  const { setPersonModalOpen } = props
  const { applications } = useContext(DashboardContext)
  const { commsData } = useContext(CommsContext)

  const [clickedAt, setClickedAt] = useState<string>('2000-01-01T00:00:00Z');

  const notification = commsData
    .filter((item: { responsestatus: number }) => item.responsestatus >= 400)
    .filter((item: { time: string }) => {
      const d1 = new Date(item.time);
      const d2 = new Date(clickedAt);
      return d1 > d2;
    });

  return (
    <div className="dashboardIconWrapper">
      <div className="dashboardIconArea">
        <span className="dashboardTooltip">
          You have {applications ? applications.length : 0} active databases
        </span>
        <DashboardIcon className="navIcon" id="dashboardIcon" />
      </div>

      <div className="notificationsIconArea">
        <span className="notificationsTooltip">
          You have {notification ? notification.length : 0} new alerts
        </span>
        <NotificationsIcon className="navIcon" id="notificationsIcon" />
        <Badge
          overlap="rectangular"
          badgeContent={notification ? notification.length : 0}
          color="secondary"
        />
      </div>
      
      <div className="personIconArea">
        <Button className="personTooltip" onClick={() => setPersonModalOpen(true)}>
          <PersonIcon className="navIcon" id="personIcon" />
        </Button>
      </div>
    </div>
  )
}

export default DashboardIcons