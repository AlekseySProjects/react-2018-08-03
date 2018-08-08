import * as React from "react";

export class Article extends React.PureComponent {
  render() {
    console.log("R");
    const { article, isOpen } = this.props;
    return (
      <li>
        {article.title}
        <button onClick={this.handleClick}>close</button>
        {isOpen ? <p>{article.text}</p> : null}
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
}
