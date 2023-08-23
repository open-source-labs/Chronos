//Version 12 - testing an async await version of "promiseALL" from HealthContext.tsx to get Docker example to pass result data out from the mongo fetch

const fetchHealthData = useCallback(async (serv) => {
  ipcRenderer.removeAllListeners('healthResponse');

  let temp: HealthDataObject[] = [];
  //Promise.all(
    let promises = await Promise.all(serv.map( async (service: string) => {

        try {
          const newPromise = await new Promise((resolve, reject) => {

              ipcRenderer.send('healthRequest', `${service}-containerinfos`);
              ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
                let result: object[];
                if (JSON.stringify(data) !== '{}' && tryParseJSON(data)) {
                  result = JSON.parse(data);
                  console.log('HealthContext.tsx line 68 result: ', result, 'service', service, 'Obj key', Object.keys(result[0])[0]);
                  if (result && result.length && service === Object.keys(result[0])[0]) {
                    resolve(result[0]);
                  }
                }
              });
            })
          console.log('HealthContext.tsx line 75 newPromise: ', newPromise);
          temp.push(newPromise);
          if (checkServicesComplete(temp, serv)) {
            setServices(serv);
            let transformedData: any = {};
            console.log('original healthData before transformation: ', temp);
            transformedData = healthTransformer(temp);
            console.log('healthData after tranformation: ', transformedData);
            setHealthData(transformedData);
          }
          } catch (err) {
          console.log("healthcontext.tsx ERROR: ", err);
        };
      }
    ));
 }, []);
