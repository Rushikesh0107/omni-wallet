import '../../../core/dio/dio_client.dart';

class AuthApi {
  final _dio = DioClient().dio;

  Future<bool> checkAuth() async {
    final response = await _dio.get('/auth/me');

    return response.statusCode == 200;
  }

  Future<void> login(String email, String password) async {
    final response = await _dio.post(
      '/auth/login',
      data: {
        'email': email,
        'password': password,
      },
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      throw Exception('Login failed');
    }
  }

  Future<void> signup(String email, String password) async {
    final response = await _dio.post(
      '/auth/register',
      data: {
        'email' : email,
        'password': password
      }
    );

    if(response.statusCode != 200){
      throw Exception('Signup failed');
    }
  }

  Future<void> logout() async {
    final response = await _dio.post('/auth/logout');

    if (response.statusCode != 200) {
      throw Exception('Logout failed');
    }
  }
}
