import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();

  late final Dio dio;
  late final CookieJar cookieJar;

  factory DioClient() => _instance;

  DioClient._internal() {
    cookieJar = CookieJar();

    dio = Dio(
      BaseOptions(
        baseUrl: 'http://10.0.2.2:8080/api',
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        sendTimeout: const Duration(seconds: 10),

        // Let the app decide what to do with 4xx / 5xx
        receiveDataWhenStatusError: true,
        validateStatus: (_) => true,

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // Attach cookie manager (critical for HTTP-only JWT)
    dio.interceptors.add(
      CookieManager(cookieJar),
    );
  }
}
