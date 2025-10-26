#!/bin/bash

# This script adds the missing required fields to all the new seed files

# Fix for theories table - add isLocked and estimatedTimeMinutes, remove keysToUnlock
for file in seedRokosBasilisk.ts seedDeadInternet.ts seedAIOpinion.ts seedFacialRecognition.ts; do
  # Replace the theories insert
  sed -i 's/keysToUnlock: [0-9],/isLocked: false,\n      estimatedTimeMinutes: 45,/' "$file"
done

# Fix for theorySections - add description field
for file in seedRokosBasilisk.ts seedDeadInternet.ts seedAIOpinion.ts seedFacialRecognition.ts; do
  # Add description after title in theorySections
  sed -i '/theorySections/,/order: [0-9],/ {
    s/title: "\([^"]*\)",/title: "\1",\n      description: "\1",/
  }' "$file"
done

# Fix for theoryPages - add hasQuestion field based on whether there's a question afterward
echo "Manual fixes needed for hasQuestion field in theoryPages"

