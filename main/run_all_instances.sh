#!/bin/bash

# Script to run all 10 instances of check_docs_errors.py in parallel
# Usage: ./run_all_instances.sh
# To stop all instances: pkill -f "check_docs_errors.py"

SCRIPT_PATH="/home/raeder/mintlify/auth0docs-v2/main/check_docs_errors.py"
TOTAL_INSTANCES=10
PID_FILE=".check_docs_pids"

# Function to clean up on exit
cleanup() {
    echo ""
    echo "Stopping all instances..."
    pkill -f "check_docs_errors.py"
    rm -f "$PID_FILE"
    exit 1
}

# Trap Ctrl+C to stop all instances
trap cleanup SIGINT

echo "Starting all $TOTAL_INSTANCES instances of check_docs_errors.py..."
echo "To stop all instances, press Ctrl+C or run: pkill -f 'check_docs_errors.py'"
echo ""

# Start all instances in parallel
for i in $(seq 1 $TOTAL_INSTANCES); do
    echo "Starting instance $i/$TOTAL_INSTANCES..."
    python "$SCRIPT_PATH" $i $TOTAL_INSTANCES &
    echo $! >> "$PID_FILE"
done

echo ""
echo "All instances started. Waiting for completion..."
wait

rm -f "$PID_FILE"
echo ""
echo "All instances completed!"
echo "Reports saved as report_1.json, report_2.json, ..., report_10.json"

# Show instance summaries
echo ""
echo "Instance summaries:"
for i in $(seq 1 $TOTAL_INSTANCES); do
    if [ -f "report_$i.json" ]; then
        total=$(grep -o '"total_pages_checked": [0-9]*' report_$i.json | grep -o '[0-9]*')
        errors=$(grep -o '"total_errors": [0-9]*' report_$i.json | grep -o '[0-9]*')
        echo "  Instance $i: $total pages checked, $errors errors found"
    fi
done
