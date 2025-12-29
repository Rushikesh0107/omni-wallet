import 'package:app/core/storage/cookie_storage.dart';
import 'package:app/features/beneficiary/data/beneficiary_api.dart';
import 'package:app/features/beneficiary/provider/beneficiary_provider.dart';
import 'package:app/features/beneficiary/data/beneficiary_repository.dart';
import 'package:app/features/home/data/home_api.dart';
import 'package:app/features/home/data/home_repository.dart';
import 'package:app/features/home/provider/home_provider.dart';
import 'package:app/features/send_money/data/send_money_api.dart';
import 'package:app/features/send_money/data/send_money_repository.dart';
import 'package:app/features/send_money/provider/send_money_provider.dart';
import 'package:app/features/transactions/data/transaction_api.dart';
import 'package:app/features/transactions/data/transaction_repository.dart';
import 'package:app/features/transactions/provider/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/router/app_router.dart';
import 'features/auth/data/auth_api.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/auth/provider/auth_provider.dart';
import 'core/dio/dio_client.dart';
import 'core/dio/dio_interceptors.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await CookieStorage.init();

  await dotenv.load(fileName: '.env');

  final authApi = AuthApi();
  final authRepository = AuthRepository(authApi);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) {
            final authProvider = AuthProvider(authRepository);
            DioClient().addInterceptor(AuthInterceptor(authProvider));
            authProvider.init();
            return authProvider;
          },
        ),
        ChangeNotifierProvider(
          create: (_) => HomeProvider(HomeRepository(HomeApi())),
        ),
        ChangeNotifierProvider(
          create: (_) =>
              BeneficiaryProvider(BeneficiaryRepository(BeneficiaryApi())),
        ),
        ChangeNotifierProvider(
          create: (_) =>
              TransactionProvider(TransactionRepository(TransactionApi())),
        ),
        ChangeNotifierProvider(
          create: (_) => SendMoneyProvider(SendMoneyRepository(SendMoneyApi())),
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
