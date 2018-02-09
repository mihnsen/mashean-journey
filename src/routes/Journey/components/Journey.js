import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Steps, { Step } from 'rc-steps'
import Mission from './Mission'

export default class Journey extends Component {
  static propTypes = {
    journey: PropTypes.object.isRequired,
    addMission: PropTypes.func.isRequired,
  }

  state = {
    currentMissionIndex: 0,
    newMission: {
      Name: '',
      Icon: '',
      Description: '',
    }
  }

  next = () => {
    const { currentMissionIndex } = this.state
    if (currentMissionIndex < this.props.journey.Missions.length - 1) {
      this.setState({
        currentMissionIndex: currentMissionIndex + 1
      })
    }
  }

  addMission = () => {
    if (!this.state.newMission.Name) {
      return
    }

    this.props.addMission(this.state.newMission)

    // Reset mission
    this.setState({
      newMission: {
        Name: '',
        Icon: '',
        Description: '',
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      newMission: {
        ...this.state.newMission,
        [e.target.name]: e.target.value,
      }
    })
  }

  render() {
    const { journey } = this.props
    const { currentMissionIndex, newMission } = this.state

    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Journey</h2>
        <div className='row'>
          <div className='col-sm-6'>
            <form className='form'>
              <div className='form-group'>
                <input name="Name" value={newMission.Name} className='form-control' placeholder='Mission Name' onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <input name="Icon" value={newMission.Icon} className='form-control' placeholder='Mission Icon' onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <textarea name="Description" value={newMission.Description} className='form-control' onChange={this.handleChange}></textarea>
              </div>
              <div className='form-group'>
                <button type="button" className='btn btn-primary btn-sm' onClick={this.addMission}>
                  Add mission
                </button>
              </div>
            </form>
          </div>
          <div className='col-sm-6'>
            <button className='btn btn-info btn-sm' onClick={this.next}>
              next mission
            </button>
            <div className='journey-step-by-step' style={{ marginTop: '50px' }}>
              <Steps direction="vertical" current={currentMissionIndex}>
                { journey.Missions.map((mission, key) =>
                  <Step
                    title={mission.Name}
                    icon={mission.icon}
                    description={<Mission mission={mission} />}
                    key={key}
                  />
                ) }
              </Steps>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
