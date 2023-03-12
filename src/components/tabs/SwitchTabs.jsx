import React, { useState } from 'react'
import './tabs.scss'
const SwitchTabs = ({data,onTabChange}) => {
    const [selectedTab,setSelectedTab]=useState(0);
    const [left,setLeft] = useState(0);
    const activeTab =(tab,index)=>{
        setLeft(index*100);
        setTimeout(()=>{
            setSelectedTab(index);
        },1000)
        onTabChange(tab,index);
    }
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data.map((tab,index) => {
              return (
                <div className={`tabItem ${selectedTab===index ? "active":""}`} key={index} onClick={() => activeTab(tab,index)}>
                  {tab}
                </div>
              )
            })}
            <span className="movingBg" style={{left:left}}></span>
        </div>
    </div>
  )
}

export default SwitchTabs