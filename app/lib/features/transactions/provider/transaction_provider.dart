import 'package:app/features/transactions/data/transaction_repository.dart';
import 'package:app/features/transactions/models/transaction_model.dart';
import 'package:flutter/foundation.dart';

class TransactionProvider extends ChangeNotifier {
  final TransactionRepository _repository;

  List<Transaction>? transactions;
  bool loading = true;
  String? error;

  TransactionProvider(this._repository) {
    getTransactions();
  }

  Future<void> getTransactions() async {
    loading = true;
    error = null;
    notifyListeners();

    try {
      transactions = await _repository.getTransactions();
    } catch (e) {
      loading = false;
      error = e.toString();
      rethrow;
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  void clearError() {
    error = null;
  }
}
