import React from 'react';
import range from './../utils/array-range';

class CostMatrix extends React.Component {
  constructor(props) {
    super(props);

    const originations = range(this.props.originsNumber)
      .map((n, idx) => {
        return {
          name: `Origination #${idx}`,
          supply: 0,
        };
      });

    const destinations = range(this.props.destinationsNumber)
      .map((n, idx) => ({
        name: `Destination #${idx}`,
        demand: 0,
      }));

    const routes = originations.map((from) => {
      const to = destinations.map((destination) => ({
        destination: destination.name,
        cost: 0,
      }));

      return {
        to,
        from: from.name,
      };
    });

    this.state = {
      originations,
      destinations,
      routes,
    };

    this.handleValueForOrigination = this.handleValueForOrigination.bind(this);
    this.confirmUserAcceptance = this.confirmUserAcceptance.bind(this);
    this.handleDemandForDestination = this.handleDemandForDestination.bind(this);
    this.handleSupplyForOrigination = this.handleSupplyForOrigination.bind(this);
  }

  updateRoute(origination, destination, cost) {
    const route = this.state.routes.find((r) => {
      return origination === r.from;
    });

    if (route !== undefined) {
      const dest = route.to.find((d) => d.destination === destination);

      if (dest !== undefined) {
        dest.cost = cost;

        return this.state.routes.slice();
      }
    }

    throw new Error('Route to update was not found');
  }

  handleValueForOrigination(origination, destination) {
    return (event) => {
      const cost = +event.target.value;

      this.setState((prevState) => {
        this.setState({
          originations: prevState.originations,
          destinations: prevState.destinations,
          routes: this.updateRoute(origination, destination, cost),
        });
      });
    };
  }

  getColumns(route) {
    return route.to
      .map((dest, index) => {
        return (<td key={index + 1}>
          <input
            type="number"
            value={dest.cost}
            min={0}
            onChange={this.handleValueForOrigination(route.from, dest.destination)} />
        </td>);
      });
  }

  getHeaders() {
    return this.state
      .destinations
      .map((destination, index) => (
        <th key={index}>{destination.name}</th>
      ));
  }

  getGrid() {
    return this.state
      .routes
      .map((route, index) => {
        const origination = this.state.originations.find((d) => d.name === route.from);
        const columns = this.getColumns(route);

        return (<tr key={index}>
          {[
            <td key={0}>{route.from}</td>,
            ...columns,
            <td key="dest">
              <input
                type="number"
                value={origination.supply}
                min={0}
                onChange={this.handleSupplyForOrigination(origination)} />
            </td>,
          ]}
        </tr>);
      });
  }

  handleDemandForDestination(destination) {
    return (event) => {
      const demand = +event.target.value;

      if (destination) {
        destination.demand = demand;
      }

      this.setState({
        destinations: this.state.destinations.slice(),
      });
    };
  }

  handleSupplyForOrigination(origination) {
    return (event) => {
      const supply = +event.target.value;

      if (origination) {
        origination.supply = supply;
      }

      this.setState({
        originations: this.state.originations.slice(),
      });
    };
  }

  getDemand() {
    return this.state
      .destinations
      .map((destination, index) => (
        <td key={index}>
          <input
            type="number"
            value={destination.demand}
            min={0}
            onChange={this.handleDemandForDestination(destination)} />
        </td>
      ));
  }

  getSupply() {
    return this.state
      .originations
      .map((origination, index) => (
        <td key={index}>
          <input
            type="number"
            value={origination.supply}
            min={0}
            onChange={this.handleDemandForDestination(origination)} />
        </td>
      ));
  }

  confirmUserAcceptance() {
    this.props.onUserConfirmation({
      originations: this.state.originations,
      destinations: this.state.destinations,
      routes: this.state.routes,
    });
  }

  render() {
    return (
      <div>
        <table className="table table-bordered">
          <caption>Matriz de Costos</caption>
          <thead>
            <tr>
              <th>#</th>
              {this.getHeaders()}
              <th>
                <strong>Oferta</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.getGrid()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <strong>Demanda</strong>
              </td>
              {this.getDemand()}
            </tr>
          </tfoot>
        </table>

        <button
          type="submit"
          className="btn btn-default"
          onClick={this.confirmUserAcceptance} >
          Calcular Resultado
        </button>
      </div>
    );
  }
}

CostMatrix.propTypes = {
  originsNumber: React.PropTypes.number,
  destinationsNumber: React.PropTypes.number,
  onUserConfirmation: React.PropTypes.func,
};

export default CostMatrix;
