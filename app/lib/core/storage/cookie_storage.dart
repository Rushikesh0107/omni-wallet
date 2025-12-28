import 'package:cookie_jar/cookie_jar.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class CookieStorage {
  static PersistCookieJar? _cookieJar;

  /// Call this once during app startup
  static Future<PersistCookieJar> init() async {
    if (_cookieJar != null) return _cookieJar!;

    final Directory dir = await getApplicationDocumentsDirectory();
    final String path = '${dir.path}/cookies';

    _cookieJar = PersistCookieJar(
      storage: FileStorage(path),
    );

    return _cookieJar!;
  }

  /// Read-only access after init
  static PersistCookieJar get jar {
    if (_cookieJar == null) {
      throw Exception(
        'CookieStorage not initialized. Call CookieStorage.init() first.',
      );
    }
    return _cookieJar!;
  }

  /// Use on logout
  static Future<void> clear() async {
    if (_cookieJar != null) {
      await _cookieJar!.deleteAll();
    }
  }
}
