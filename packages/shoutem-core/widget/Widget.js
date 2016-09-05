import React from 'react';
import _ from 'lodash';

export class Widget {
  constructor(component, widgetProps, updateWidget, deleteWidget) {
    this.id = _.uniqueId();
    this.Component = component;
    this.props = {
      ...Widget,
      key: this.id,
    };
    this.updateWidget = updateWidget;
    this.deleteWidget = deleteWidget;
  }

  updateProps(props) {
    this.props = {
      ...this.props,
      ...props,
    };
    this.updateWidget(this);
  }

  destroy() {
    this.deleteWidget(this);
  }

  render() {
    const { Component, props } = this;
    return <Component {...props} />;
  }
}
