import * as React from "react";
import Moment from "react-moment";
import { CommentList } from "./CommentList";
import PropTypes from 'prop-types';

export class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleCommentsDisplay.bind(this);
    this.state = {
      isCommentsDisplay: false
    };
  }

  static defaultProps = {
      article: [],
      isOpen: false,
  };

  static propTypes = {
      article: PropTypes.array,
      isOpen: PropTypes.bool.isRequired,
      toggleVisibility: PropTypes.func.isRequired
  };

  render() {
    console.log("R");
    const { article, isOpen } = this.props;
    return (
      <li className="my-3 card">
        <header className="card-header">
          <h5 className="d-inline-block">
            {article.title} -{" "}
            <Moment format="DD.MM.YYYY">{article.date}</Moment>
          </h5>
          <button
            className="p-1 ml-3 d-inline-block"
            onClick={this.handleClick}
          >
            {isOpen ? "Закрыть" : "Открыть"}
          </button>
          <button disabled={(article.comments) ? '' : 'disabled'} className="p-1 ml-3 d-inline-block" onClick={this.toggleCommentsDisplay}>
            {this.state.isCommentsDisplay ? "Скрыть" : "Показать"} комментарии
          </button>
        </header>
        <div className="card-body">
          {isOpen ? <p>{article.text}</p> : null}
          <CommentList
            comments={article.comments}
            isCommentsDisplay={this.state.isCommentsDisplay}
            toggleCommentsDisplay={this.toggleCommentsDisplay}
          />
        </div>
      </li>
    );
  }

  handleClick = () => {
    if (this.props.isOpen) {
      this.props.toggleVisibility(null);
    } else {
      this.props.toggleVisibility(this.props.article.id);
    }
  };

  toggleCommentsDisplay = () => {
    this.setState({
      isCommentsDisplay: !this.state.isCommentsDisplay
    });
  };
}
