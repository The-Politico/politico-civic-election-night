#!/bin/bash

# parse args
while getopts b:d:f:o:t option
do
  case "${option}"
    in
    b) BUCKET=${OPTARG};;
    d) DATE=${OPTARG};;
    f) FILE=${OPTARG};;
    o) OUTPUT=${OPTARG};;
    t) TEST=${OPTARG};;
  esac
done

if [ -z $TEST ] ; then
  TEST=""
fi

# grab elex results for everything
if [ $FILE ]
  then
    elex results ${DATE} ${TEST} --national-only -o json -d ${FILE} > master.json
  else
    elex results ${DATE} ${TEST} --national-only -o json > master.json
fi

for file in ${OUTPUT} ; do
  if [ -e "$file" ] ; then
    elections=`cat $file | jq '.elections'`
    levels=`cat $file | jq '.levels'`
    path=`cat $file | jq -r '.filename'`
    fullpath="${OUTPUT}/election-results/$path"
    mkdir -p "$(dirname "$fullpath/p")"

    # filter results
    if [ -s master.json ] ; then
      cat master.json \
      | jq -c --argjson elections "$elections" --argjson levels "$levels" '[
        .[] |
        select(.raceid as $id | $elections|index($id)) |
        select(.level as $level | $levels|index($level)) |
        {
          fipscode: .fipscode,
          level: .level,
          polid: .polid,
          polnum: .polnum,
          precinctsreporting: .precinctsreporting,
          precinctsreportingpct: .precinctsreportingpct,
          precinctstotal: .precinctstotal,
          raceid: .raceid,
          statepostal: .statepostal,
          votecount: .votecount,
          votepct: .votepct,
          winner: .winner
        }
      ]' > "$fullpath/results.json" # gzip and copy to s3 after this
      last_updated="{\"date\":\"`date`\"}"
      echo $last_updated > "$fullpath/timestamp.json"
    fi
  fi
done

# deploy to s3
if [ $BUCKET ] ; then
  aws s3 cp ${OUTPUT}/election-results/ s3://${BUCKET}/election-results/ --recursive --acl "public-read" --cache-control "max-age=5"
fi