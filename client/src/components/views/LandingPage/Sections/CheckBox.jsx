import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  const [ checked, setChecked ] = useState([]);

  const handleToggle = (id) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [ ...checked ];

    if(currentIndex === -1){
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  }

  const renderCheckBoxLIst = () => list && list.map(v => (
    <React.Fragment key={v._id}>
      <Checkbox 
        onChange={() => handleToggle(v._id)}
        checked={checked.indexOf(v._id) === -1 ? false : true}
        key={v._id}/>
        <span style={{ margin: '0.5rem' }}>{v.name}</span>
    </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Continents" key="1">
        {renderCheckBoxLIst()}
      </Panel>
  </Collapse>
  )
}

export default CheckBox;
