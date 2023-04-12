import React, {useState} from "react";
import {Drawer, Tabs, Select, Space, Button, Input} from 'antd';
import {homeList, destinationList} from '@/utils/constant';

const SelectTab = ({params, setParams}) => {
  const selectArea = (value, type) => {
    setParams(pre => ({...pre, [type]: value}));
  };
  return (
    <div>
      <Select
        style={{ width: 300, marginBottom: '24px' }}
        value={params.start}
        onChange={(value) => selectArea(value, 'start')}
        options={
          homeList.map(i => ({
            value: i.position.join(','),
            label: i.name,
          }))
        }
        placeholder='请选择起点'
      />
      <Select
        style={{ width: 300 }}
        value={params.end}
        onChange={(value) => selectArea(value, 'end')}
        options={
          destinationList.map(i => ({
            value: i.position.join(','),
            label: i.name,
          }))
        }
        placeholder='请选择终点'
      />
    </div>
  )
}
const InputTab = ({params, setParams}) => {

  const inputArea = (value, type) => {
    setParams(pre => ({...pre, [type]: value}));
  }

  return (
    <div>
      <Input
        placeholder="请输入起点"
        value={params.start}
        onChange={(e) => inputArea(e.target.value, 'start')}
        style={{marginBottom: '24px'}}
      />
      <Input
        placeholder="请输入终点"
        value={params.end}
        onChange={(e) => inputArea(e.target.value, 'end')}
      />
    </div>
  )
}

const PlanModal = ({visible, setVisible, startPlanRoute}) => {

  const [params, setParams] = useState({
    start: undefined,
    end: undefined,
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
    // console.log('params', params);
    startPlanRoute(params);
  }
  const onClose = () => {
    setVisible(false);
  }
  const changeTab = (key) => {
    console.log(key);
    setParams((pre) => ({...pre, type: key, start: undefined, end: undefined}));
  }

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title='路线规划'
      width={500}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onOk}>
            OK
          </Button>
        </Space>
      }
    >
      <Tabs defaultActiveKey="coordinate" items={tabItems} onChange={changeTab} />
    </Drawer>
  )
};

export default PlanModal;