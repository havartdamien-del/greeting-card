#!/bin/bash

# =====================================================
# JEST TESTS RUNNER SCRIPT
# =====================================================
# Usage: npm test
# or: npm test -- --watch
# or: npm test -- page-container-listing.component.spec.ts
#
# This script demonstrates how to run the Jest tests
# for PageContainerListingComponent with MockCardDataService
# =====================================================

cd angular

# Default: Run all tests with Jest
if [ $# -eq 0 ]; then
    echo "Running all Jest tests..."
    npm test
else
    echo "Running Jest tests with arguments: $@"
    npm test -- "$@"
fi

# =====================================================
# USEFUL JEST COMMANDS
# =====================================================
#
# Run all tests once:
#   npm test -- --passWithNoTests
#
# Run specific test file:
#   npm test -- page-container-listing.component.spec.ts
#
# Run tests matching pattern:
#   npm test -- --testNamePattern="should load"
#
# Run with coverage:
#   npm test -- --coverage
#
# Watch mode (reruns on file changes):
#   npm test -- --watch
#
# Debug mode:
#   node --inspect-brk node_modules/@angular/cli/bin/ng test --browsers=Chrome
#
# Show verbose output:
#   npm test -- --verbose
#
# Update snapshots (if using snapshot testing):
#   npm test -- --u
#
# =====================================================
# JEST CONFIGURATION FILE
# =====================================================
#
# Location: angular/jest.config.js
#
# Contains:
# - Jest preset for Angular (jest-preset-angular)
# - Test environment setup (jsdom)
# - Setup file (setup-jest.ts)
# - Test path patterns
#
# =====================================================
# TYPESCRIPT JEST CONFIGURATION
# =====================================================
#
# Location: angular/tsconfig.spec.json
#
# Contains:
# - Module: CommonJS
# - Types: jest (enables jest type definitions)
# - Include patterns for .spec.ts files
#
# =====================================================
# TEST SETUP FILE
# =====================================================
#
# Location: angular/setup-jest.ts
#
# This file runs before all tests and configures:
# - Global Jest settings
# - Angular zone configuration
# - Any required polyfills
#
# =====================================================
