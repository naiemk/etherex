var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var utils = require("../js/utils");

var LastPrice = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function () {
    return {
      lastMarket: null,
      lastPrice: null,
      priceChange: 'info'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.market.name == this.state.lastMarket) {
      if (nextProps.market.lastPrice > this.state.lastPrice)
        this.setState({
          priceChange: 'success'
        });
      else if (nextProps.market.lastPrice < this.state.lastPrice)
        this.setState({
          priceChange: 'danger'
        });
    }
    else
      this.setState({
        lastMarket: nextProps.market.name,
        lastPrice: "N/A",
        priceChange: 'info'
      });

    if (nextProps.market.lastPrice && nextProps.market.name) {
      this.setState({
        lastMarket: nextProps.market.name,
        lastPrice: utils.numeral(nextProps.market.lastPrice, String(nextProps.market.precision).length - 1)
      });
    }
  },

  render: function() {
    return (
      <div onClick={this.props.toggleGraph} className={"btn btn-lg btn-" + this.state.priceChange + " text-overflow text-center"} title={this.state.lastPrice}>
        <div className="visible-md visible-lg">
          <span className="pull-right btn btn-primary btn-xs icon-chart-line"></span>
        </div>
        Last price: {this.state.lastPrice ? this.state.lastPrice + " " + (this.state.lastMarket ? this.state.lastMarket : "") + "/ETH" : "N/A"}
      </div>
    );
  }
});

module.exports = LastPrice;