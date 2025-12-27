import 'package:dio/dio.dart';
import '../../features/auth/provider/auth_provider.dart';

class AuthInterceptor extends Interceptor {
  final AuthProvider authProvider;

  AuthInterceptor(this.authProvider);

  @override
  void onResponse(
    Response response,
    ResponseInterceptorHandler handler,
  ) {
    // Backend is the authority: 401 means "you are out"
    if (response.statusCode == 401) {
      authProvider.forceLogout();
    }

    handler.next(response);
  }

  @override
  void onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) {
    // Network errors, timeouts, etc.
    handler.next(err);
  }
}
