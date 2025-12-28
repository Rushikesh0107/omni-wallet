import 'package:app/features/beneficiary/models/beneficiary_model.dart';
import 'package:app/features/beneficiary/provider/beneficiary_provider.dart';
import 'package:app/features/beneficiary/screens/add_beneficiary_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BeneficiaryScreen extends StatelessWidget {
  BeneficiaryScreen({super.key});

  final ValueNotifier<String> searchQuery = ValueNotifier('');

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Consumer<BeneficiaryProvider>(
      builder: (context, beneficiary, _) {
        if (beneficiary.loading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (beneficiary.error != null) {
          print(beneficiary.error);
          return Scaffold(
            body: Center(child: Text('Error: ${beneficiary.error}')),
          );
        }
        return Scaffold(
          floatingActionButton: FloatingActionButton(
            heroTag: null,
            onPressed: () {
              Navigator.of(
                context,
              ).push(MaterialPageRoute(builder: (_) => AddBeneficiaryScreen()));
            },
            backgroundColor: theme.colorScheme.primary,
            foregroundColor: Colors.white,
            child: const Icon(Icons.add),
          ),
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  TextField(
                    onChanged: (value) => searchQuery.value = value,
                    decoration: InputDecoration(
                      hintText: 'Search by name or phone',
                      prefixIcon: const Icon(Icons.search),
                      filled: true,
                      fillColor: theme.colorScheme.surfaceVariant,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  Expanded(
                    child: ValueListenableBuilder<String>(
                      valueListenable: searchQuery,
                      builder: (_, query, __) {
                        final filtered = beneficiary.beneficiaries?.where((b) {
                          return b.name.toLowerCase().contains(
                                query.toLowerCase(),
                              ) ||
                              b.phoneNumber.contains(query);
                        }).toList();

                        if (filtered!.isEmpty) {
                          return const Center(
                            child: Text('No beneficiaries found'),
                          );
                        }

                        return ListView.separated(
                          itemCount: filtered.length,
                          separatorBuilder: (_, __) =>
                              const SizedBox(height: 10),
                          itemBuilder: (_, index) {
                            return _BeneficiaryTile(
                              beneficiary: filtered[index],
                            );
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _BeneficiaryTile extends StatelessWidget {
  final Beneficiary beneficiary;

  const _BeneficiaryTile({required this.beneficiary});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final initial = beneficiary.name[0].toUpperCase();

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
            child: Text(
              initial,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: theme.colorScheme.primary,
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  beneficiary.name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  beneficiary.phoneNumber,
                  style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right),
        ],
      ),
    );
  }
}

class _Beneficiary {
  final String name;
  final String phone;

  const _Beneficiary({required this.name, required this.phone});
}
