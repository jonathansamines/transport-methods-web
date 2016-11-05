import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import MinimumCostBox from './minimum-cost/Index';
import TransbordBox from './transbord/Index';

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      isMc: true, // default
      isTransbord: false,
    };

    this.activeMenu = this.activeMenu.bind(this);
  }
  activeMenu(menu) {
    this.setState({
      isMc: menu === 'mc',
      isTransbord: menu === 'trans',
    });
  }
  render() {
    return (
      <div>
        <Header onActivation={this.activeMenu} />
        {this.state.isMc && <MinimumCostBox />}
        {this.state.isTransbord && <TransbordBox />}
      </div>
    );
  }
}

ReactDOM.render(
  <Navigation />,
  document.getElementById('application-root'),
);
