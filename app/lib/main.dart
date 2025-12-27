import 'package:app/core/router/app_router.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/dio/dio_client.dart';
import 'features/auth/data/auth_api.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/auth/provider/auth_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Dio singleton
  DioClient();

  // Auth layer
  final authApi = AuthApi();
  final authRepository = AuthRepository(authApi);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthProvider(authRepository)..init(),
        ),
      ],
      child: const OmniWalletApp(),
    ),
  );
}

class OmniWalletApp extends StatelessWidget {
  const OmniWalletApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OmniWallet',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      initialRoute: AppRouter.splash,
      onGenerateRoute: AppRouter.onGenerateRoute,
    );
  }
}
