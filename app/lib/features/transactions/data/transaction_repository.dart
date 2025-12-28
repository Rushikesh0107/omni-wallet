import 'package:app/features/transactions/data/transaction_api.dart';
import 'package:app/features/transactions/models/transaction_model.dart';

class TransactionRepository {
  final TransactionApi _api;

  TransactionRepository(this._api);

  Future<List<Transaction>> getTransactions() async {
    return await _api.getTransactions();
  }
}
