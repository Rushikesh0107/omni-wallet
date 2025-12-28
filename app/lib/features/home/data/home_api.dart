import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import '../../../core/dio/dio_client.dart';
import 'package:app/features/auth/model/user_model.dart';
import 'package:app/features/home/models/card_instrument_model.dart';
import 'package:app/features/home/models/upi_instrument_model.dart';
import 'package:app/shared/models/api_response.dart';

class HomeApi {
  final Dio _dio = DioClient().dio;

  Future<User> getUserById() async {
    try {
      final response = await _dio.get("/user/get-user-by-id");

      _validateResponse(response);

      final apiResponse = ApiResponse<User>.fromJson(
        response.data,
        (json) => User.fromJson(json),
      );

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, 'Failed to fetch user');
    }
  }


  Future<CardInstrument> addCardInstrument(Map<String, String> data) async {
    try {
      final response = await _dio.post("/instrument/add-card", data: data);

      _validateResponse(response);

      final apiResponse = ApiResponse<CardInstrument>.fromJson(
        response.data,
        (json) => CardInstrument.fromJson(json),
      );

      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, 'Failed to add card');
    }
  }

  Future<UpiInstrument> addUpiInstrument(Map<String, String> data) async {
    try {
      final response = await _dio.post("/instrument/add-upi", data: data);

      _validateResponse(response);

      final apiResponse = ApiResponse<UpiInstrument>.fromJson(
        response.data,
        (json) => UpiInstrument.fromJson(json),
      );


      return apiResponse.data;
    } on DioException catch (e) {
      _handleDioError(e, 'Failed to add UPI');
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
