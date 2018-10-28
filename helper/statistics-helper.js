/**
 * Currently ignores timespans that have no end timestamps (--> TODO)
 */
exports.calculateTotalTime = (timestamps, start, end) => { 
  if(timestamps) {
    let totalTime = 0;
    if(timestamps.length === 1) {
      if(start && timestamps[0].startId) {
        totalTime = Math.abs(timestamps[0].timestamp.getTime() - start.getTime());
      } else if(end && !timestamps[0].startId) {
        totalTime = Math.abs(end.getTime() - timestamps[0].timestamp.getTime());
      }
    }

    for(let i = 0; i < timestamps.length-1; i++) {

      if(start && i === 0 && timestamps[i].startId) {
        // first timespan starts before 'start' date
        // --> get time difference between 'start' date and this timestamp
        totalTime += Math.abs(timestamps[i].timestamp.getTime() - start.getTime())
      }

      if(end && i == timestamps.length-1 && !timestamps[i].startId) {
        // last timespan ends after 'end' date
        // --> get time differance between this timestamp and 'end' date
        totalTime += Math.abs(end.getTime() - timestamps[i].timestamp.getTime())
      }

      // get time difference for each timespan 
      if(timestamps[i+1].startId && timestamps[i]._id && 
            (timestamps[i+1].startId.toString() == timestamps[i]._id.toString())) {
        totalTime += Math.abs(timestamps[i+1].timestamp.getTime() - timestamps[i].timestamp.getTime())
      }
    }

    return Math.round(totalTime / (1000 * 60)) // convert millisec to minutes
  }
  return 0;
}