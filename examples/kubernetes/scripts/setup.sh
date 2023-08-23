kubectl apply -f ../launch/clusterRole.yml
kubectl apply -f ../launch/promConfig.yml
kubectl apply -f ../launch/prometheus.yml
kubectl apply -f ../launch/grafana-datasource-config.yml
kubectl apply -f ../launch/grafana.yml
kubectl apply -f ../launch/grafanaService.yml