import * as React from "react";
import { Comment } from "./Comment";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export class CommentList extends React.Component {
    static defaultProps = {
        comments: []
    };

    static propTypes = {
        comments: PropTypes.array
    };
  render() {
      let {comments} = this.props;
    return (
      <div className="my-3">
          <h5 className="d-inline-block">Комментарии</h5>
          {comments.length ?
              <button className="p-1 ml-3 d-inline-block" onClick={this.props.toggleCommentsDisplay}>
                  {this.props.isCommentsDisplay ? "Скрыть" : "Показать"}
              </button> : <span className="text-muted small pl-3">нет комментариев</span>
          }
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {(this.props.isCommentsDisplay) ? comments.map(comment => (<Comment key={comment.id} comment={comment} />)) : null }
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}
