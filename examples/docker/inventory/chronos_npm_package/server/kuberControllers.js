const k8s = require('@kubernetes/client-node');
const kuberControllers = {};

kuberControllers.getPods = async (req, res, next) => {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();

        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

        const main = async () => {
            try {
                const podRes = await k8sApi.listNamespacedPod('default');
                //console.log('Pods: ', podRes.body.items[0]);
                for (let i = 0; i < podRes.body.items.length; i++) {
                    console.log('Pod: ', podRes.body.items[i].metadata.name);
                }
            } catch (err) {
                console.error(err);
            }
        };

        main();
    } catch (err) {
        return next(err);
    }
}

kuberControllers.getNamespace = async (req, res, next) => {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();

        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

        // const namespace = {
        //     metadata: {
        //         name: 'test',
        //     },
        // };

        const main = async () => {
            try {
                // const createNamespaceRes = await k8sApi.createNamespace(namespace);
                // console.log('New namespace created: ', createNamespaceRes.body);

                const readNamespaceRes = await k8sApi.readNamespace(namespace.metadata.name);
                console.log('Namespcace: ', readNamespaceRes.body);

            } catch (err) {
                console.error(err);
            }
        };

        main();
    } catch (err) {
        return next(err);
    }
}

kuberControllers.getResources = async (req, res, next) => {

    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();

        const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
        const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

        const deploymentsRes = await appsV1Api.listNamespacedDeployment('default');
        //console.log('Deployments: ', deploymentsRes.body.items);

        let deployments = [];
        for (const deployment of deploymentsRes.body.items) {
            //console.log('Deployment: ', deployment);
            //console.log(deployment.spec.selector.matchLabels.app)
            deployments.push({
                name: deployment.metadata.name,
                status: deployment.status.conditions[0].status,
                image: deployment.spec.template.spec.containers[0].image,
                ports: [],
                services: {},
                app: deployment.spec.selector.matchLabels.app,
            });
        }

        // console.log('Deployments: ', deployments);

        const servicesRes = await coreV1Api.listNamespacedService('default');

        for (const service of servicesRes.body.items) {
            console.log('Service: ', service);
            // if (service.spec.selector && service.spec.selector.role && roles.includes(service.spec.selector.role)) {
            // let filteredDeployments = deployments.filter(d => {
            //     return d.role === service.spec.selector.role;
            // });
            // if (filteredDeployments) {

            for (const d of deployments) {
                if (d.app === service.spec.selector?.app) {
                    d.ports.push(service.spec.ports[0].port);
                    d.services[service.metadata.name] = [];

                    const podRes = await coreV1Api.listNamespacedPod('default');
                    for (let pod of podRes.body.items) {
                        //console.log('Pod: ', pod);
                        if (pod.metadata.labels.app === d.app) {
                            d.services[service.metadata.name].push(pod.metadata.name);
                        }
                    }

                }

            }
        }
        console.log('final deployments: ', deployments);
        for (let d of deployments) {
            console.log('pods: ', d.services);
        }

        const data = [];
        data.push({ size: '', path: 'Namespace: default' })
        for (let d of deployments) {
            const obj = {};
            for (let s in d.services) {
                let path = 'Namespace: default/' + 'Service: ' + s
                for (let p of d.services[s]) {
                    let path = 'Namespace: default/' + 'Service: ' + s
                    path += '/Pod: ' + p;
                    data.push({ size: '', path: path })
                }
                path = 'Namespace: default/' + 'Service: ' + s
                data.push({ size: '', path: path })
            }


        }

        console.log('data: ', data);
        res.locals.data = data;
        next();


    } catch (err) {
        console.log('Error: ', err)
        return next(err);
    }
}

module.exports = kuberControllers;