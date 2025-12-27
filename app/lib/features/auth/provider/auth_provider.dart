import 'package:flutter/material.dart';
import '../data/auth_repository.dart';

enum AuthStatus {
  unknown,        
  authenticated,  
  unauthenticated 
}

class AuthProvider extends ChangeNotifier {
  final AuthRepository _repository;

  AuthStatus _status = AuthStatus.unknown;
  AuthStatus get status => _status;

  AuthProvider(this._repository);

  
  Future<void> init() async {
    try {
      final isAuth = await _repository.isAuthenticated();
      _status = isAuth
          ? AuthStatus.authenticated
          : AuthStatus.unauthenticated;
    } catch (_) {
      
      _status = AuthStatus.unauthenticated;
    }
    notifyListeners();
  }


  Future<void> login({
    required String email,
    required String password,
  }) async {
    await _repository.login(email, password);
    await init();
  }

  Future<void> signup({
    required String email,
    required String password,
  }) async {
    await _repository.signup(email, password);
    await init();
  }

  
  Future<void> logout() async {
    await _repository.logout();
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }


  void forceLogout() {
    if (_status == AuthStatus.unauthenticated) return;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }
}
