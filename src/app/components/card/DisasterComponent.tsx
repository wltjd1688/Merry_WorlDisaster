import React, { useState } from 'react';
import Article from '../etc/Article';
import { useRecoilValue } from 'recoil';
import { darkModeState, dataState, userLoginState } from '../../recoil/dataRecoil';
import Video from '../etc/Video';
import Upload from '../etc/Upload';
import {useRouter} from 'next/navigation';

interface DisasterComponentProps {
  dID: string;
}

const DisasterComponent: React.FC<DisasterComponentProps> = ({ dID }) => {
  const [activeTab, setActiveTab] = useState(1);
  const detailData = useRecoilValue(dataState).find((item) => item.dID === dID);
  const isDarkMode = useRecoilValue(darkModeState);
  const isLogin = useRecoilValue(userLoginState).isLoggedIn;
  const router = useRouter();

  const selectTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className={`card ${isDarkMode ? 'darkMode' : ''}`}>
      <div className='cardTitle'>Disaster Detail Info</div>
      <div className="tabList">
        <div className={`tab ${activeTab === 1 ? 'active tabActive' : ''}`} onClick={() => selectTab(1)}>Detail</div>
        <div className={`tab ${activeTab === 2 ? 'active tabActive' : ''}`} onClick={() => selectTab(2)}>Article</div>
        <div className={`tab ${activeTab === 3 ? 'active tabActive' : ''}`} onClick={() => selectTab(3)}>Video</div>
        <div className={`tab ${activeTab === 4 ? 'active tabActive' : ''}`} onClick={() => selectTab(4)}>Upload</div>
      </div>
      <div className='tabContentBox'>
        {activeTab === 1 &&
          <div className='tabContent'>
            <div className='cardTitle'>Disaster Detail Information</div>
            {dID && detailData? (
            <table>
              <tbody className='px-3'>
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Type:</td>
                  <td>{detailData.dType}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Date:</td>
                  <td>{detailData.dDate}</td>
                </tr>
                <tr>
                  <td className=" align-top start text min-w-auto bold text-black mb-2">Description: </td>
                  <td className=" nowrap overflow-hidden text-ellipsis line-clamp-3 width:300px">{detailData.dDescription}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black mb-2"></td>
                  <td>{detailData.dUrl==null? null:<button onClick={()=>{router.push(detailData.dUrl)}} className='hover:text-gray-500 active:text-gray-300'> ...more</button>}</td>
                </tr>
                {detailData.dAlertLevel && 
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Alert Level:</td>
                  <td>{detailData.dAlertLevel}<span style={{margin: '20px', paddingLeft: '20px', height: '10px', width: '10px', borderRadius: '50%', backgroundColor: detailData.dAlertLevel }}></span></td>
                </tr>}
                <tr>
                  <td className="min-w-auto bold text-black">Latitude:</td>
                  <td>{detailData.dLatitude.toFixed(4)}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black">Longitude:</td>
                  <td>{detailData.dLongitude.toFixed(4)}</td>
                </tr>
              </tbody>
            </table>
            ) : (
              <p className='cardContent'>Click the Pin. Can see More Info</p>
            )}
          </div>
        }
        {activeTab === 2 && dID &&
          <div className='tabContent'>
            <Article dID={dID} />
          </div>
        }
        {activeTab === 3 && dID &&
          <div className='tabContent flex items-center justify-center'>
            <Video/>
          </div>
        }
        {isLogin && activeTab === 4 && dID &&
          <div className='tabContent flex items-center justify-center ml-[20px]'>
            <Upload dID={dID}/>
          </div>
        }
      </div>
    </div>
  );
};

export default DisasterComponent;