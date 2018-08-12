import * as React from "react";
import Select from "react-select";
import { Article } from "./Article";
import moment from "moment";
import Moment from "react-moment";
import DateFilter from "./DateFilter";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.articles = props.articles.sort((a, b) => {
      let aVal = +new Date(a.date);
      let bVal = +new Date(b.date);

      return aVal <= bVal ? 1 : aVal === bVal ? -1 : 0;
    });

    this.filter = {
      startDate: moment(this.articles[this.articles.length - 1].date),
      endDate: moment(this.articles[0].date)
    };

    this.state = {
      openArticleId: null,
      inputValue: ""
    };

    this.handleChangeStart.bind(this);
    this.handleChangeEnd.bind(this);
  }

  static defaultProps = {
      articles: []
  };

  static propTypes = {
      articles: PropTypes.array,
      handleArticleFilter: PropTypes.func.isRequired
  };

  render() {
    let options = this.props.articles.map(article => ({
      value: article.id,
      label: article.title
    }));

    return (
      <div>
        UserName:{" "}
        <input value={this.state.inputValue} onChange={this.onChange} />
        <Select options={options} defaultValue={options[0]} isMulti />
        <DateFilter
          handleChangeStart={this.handleChangeStart}
          handleChangeEnd={this.handleChangeEnd}
          startDate={this.filter.startDate}
          endDate={this.filter.endDate}
        />
        <div className="text-muted my-3">
          Показаны статьи с{" "}
          <Moment format="DD.MM.YYYY">{this.filter.startDate}</Moment> по{" "}
          <Moment format="DD.MM.YYYY">{this.filter.endDate}</Moment>
        </div>
        <ul className="list-unstyled">
          {this.props.articles.map(article => (
            <Article
              key={article.id}
              article={article}
              isOpen={this.state.openArticleId === article.id}
              toggleVisibility={this.toggleVisibility}
            />
          ))}
        </ul>
      </div>
    );
  }

  onChange = event => {
    console.log(event.target.value);
    this.setState({
      inputValue: event.target.value
    });
  };

  handleChangeStart = date => {
    this.filter.startDate = date;
    this.props.handleArticleFilter(this.filterArticlesByDate());
  };

  handleChangeEnd = date => {
    this.filter.endDate = date;
    this.props.handleArticleFilter(this.filterArticlesByDate());
  };

  filterArticlesByDate() {
    let endLim = this.filter.endDate;
    endLim = endLim
      .hours(23)
      .minutes(59)
      .second(59)
      .milliseconds(999)
      .unix();
    return this.articles.filter(article => {
      let cd = moment(article.date).unix();
      return this.filter.startDate.unix() - 1 <= cd && cd <= endLim;
    });
  }

  toggleVisibility = id => {
    this.setState({
      openArticleId: id
    });
  };
}
