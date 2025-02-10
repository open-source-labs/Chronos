// // import k8s from '@kubernetes/client-node';
// // const kuberControllers = {};
// // kuberControllers.getPods = async (req, res, next) => {
// //     try {
// //         const kc = new k8s.KubeConfig();
// //         kc.loadFromDefault();
// //         const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// //         const main = async () => {
// //             try {
// //                 const podRes = await k8sApi.listNamespacedPod('default');
// //                 //console.log('Pods: ', podRes.body.items[0]);
// //                 for (let i = 0; i < podRes.body.items.length; i++) {
// //                     console.log('Pod: ', podRes.body.items[i].metadata.name);
// //                 }
// //             } catch (err) {
// //                 console.error(err);
// //             }
// //         };
// //         main();
// //     } catch (err) {
// //         return next(err);
// //     }
// // }
// // kuberControllers.getNamespace = async (req, res, next) => {
// //     try {
// //         const kc = new k8s.KubeConfig();
// //         kc.loadFromDefault();
// //         const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// //         // const namespace = {
// //         //     metadata: {
// //         //         name: 'test',
// //         //     },
// //         // };
// //         const main = async () => {
// //             try {
// //                 // const createNamespaceRes = await k8sApi.createNamespace(namespace);
// //                 // console.log('New namespace created: ', createNamespaceRes.body);
// //                 const readNamespaceRes = await k8sApi.readNamespace(namespace.metadata.name);
// //                 console.log('Namespace: ', readNamespaceRes.body);
// //             } catch (err) {
// //                 console.error(err);
// //             }
// //         };
// //         main();
// //     } catch (err) {
// //         return next(err);
// //     }
// // }
// // kuberControllers.getResources = async (req, res, next) => {
// //     try {
// //         const kc = new k8s.KubeConfig();
// //         kc.loadFromDefault();
// //         const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
// //         const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
// //         const deploymentsRes = await appsV1Api.listNamespacedDeployment('default');
// //         //console.log('Deployments: ', deploymentsRes.body.items);
// //         let deployments = [];
// //         for (const deployment of deploymentsRes.body.items) {
// //             //console.log('Deployment: ', deployment);
// //             //console.log(deployment.spec.selector.matchLabels.app)
// //             deployments.push({
// //                 name: deployment.metadata.name,
// //                 status: deployment.status.conditions[0].status,
// //                 image: deployment.spec.template.spec.containers[0].image,
// //                 ports: [],
// //                 services: {},
// //                 app: deployment.spec.selector.matchLabels.app,
// //             });
// //         }
// //         // console.log('Deployments: ', deployments);
// //         const servicesRes = await coreV1Api.listNamespacedService('default');
// //         for (const service of servicesRes.body.items) {
// //             console.log('Service: ', service);
// //             // if (service.spec.selector && service.spec.selector.role && roles.includes(service.spec.selector.role)) {
// //             // let filteredDeployments = deployments.filter(d => {
// //             //     return d.role === service.spec.selector.role;
// //             // });
// //             // if (filteredDeployments) {
// //             for (const d of deployments) {
// //                 if (d.app === service.spec.selector?.app) {
// //                     d.ports.push(service.spec.ports[0].port);
// //                     d.services[service.metadata.name] = [];
// //                     const podRes = await coreV1Api.listNamespacedPod('default');
// //                     for (let pod of podRes.body.items) {
// //                         //console.log('Pod: ', pod);
// //                         if (pod.metadata.labels.app === d.app) {
// //                             d.services[service.metadata.name].push(pod.metadata.name);
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //         console.log('final deployments: ', deployments);
// //         for (let d of deployments) {
// //             console.log('pods: ', d.services);
// //         }
// //         const data = [];
// //         data.push({ size: '', path: 'Namespace: default' })
// //         for (let d of deployments) {
// //             const obj = {};
// //             for (let s in d.services) {
// //                 let path = 'Namespace: default/' + 'Service: ' + s
// //                 for (let p of d.services[s]) {
// //                     let path = 'Namespace: default/' + 'Service: ' + s
// //                     path += '/Pod: ' + p;
// //                     data.push({ size: '', path: path })
// //                 }
// //                 path = 'Namespace: default/' + 'Service: ' + s
// //                 data.push({ size: '', path: path })
// //             }
// //         }
// //         console.log('data: ', data);
// //         res.locals.data = data;
// //         next();
// //     } catch (err) {
// //         console.log('Error: ', err)
// //         return next(err);
// //     }
// // }
// // export default kuberControllers;
// import k8s from '@kubernetes/client-node';
// import { Request, Response, NextFunction } from 'express';
// const kuberControllers: any = {};
// /**
//  * getPods - Lists pods in the default namespace.
//  */
// kuberControllers.getPods = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//     // Pass an object with the namespace property
//     const podRes = await k8sApi.listNamespacedPod({ namespace: 'default' });
//     for (let i = 0; i < podRes.items.length; i++) {
//       console.log('Pod: ', podRes.items[i].metadata?.name);
//     }
//     // Optionally, send a response with the pods
//     res.status(200).json({ pods: podRes.items });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
// /**
//  * getNamespace - Reads the default namespace.
//  */
// kuberControllers.getNamespace = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//     // Define the namespace to read
//     const ns = 'default';
//     const readNamespaceRes = await k8sApi.readNamespace(ns);
//     console.log('Namespace: ', readNamespaceRes);
//     res.status(200).json({ namespace: readNamespaceRes });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
// /**
//  * getResources - Retrieves deployments, services, and pods in the default namespace,
//  * then builds a mapping of deployments to their pods and services.
//  */
// kuberControllers.getResources = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
//     const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
//     // Retrieve deployments using an object parameter for the namespace
//     const deploymentsRes = await appsV1Api.listNamespacedDeployment({ namespace: 'default' });
//     let deployments: any[] = [];
//     for (const deployment of deploymentsRes.items) {
//       deployments.push({
//         name: deployment.metadata?.name,
//         // Check that conditions exist before accessing the first one
//         status: deployment.status?.conditions ? deployment.status.conditions[0].status : 'Unknown',
//         image: deployment.spec?.template?.spec?.containers[0]?.image,
//         ports: [],
//         services: {},
//         app: deployment.spec?.selector?.matchLabels?.app,
//       });
//     }
//     // Retrieve services using an object parameter for the namespace
//     const servicesRes = await coreV1Api.listNamespacedService({ namespace: 'default' });
//     for (const service of servicesRes.items) {
//       console.log('Service: ', service);
//       for (const d of deployments) {
//         if (d.app === service.spec?.selector?.app) {
//           if (service.spec?.ports && service.spec.ports.length > 0) {
//             d.ports.push(service.spec.ports[0].port);
//           }
//           d.services[service.metadata?.name] = [];
//           // Retrieve pods for the default namespace
//           const podRes = await coreV1Api.listNamespacedPod({ namespace: 'default' });
//           for (let pod of podRes.items) {
//             if (pod.metadata?.labels?.app === d.app) {
//               d.services[service.metadata?.name].push(pod.metadata?.name);
//             }
//           }
//         }
//       }
//     }
//     console.log('Final deployments: ', deployments);
//     for (let d of deployments) {
//       console.log('Pods for deployment:', d.services);
//     }
//     // Build a data array containing paths
//     const data: { size: string; path: string }[] = [];
//     data.push({ size: '', path: 'Namespace: default' });
//     for (let d of deployments) {
//       for (let s in d.services) {
//         for (let p of d.services[s]) {
//           const path = 'Namespace: default/Service: ' + s + '/Pod: ' + p;
//           data.push({ size: '', path });
//         }
//         const path = 'Namespace: default/Service: ' + s;
//         data.push({ size: '', path });
//       }
//     }
//     console.log('Data: ', data);
//     res.locals.data = data;
//     next();
//   } catch (err) {
//     console.error('Error: ', err);
//     next(err);
//   }
// };
// // export default kuberControllers;
// import k8s from '@kubernetes/client-node';
// import { Request, Response, NextFunction } from 'express';
// const kuberControllers: any = {};
// /**
//  * getPods - Lists pods in the default namespace.
//  */
// kuberControllers.getPods = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//     // Use an object with the namespace property
//     const podRes = await k8sApi.listNamespacedPod({ namespace: 'default' });
//     for (let i = 0; i < podRes.items.length; i++) {
//       console.log('Pod: ', podRes.items[i].metadata?.name);
//     }
//     res.status(200).json({ pods: podRes.items });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
// /**
//  * getNamespace - Reads the default namespace.
//  */
// kuberControllers.getNamespace = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//     const ns = 'default';
//     // Pass an object with the name property as required by the type
//     const readNamespaceRes = await k8sApi.readNamespace({ name: ns });
//     console.log('Namespace: ', readNamespaceRes.body);
//     res.status(200).json({ namespace: readNamespaceRes.body });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
// /**
//  * getResources - Retrieves deployments, services, and pods in the default namespace,
//  * then builds a mapping of deployments to their pods and services.
//  */
// kuberControllers.getResources = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();
//     const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
//     const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
//     // Retrieve deployments using an object parameter for the namespace
//     const deploymentsRes = await appsV1Api.listNamespacedDeployment({ namespace: 'default' });
//     let deployments: any[] = [];
//     for (const deployment of deploymentsRes.items) {
//       deployments.push({
//         name: deployment.metadata?.name,
//         status: deployment.status?.conditions ? deployment.status.conditions[0].status : 'Unknown',
//         image: deployment.spec?.template?.spec?.containers[0]?.image,
//         ports: [],
//         services: {},
//         app: deployment.spec?.selector?.matchLabels?.app,
//       });
//     }
//     // Retrieve services using an object parameter for the namespace
//     const servicesRes = await coreV1Api.listNamespacedService({ namespace: 'default' });
//     for (const service of servicesRes.items) {
//       console.log('Service: ', service);
//       // Extract service name and skip if undefined
//       const serviceName = service.metadata?.name;
//       if (!serviceName) continue;
//       for (const d of deployments) {
//         if (d.app === service.spec?.selector?.app) {
//           if (service.spec?.ports && service.spec.ports.length > 0) {
//             d.ports.push(service.spec.ports[0].port);
//           }
//           // Initialize the services entry using the non-undefined service name
//           d.services[serviceName] = [];
//           // Retrieve pods using an object with the namespace property
//           const podRes = await coreV1Api.listNamespacedPod({ namespace: 'default' });
//           for (let pod of podRes.items) {
//             if (pod.metadata?.labels?.app === d.app) {
//               const podName = pod.metadata?.name;
//               if (podName) {
//                 d.services[serviceName].push(podName);
//               }
//             }
//           }
//         }
//       }
//     }
//     console.log('Final deployments: ', deployments);
//     for (let d of deployments) {
//       console.log('Pods for deployment:', d.services);
//     }
//     // Build a data array containing paths
//     const data: { size: string; path: string }[] = [];
//     data.push({ size: '', path: 'Namespace: default' });
//     for (let d of deployments) {
//       for (let s in d.services) {
//         for (let p of d.services[s]) {
//           const path = 'Namespace: default/Service: ' + s + '/Pod: ' + p;
//           data.push({ size: '', path });
//         }
//         const path = 'Namespace: default/Service: ' + s;
//         data.push({ size: '', path });
//       }
//     }
//     console.log('Data: ', data);
//     res.locals.data = data;
//     next();
//   } catch (err) {
//     console.error('Error: ', err);
//     next(err);
//   }
// };
// export default kuberControllers;
// import k8s from '@kubernetes/client-node';
import * as k8s from '@kubernetes/client-node';
const kuberControllers = {};
/**
 * getPods - Lists pods in the default namespace.
 */
