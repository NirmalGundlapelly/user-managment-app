# User List Application

This is a simple React Native application that fetches and displays a list of users. The app supports search, sorting, and handles API errors with a retry option.

## Features
- Displays a list of users fetched from the `https://randomuser.me/api/?results=10` API.
- Allows searching users by name or email.
- Supports sorting users by name or email in ascending or descending order.
- Handles loading and error states, with a retry button for failed API calls.

## Prerequisites

- **Node.js** (version 14 or higher)
- **React Native CLI** or **Expo CLI** (if using Expo)
- **Android Studio** or **Xcode** for running the application on an emulator or physical device
- **Redux** and **Redux Toolkit** for state management

## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/NirmalGundlapelly/user-managment-app.git
cd user-managment-app