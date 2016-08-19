/**
 * The ConversationList is nothing more than a Wrapper around the `<layer-conversation-list>` widget.
 * Whatever properties you pass into ConversationList get passed along into the `<layer-conversation-list>` widget.
 * Why not use the widget directly? Because React will use innerHTML to set properties, and if your property is a function
 * with scope, bindings, etc... that will all be lost.  If your property is an object rather than a string, it will be lost.
 *
 * This component will create a Conversation Query if one was not passed in as a parameter.
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class ConversationList extends Component {

  /**
   * Copy all properties into the dom node, but never let React recreate this widget.
   */
  shouldComponentUpdate(nextProps) {

    // Copy in all of the properties
    Object.keys(nextProps).forEach(function(propName) {
      this.node[propName] = nextProps[propName];
    }, this);

    // Setup a query if one was not provided
    if (!this.node.query && this.node.client) {
      this.node.query = this.node.client.createQuery({
        model: layer.Query.Conversation,
        dataType: layer.Query.InstanceDataType,
        paginationWindow: 50
      });
    }
    return false;
  }

  /**
   * Component is now mounted and we can get the dom node for future manipulation.
   */
  componentDidMount() {
    this.node = ReactDom.findDOMNode(this);
  }

  /**
   * Render our WebComponent.
   */
  render() {
    return (
      <layer-conversation-list></layer-conversation-list>
    );
  }
}
