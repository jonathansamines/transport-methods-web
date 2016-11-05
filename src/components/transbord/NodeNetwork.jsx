import React from 'react';
import range from './../utils/array-range';

const nodeTypes = [
  'intermediary',
  'origin',
  'destination',
];

class NodeNetwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: range(this.props.nodes)
        .map((n) => {
          return {
            name: `Nodo Numero #${n}`,
            type: 'intermediary',
            input: 0,
            output: 0,
            next: [],
          };
        }),
    };

    this.updateValueForNode = this.updateValueForNode.bind(this);
    this.addReferenceToNode = this.addReferenceToNode.bind(this);
    this.confirmUserAcceptance = this.confirmUserAcceptance.bind(this);
  }

  confirmUserAcceptance() {
    console.log(this.state.nodes);
  }

  updateValueForNode(node, field) {
    return (event) => {
      const value = event.target.value;

      node[field] = value;

      return this.setState({
        nodes: this.state.nodes.slice(),
      });
    };
  }

  addReferenceToNode(originalNode) {
    return (event) => {
      const value = event.target.value;
      const [node, cost] = value.split('=').map((p) => p.trim());

      originalNode.next.push({
        reference: `Nodo numero #${node}`,
        cost: +cost,
      });

      this.setState({
        nodes: this.state.nodes.slice(),
      });
    };
  }

  updateNodeType(node) {
    return (event) => {
      const nodeType = event.target.value;

      node.type = nodeType;

      return this.setState({
        nodes: this.state.nodes.slice(),
      });
    };
  }

  static getNodeTypes() {
    return nodeTypes
      .map((type) => {
        return (
          <option key={type} value={type}>{type.toUpperCase()}</option>
        );
      });
  }

  getNodes() {
    return this.state
      .nodes
      .map((node) => {
        return (
          <div key={node.name}>
            <h3>Nodo Numero #{node.name}</h3>
            <br />

            <div className="form-group">
              <label htmlFor="inpu" className="col-sm-2">Entrada</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="input"
                  placeholder="#"
                  min={0}
                  value={node.input}
                  onChange={this.updateValueForNode(node, 'input')} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="output" className="col-sm-2">Salida</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="output"
                  placeholder="#"
                  min={0}
                  value={node.output}
                  onChange={this.updateValueForNode(node, 'output')} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="col-sm-2">Tipo</label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="type"
                  onChange={this.updateNodeType(node)} >
                  {NodeNetwork.getNodeTypes()}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="col-sm-2">Transbordos</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="references"
                  placeholder="Comma separated list"
                  min={0}
                  onChange={this.addReferenceToNode(node)} />
              </div>
            </div>
          </div>
        );
      });
  }

  render() {
    return (
      <form className="form-horizontal">
        {this.getNodes()}

        <hr />
        <hr />

        <button
          type="submit"
          className="btn btn-default"
          onClick={this.confirmUserAcceptance}>
          Resolver
        </button>
      </form>
    );
  }
}

NodeNetwork.propTypes = {
  nodes: React.PropTypes.number,
};

export default NodeNetwork;
