import 'package:app/features/auth/model/user_model.dart';
import 'package:app/features/home/data/home_api.dart';
import 'package:app/features/home/models/card_instrument_model.dart';
import 'package:app/features/home/models/upi_instrument_model.dart';

class HomeRepository {
  final HomeApi _api;

  HomeRepository(this._api);

  Future<User> getUserById() async {
    return await _api.getUserById();
  }

  Future<CardInstrument> addCardInstruemnt(data) async {
    return await _api.addCardInstrument(data);
  }

  Future<UpiInstrument> addUpiInstrument(data) async {
    return await _api.addUpiInstrument(data);
  }
}