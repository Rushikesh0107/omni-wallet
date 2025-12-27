class ApiResponse<T> {
  final String message;
  final T data;
  final bool success;

  ApiResponse({
    required this.message,
    required this.data,
    required this.success,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic json) fromJsonT,
  ) {
    return ApiResponse(
      message: json['message'] as String,
      success: json['success'] as bool,
      data: fromJsonT(json['data']),
    );
  }
}
