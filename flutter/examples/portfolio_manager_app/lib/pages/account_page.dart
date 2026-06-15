import 'package:flutter/material.dart';
import 'package:portfolio_manager_app/constants/app_constants.dart';

class AccountPage extends StatelessWidget {
  final String? accountOwner;
  final String? accountPhone;
  final String? accountCountry;
  final String? accountAddress;
  final String? accountEmail;
  final String? accountCreationDate;
  final bool? accountIsPremium;
  final String displayCurrency;
  final VoidCallback onAddAsset;

  const AccountPage({
    super.key,
    required this.accountOwner,
    required this.accountPhone,
    required this.accountCountry,
    required this.accountAddress,
    required this.accountEmail,
    required this.accountIsPremium,
    required this.accountCreationDate,
    required this.displayCurrency,
    required this.onAddAsset,
  });

  @override
  Widget build(BuildContext context) {
    String getCreatedSince(String? accountCreationDate) {
      if (accountCreationDate == null) return "Loading...";
      final createdDate = DateTime.parse(accountCreationDate);
      final now = DateTime.now();
      final difference = now.difference(createdDate);

      final years = difference.inDays ~/ 365;
      if (years > 0) {
        return years == 1 ? "1 year ago" : "$years years ago";
      }
      final months = difference.inDays ~/ 30;
      if (months > 0) {
        return months == 1 ? "1 month ago" : "$months months ago";
      }
      final weeks = difference.inDays ~/ 7;
      if (weeks > 0) {
        return weeks == 1 ? "1 week ago" : "$weeks weeks ago";
      }
      if (difference.inDays > 0) {
        return difference.inDays == 1
            ? "1 day ago"
            : "${difference.inDays} days ago";
      }
      if (difference.inHours > 0) {
        return difference.inHours == 1
            ? "1 hour ago"
            : "${difference.inHours} hours ago";
      }
      if (difference.inMinutes > 0) {
        return difference.inMinutes == 1
            ? "1 minute ago"
            : "${difference.inMinutes} minutes ago";
      }
      return "Just now";
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Account"),
        actionsPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.kPadding,
        ),
        actions: [IconButton(icon: const Icon(Icons.person), onPressed: null)],
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.kPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: double.infinity,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Account Owner"),
                      Text(
                        accountOwner ?? "Loading...",
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Account Type"),
                      Row(
                        children: [
                          Icon(
                            accountIsPremium == true
                                ? Icons.workspace_premium
                                : Icons.workspace_premium_outlined,
                            color: accountIsPremium == true
                                ? Colors.amber
                                : Colors.grey,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            accountIsPremium == true ? "Premium" : "Free",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: accountIsPremium == true
                                  ? Colors.amber
                                  : Colors.grey,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 16),

                      const Text("Display Currency"),
                      Text(
                        displayCurrency,
                        style: TextStyle(
                          fontSize: 22,
                          color: Theme.of(context).colorScheme.secondary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Country"),
                      Text(
                        accountCountry ?? "Loading...",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Address"),
                      Text(
                        accountAddress ?? "Loading...",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Email"),
                      Text(
                        accountEmail ?? "Loading...",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Phone"),
                      Text(
                        accountPhone ?? "Loading...",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 16),

                      const Text("Created Since"),
                      Text(
                        accountCreationDate != null
                            ? getCreatedSince(accountCreationDate)
                            : "Loading...",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.add),
                label: const Text("Add Asset"),
                onPressed: onAddAsset,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
