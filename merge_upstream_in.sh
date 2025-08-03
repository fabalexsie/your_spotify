#!/bin/bash
YELLOW='\033[1;33m'
  CYAN='\033[1;36m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Getting latest changes from upstream repository...${NC}"
git fetch upstream

echo -e "${YELLOW}Merging changes into local master branch...${NC}"
git checkout master # tracks origin/master
git merge upstream/master

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Automatic merge failed. Please resolve conflicts manually.${NC}"
  echo -e "${YELLOW}After resolving conflicts, run ${CYAN}'git merge --continue'${YELLOW} to complete the merge.${NC}"
  LATEST_TAG=$(git describe --tags --abbrev=0)
  echo -e "${YELLOW}The latest tag is ${CYAN}$LATEST_TAG${YELLOW}. Add it to your commit message.${NC}"
  echo -e "${YELLOW}After that, you can push the changes to your forked repository with ${CYAN}'git push origin master'${YELLOW}.${NC}"
  exit 1
fi
echo -e "${YELLOW}Merge completed successfully.${NC}"
LATEST_TAG=$(git describe --tags --abbrev=0)
LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
echo -e "${YELLOW}The latest tag is ${CYAN}$LATEST_TAG${YELLOW}. You can add it to your commit message with ${CYAN}'git commit --amend -m \"${LAST_COMMIT_MSG} (${LATEST_TAG})\"'${YELLOW}.${NC}"
echo -e "${YELLOW}After merging, you can push the changes to your forked repository with ${CYAN}'git push origin master'${YELLOW}.${NC}"