kuberControllers.getPods = async (req, res, next) => {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
        // Use an object with the namespace property
        const podRes = await k8sApi.listNamespacedPod({ namespace: 'default' });
        for (let i = 0; i < podRes.items.length; i++) {
            console.log('Pod: ', podRes.items[i].metadata?.name);
        }
        res.status(200).json({ pods: podRes.items });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};
/**
 * getNamespace - Reads the default namespace.
 */
kuberControllers.getNamespace = async (req, res, next) => {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
        const ns = 'default';
        // Pass an object with the name property as required by the type.
        // The current version of the client returns a V1Namespace directly,
        // so we no longer need to access a .body property.
        const readNamespaceRes = await k8sApi.readNamespace({ name: ns });
        console.log('Namespace: ', readNamespaceRes);
        res.status(200).json({ namespace: readNamespaceRes });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};
/**
 * getResources - Retrieves deployments, services, and pods in the default namespace,
 * then builds a mapping of deployments to their pods and services.
 */
kuberControllers.getResources = async (req, res, next) => {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
        const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
        // Retrieve deployments using an object parameter for the namespace
        const deploymentsRes = await appsV1Api.listNamespacedDeployment({ namespace: 'default' });
        let deployments = [];
        for (const deployment of deploymentsRes.items) {
            deployments.push({
                name: deployment.metadata?.name,
                status: deployment.status?.conditions ? deployment.status.conditions[0].status : 'Unknown',
                image: deployment.spec?.template?.spec?.containers[0]?.image,
                ports: [],
                services: {},
                app: deployment.spec?.selector?.matchLabels?.app,
            });
        }
        // Retrieve services using an object parameter for the namespace
        const servicesRes = await coreV1Api.listNamespacedService({ namespace: 'default' });
        for (const service of servicesRes.items) {
            console.log('Service: ', service);
            // Extract service name and skip if undefined
            const serviceName = service.metadata?.name;
            if (!serviceName)
                continue;
            for (const d of deployments) {
                if (d.app === service.spec?.selector?.app) {
                    if (service.spec?.ports && service.spec.ports.length > 0) {
                        d.ports.push(service.spec.ports[0].port);
                    }
                    // Initialize the services entry using the non-undefined service name
                    d.services[serviceName] = [];
                    // Retrieve pods using an object with the namespace property
                    const podRes = await coreV1Api.listNamespacedPod({ namespace: 'default' });
                    for (let pod of podRes.items) {
                        if (pod.metadata?.labels?.app === d.app) {
                            const podName = pod.metadata?.name;
                            if (podName) {
                                d.services[serviceName].push(podName);
                            }
                        }
                    }
                }
            }
        }
        console.log('Final deployments: ', deployments);
        for (let d of deployments) {
            console.log('Pods for deployment:', d.services);
        }
        // Build a data array containing paths
        const data = [];
        data.push({ size: '', path: 'Namespace: default' });
        for (let d of deployments) {
            for (let s in d.services) {
                for (let p of d.services[s]) {
                    const path = 'Namespace: default/Service: ' + s + '/Pod: ' + p;
                    data.push({ size: '', path });
                }
                const path = 'Namespace: default/Service: ' + s;
                data.push({ size: '', path });
            }
        }
        console.log('Data: ', data);
        res.locals.data = data;
        next();
    }
    catch (err) {
        console.error('Error: ', err);
        next(err);
    }
};
export default kuberControllers;
//# sourceMappingURL=kuberControllers.js.map