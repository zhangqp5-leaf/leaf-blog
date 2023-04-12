import React, {useState} from "react";
import {Drawer, Tabs} from 'antd';

const SelectTab = ({params, setParams}) => {
  return (
    <div>11</div>
  )
}
const InputTab = ({params, setParams}) => {
  return (
    <div>22</div>
  )
}

const PlanModal = ({visible, setVisible}) => {

  const [params, setParams] = useState({
    start: '',
    end: '',
    type: 'coordinate',
  })

  const tabItems = [
    {
      key: 'coordinate',
      label: `选择`,
      children: <SelectTab
        params={params}
        setParams={setParams}
      />,
    },
    {
      key: 'areaName',
      label: `输入`,
      children: <InputTab
        params={params}
        setParams={setParams}
      />,
    },
  ];

  const onOk = () => {

  }
  const changeTab = (key) => {
    console.log(key);
    setParams((pre) => ({...pre, type: key, start: '', end: ''}));
  }

  return (
    <Drawer
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      onOk={() => onOk()}
    >
      <Tabs defaultActiveKey="coordinate" items={tabItems} onChange={changeTab} />
    </Drawer>
  )
};

export default PlanModal;