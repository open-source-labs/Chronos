import React, { useEffect } from 'react';
import * as d3 from 'd3'; // Import D3 libraries here
import ForceGraph3D from '3d-force-graph'; // Import 3d-force-graph library here
import dat from 'dat.gui'; // Import dat.gui library here
// import fs from 'fs';

const Inspect = () => {
    useEffect(() => {
        // controls
        const controls = { 'DAG Orientation': 'td' };
        const gui = new dat.GUI();
        gui.add(controls, 'DAG Orientation', ['td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin', null])
            .onChange(orientation => graph && graph.dagMode(orientation));

        // graph config
        const NODE_REL_SIZE = 1;
        const graph = ForceGraph3D()
            .dagMode('td')
            .dagLevelDistance(200)
            .backgroundColor('#101020')
            .linkColor(() => 'rgba(255,255,255,0.2)')
            .nodeRelSize(NODE_REL_SIZE)
            .nodeId('path')
            .nodeVal('size')
            .nodeLabel('path')
            .nodeAutoColorBy('module')
            .nodeOpacity(0.9)
            .linkDirectionalParticles(2)
            .linkDirectionalParticleWidth(0.8)
            .linkDirectionalParticleSpeed(0.006)
            .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
            .d3VelocityDecay(0.3);

        // Decrease repel intensity
        graph.d3Force('charge').strength(-15);

        // fs.readFile('./d3-dependencies.csv', 'utf8', function (err, data) {
        //     if (err) {
        //         return console.log(err);
        //     } else {
        //         console.log(data);
        //         const nodes = [], links = [];
        //         data.forEach(({ size, path }) => {
        //             const levels = path.split('/'),
        //                 level = levels.length - 1,
        //                 module = level > 0 ? levels[1] : null,
        //                 leaf = levels.pop(),
        //                 parent = levels.join('/');

        //             const node = {
        //                 path,
        //                 leaf,
        //                 module,
        //                 size: +size || 20,
        //                 level
        //             };

        //             nodes.push(node);

        //             if (parent) {
        //                 links.push({ source: parent, target: path, targetNode: node });
        //             }
        //         });



        //         graph(document.getElementById('graph'))
        //             .graphData({ nodes, links });
        //     }
        // });

        fetch('http://localhost:1111/api/data')
            .then(r => r.text())
            .then(d3.csvParse)
            .then(data => {
                console.log(data)
                const nodes = [], links = [];
                data.forEach(({ size, path }) => {
                    const levels = path.split('/'),
                        level = levels.length - 1,
                        module = level > 0 ? levels[1] : null,
                        leaf = levels.pop(),
                        parent = levels.join('/');

                    const node = {
                        path,
                        leaf,
                        module,
                        size: +size || 20,
                        level
                    };

                    nodes.push(node);

                    if (parent) {
                        links.push({ source: parent, target: path, targetNode: node });
                    }
                });

                graph(document.getElementById('graph'))
                    .graphData({ nodes, links });
            });
    }, []);


    return <div id="graph" />;
};

export default Inspect;