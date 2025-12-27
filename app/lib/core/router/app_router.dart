import 'package:flutter/material.dart';

import '../../features/auth/screens/login_screen.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/shell/main_shell.dart';

class AppRouter {
  static const String splash = '/';
  static const String login = '/login';
  static const String shell = '/app';

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return _page(const SplashScreen());

      case login:
        return _page(const LoginScreen());

      case shell:
        return _page(const MainShell());

      default:
        return _page(
          const Scaffold(
            body: Center(
              child: Text('404 – Page not found'),
            ),
          ),
        );
    }
  }

  static PageRoute _page(Widget child) {
    return MaterialPageRoute(
      builder: (_) => child,
    );
  }
}
