import 'package:app/features/send_money/data/send_money_api.dart';
import 'package:app/features/send_money/models/send_money_model.dart';

class SendMoneyRepository {
  final SendMoneyApi _api;

  SendMoneyRepository(this._api);

  Future<SendMoney> sendMoney(Map<String, dynamic> payload) async {
    return await _api.sendMoney(payload);
  }
}