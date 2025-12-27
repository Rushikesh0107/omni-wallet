import 'auth_api.dart';

class AuthRepository {
  final AuthApi _api;

  AuthRepository(this._api);


  Future<bool> isAuthenticated() async {
    return await _api.checkAuth();
  }

  Future<void> signup(String email, String password) async {
    await _api.signup(email, password);
  }


  Future<void> login(String email, String password) async {
    await _api.login(email, password);
  }


  Future<void> logout() async {
    await _api.logout();
  }
}
