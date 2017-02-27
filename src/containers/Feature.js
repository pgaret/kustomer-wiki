import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Panel} from 'react-bootstrap'
import {Link} from 'react-router'
import {createNewArticle} from '../actions/index'
import Subfeature from '../components/Subfeature'

class Feature extends Component {
  constructor(props){
    super(props)
    this.state = {subfeatures: []}
    for (let i = 0; i < props.subfeatures.length; i++){
      let sf = props.subfeatures[i]
      this.state.subfeatures.push(<Subfeature key={i+(i/10 + 1)} name={sf.name} description={sf.description} _id={sf._id} f_id={props._id} />)
    }
    this.makeNewSubfeature = this.makeNewSubfeature.bind(this)
  }

  makeNewSubfeature(){
    this.props.newArticle(this.props._id)
  }

  componentWillReceiveProps(nextProps){
    this.state.subfeatures = []
    for (let i = 0; i < nextProps.subfeatures.length; i++){
      let sf = nextProps.subfeatures[i]
      this.state.subfeatures.push(<Subfeature key={i+(i/10 + 1)} name={sf.name} description={sf.description} _id={sf._id} f_id={this.props._id} />)
    }
  }

  render() {
    let link = '/features/new'
    return (
      <Panel header={this.props.name}>
        {this.state.subfeatures}
        <Link onClick={this.makeNewSubfeature} to={link}>+</Link>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    newArticle: (f_id) => {
      dispatch(createNewArticle(f_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feature)
