import React from 'react';

const nodeTypes = {
  intermediary: 'Intermedio',
  origin: 'Origen Puro',
  destination: 'Destino Puro',
};

function getNodeTypes() {
  return Object
    .keys(nodeTypes)
    .map((type) => {
      return (
        <option key={type} value={type}>{nodeTypes[type]}</option>
      );
    });
}

class Node extends React.Component {
  updateValue(field) {
    const node = this.props.node;

    return (event) => {
      const value = event.target.value;

      node[field] = value;

      this.props.onNodeUpdated(node);
    };
  }

  render() {
    const node = this.props.node;
    const destinationReadOnly = node.type === 'destination' ? 'readonly' : '';
    const originationReadOnly = node.type === 'origin' ? 'readonly' : '';

    return (
      <div className="col-sm-4">
        <h3>{node.name}</h3>
        <br />

        <div className="form-group">
          <label htmlFor="input" className="col-sm-4">Entrada</label>
          <div className="col-sm-8">
            <input
              id="input"
              type="number"
              className="form-control"
              min={0}
              value={node.input}
              readOnly={destinationReadOnly}
              onChange={this.updateValue('input')} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="output" className="col-sm-4">Salida</label>
          <div className="col-sm-8">
            <input
              id="output"
              type="number"
              className="form-control"
              min={0}
              value={node.output}
              readOnly={originationReadOnly}
              onChange={this.updateValue('output')} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="type" className="col-sm-4">Tipo</label>
          <div className="col-sm-8">
            <select
              id="type"
              className="form-control"
              onChange={this.updateValue('type')} >
              {getNodeTypes()}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="type" className="col-sm-4">Transbordos</label>
          <div className="col-sm-8">
            <input
              id="references"
              type="text"
              className="form-control"
              placeholder="Comma separated list"
              readOnly={destinationReadOnly}
              onChange={this.updateValue('currentReference')} />
          </div>
        </div>
      </div>
    );
  }
}

Node.propTypes = {
  onNodeUpdated: React.PropTypes.func.isRequired,
  node: React.PropTypes
    .shape({
      name: React.PropTypes.string.isRequired,
      input: React.PropTypes.number.isRequired,
      output: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
    })
    .isRequired,
};

export default Node;
