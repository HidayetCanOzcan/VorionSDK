#!/bin/bash

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Versiyon tipini al
echo -e "${YELLOW}Select version bump type:${NC}"
echo "1) patch (0.0.x) - Bug fixes"
echo "2) minor (0.x.0) - New features"
echo "3) major (x.0.0) - Breaking changes"
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        VERSION_TYPE="patch"
        ;;
    2)
        VERSION_TYPE="minor"
        ;;
    3)
        VERSION_TYPE="major"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Build
echo -e "\n${YELLOW}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed${NC}"
    exit 1
fi

# Version bump
echo -e "\n${YELLOW}Bumping version...${NC}"
npm version $VERSION_TYPE --no-git-tag-version
if [ $? -ne 0 ]; then
    echo -e "${RED}Version bump failed${NC}"
    exit 1
fi

# Publish to npm
echo -e "\n${YELLOW}Publishing to npm...${NC}"
npm publish
if [ $? -ne 0 ]; then
    echo -e "${RED}Publish failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}Successfully published new version!${NC}"
