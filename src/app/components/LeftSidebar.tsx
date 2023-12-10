"use client"

import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { leftSidebarState, selectedDisasterIdState } from '../recoil/dataRecoil';
import NationComponent from './card/NationComponent';
import DisasterComponent from './card/DisasterComponent';
import Support from './etc/Suppot';
import Upload from './etc/Upload';

interface DetailProps {
  dID: string;
}

const LeftSidebar: React.FC<DetailProps> = ({ dID }) => {
  const [leftSidebar, setLeftSidebar] = useRecoilState(leftSidebarState);
  const selectedDisasterId = useRecoilValue(selectedDisasterIdState);
  if (dID === null) return null;

  const handleUploadComplete = (videoUrl: string) => {
    console.log("Uploaded video URL:", videoUrl);
  };

  return (
    <div className={`leftSidebar ${leftSidebar.isOpen ? 'block' : 'hidden'}`}>
      <div className='leftLogoBox'>
        <div className='leftLogo'>WorlDisaster</div>
        <div className='leftIcon' onClick={() => setLeftSidebar({ isOpen: false, activeIcon: 'none' })}>
          <img src="/Left/x.svg" alt="X"/>
        </div>
      </div>
      {leftSidebar.activeIcon === 'detail' && (
        <div>
          <NationComponent />
          <DisasterComponent dID={selectedDisasterId} />
        </div>
      )}
      {leftSidebar.activeIcon === 'subscribe' && (
        <div>
          구독 페이지 입니다.
        </div>
      )}
      {leftSidebar.activeIcon === 'support' && (
        <div>
          <Support />
        </div>
      )}
      {leftSidebar.activeIcon === 'upload' && (
        <div>
          <Upload dID={dID} onUploadComplete={handleUploadComplete} />
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;