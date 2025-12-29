import 'package:app/core/storage/cookie_storage.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';

import '../../../core/dio/dio_client.dart';

class AuthApi {
  final _dio = DioClient().dio;

  Future<bool> checkAuth() async {
    final response = await _dio.get('/auth/me');

    if (response.statusCode == 200) {
      return response.data['success'] == true;
    }

    return false;
  }

  Future<void> login(String email, String password) async {
    final response = await _dio.post(
      '/auth/login',
      data: {'email': email, 'password': password},
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      final message = response.data['message'] ?? 'Signin failed';
      throw Exception(message);
    }
  }

  Future<void> signup(String email, String password) async {
    final response = await _dio.post(
      '/auth/register',
      data: {'email': email, 'password': password},
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      final message = response.data['message'] ?? 'Signup failed';
      throw Exception(message);
    }
  }

  Future<void> logout() async {
    await CookieStorage.clear();
  }

    void _validateResponse(Response response) {
    if (response.statusCode != 200 && response.statusCode != 201) {
      throw DioException(
        requestOptions: response.requestOptions,
        response: response,
        message: response.data?['message'] ?? 'Request failed',
      );
    }
  }

  Never _handleDioError(DioException e, String fallbackMessage) {
    debugPrint('API Error → ${e.response?.data ?? e.message}');

    throw Exception(
      e.response?.data?['message'] ?? e.message ?? fallbackMessage,
    );
  }
}
