import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { deleteMission } from '../modules/journey'

class Mission extends Component {
  static propTypes = {
    mission: PropTypes.object.isRequired,
    deleteMission: PropTypes.func.isRequired,
  }

  delete = () => {
    this.props.deleteMission(this.props.mission.Id)
  }

  render() {
    const { mission } = this.props

    return (
      <div className='mission'>
        <p>{mission.Description}</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteMission: bindActionCreators(deleteMission, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Mission)
