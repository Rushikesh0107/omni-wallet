import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:app/core/storage/cookie_storage.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();

  late final Dio dio;
  late final CookieJar cookieJar;

  factory DioClient() => _instance;

  DioClient._internal() {
    final baseUrl = dotenv.env['API_BASE_URL'];

    assert(
      baseUrl != null && baseUrl.isNotEmpty,
      'API_BASE_URL is not set in env',
    );

    cookieJar = CookieJar();

    dio = Dio(
      BaseOptions(
        baseUrl: baseUrl!,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        sendTimeout: const Duration(seconds: 10),
        receiveDataWhenStatusError: true,
        validateStatus: (_) => true,
        headers: const {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(CookieManager(CookieStorage.jar));
  }

  void addInterceptor(Interceptor interceptor) {
    dio.interceptors.add(interceptor);
  }
}
