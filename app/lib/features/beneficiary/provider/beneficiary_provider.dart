import 'package:app/features/beneficiary/data/beneficiary_repository.dart';
import 'package:app/features/beneficiary/models/beneficiary_model.dart';
import 'package:flutter/foundation.dart';

class BeneficiaryProvider extends ChangeNotifier {
  final BeneficiaryRepository _repository;

  List<Beneficiary>? beneficiaries;
  bool loading = false;
  String? error;

  BeneficiaryProvider(this._repository) {
    getBeneficiaries();
  }

  Future<Beneficiary> addBeneficiary(Map<String, String> payload) async {
    loading = true;
    error = null;
    notifyListeners();

    try {
      final beneficiary = await _repository.addBeneficiary(payload);
      await getBeneficiaries();
      return beneficiary;
    } catch (e) {
      error = e.toString();
      rethrow;
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> getBeneficiaries() async {
    loading = true;
    error = null;
    notifyListeners();

    try {
      beneficiaries = await _repository.getBeneficiary();
    } catch (e) {
      error = e.toString();
      rethrow;
    } finally {
      loading = false;
      notifyListeners();
    }
  }
}
