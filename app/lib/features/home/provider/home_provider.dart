import 'package:flutter/material.dart';
import '../data/home_repository.dart';
import '../../auth/model/user_model.dart';

class HomeProvider extends ChangeNotifier {
  final HomeRepository _repository;

  User? user;
  bool loading = true;
  String? error;

  HomeProvider(this._repository) {
    fetchUser();
  }

  Future<void> fetchUser() async {
    try {
      user = await _repository.getUserById();
    } catch (e) {
      error = e.toString();
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> addCardInstrument(Map<String, dynamic> data) async {
    loading = true;
    notifyListeners();

    try {
      await _repository.addCardInstruemnt(data);
      await fetchUser(); // refresh cards list
    } catch (e) {
      error = e.toString();
    } finally {
      loading = false;
      notifyListeners();
    }
  }
}
