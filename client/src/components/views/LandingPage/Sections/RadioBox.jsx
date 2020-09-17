import React, { useState } from 'react'
import { Collapse } from 'antd';
import { Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox({ list, handleFilters }) {
  const [ value, setValue ] = useState(0);

  const renderRadioBox = () => (
    list && list.map(v => (
      <Radio key={v._id} value={v._id}> {v.name} </Radio>
    ))
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  }

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default RadioBox
