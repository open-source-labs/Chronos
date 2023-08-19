import React, { useEffect } from 'react';
import * as d3 from 'd3'; // Import D3 libraries here
import ForceGraph3D from '3d-force-graph'; // Import 3d-force-graph library here
import dat from 'dat.gui'; // Import dat.gui library here
import '../stylesheets/Inspect.scss';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';



// currently, Insepect only works statically, but it should be possible to make it dynamic. To do so, we need to make get kubernetes resources information from the backend, and then pass it to the graph.
// It will be great if future iteration group can make it dynamic.

const Inspect = () => {
    useEffect(() => {
        // controls
        const controls = { 'DAG Orientation': 'td' };
        const gui = new dat.GUI();
        gui.add(controls, 'DAG Orientation', ['td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin', null])
            .onChange(orientation => graph && graph.dagMode(orientation));

        // graph config
        const NODE_REL_SIZE = 7;
        const graph = ForceGraph3D({
            extraRenderers: [new CSS2DRenderer()]
        })
            .width(1000)
            .height(500)
            .dagMode('td')
            .dagLevelDistance(100)
            .backgroundColor('#101020')
            .linkColor(() => 'rgba(255,255,255,0.2)')
            .nodeRelSize(NODE_REL_SIZE)
            .nodeId('path')
            .nodeVal('size')
            .nodeLabel('path')
            .nodeAutoColorBy('module')
            .nodeOpacity(0.9)
            .nodeLabel('path')
            .linkDirectionalParticles(2)
            .linkDirectionalParticleWidth(1)
            .linkDirectionalParticleSpeed(0.006)
            .linkWidth(5)
            .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
            .d3VelocityDecay(0.3);

        // Decrease repel intensity
        graph.d3Force('charge').strength(-500);



        fetch('http://localhost:1111/api/kuberData')
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
                    .graphData({ nodes, links })
                    .onNodeDragEnd(node => {
                        node.fx = node.x;
                        node.fy = node.y;
                        node.fz = node.z;
                    })
                    .onNodeClick(node => {
                        // Aim at node from outside it
                        const distance = 40;
                        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

                        const newPos = node.x || node.y || node.z
                            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
                            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

                        graph.cameraPosition(
                            newPos, // new position
                            node, // lookAt ({ x, y, z })
                            3000  // ms transition duration
                        );

                        // Show label
                        const nodeEl = document.createElement('div');
                        nodeEl.innerHTML = node.path;
                        nodeEl.style.color = node.color;
                        nodeEl.className = 'node-label';
                        return new CSS2DObject(nodeEl);
                    })
                    .nodeThreeObject((node) => {
                        const nodeEl = document.createElement('div');
                        nodeEl.textContent = node.path.split('/').pop().replace(/:.*/, '');
                        nodeEl.style.color = node.color;
                        nodeEl.className = 'node-label';
                        return new CSS2DObject(nodeEl);
                    })
                    .nodeThreeObjectExtend(true);


            });
    }, []);


    return <div id="Infrastructure">
        <h2>Infrastructure</h2>
        <div id="graph" />;
    </div>
    // <div id="graph" />;
};

export default Inspect;