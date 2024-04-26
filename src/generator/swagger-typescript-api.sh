echo "Generating API client from swagger"
npx swagger-typescript-api -p https://www.coingecko.com/api/documentations/v3/swagger.json -o src/@types/swagger -n index.ts  --extract-request-params --extract-request-body --extract-response-body --enum-names-as-values --union-enums --extract-enums --add-readonly --sort-types --no-client
echo "Done"