# Portfolio Manager Lib

This is an example of an Dart lib in order to help fetch and calculate the essential data for the app.

## Requirements

* Dart v3
* Portfolio Manager back-end - [python/examples/portfolio_manager_backend](../../../python/examples/portfolio_manager_backend/README.md)

## Development

Initialize project (Only run once):

```shell
cd dart/examples/portfolio_manager_lib
dart pub get # Install dependecies
```

Test:

```shell
cd dart/examples/portfolio_manager_lib
dart analyze # Run static analysis
dart run example/portfolio_manager_lib_example.dart # Run bare minimal healthcheck example
dart test # Run all tests
```

## Support

The project was initially created with `dart create` CLI using Dart v3.12.1.
