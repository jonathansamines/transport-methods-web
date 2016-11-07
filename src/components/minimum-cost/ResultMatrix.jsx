import React from 'react';
import io from 'transport-methods';
import transportLabels from './../enums/transport-methods';

function labelResolveBy(resolveBy) {
  return transportLabels[resolveBy];
}

class ResultMatrix extends React.Component {
  constructor(props) {
    super(props);

    const transportMatrix = io.transportMatrix(props.transportMatrix);
    const resolution = transportMatrix.resolveBy(props.resolveBy);

    this.state = {
      resolution,
      originations: props.transportMatrix.originations,
      destinations: props.transportMatrix.destinations,
    };
  }

  getColumns(route) {
    return route
      .to
      .map((dest, index) => {
        const unitsLabelColor = dest.units === 0 ? 'danger' : 'primary';

        return (
          <td key={index + 1}>
            <span className="label label-default">
              Costo {dest.cost}
            </span>

            <span className={`label label-${unitsLabelColor}`}>
              Unidades {dest.units}
            </span>
          </td>
        );
      });
  }

  renderGrid() {
    const grid = this.state
      .resolution
      .distribution
      .map((route, index) => {
        const columns = this.getColumns(route);
        const originationCol = <td key={0}>{route.from}</td>;

        return (
          <tr key={index}>
            {[originationCol, ...columns]}
          </tr>
        );
      });

    return (
      <tbody>
        {grid}
      </tbody>
    );
  }

  renderHeader() {
    const headers = this.state
      .destinations
      .map((destination, index) => (
        <th key={index}>{destination.name}</th>
      ));

    return (
      <thead>
        <tr>
          <th>#</th>
          {headers}
        </tr>
      </thead>
    );
  }

  renderFooter() {
    const formula = this.state
      .resolution
      .distribution
      .map((origination) => {
        const elements = origination.to
          .filter((d) => d.units !== 0)
          .map((dest, idx) => {
            return (
              <i key={idx} className="label label-default">{dest.cost} * {dest.units}</i>
            );
          });

        return (
          <span>
            {elements}
          </span>
        );
      });

    return (
      <tfoot>
        <tr>
          <td>
            <strong>Valor de (Z)</strong>
          </td>
          <td colSpan={this.state.destinations.length}>
            {formula} = <span className="label label-success">{this.state.resolution.summary}</span>
          </td>
        </tr>
      </tfoot>
    );
  }

  render() {
    return (
      <table className="table table-striped">
        <caption>Resultado por {labelResolveBy(this.props.resolveBy)}</caption>

        {this.renderHeader()}
        {this.renderGrid()}
        {this.renderFooter()}
      </table>
    );
  }
}

ResultMatrix.propTypes = {
  resolveBy: React.PropTypes.string,
  transportMatrix: React.PropTypes.shape({
    routes: React.PropTypes.array,
    originations: React.PropTypes.array,
    destinations: React.PropTypes.array,
  }).isRequired,
};

export default ResultMatrix;
