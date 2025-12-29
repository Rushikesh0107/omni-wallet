import 'package:app/core/dio/dio_client.dart';
import 'package:app/features/send_money/models/send_money_model.dart';
import 'package:app/shared/models/api_response.dart';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';

class SendMoneyApi {
  final Dio _dio = DioClient().dio;

  Future<SendMoney> sendMoney(Map<String, dynamic> payload) async {
    try {
      print(payload);
      final response = await _dio.post(
        "/transaction/send-money",
        data: payload,
      );

      _validateResponse(response);

      final apiResponse = ApiResponse<SendMoney>.fromJson(
        response.data,
        (json) => SendMoney.fromJson(json),
      );

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, "Failed to send money");
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
