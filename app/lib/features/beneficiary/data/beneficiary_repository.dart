import 'package:app/features/beneficiary/data/beneficiary_api.dart';
import 'package:app/features/beneficiary/models/beneficiary_model.dart';

class BeneficiaryRepository {
  final BeneficiaryApi _api;

  BeneficiaryRepository(this._api);

  Future<Beneficiary> addBeneficiary(Map<String, dynamic> payload) async {
    return await _api.addBeneficiary(payload);
  }

  Future<List<Beneficiary>> getBeneficiary() async {
    return await _api.getBeneficiaries();
  }
}
