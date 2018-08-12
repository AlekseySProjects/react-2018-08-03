import * as React from "react";
import PropTypes from 'prop-types';

export class Comment extends React.Component {

    static PropTypes = {
        comment: PropTypes.object.isRequired
    };

  render() {
    return (
      <div className="my-3">
        <div>
          <i>{this.props.comment.user}</i>
        </div>
        <div>{this.props.comment.text}</div>
      </div>
    );
  }
}
