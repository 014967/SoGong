import react from 'react';
import ManagerMenu from '../components/elements/ManagerMenu';
import {MComponent} from '../components/styles/ManagerMenuStyle';
import NoticeList from '../components/elements/NoticeList';
const NoticeEvent = () =>
{
    return (


      <MComponent>
             <ManagerMenu/>

            <NoticeList/>
      </MComponent>
     

    )
}
export default NoticeEvent;