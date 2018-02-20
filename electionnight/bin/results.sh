#!/bin/bash

# parse args
while getopts t:f:d: option
do
  case "${option}"
    in
    t) TARGET=${OPTARG};;
    f) FILE=${OPTARG};;
    d) DATE=${OPTARG};;
  esac
done


# grab elex results for everything
if [ $FILE ]
  then
    elex results ${DATE} --test --national-only -o json -d ${FILE} > master.json
  else
    elex results ${DATE} --test --national-only -o json > master.json
fi

for file in ../electionnight/bin/output/elections/*.json ; do
  if [ -e "$file" ] ; then
    elections=`cat $file | jq '.elections'`
    levels=`cat $file | jq '.levels'`
    path=`cat $file | jq -r '.filename'`
    fullpath="../electionnight/static/election-results/$path"
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
if [ $TARGET ] ; then
  aws s3 cp ../static/election-results/ s3://${TARGET}/elections/ --recursive --acl "public-read" --cache-control "max-age=5"
fi