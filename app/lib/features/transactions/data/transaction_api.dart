import 'package:app/core/dio/dio_client.dart';
import 'package:app/features/transactions/models/transaction_model.dart';
import 'package:app/shared/models/api_response.dart';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';

class TransactionApi {
  final Dio _dio = DioClient().dio;

  Future<List<Transaction>> getTransactions() async {
    try {
      final response = await _dio.get(
        "/transaction/get-transaction-by-user-id",
      );

      print(response);

      _validateResponse(response);

      final apiResponse = ApiResponse.fromJson(
        response.data,
        (json) => (json as List)
            .map((t) => Transaction.fromJson(t as Map<String, dynamic>))
            .toList(),
      );

      print(apiResponse.data);

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, "Failed to fetch transaction");
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
