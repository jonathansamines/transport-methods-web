import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveMenu = this.setActiveMenu.bind(this);
    this.state = {
      isMc: 'active',
      isTransbord: '',
    };
  }

  setActiveMenu(menu) {
    return () => {
      this.setState({
        isMc: menu === 'mc' ? 'active' : '',
        isTransbord: menu === 'trans' ? 'active' : '',
      });

      this.props.onActivation(menu);
    };
  }

  render() {
    return (
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation" className={this.state.isMc}>
              <a href="#" onClick={this.setActiveMenu('mc')}>
                Costo Minimo
                </a>
            </li>
            <li role="presentation" className={this.state.isTransbord}>
              <a href="#" onClick={this.setActiveMenu('trans')}>
                Metodo de Transbordos
              </a>
            </li>
          </ul>
        </nav>
        <h3 className="text-muted">
          <div className="logo"></div>
          <span className="logo-title">Metodos de Transporte</span>
        </h3>
      </div>
    );
  }
}

Header.propTypes = {
  onActivation: React.PropTypes.func,
};

export default Header;
