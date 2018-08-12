import * as React from "react";
import DatePicker from "react-datepicker/es";
import PropTypes from 'prop-types';
import Moment from "react-moment";

export default class DateFilter extends React.Component {

  static propTypes = {
      handleChangeStart: PropTypes.func.isRequired,
      handleChangeEnd: PropTypes.func.isRequired,
      startDate: PropTypes.instanceOf(Moment),
      endDate: PropTypes.instanceOf(Moment),
  };

  render() {
    const {
      handleChangeStart,
      handleChangeEnd,
      startDate,
      endDate
    } = this.props;
    return (
      <div>
        <div className="container my-3">
          <div className="row">
            <div className="col">
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={handleChangeStart}
                dateFormat="DD/MM/YYYY"
              />
            </div>

            <div className="col">
              <DatePicker
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onChange={handleChangeEnd}
                dateFormat="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
