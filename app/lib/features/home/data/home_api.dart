import 'package:app/features/auth/model/user_model.dart';
import 'package:app/features/home/models/card_instrument_model.dart';
import 'package:app/shared/models/api_response.dart';

import '../../../core/dio/dio_client.dart';

class HomeApi {
  final _dio = DioClient().dio;

  Future<User> getUserById() async {
    try {
      final response = await _dio.get("/user/get-user-by-id");

      final apiResponse = ApiResponse<User>.fromJson(
        response.data,
        (json) => User.fromJson(json),
      );

      return apiResponse.data;
    } catch (e) {
      throw Exception("Something went wrong while fetching user");
    }
  }

  Future<CardInstrument> addCardInstrument(Map<String, String> data) async {
    try {
      final response = await _dio.post("/instrument/add-card", data: data);

      print(response);

      final apiResponse = ApiResponse<CardInstrument>.fromJson(
        response.data,
        (json) => CardInstrument.fromJson(json),
      );

      return apiResponse.data;
    } catch (e) {
      throw Exception("Filed to Add Card");
    }
  }
}
