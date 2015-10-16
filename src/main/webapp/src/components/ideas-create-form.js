import React from 'react';
import { Grid, Row, Col, Input, ButtonInput } from 'react-bootstrap';

import _ from 'underscore';
import update from 'react-addons-update';

export default React.createClass({
  displayName: 'IdeasCreateForm',

  propTypes: {
    color: React.PropTypes.string,
    date: React.PropTypes.number,
    organizer: React.PropTypes.string,
    tags: React.PropTypes.string,
    title: React.PropTypes.string,
    town: React.PropTypes.string,
    type: React.PropTypes.oneOf([ 'Hackathon', 'Ongoing' ]),

    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: 'light-orange',
      date: Date.now(),
      organizer: 'Knusperolaf',
      tags: 'mobile, cloud',
      title: '',
      town: 'Munich',
      type: 'Hackathon'
    };
  },

  handleChange(field) {
    const self = this;

    return function(event) {
      if (self.props.onChange) {
        self.props.onChange(_.extend(_.omit(self.props, 'onChange', 'onSubmit'), {
          [field]: event.target.value
        }));
      }
    };
  },

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(_.omit(this.props, 'onChange', 'onSubmit'));
    }
  },

  render() {
    return (
      <Grid>
        <Row>
          <Col md={ 6 }>
            <Input type="select" label="Color" placeholder="color" value={ this.props.color } onChange={ this.handleChange('color') }>
            <option value="light-orange">
              Light Orange
            </option>
            <option value="red">
              Red
            </option>
            </Input>
          </Col>
          <Col md={ 6 }>
            <Input type="text" label="Organizer" placeholder="Organizer" value={ this.props.organizer } onChange={ this.handleChange('organizer') } />
          </Col>
        </Row>
        <Row>
          <Col md={ 6 }>
            <Input type="text" label="Title" placeholder="Title" value={ this.props.title } onChange={ this.handleChange('title') } />
          </Col>
          <Col md={ 6 }>
            <Input type="text" label="Town" placeholder="Town" value={ this.props.town } onChange={ this.handleChange('town') } />
          </Col>
        </Row>
        <Row>
          <Col md={ 10 } />
          <Col md={ 2 }>
            <ButtonInput type="submit" value="Create Idea" bsStyle="primary" onClick={ this.handleSubmit } />
          </Col>
        </Row>
      </Grid>);
  }

});
