import 'package:app/core/dio/dio_client.dart';
import 'package:app/features/beneficiary/models/beneficiary_model.dart';
import 'package:app/shared/models/api_response.dart';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';

class BeneficiaryApi {
  final Dio _dio = DioClient().dio;

  Future<Beneficiary> addBeneficiary(Map<String, dynamic> payload) async {
    try {
      final response = await _dio.post(
        "/beneficiary/add-beneficiary",
        data: payload,
      );

      _validateResponse(response);

      final apiResponse = ApiResponse<Beneficiary>.fromJson(
        response.data,
        (json) => Beneficiary.fromJson(json),
      );

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, 'Failed to add beneficiary');
    }
  }

  Future<List<Beneficiary>> getBeneficiaries() async {
    try {
      final response = await _dio.get(
        "/beneficiary/get-beneficiary-by-user-id",
      );

      _validateResponse(response);

      final apiResponse = ApiResponse<List<Beneficiary>>.fromJson(
        response.data,
        (json) => (json as List)
            .map((e) => Beneficiary.fromJson(e as Map<String, dynamic>))
            .toList(),
      );

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, "Failed to fetch beneficiaries");
    }
  }

  void _validateResponse(Response response) {
    if (response.statusCode != 200 && response.statusCode != 201) {
      throw DioException(
        requestOptions: response.requestOptions,
        response: response,
        message: response.data?['message'] ?? 'Request failed',
      );
    }
  }

  Never _handleDioError(DioException e, String fallbackMessage) {
    debugPrint('API Error → ${e.response?.data ?? e.message}');

    throw Exception(
      e.response?.data?['message'] ?? e.message ?? fallbackMessage,
    );
  }
}
