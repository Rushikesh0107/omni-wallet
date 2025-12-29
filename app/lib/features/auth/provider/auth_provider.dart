import 'package:flutter/material.dart';
import '../data/auth_repository.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthProvider extends ChangeNotifier {
  final AuthRepository _repository;

  AuthStatus _status = AuthStatus.unknown;
  String? _error;

  AuthStatus get status => _status;
  String? get error => _error;

  AuthProvider(this._repository);

  Future<void> init() async {
    try {
      final isAuth = await _repository.isAuthenticated();
      _status = isAuth ? AuthStatus.authenticated : AuthStatus.unauthenticated;
      _error = null;
    } catch (e) {
      _status = AuthStatus.unauthenticated;
      _error = e.toString().replaceFirst('Exception: ', '');
    }
    notifyListeners();
  }

  Future<void> login({required String email, required String password}) async {
    try {
      await _repository.login(email, password);
      await init();
    } catch (e) {
      _error = e.toString().replaceFirst('Exception: ', '');
      _status = AuthStatus.unauthenticated;
      notifyListeners();
    }
  }

  Future<void> signup({required String email, required String password}) async {
    try {
      await _repository.signup(email, password);
      await init();
    } catch (e) {
      _error = e.toString().replaceFirst('Exception: ', '');
      _status = AuthStatus.unauthenticated;
      notifyListeners();
    }
  }

  void clearError() {
    _error = null;
  }

  Future<void> logout() async {
    await _repository.logout();
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }
}
