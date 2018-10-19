import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';
import { Radio, Switch, Row, Col  } from 'antd';
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayToolTips: true
    }

    onCountSliderChange = (minCount) => {
        this.setState({
            minCount
        });
    }
  
    onChartTypeChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    }
 
    onTooltipChange = (displayToolTips) => {
        console.log(displayToolTips);
        this.setState({
            displayToolTips
        })
    }
 
   render() {
        const { minCount, chartType, displayToolTips } = this.state;
        return (
           <div className="data-view">
               <ShotChart
                   playerId={this.props.playerId}
                   minCount={minCount}
                   chartType={chartType}
                   displayToolTips={displayToolTips}
               />
               {
                   chartType === 'hexbin' ? <CountSlider
                           value={minCount}
                           onChange={_.debounce(this.onCountSliderChange, 500)}
                   /> : null
              }
               <Row>
                   <Col span={8} offset={7}>
                       <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                           <Radio value="hexbin">Hexbin</Radio>
                           <Radio value="scatter">Scatter</Radio>
                       </RadioGroup>
                   </Col>
                   <Col span={2}>
                       <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={this.onTooltipChange}/>
                   </Col>
               </Row>

            </div>
       );
   }
}
