import 'package:app/features/send_money/data/send_money_repository.dart';
import 'package:app/features/send_money/models/send_money_model.dart';
import 'package:flutter/cupertino.dart';

class SendMoneyProvider extends ChangeNotifier {
  final SendMoneyRepository _repository;

  bool loading = true;
  String? error;

  SendMoneyProvider(this._repository);

  Future<SendMoney> sendMoney(Map<String, dynamic> payload) async {
    try {
      final res = await _repository.sendMoney(payload);

      return res;
    } catch (e) {
      error = e.toString();
      loading = false;
      rethrow;
    } finally {
      loading = false;
    }
  }
}
