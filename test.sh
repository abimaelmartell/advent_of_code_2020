#!/bin/sh

result=0

expect () {
  out=$(node $1)
  if [ "$out" = "$2" ];
  then
    echo "✅ Pass $1";
  else
    echo "😡 Fail $1";
    result=1
  fi
}

# Day 1
expect day1/day1.js "928896"
expect day1/day1_02.js "295668576"

# Day 2
expect day2/day2.js "474"
expect day2/day2_02.js "745"

exit $result
