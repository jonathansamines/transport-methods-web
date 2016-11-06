import React from 'react';
import io from 'transport-methods';

class ResultMatrix extends React.Component {
  constructor(props) {
    super(props);

    const transportMatrix = io.transportMatrix(props.transportMatrix);

    this.state = {
      result: transportMatrix.resolveBy('minimumCost'),
    };
  }

  getColumns(route) {
    return route
      .to
      .map((dest, index) => {
        return (
          <td key={index + 1}>
            <span className="label label-default">
              Cost {dest.cost}
            </span>

            <span className="label label-primary">
              Units {dest.units}
            </span>
          </td>
        );
      });
  }

  getHeaders() {
    return this.state
      .result
      .distribution[0]
      .to
      .map((dest, index) => (
        <th key={index}>{dest.destination}</th>
      ));
  }

  getGrid() {
    return this.state
      .result
      .distribution
      .map((route, index) => {
        const columns = this.getColumns(route);

        return (
          <tr key={index}>
            {[
              <td key={0}>{route.from}</td>,
              ...columns,
            ]}
          </tr>
        );
      });
  }

  render() {
    return (
      <table className="table table-bordered">
        <caption>Resultado por Costo Mínimo</caption>
        <thead>
          <tr>
            <th>#</th>
            {this.getHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.getGrid()}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Summary (Z) = </strong>
            </td>
            <td colSpan={this.state.result.distribution[0].to.length}>
              {this.state.result.summary}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

ResultMatrix.propTypes = {
  transportMatrix: React.PropTypes.shape({
    routes: React.PropTypes.array,
    originations: React.PropTypes.array,
    destinations: React.PropTypes.array,
  }).isRequired,
};

export default ResultMatrix;
