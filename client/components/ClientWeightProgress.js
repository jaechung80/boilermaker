import React, { Component } from 'react';

const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const weight = [222, 220, 218, 215, 219, 216, 215, 215, 216, 212, 211, 209];
const bodyfat = [
  38.5,
  38.0,
  37.5,
  37.0,
  38.0,
  37.0,
  36.0,
  35.5,
  36.0,
  35.0,
  34.5,
  34.0,
];

const initialState = {
  data: {
    labels: weeks,
    datasets: [
      {
        data: weight,
        label: 'Weight',
        borderColor: '#3e95cd',
        fill: false,
        yAxisID: 'pounds',
      },
      {
        data: bodyfat,
        label: 'Body Fat %',
        borderColor: 'red',
        fill: false,
        yAxisID: '%',
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          id: 'pounds',
          type: 'linear',
          position: 'left',
        },
        {
          id: '%',
          type: 'linear',
          position: 'right',
        },
      ],
    },
  },
};

class ClientWeightProgress extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = initialState;
  }

  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  render() {
    const { data, options } = this.state;
    return <Line ref={this.chartReference} data={data} options={options} />;
  }
}
