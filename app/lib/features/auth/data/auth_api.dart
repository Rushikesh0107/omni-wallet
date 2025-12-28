import 'package:app/core/storage/cookie_storage.dart';

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
}
