import * as d3 from 'd3';

let text = [{
  t: 'reverseproxy',
}, {
  t: 'books',
}, {
  t: 'orders',
}, {
  t: 'customers'
}]
class RouteTrace {
  containerEl;
  props;
  svg;
  
  // creating D3 container for the nodes
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.svg = d3.select(containerEl)
      .append('svg')
      .style('background-color', 'white')
      .attr('width', width)
      .attr('height', height);
    this.updateDatapoints();
  }


  updateDatapoints = () => {
    const { svg, props: { data, width, height } } = this;
    console.log('data: ', data)
    console.log('nodes: ', data[0])
    console.log('links: ', data[1])
    
    console.log('1st data point: ', data[0][0])
    console.log('4th data point: ', data[0][3])

      
    var simulation = d3.forceSimulation(data[0])
      .force('link', d3.forceLink())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
    
    const node = svg
      .selectAll('circle')
      .data(data[0])
      .enter()
      .append('circle')
      .on('mouseover', () => d3.select(this).text(d.id))
    
    const circleAttr = node
      .attr('r', 20)
      .attr('cx', 200)
      .attr('cy', 200)
      .style('fill', '#00eda0')
      .on('mouseup', (d, i, nodes) => this.setActiveDatapoint(d, nodes[i]))

    const text = svg.selectAll('text')
      .data(data[0]).enter().append('text')
        
    const textLabels = text
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dx', 100)
      .attr('dy','10em')
      .text(d => d.id);

    const link = svg
      .selectAll('line')
      .data(data[1])
      .enter()
      .append('line')
      .style('stroke', 'black')

    simulation
      .nodes(data[0])
      .on('tick', ticked);

    simulation.force('link')
      .links(link);

    function ticked() {
      link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
  
      node
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    }
  }

  setActiveDatapoint = (d, node) => {
    d3.select(node).style('fill', 'yellow');
    this.props.onDatapointClick(d);
  }

}

export default RouteTrace;
