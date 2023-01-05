kubectl apply -f ../launch/clusterRole.yml
kubectl apply -f ../launch/promConfig.yml
kubectl apply -f ../launch/prometheus.yml
sleep 2
kubectl apply -f ../launch/backend.yml
kubectl apply -f ../launch/frontend.yml